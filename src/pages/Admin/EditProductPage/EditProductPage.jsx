import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import ProductInformation from "../../../components/Admin/EditProduct/ProductInformation/ProductInformation";

function EditProductPage() {
  return (
    <main className="edit-product-page">
      <section className="title">
        <FontAwesomeIcon icon={faPenSquare} />
        <a href="/admin/products/edit">Edit a new product</a>
      </section>
      <ProductInformation />
    </main>
  );
}

export default EditProductPage;
