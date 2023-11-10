import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Orders from "../../Components/Admin/Orders";

const ProductPage: NextPage = () => {
  return (
    <Dashboard>
      <Orders />
    </Dashboard>
  );
};
export default ProductPage;
