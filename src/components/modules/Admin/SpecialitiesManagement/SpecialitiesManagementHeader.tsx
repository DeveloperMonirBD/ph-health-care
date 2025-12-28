'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import ManagementPageHeader from '../../Shared/ManagementPageHeader';
import SpecialitiesFormDialog from './SpecialitiesFormDialog';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import RefreshButton from '../../Shared/RefreshButton';

const SpecialitiesManagementHeader = () => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <>
            <SpecialitiesFormDialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} onSuccess={handleSuccess} />

            <ManagementPageHeader
                title="Specialties Management"
                description="Manage Specialties information and details"
                action={{
                    label: 'Add Specialty',
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true)
                }} />
        </>
    );
};

export default SpecialitiesManagementHeader;
