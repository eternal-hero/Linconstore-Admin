import {NextPage} from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Ratings from "../../Components/Admin/Ratings";

const RatingsPage : NextPage = () => {
    return <Dashboard><Ratings/></Dashboard>

}
export default RatingsPage;