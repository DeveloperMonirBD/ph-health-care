import SpecialitiesManagementHeader from '@/components/modules/Admin/SpecialitiesManagement/SpecialitiesManagementHeader';
import RefreshButton from '@/components/modules/Shared/RefreshButton';

const AdminSpecialitiesManagementPage = () => {
    return (
        <div className="space-y-6">
            <SpecialitiesManagementHeader />
            <div className='flex'>
                <RefreshButton />
            </div>

            {/* <Suspense fallback={<TableSkeleton column={2} rows={10} />}>
                <SpecialityTable specialities={result.data} />
            </Suspense> */}
        </div>
    );
};

export default AdminSpecialitiesManagementPage;