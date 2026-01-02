import DoctorsManagementHeader from '@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader';
import RefreshButton from '@/components/modules/Shared/RefreshButton';
import SearchFilter from '@/components/modules/Shared/SearchFilter';
import SelectFilter from '@/components/modules/Shared/selectFilter';
import { getSpecialities } from '@/services/admin/specialitiesManagement';
import { ISpecialty } from '@/services/types/specialities.interface';


const AdminDoctorsManagementPage = async () => {
    const specialitiesResult = await getSpecialities();
    console.log(specialitiesResult);

    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialities={specialitiesResult.data} />

            <div className="flex space-x-2">
                <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
                <SelectFilter
                    paramName="speciality" // ?speciality="Cardiology"
                    options={specialitiesResult.data.map((speciality: ISpecialty) => ({
                        label: speciality.title,
                        value: speciality.title
                        // value: String(speciality.id)
                    }))}
                    placeholder="Filter by speciality"
                />
                <RefreshButton />
            </div>

            {/* <Suspense fallback={<TableSkeleton columns={2} rows={10} />}>
                <SpecialitiesTable specialities={specialitiesResult.data} />
            </Suspense> */}
        </div>
    );
};

export default AdminDoctorsManagementPage;
