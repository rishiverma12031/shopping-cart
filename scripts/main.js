const productList = document.querySelector('.products__list');
const cartList = document.querySelector('.cart');

fetch('./assets/products.json')
    .then(response => response.json())
    .then((data) => {
        displayProducts(data);
        addToCartClickHandler(data);
    })
    .catch(error => console.error(error));

// displayProducts(data);
// addToCartClickHandler(data);

const displayProducts = ({products}) => {
    products.forEach(({id, name, price, category, image, stock}) => {

        const productCard = document.createElement('article');
        productCard.dataset.id = id;
        
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

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent= "Add to cart";
        addToCartBtn.classList.add('productCard__button')
        
        productCard.append(productName, productPrice, productCategory, productImage, productStock, addToCartBtn);
        productList.append(productCard);

    });
}

const addToCartClickHandler = ({products}) => {

    productList.addEventListener('click', e => {

        if(!e.target.classList.contains('productCard__button')) return;

        const temp = e.target.closest('article');

        const product = products.find(product => product.id === Number(temp.dataset.id));
        
        addItemToCart(product, products);

    })

}

let cart = [];

const addItemToCart = ({id}, products) => {

    if (cart.find(product => product.id === id)) updateItemInCart(id, products);

    else {

        cart.push({id:id, quantity: 1});

        renderCart(products);
    }
}

const updateItemInCart = (id, products)=> {

    cart.find(product => product.id === id).quantity++;
    renderCart(products)

}

const renderCart = (products) => {

    cartList.innerHTML = "";

    cart.forEach(({id, quantity}) => {
        
        const {name, price} = products.find(product => product.id === id);

        const cartItem = document.createElement('li');

        const itemName = document.createElement('p');
        itemName.textContent = name;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = price;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = quantity;

        cartItem.append(itemName, itemPrice, itemQuantity);
        cartList.append(cartItem);

    });
}