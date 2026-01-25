import DoctorsManagementHeader from '@/components/modules/Admin/DoctorsManagement/DoctorsManagementHeader';
import DoctorsTable from '@/components/modules/Admin/DoctorsManagement/DoctorsTable';
import RefreshButton from '@/components/modules/Shared/RefreshButton';
import SearchFilter from '@/components/modules/Shared/SearchFilter';
import SelectFilter from '@/components/modules/Shared/selectFilter';
import TablePagination from '@/components/modules/Shared/TablePagination';
import { TableSkeleton } from '@/components/modules/Shared/TableSkeleton';
import { queryStringFormatter } from '@/lib/formatters';
import { getDoctors } from '@/services/admin/doctorManagement';
import { getSpecialities } from '@/services/admin/specialitiesManagement';
import { ISpecialty } from '@/services/types/specialities.interface';
import { Suspense } from 'react';

const AdminDoctorsManagementPage = async ({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) => {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "John", speciality: "Cardiology" => "?searchTerm=John&speciality=Cardiology"}

    const specialitiesResult = await getSpecialities();
    const doctorsResult = await getDoctors(queryString);
    const totalPages = Math.ceil(doctorsResult.meta.total / doctorsResult.meta.limit);

    console.log({ totalPages });

    return (
        <div className="space-y-6">
            <DoctorsManagementHeader specialities={specialitiesResult?.data || []} />

            <div className="flex space-x-2">
                <SearchFilter paramName="searchTerm" placeholder="Search doctors..." />
                <SelectFilter
                    paramName="speciality" // ?speciality="Cardiology"
                    options={specialitiesResult?.data?.map((speciality: ISpecialty) => ({
                        label: speciality.title,
                        value: speciality.title
                        // value: String(speciality.id)
                    }))}
                    placeholder="Filter by speciality"
                />
                <RefreshButton />
            </div>

            <Suspense fallback={<TableSkeleton columns={10} rows={10} />}>
                <DoctorsTable doctors={doctorsResult.data} specialities={specialitiesResult?.data || {}} />
                <TablePagination currentPage={doctorsResult.meta.page} totalPages={totalPages} />
            </Suspense>
        </div>
    );
};

export default AdminDoctorsManagementPage;
