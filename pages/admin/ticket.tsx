import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Ticket from "../../Components/Admin/Ticket";

const ProductPage: NextPage = () => {
  return (
    <Dashboard>
      <Ticket />
    </Dashboard>
  );
};
export default ProductPage;
