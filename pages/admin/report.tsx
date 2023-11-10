import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Report from "../../Components/Admin/Report";

const ReportPage: NextPage = () => {
  return (
    <Dashboard>
      <Report />
    </Dashboard>
  );
};
export default ReportPage;
