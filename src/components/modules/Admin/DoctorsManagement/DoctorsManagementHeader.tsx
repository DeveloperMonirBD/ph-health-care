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

    return (
        <>
            <DoctorFormDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onSuccess={handleSuccess}
                doctor={doctor}
                specialities={specialities}
            />

            <ManagementPageHeader
                title="Doctors Management"
                description="Manage Doctors information and details"
                action={{
                    label: 'Add Doctor',
                    icon: Plus,
                    onClick: () => setIsDialogOpen(true)
                }}
            />
        </>
    );
};

export default DoctorsManagementHeader;
