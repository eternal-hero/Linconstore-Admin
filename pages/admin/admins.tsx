import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Admin from "../../Components/Admin/Admins";

const AdminPages: NextPage = () => {
  return (
    <Dashboard>
      <Admin />
    </Dashboard>
  );
};
export default AdminPages;
