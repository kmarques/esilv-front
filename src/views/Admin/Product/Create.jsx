import { useContext } from "react";
import Button from "../../../components/Button";
import { ProductContext } from "../../../contexts/ProductProvider";
import useNotify from "../../../hooks/useNotify";
import { useNavigate } from "react-router";

export default function ProductCreate() {
  const { addProduct } = useContext(ProductContext);
  const notify = useNotify();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    addProduct(data)
      .then(() => notify("success", "Product created"))
      .then(() => navigate("/admin/products"));
  }

  return (
    <>
      <h1>Create a product</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="name" />
        <Button type="submit">Enregistrer</Button>
      </form>
    </>
  );
}
