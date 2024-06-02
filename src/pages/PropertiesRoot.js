import { Outlet } from "react-router-dom";
import PropertiesNavigation from "../components/PropertiesNavigation";

const PropertiesRootLayout = () => {
    return (
        <>
            <PropertiesNavigation />
            <Outlet />
        </>
    )
}

export default PropertiesRootLayout;