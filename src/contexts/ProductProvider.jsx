import { createContext, useEffect, useState } from "react";
import * as ProductActions from "./actions/product-actions-mock";
import useNotify from "../hooks/useNotify";
export const ProductContext = createContext();

export default function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const notify = useNotify();

  useEffect(() => {
    /* simule de la lenteur*/ setTimeout(() => {
      findAll();
    }, 2000);
  }, []);

  function findAll(filters = {}) {
    setLoading(true);
    return ProductActions.findAll(filters).then(
      (data) => setProducts(data) || setLoading(false)
    );
  }

  function deleteProduct(item) {
    return ProductActions.deleteProduct(item).then(() => {
      setProducts(products.filter((product) => product.id !== item.id));
      notify("success", `Product #${item.id} has been deleted`);
    });
  }

  function editProduct(item, newValues) {
    return ProductActions.editProduct(item, newValues).then(
      (data) =>
        setProducts(
          products.map((product) => (product.id === item.id ? data : product))
        ) ||
        setLoading(false) ||
        notify("success", `Product #${item.id} has been updated`)
    );
  }

  function addProduct(newValues) {
    return ProductActions.addProduct(newValues).then((newProduct) => {
      setProducts([...products, newProduct]);
      setLoading(false);
      notify("success", `Product #${newProduct.id} has been created`);
    });
  }

  function getData() {
    return products.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }

  if (loading) return <h1>Loading...</h1>;

  return (
    <ProductContext.Provider
      value={{ getData, addProduct, editProduct, deleteProduct, findAll }}
    >
      {children}
    </ProductContext.Provider>
  );
}
