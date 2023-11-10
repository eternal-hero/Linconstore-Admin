import {NextPage} from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Refund from "../../Components/Admin/Refund";

const RefundPage : NextPage  = () => {
    return <Dashboard><Refund/></Dashboard>
}
export default RefundPage;