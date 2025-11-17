
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { JobFormModal } from './job-form-modal';
import { JobsTable } from './jobs-table';
import { Job } from '@/components/sections/careers/job-card';

export default function AdminDashboard() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<Job | null>(null);

    const handleAddNewJob = () => {
        setEditingJob(null);
        setIsModalOpen(true);
    };

    const handleEditJob = (job: Job) => {
        setEditingJob(job);
        setIsModalOpen(true);
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setEditingJob(null);
    };

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-navy">Manage Job Postings</h1>
                    <p className="text-gray-600 mt-1">Add, edit, or remove job listings from the careers page.</p>
                </div>
                <Button 
                    onClick={handleAddNewJob} 
                    className="bg-cyan hover:bg-cyan/90 h-auto px-8 py-3 text-base font-semibold shadow-lg shadow-cyan/30 transition-all duration-300 hover:-translate-y-0.5"
                >
                    <Plus className="mr-2 h-5 w-5"/>
                    Add New Job
                </Button>
            </div>

            <JobsTable onEditJob={handleEditJob} />
            
            <JobFormModal 
                isOpen={isModalOpen} 
                onClose={handleModalClose}
                job={editingJob}
            />
        </div>
    );
}
