import { useContext } from "react";
import { ProductContext } from "../contexts/ProductProvider";

export default function Home() {
  const { getData } = useContext(ProductContext);
  return (
    <div>
      <h1>Home</h1>
      <ul>
        {getData()
          .slice(0, 10)
          .map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
      </ul>
    </div>
  );
}
