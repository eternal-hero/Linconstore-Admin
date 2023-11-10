import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Users from "../../Components/Admin/Users";

const UserPage: NextPage = () => {
  return (
    <Dashboard>
      <Users />
    </Dashboard>
  );
};
export default UserPage;
