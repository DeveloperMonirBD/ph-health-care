import PublicNavbar from "@/components/modules/shared/PublicNavbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div>
            <>
                <PublicNavbar />
                {children}
            </>
        </div>
    );
};

export default CommonLayout;
