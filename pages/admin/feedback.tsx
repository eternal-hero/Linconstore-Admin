import {NextPage} from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Feedback from "../../Components/Admin/Feedback";

const FeedbackPage : NextPage = () => {
        return <Dashboard><Feedback/></Dashboard>

}
export default FeedbackPage;