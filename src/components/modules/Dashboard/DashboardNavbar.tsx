
import { UserInfo } from '@/services/types/user.interface';
import DashboardNavbarContent from './DashboardNavbarContent';
import { getUserInfo } from '@/services/auth/getUserInfo';

const DashboardNavbar = async () => {
    const userInfo = (await getUserInfo()) as UserInfo;

    return (
        <div>
            <DashboardNavbarContent userInfo={userInfo} />
        </div>
    );
};


export default DashboardNavbar;