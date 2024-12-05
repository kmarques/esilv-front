export function findAll(filters = {}) {
  const products = JSON.parse(localStorage.getItem("products")) || [];
  // Apply filters if any
  return Promise.resolve(
    products.filter((product) => {
      return Object.keys(filters).every((key) => product[key] === filters[key]);
    })
  );
}

export function deleteProduct(item) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.filter((product) => product.id !== item.id);
  localStorage.setItem("products", JSON.stringify(products));
  return Promise.resolve();
}

export function editProduct(item, newValues) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  products = products.map((product) =>
    product.id === item.id ? { ...product, ...newValues } : product
  );
  localStorage.setItem("products", JSON.stringify(products));
  return Promise.resolve(newValues);
}

export function addProduct(newValues) {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const newProduct = { ...newValues, id: Date.now() }; // Generate a simple unique ID
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  return Promise.resolve(newProduct);
}
