import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Sellers from "../../Components/Admin/Sellers";

const SellersPage: NextPage = () => {
  return (
    <Dashboard>
      <Sellers />
    </Dashboard>
  );
};
export default SellersPage;
