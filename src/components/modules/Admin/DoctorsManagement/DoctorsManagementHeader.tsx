'use client';

import { Plus } from 'lucide-react';
import ManagementPageHeader from '../../Shared/ManagementPageHeader';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import DoctorFormDialog from './DoctorFormDialog';
import { IDoctor } from '@/services/types/doctor.interface';
import { ISpecialty } from '@/services/types/specialities.interface';

interface DoctorsManagementHeaderProps {
    doctor?: IDoctor;
    specialities?: ISpecialty[]
}

const DoctorsManagementHeader = ({doctor, specialities}: DoctorsManagementHeaderProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleSuccess = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    // form reset
    const [dialogKey, setDialogKey] = useState(0);

    const handleOpenDialog = () => {
        setDialogKey((prev) => prev + 1); // Forse remount
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    }

    return (
        <>
            <DoctorFormDialog key={dialogKey} open={isDialogOpen} onClose={handleCloseDialog} onSuccess={handleSuccess} doctor={doctor} specialities={specialities} />

            <ManagementPageHeader
                title="Doctors Management"
                description="Manage Doctors information and details"
                action={{
                    label: 'Add Doctor',
                    icon: Plus,
                    onClick: handleOpenDialog
                }}
            />
        </>
    );
};

export default DoctorsManagementHeader;
