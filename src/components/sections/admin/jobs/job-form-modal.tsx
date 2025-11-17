
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { useFirebase } from '@/firebase';
import { doc, setDoc, serverTimestamp, addDoc, collection, updateDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';
import { Job } from '@/components/sections/careers/job-card';
import { Loader2 } from 'lucide-react';
import { DialogDescription } from '@radix-ui/react-dialog';

const jobSchema = z.object({
  jobTitle: z.string().min(5, 'Please enter a job title (minimum 5 characters)'),
  department: z.string().min(1, 'Department is required'),
  employmentType: z.string().min(1, 'Employment type is required'),
  location: z.string().min(1, 'Location is required'),
  experienceLevel: z.string().min(1, 'Experience level is required'),
  salaryRange: z.string().optional(),
  fullDescription: z.string().min(100, 'Full description must be at least 100 characters.'),
  responsibilities: z.string().min(1, 'Responsibilities are required'),
  requirements: z.string().min(1, 'Requirements are required'),
  niceToHave: z.string().optional(),
  linkedinUrl: z.string().url('Must be a valid LinkedIn URL').refine(
    (url) => url.startsWith('https://www.linkedin.com/jobs/view/') || url.startsWith('https://linkedin.com/jobs/view/'),
    'URL must be a LinkedIn job posting'
  ),
  status: z.boolean().default(true),
});

type JobFormValues = z.infer<typeof jobSchema>;

interface JobFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: Job | null;
}

export function JobFormModal({ isOpen, onClose, job }: JobFormModalProps) {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const isEditing = !!job;

  const form = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      jobTitle: '',
      department: '',
      employmentType: '',
      location: '',
      experienceLevel: '',
      salaryRange: '',
      fullDescription: '',
      responsibilities: '',
      requirements: '',
      niceToHave: '',
      linkedinUrl: '',
      status: true,
    }
  });

  useEffect(() => {
    if (job) {
      form.reset({
        jobTitle: job.jobTitle,
        department: job.department,
        employmentType: job.employmentType,
        location: job.location,
        experienceLevel: job.experienceLevel,
        salaryRange: job.salaryRange || '',
        fullDescription: job.fullDescription,
        responsibilities: job.responsibilities.join('\n'),
        requirements: job.requirements.join('\n'),
        niceToHave: job.niceToHave?.join('\n') || '',
        linkedinUrl: job.linkedinUrl,
        status: job.status === 'active',
      });
    } else {
      form.reset({
        jobTitle: '',
        department: '',
        employmentType: '',
        location: '',
        experienceLevel: '',
        salaryRange: '',
        fullDescription: '',
        responsibilities: '',
        requirements: '',
        niceToHave: '',
        linkedinUrl: '',
        status: true,
      });
    }
  }, [job, form, isOpen]);

  const onSubmit = async (values: JobFormValues) => {
    if (!firestore || !user) return;

    const jobData = {
      ...values,
      responsibilities: values.responsibilities.split('\n').filter(line => line.trim() !== ''),
      requirements: values.requirements.split('\n').filter(line => line.trim() !== ''),
      niceToHave: values.niceToHave?.split('\n').filter(line => line.trim() !== '') || [],
      status: values.status ? 'active' : 'inactive',
      lastUpdated: serverTimestamp(),
    };

    try {
      if (isEditing && job) {
        const jobRef = doc(firestore, 'jobs', job.id);
        await updateDoc(jobRef, jobData);
        toast({ title: 'Success', description: 'Job posting updated successfully.' });
      } else {
        const jobsCollection = collection(firestore, 'jobs');
        await addDoc(jobsCollection, {
          ...jobData,
          postedDate: serverTimestamp(),
          createdBy: user.email,
        });
        toast({ title: 'Success', description: 'New job posted successfully.' });
      }
      onClose();
    } catch (error) {
      console.error("Failed to save job:", error);
      toast({ title: 'Error', description: 'Failed to save job posting. Please try again.', variant: 'destructive' });
    }
  };
  
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="bg-navy-gradient text-white p-8 rounded-t-lg">
          <DialogTitle className="text-3xl font-bold">
            {isEditing ? 'Edit Job Posting' : 'Add New Job Posting'}
          </DialogTitle>
           <DialogDescription className="text-white/80">
            {isEditing ? `Update the details for "${job?.jobTitle}"` : "Fill in the details below to post a new position"}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="jobTitle" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Job Title *</FormLabel><FormControl><Input placeholder="e.g., Senior Full-Stack Engineer" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField name="department" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Department *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Product">Product</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                                <SelectItem value="Marketing">Marketing</SelectItem>
                                <SelectItem value="Sales">Sales</SelectItem>
                                <SelectItem value="Operations">Operations</SelectItem>
                                <SelectItem value="Customer Success">Customer Success</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="employmentType" control={form.control} render={({ field }) => (
                     <FormItem><FormLabel>Employment Type *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                           <FormControl><SelectTrigger><SelectValue placeholder="Select an employment type" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Full-Time">Full-Time</SelectItem>
                                <SelectItem value="Part-Time">Part-Time</SelectItem>
                                <SelectItem value="Contract">Contract</SelectItem>
                                <SelectItem value="Internship">Internship</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
                 <FormField name="location" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Location *</FormLabel><FormControl><Input placeholder="e.g., Remote" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <FormField name="experienceLevel" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Experience Level *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                            <FormControl><SelectTrigger><SelectValue placeholder="Select experience level" /></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Entry Level (0-2 years)">Entry Level (0-2 years)</SelectItem>
                                <SelectItem value="Mid-Level (2-5 years)">Mid-Level (2-5 years)</SelectItem>
                                <SelectItem value="Senior (5-10 years)">Senior (5-10 years)</SelectItem>
                                <SelectItem value="Lead/Principal (10+ years)">Lead/Principal (10+ years)</SelectItem>
                            </SelectContent>
                        </Select>
                    <FormMessage /></FormItem>
                )} />
                <FormField name="salaryRange" control={form.control} render={({ field }) => (
                    <FormItem><FormLabel>Salary Range (Optional)</FormLabel><FormControl><Input placeholder="e.g., $120K - $180K" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
            </div>
             <FormField name="fullDescription" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Full Job Description *</FormLabel><FormControl><Textarea placeholder="Detailed description of the role..." rows={5} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="responsibilities" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Key Responsibilities (one per line) *</FormLabel><FormControl><Textarea placeholder={"Design and implement scalable backend systems\nCollaborate with cross-functional teams"} rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="requirements" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Requirements (one per line) *</FormLabel><FormControl><Textarea placeholder={"5+ years of full-stack development\nStrong proficiency in React and Node.js"} rows={4} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="niceToHave" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>Nice to Have (Optional, one per line)</FormLabel><FormControl><Textarea placeholder={"Experience with AI/ML\nOpen source contributions"} rows={3} {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="linkedinUrl" control={form.control} render={({ field }) => (
                <FormItem><FormLabel>LinkedIn Job Application URL *</FormLabel><FormControl><Input type="url" placeholder="https://www.linkedin.com/jobs/view/..." {...field} /></FormControl><FormMessage /></FormItem>
            )} />
             <FormField name="status" control={form.control} render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                    <div className="space-y-0.5">
                        <FormLabel>Job Status *</FormLabel>
                        <p className="text-sm text-muted-foreground">{field.value ? 'Active (Visible on careers page)' : 'Inactive (Hidden from careers page)'}</p>
                    </div>
                    <FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl>
                </FormItem>
             )} />
            <DialogFooter className="pt-4 bg-gray-50 -m-8 mt-8 p-6 rounded-b-lg">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-navy-gradient">
                {form.formState.isSubmitting ? (
                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                    isEditing ? 'Save Changes' : 'Post Job'
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
