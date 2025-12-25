import PublicFooter from "@/components/modules/Shared/PublicFooter";
import PublicNavbar from "@/components/modules/Shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <>
                <PublicNavbar />
                {children}
                <PublicFooter />
            </>
        </div>
    );
};

export default CommonLayout;
