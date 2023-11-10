import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Transaction from "../../Components/Admin/Transaction";

const ProductPage: NextPage = () => {
  return (
    <Dashboard>
      <Transaction />
    </Dashboard>
  );
};
export default ProductPage;
