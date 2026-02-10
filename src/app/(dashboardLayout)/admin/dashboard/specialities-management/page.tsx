import SpecialitiesManagementHeader from '@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader';
import SpecialitiesTable from '@/components/modules/Admin/SpecialitiesManagement/SpecialitiesTable';
import RefreshButton from '@/components/modules/Shared/RefreshButton';
import { TableSkeleton } from '@/components/modules/Shared/TableSkeleton';
import { getSpecialities } from '@/services/admin/specialitiesManagement';
import { Suspense } from 'react';

const AdminSpecialitiesManagementPage = async() => {
    const result = await getSpecialities();

    return (
        <div className="space-y-6">
            <SpecialitiesManagementHeader />

            <div className="flex">
                <RefreshButton />
            </div>

            <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialitiesTable specialities={result.data} />
            </Suspense>
        </div>
    );
};

export default AdminSpecialitiesManagementPage;