
'use client';

import { useState, useMemo } from 'react';
import { useCollection } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { Job } from '@/components/sections/careers/job-card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MoreHorizontal, Trash2, Edit, AlertCircle, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useFirebase } from '@/firebase';

function JobsTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Job Title</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Posted Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell><Skeleton className="h-5 w-48" /></TableCell>
              <TableCell><Skeleton className="h-5 w-24" /></TableCell>
              <TableCell><Skeleton className="h-5 w-20" /></TableCell>
              <TableCell><Skeleton className="h-5 w-32" /></TableCell>
              <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function JobsTable({ onEditJob }: { onEditJob: (job: Job) => void }) {
    const { firestore } = useFirebase();
    const [jobToDelete, setJobToDelete] = useState<Job | null>(null);
    const { toast } = useToast();

    const jobsQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'jobs'), orderBy('postedDate', 'desc'));
    }, [firestore]);

    const { data: jobs, isLoading } = useCollection<Job>(jobsQuery);

    const handleDelete = async () => {
        if (!jobToDelete || !firestore) return;

        try {
            await deleteDoc(doc(firestore, 'jobs', jobToDelete.id));
            toast({
                title: 'Success',
                description: 'Job posting deleted successfully.',
                variant: 'default',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete job posting.',
                variant: 'destructive',
            });
        } finally {
            setJobToDelete(null);
        }
    };

    if (isLoading) {
      return <JobsTableSkeleton />;
    }

    if (!jobs || jobs.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-dashed">
                <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                <h3 className="text-xl font-medium text-gray-800">No jobs posted yet</h3>
                <p className="text-gray-500 mt-2">Click "Add New Job" to get started.</p>
            </div>
        );
    }

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Job Title</TableHead>
                            <TableHead className="w-[15%]">Department</TableHead>
                            <TableHead className="w-[15%]">Location</TableHead>
                            <TableHead className="w-[15%]">Posted Date</TableHead>
                            <TableHead className="w-[10%]">Status</TableHead>
                            <TableHead className="w-[15%] text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {jobs.map((job) => (
                            <TableRow key={job.id}>
                                <TableCell className="font-medium">{job.jobTitle}</TableCell>
                                <TableCell>{job.department}</TableCell>
                                <TableCell>{job.location}</TableCell>
                                <TableCell>
                                    {job.postedDate && typeof job.postedDate.toDate === 'function'
                                        ? format(job.postedDate.toDate(), 'MMM d, yyyy')
                                        : 'Date not available'}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={job.status === 'active' ? 'default' : 'secondary'} className={job.status === 'active' ? 'bg-green-100 text-green-800' : ''}>
                                        {job.status === 'active' ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => onEditJob(job)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setJobToDelete(job)} className="text-red-600 focus:text-red-600">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!jobToDelete} onOpenChange={(isOpen) => !isOpen && setJobToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertCircle className="text-red-500"/> Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the job posting for "{jobToDelete?.jobTitle}". This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete Job</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
