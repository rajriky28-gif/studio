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
  DialogDescription,
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
import { useEffect, useState } from 'react';
import { BlogPost } from './posts-table';
import { Loader2, UploadCloud } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const postSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters.').max(100, 'Title cannot exceed 100 characters.'),
  slug: z.string().min(1, 'Slug is required.').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase and contain only letters, numbers, and hyphens.'),
  excerpt: z.string().min(50, 'Excerpt must be at least 50 characters.').max(200, 'Excerpt cannot exceed 200 characters.'),
  category: z.string().min(1, 'Category is required.'),
  author: z.string().min(1, 'Author is required.'),
  content: z.string().min(300, 'Content must be at least 300 characters.'),
  metaDescription: z.string().max(160, 'Meta description cannot exceed 160 characters.').optional(),
  status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
  // featuredImage, tags are handled separately
});

type PostFormValues = z.infer<typeof postSchema>;

interface BlogPostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: BlogPost | null;
}

// Mock Rich Text Editor
const RichTextEditor = ({ value, onChange, ...props }: {value: string, onChange: (value: string) => void}) => (
    <Textarea 
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={15}
        {...props}
    />
)

export function BlogPostFormModal({ isOpen, onClose, post }: BlogPostFormModalProps) {
  const { firestore, user } = useFirebase();
  const { toast } = useToast();
  const isEditing = !!post;
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(postSchema),
    mode: 'onTouched',
    defaultValues: {
      title: '', slug: '', excerpt: '', category: '', author: '', content: '',
      metaDescription: '', status: 'draft', featured: false, publishedAt: new Date(),
    }
  });

  const slugify = (str: string) => str.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  const titleValue = form.watch('title');
  useEffect(() => {
    if (titleValue && !form.formState.dirtyFields.slug) {
      form.setValue('slug', slugify(titleValue), { shouldValidate: true });
    }
  }, [titleValue, form]);
  

  useEffect(() => {
    if (post) {
      form.reset({
        ...post,
        publishedAt: post.publishedAt?.toDate() || new Date(),
      });
      // setFeaturedImage from URL if editing - simplified
    } else {
      form.reset({
        title: '', slug: '', excerpt: '', category: '', author: user?.displayName || 'Lumivex Team', content: '',
        metaDescription: '', status: 'draft', featured: false, publishedAt: new Date(),
      });
      setFeaturedImage(null);
    }
  }, [post, form, isOpen, user]);

  const onSubmit = async (values: PostFormValues) => {
    if (!firestore || !user) return;
    
    // In a real app, upload featuredImage to Firebase Storage and get URL
    const imageUrl = post?.featuredImage || 'https://picsum.photos/seed/blog/1200/630';

    const postData: Partial<BlogPost> = {
      ...values,
      featuredImage: imageUrl,
      updatedAt: serverTimestamp() as any,
    };
    
    if (values.status === 'published' && (!isEditing || post.status !== 'published')) {
        postData.publishedAt = serverTimestamp() as any;
    } else if (values.status === 'scheduled') {
        postData.scheduledFor = values.publishedAt;
    }

    try {
      if (isEditing && post) {
        const postRef = doc(firestore, 'blog_posts', post.id);
        await updateDoc(postRef, postData);
        toast({ title: 'Success', description: 'Blog post updated successfully.' });
      } else {
        const postsCollection = collection(firestore, 'blog_posts');
        await addDoc(postsCollection, {
          ...postData,
          createdAt: serverTimestamp(),
          createdBy: user.email,
        });
        toast({ title: 'Success', description: 'New blog post created successfully.' });
      }
      onClose();
    } catch (error) {
      console.error("Failed to save blog post:", error);
      toast({ title: 'Error', description: 'Failed to save blog post. Please try again.', variant: 'destructive' });
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
      <DialogContent className="max-w-5xl h-[95vh] flex flex-col p-0">
        <DialogHeader className="bg-navy text-white p-6 rounded-t-lg">
          <DialogTitle className="text-2xl font-bold">{isEditing ? 'Edit Blog Post' : 'Create New Post'}</DialogTitle>
           <DialogDescription className="text-white/80">{isEditing ? `Editing "${post?.title}"` : "Fill in the details below to create a new article"}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex-grow overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 p-6">
                <div className='space-y-6'>
                    <FormField name="title" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Post Title *</FormLabel><FormControl><Input placeholder="e.g., Introducing Lumivex 2.0: What's New" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="slug" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>URL Slug *</FormLabel><FormControl><Input placeholder="introducing-lumivex-2-0" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField name="excerpt" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Excerpt / Summary *</FormLabel><FormControl><Textarea rows={4} placeholder="Brief summary for post cards (1-2 sentences)" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField name="content" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Post Content *</FormLabel><FormControl><RichTextEditor {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <div className='space-y-6 lg:border-l lg:pl-6'>
                    <FormField name="status" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Status *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue/></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="draft">Draft</SelectItem>
                                <SelectItem value="published">Published</SelectItem>
                                <SelectItem value="scheduled">Scheduled</SelectItem>
                            </SelectContent>
                        </Select>
                        <FormMessage /></FormItem>
                    )} />

                    {form.watch('status') === 'scheduled' && (
                         <FormField control={form.control} name="publishedAt" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Publish Date</FormLabel>
                                <Popover><PopoverTrigger asChild>
                                    <FormControl><Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>{field.value ? format(field.value, "PPP") : <span>Pick a date</span>}</Button></FormControl>
                                </PopoverTrigger><PopoverContent className="w-auto p-0" align="start"><Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus /></PopoverContent></Popover>
                            <FormMessage /></FormItem>
                        )}/>
                    )}

                    <FormField name="category" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Category *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select a category..."/></SelectTrigger></FormControl>
                            <SelectContent>
                                <SelectItem value="Product Updates">Product Updates</SelectItem>
                                <SelectItem value="AI & Technology">AI & Technology</SelectItem>
                                <SelectItem value="Company News">Company News</SelectItem>
                                <SelectItem value="Tutorials">Tutorials</SelectItem>
                            </SelectContent>
                        </Select><FormMessage /></FormItem>
                    )} />

                     <FormField name="author" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Author *</FormLabel><FormControl><Input placeholder="e.g., Riky Raj" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />

                    <FormItem>
                        <FormLabel>Featured Image *</FormLabel>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-2 text-gray-500" />
                                    <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500">PNG, JPG or WEBP (MAX. 2MB)</p>
                                </div>
                                <Input id="dropzone-file" type="file" className="hidden" onChange={e => setFeaturedImage(e.target.files?.[0] || null)} />
                            </label>
                        </div> 
                        {featuredImage && <p className='text-sm text-gray-600 mt-2'>Selected: {featuredImage.name}</p>}
                    </FormItem>

                    <FormField control={form.control} name="featured" render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm"><div className="space-y-0.5"><FormLabel>Mark as Featured Post</FormLabel></div><FormControl><Switch checked={field.value} onCheckedChange={field.onChange} /></FormControl></FormItem>
                     )} />
                    
                    <FormField name="metaDescription" control={form.control} render={({ field }) => (
                        <FormItem><FormLabel>Meta Description (SEO)</FormLabel><FormControl><Textarea rows={3} placeholder="Description for search engines (150-160 characters)" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
            </div>
            <DialogFooter className="sticky bottom-0 bg-gray-50 p-6 rounded-b-lg border-t mt-auto">
              <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
              <Button type="submit" disabled={form.formState.isSubmitting} className="bg-navy-gradient">
                {form.formState.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...</> : (isEditing ? 'Save Changes' : 'Create Post')}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}