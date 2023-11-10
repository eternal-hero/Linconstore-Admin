import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Verification from "../../Components/Admin/Verification";

const VerificationPage: NextPage = () => {
  return (
    <Dashboard>
      <Verification />
    </Dashboard>
  );
};
export default VerificationPage;
