import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./CreateProductPage.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProductInformation from "../../../components/Admin/AddProduct/ProductInformation/ProductInformation";
function CreateProductPage() {
  return (
    <main className="create-product-page">
      <section className="title">
        <FontAwesomeIcon icon={faPlus} />
        <a href="/admin/products/create">Add a new product</a>
      </section>
      <ProductInformation />
    </main>
  );
}

export default CreateProductPage;
