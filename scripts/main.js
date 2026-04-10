const productList = document.querySelector('.product-list');

fetch('./assets/products.json')
    .then(response => response.json())
    .then(data => displayProducts(data))
    .catch(error => console.error(error));

const displayProducts = ({products}) => {
    products.forEach(({name, price, category, image, stock}) => {
        const card = document.createElement('li');
        
        const productName = document.createElement('p');
        productName.textContent = name;

        const productPrice = document.createElement('p');
        productPrice.textContent = price;

        const productCategory = document.createElement('p');
        productCategory.textContent = category;

        const productImage = document.createElement('img');
        productImage.setAttribute('src', image);
        productImage.setAttribute('alt', `Image of ${name}`);

        const productStock = document.createElement('p');
        productStock.textContent = stock;
        
        card.append(productName, productPrice, productCategory, productImage, productStock);
        productList.append(card);
        
    });
}