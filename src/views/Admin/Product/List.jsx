/**
 * CRUD Products
 * Ajouter la possibilité de créer un nouveau product
 * Ajouter la possibilité de modifier un product
 * Ajouter la possibilité de supprimer un product
 */

import { useContext } from "react";
import Table from "../../../components/Table";
import Button from "../../../components/Button";
import { ProductContext } from "../../../contexts/ProductProvider";
import { useNavigate } from "react-router";

export default function ProductList() {
  const { getData, deleteProduct, editProduct, addProduct } =
    useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <>
      <h1>Liste des produits</h1>
      <Button onClick={() => navigate("/admin/products/create")}>
        Create product
      </Button>
      <Table
        getData={getData}
        onDelete={deleteProduct}
        onEdit={editProduct}
        onAdd={addProduct}
      />
    </>
  );
}
