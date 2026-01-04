"use client"
import { IDoctor } from "@/services/types/doctor.interface";
import { DoctorsColumns } from "./DoctorsColumns";
import DeleteConfirmationDialog from "../../Shared/DeleteConformationDialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import ManagementTable from "../../Shared/ManagementTable";
import { softDeleteDoctor } from "@/services/admin/doctorManagement";

interface DoctorTableProps  {
    doctors: IDoctor[];
}

const DoctorsTable = ({ doctors }: DoctorTableProps) => {
   const router = useRouter();
   const [, startTransition] = useTransition();
   const [deletingDoctor, setDeletingDoctor] = useState<IDoctor | null>(null);
   const [isDeleting, setIsDeleting] = useState(false);

   const handleRefresh = () => {
       startTransition(() => {
           router.refresh();
       });
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
        <>
            <ManagementTable
                data={doctors}
                columns={DoctorsColumns}
                onView={() => {}}
                onEdit={() => {}}
                onDelete={(doctor) => doctor.id}
                getRowKey={(doctor) => doctor.id!}
                emptyMessage="No doctors found"
            />

            {/* Delete conformationDialog  */}
            <DeleteConfirmationDialog
                open={!!deletingDoctor}
                onOpenChange={(open) => !open && setDeletingDoctor(null)}
                onConfirm={confirmDelete}
                title="Delete Doctor"
                description={`Are you sure you want to delete ${deletingDoctor?.name}? This action cannot be undone.`}
                isDeleting={isDeleting}
            />
            
        </>
    );
};

export default DoctorsTable;