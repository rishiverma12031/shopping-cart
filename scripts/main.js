const productList = document.querySelector('.products__list');
const cartList = document.querySelector('.cart');

fetch('./assets/products.json')
    .then(response => response.json())
    .then((data) => {
        displayProducts(data);
        addToCartClickHandler(data);
        cartClickHandler(data);
        const products = data.products;
        renderCart(products);
    })
    .catch(error => console.error(error));

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
        addToCartBtn.classList.add('productCard__button');
        
        productCard.append(productName, productPrice, productCategory, productImage, productStock, addToCartBtn);
        productList.append(productCard);

    });

};

const addToCartClickHandler = ({products}) => {

    productList.addEventListener('click', e => {

        if(!e.target.classList.contains('productCard__button')) return;

        const productCard = e.target.closest('article');

        const product = products.find(product => product.id === Number(productCard.dataset.id));
        
        addItemToCart(product, products);

        saveCart(cart);

    });

};

const loadCart = () => {

    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [] ;

};

let cart = loadCart();

const saveCart = (cart) => {

    localStorage.setItem('cart', JSON.stringify(cart));

};

const addItemToCart = ({id}, products) => {

    if (cart.find(product => product.id === id)) incQuantity(id, products);

    else {

        cart.push({id:id, quantity: 1});

        renderCart(products);
    }
};

const renderCart = (products) => {

    cartList.innerHTML = "";

    cart.forEach(({id, quantity}) => {
        
        const {name, price, image} = products.find(product => product.id === id);

        const cartItem = document.createElement('li');
        cartItem.dataset.id = id;

        const itemImage = document.createElement('img');
        itemImage.setAttribute('src', image);
        itemImage.setAttribute('alt', `Image of ${name}`);

        const itemName = document.createElement('p');
        itemName.textContent = name;

        const itemPrice = document.createElement('p');
        itemPrice.textContent = price;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = quantity;

        const subtotal = document.createElement('p');
        subtotal.textContent = price * quantity;

        const subtotalBreakdown = document.createElement('p');
        subtotalBreakdown.textContent = `${price} X ${quantity}`;

        const updateQuantity = document.createElement('div');

        const decQuantityBtn = document.createElement('button');
        decQuantityBtn.textContent = '-';
        decQuantityBtn.classList.add('cart__button--dec');

        const itemQuantityClone = itemQuantity.cloneNode(true);

        const incQuantityBtn = document.createElement('button');
        incQuantityBtn.textContent = '+'
        incQuantityBtn.classList.add('cart__button--inc');

        const removeFromCartBtn = document.createElement('button');
        removeFromCartBtn.textContent = '🗑️'; 
        removeFromCartBtn.classList.add('cart__button--remove');

        updateQuantity.append(decQuantityBtn, itemQuantityClone, incQuantityBtn);
        cartItem.append(itemImage, itemName, updateQuantity,  itemPrice, itemQuantity, subtotal, subtotalBreakdown, removeFromCartBtn);
        cartList.append(cartItem);

    });

    if(cart.length === 0) return;

    const total = document.createElement('div');

    const totalLabel = document.createElement('p');
    totalLabel.textContent = 'Total: ';

    const totalValue = document.createElement('p');
    totalValue.textContent = calculateTotal(products);

    total.append(totalLabel, totalValue);
    cartList.append(total);
    
};

const cartClickHandler = ({products}) => {
    
    cartList.addEventListener('click', e => {

        if(!(e.target.classList.contains('cart__button--inc')
            || e.target.classList.contains('cart__button--dec')
            || e.target.classList.contains('cart__button--remove'))
        ) return;

        const cartItem = e.target.closest('li');

        const id = Number(cartItem.dataset.id);

        if(e.target.classList.contains('cart__button--inc')) incQuantity(id, products);

        if(e.target.classList.contains('cart__button--dec')) decQuantity(id, products);
        
        if(e.target.classList.contains('cart__button--remove')) removeItemFromCart(id, products);

        saveCart(cart);

    });

};

const incQuantity = (id, products) => {

    cart.find(product => product.id === id).quantity++;

    renderCart(products);

};

const decQuantity = (id, products) => {

    cart.find(product => product.id === id).quantity--;

    if (cart.find(product => product.id === id).quantity === 0) removeItemFromCart(id, products);

    renderCart(products);

};

const removeItemFromCart = (id, products) => {

    const itemIndex = cart.findIndex(product => product.id === id);

    cart.splice(itemIndex, 1);

    renderCart(products);

};

const calculateTotal = (products) => {

    const cartWithPrice = cart.map(item => {
       
        const {price} = products.find(element => element.id === item.id );

        return { ...item, price};

    });

    return cartWithPrice.reduce((acc, cur) => acc += cur.quantity * cur.price, 0);

};