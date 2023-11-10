import {NextPage} from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Messages from "../../Components/Admin/Messages";

const MessagePage : NextPage = () => {

    return <Dashboard><Messages/></Dashboard>
}
export default MessagePage;