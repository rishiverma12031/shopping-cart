
export const productData = fetch('./assets/products.json')
    .then(response => response.json())
    .then((data) => data.products)
    .catch(error => console.error(error));
