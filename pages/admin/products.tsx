import { NextPage } from "next";
import Dashboard from "../../Components/Layouts/Admin/Dashboard";
import Products from "../../Components/Admin/Products";

const ProductPage: NextPage = () => {
  return (
    <Dashboard>
      <Products />
    </Dashboard>
  );
};
export default ProductPage;
