import { DashboardSkeleton } from "@/components/modules/Shared/DashboardSkeleton";
import HeartbeatLoader from "@/components/modules/Shared/Loader";
import { ManagementPageLoading } from "@/components/modules/Shared/ManagementPageLoader";

const page = () => {
    return (
        <div>
            <DashboardSkeleton />
            <ManagementPageLoading columns={10} hasActionButton={true} filterCount={5} filterWidths={["w-48", "w-32", "w-40", "w-36"]} />
            
            <HeartbeatLoader />
        </div>
    );
};

export default page;