import {NextPage} from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import DashboardAdmin from "../../Components/Admin/Dashboard";

const DashboardPAge : NextPage = () => {
    return <Dashboard><DashboardAdmin/> </Dashboard>

}
export default DashboardPAge;