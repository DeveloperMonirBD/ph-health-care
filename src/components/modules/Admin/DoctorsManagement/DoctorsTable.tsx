'use client';
import { IDoctor } from '@/services/types/doctor.interface';
import { DoctorsColumns } from './DoctorsColumns';
import DeleteConfirmationDialog from '../../Shared/DeleteConformationDialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState, useTransition } from 'react';
import ManagementTable from '../../Shared/ManagementTable';
import { softDeleteDoctor } from '@/services/admin/doctorManagement';
import DoctorFormDialog from './DoctorFormDialog';
import DoctorViewDetailDialog from './DoctorViewDetailDialog';
import { ISpecialty } from '@/services/types/specialities.interface';

interface DoctorTableProps {
    doctors: IDoctor[];
    specialities: ISpecialty[];
}
const DoctorsTable = ({ doctors, specialities }: DoctorTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
    const [viewingDoctor, setViewingDoctor] = useState<IDoctor | null>(null);
    const [editingDoctor, setEditingDoctor] = useState<IDoctor | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleView = (doctor: IDoctor) => {
        setViewingDoctor(doctor);
    };

    const handleEdit = (doctor: IDoctor) => {
        setEditingDoctor(doctor);
    };

    const handleDelete = (doctor: IDoctor) => {
        setDeletingDoctor(doctor);
    };

    const confirmDelete = async () => {
        if (!deletingDoctor) return;

        setIsDeleting(true);
        const result = await softDeleteDoctor(deletingDoctor.id!);
        setIsDeleting(false);

        if (result.success) {
            toast.success(result.message || 'Doctor deleted successfully');
            setDeletingDoctor(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete speciality');
        }
    };

    return (
        <div className='min-h-[600px]'>
            <ManagementTable data={doctors} columns={DoctorsColumns} onView={handleView} onEdit={handleEdit} onDelete={handleDelete} getRowKey={doctor => doctor.id!} emptyMessage="No doctors found" />

            {/* Edit Doctor Form Dialog */}
            <DoctorFormDialog
                open={!!editingDoctor}
                onClose={() => setEditingDoctor(null)}
                doctor={editingDoctor!}
                specialities={specialities}
                onSuccess={() => {
                    setEditingDoctor(null);
                    handleRefresh();
                }}
            />

            {/* View Doctor Detail Dialog */}
            <DoctorViewDetailDialog open={!!viewingDoctor} onClose={() => setViewingDoctor(null)} doctor={viewingDoctor} />

            {/* Delete conformationDialog  */}
            <DeleteConfirmationDialog
                open={!!deletingDoctor}
                onOpenChange={open => !open && setDeletingDoctor(null)}
                onConfirm={confirmDelete}
                title="Delete Doctor"
                description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
        </div>
    );
};

export default DoctorsTable;
