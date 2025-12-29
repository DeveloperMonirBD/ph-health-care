'use client';
import { ISpecialty } from '@/services/types/specialities.interface';
import ManagementTable from '../../Shared/ManagementTable';
import DeleteConformationDialog from '../../Shared/DeleteConformationDialog';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { deleteSpeciality } from '@/services/admin/specialitiesManagement';
import { toast } from 'sonner';
import { SpecialitiesColumns } from './SpecialitiesColumn';

interface SpecialityTableProps {
    specialities: ISpecialty[];
}

const SpecialitiesTable = ({ specialities }: SpecialityTableProps) => {
    const router = useRouter();
    const [, startTransition] = useTransition();
    const [deletingSpeciality, setDeletingSpeciality] = useState<ISpecialty | null>(null);
    const [isDeletingDialog, setIsDeletingDialog] = useState(false);

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    const handleDelete = (speciality: ISpecialty) => {
        setDeletingSpeciality(speciality);
    };

    const confirmDelete = async () => {
        if (!deletingSpeciality) return;

        setIsDeletingDialog(true);
        const result = await deleteSpeciality(deletingSpeciality.id);
        setIsDeletingDialog(false);

        if (result.success) {
            toast.success(result.message || 'Speciality deleted successfully');
            setDeletingSpeciality(null);
            handleRefresh();
        } else {
            toast.error(result.message || 'Failed to delete speciality');
        }
    };

    return (
        <>
            <ManagementTable data={specialities} columns={SpecialitiesColumns} onDelete={handleDelete} getRowKey={speciatity => speciatity.id} emptyMessage="No specialities found" />

            {/* Delete conformation Dialog  */}
            <DeleteConformationDialog
                open={!!deletingSpeciality}
                onOpenChange={open => !open && setDeletingSpeciality(null)}
                onConfirm={confirmDelete}
                title="Delete Speciality"
                description={`Are you sure you want to delete ${deletingSpeciality?.title}? This Action cannot be undone.`}
                isDeleting={isDeletingDialog}
            />
        </>
    );
};

export default SpecialitiesTable;
