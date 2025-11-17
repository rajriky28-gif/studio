'use client';

import { useState, useMemo } from 'react';
import { useCollection, useFirebase } from '@/firebase';
import { collection, query, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { MoreHorizontal, Trash2, Edit, AlertCircle, BookOpen } from 'lucide-react';
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

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage: string;
  tags: string[];
  metaDescription: string;
  status: 'published' | 'draft' | 'scheduled';
  featured: boolean;
  publishedAt: { toDate: () => Date };
  scheduledFor?: { toDate: () => Date };
  createdAt: { toDate: () => Date };
  updatedAt: { toDate: () => Date };
  createdBy: string;
}


function PostsTableSkeleton() {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Published Date</TableHead>
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
              <TableCell><Skeleton className="h-6 w-20 rounded-full" /></TableCell>
              <TableCell className="text-right"><Skeleton className="h-8 w-8 rounded-md" /></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function PostsTable({ onEditPost }: { onEditPost: (post: BlogPost) => void }) {
    const { firestore } = useFirebase();
    const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
    const { toast } = useToast();

    const postsQuery = useMemo(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'blog_posts'), orderBy('createdAt', 'desc'));
    }, [firestore]);

    const { data: posts, isLoading } = useCollection<BlogPost>(postsQuery);

    const handleDelete = async () => {
        if (!postToDelete || !firestore) return;

        try {
            await deleteDoc(doc(firestore, 'blog_posts', postToDelete.id));
            toast({
                title: 'Success',
                description: 'Blog post deleted successfully.',
                variant: 'default',
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to delete blog post.',
                variant: 'destructive',
            });
        } finally {
            setPostToDelete(null);
        }
    };

    if (isLoading) {
      return <PostsTableSkeleton />;
    }

    if (!posts || posts.length === 0) {
        return (
            <div className="text-center py-16 px-6 bg-white rounded-2xl border border-dashed">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4"/>
                <h3 className="text-xl font-medium text-gray-800">No blog posts yet</h3>
                <p className="text-gray-500 mt-2">Click "New Post" to write your first article.</p>
            </div>
        );
    }

    const getStatusBadge = (status: BlogPost['status']) => {
        switch(status) {
            case 'published': return <Badge className="bg-green-100 text-green-800">Published</Badge>;
            case 'draft': return <Badge variant="secondary">Draft</Badge>;
            case 'scheduled': return <Badge className="bg-blue-100 text-blue-800">Scheduled</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    }

    return (
        <>
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[30%]">Title</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Author</TableHead>
                            <TableHead>Published Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.map((post) => (
                            <TableRow key={post.id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{post.category}</TableCell>
                                <TableCell>{post.author}</TableCell>
                                <TableCell>
                                    {post.publishedAt && typeof post.publishedAt.toDate === 'function'
                                        ? format(post.publishedAt.toDate(), 'MMM d, yyyy')
                                        : 'N/A'}
                                </TableCell>
                                <TableCell>
                                    {getStatusBadge(post.status)}
                                </TableCell>
                                <TableCell className="text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem onClick={() => onEditPost(post)}>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => setPostToDelete(post)} className="text-red-600 focus:text-red-600">
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

            <AlertDialog open={!!postToDelete} onOpenChange={(isOpen) => !isOpen && setPostToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                          <AlertCircle className="text-red-500"/> Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete the post "{postToDelete?.title}". This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">Delete Post</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
