'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { BlogPostFormModal } from './post-form-modal';
import { PostsTable, BlogPost } from './posts-table';

export default function BlogDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

    const handleAddNewPost = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    const handleEditPost = (post: BlogPost) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingPost(null);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Blog Posts</h1>
                    <p className="text-gray-600 mt-1">Manage articles for lumivex.com/blog</p>
                </div>
                <Button 
                    onClick={handleAddNewPost} 
                    className="bg-cyan hover:bg-cyan/90 h-auto px-8 py-3 text-base font-semibold shadow-lg shadow-cyan/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                    <Plus className="mr-2 h-5 w-5"/>
                    New Post
                </Button>
            </div>

            <PostsTable onEditPost={handleEditPost} />
            
            <BlogPostFormModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose}
                post={editingPost}
            />
        </div>
    );
}