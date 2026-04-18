import { calculateTotal } from "./cart.js";
import { formatPrice } from "./utils.js";

export const renderProducts = (products, productList) => {
    products.forEach(({id, name, price, category, image, stock}) => {

        const productCard = document.createElement('article');
        productCard.dataset.id = id;
        productCard.classList.add('product');
        
        const productName = document.createElement('p');
        productName.textContent = name;
        productName.classList.add('product__name');

        const productPrice = document.createElement('p');
        productPrice.textContent = price;
        productPrice.classList.add('product__price');

        const productCategory = document.createElement('p');
        productCategory.textContent = category;
        productCategory.classList.add('product__category');

        const productImage = document.createElement('img');
        productImage.setAttribute('src', image);
        productImage.setAttribute('alt', `Image of ${name}`);
        productImage.classList.add('product__image');

        const productStock = document.createElement('p');
        productStock.textContent = stock;
        productStock.classList.add('product__stock');

        const addToCartBtn = document.createElement('button');
        addToCartBtn.textContent= "Add to cart";
        addToCartBtn.classList.add('product__button');
        
        productCard.append(productImage, productName, productPrice, productCategory, productStock, addToCartBtn);
        productList.append(productCard);

    });

};

export const renderCart = (products, cartList, cart) => {

    cartList.innerHTML = "";

    if(cart.length === 0) {

        const cartItem = document.createElement('p');
        cartItem.textContent = "Your cart is empty";
        cartItem.classList.add('cart__empty');

        cartList.append(cartItem);

        return;

    }

    cart.forEach(({id, quantity}) => {
        
        const {name, price, image} = products.find(product => product.id === id);

        const cartItem = document.createElement('li');
        cartItem.dataset.id = id;
        cartItem.classList.add('item');

        const itemImage = document.createElement('img');
        itemImage.setAttribute('src', image);
        itemImage.setAttribute('alt', `Image of ${name}`);
        itemImage.classList.add('item__image');

        const itemName = document.createElement('p');
        itemName.textContent = name;

        const itemQuantity = document.createElement('p');
        itemQuantity.textContent = quantity;
        itemQuantity.classList.add('item__quantity');

        const subtotal = document.createElement('div');

        const subtotalValue = document.createElement('p');
        subtotalValue.textContent = formatPrice(price * quantity);

        const subtotalBreakdown = document.createElement('p');
        subtotalBreakdown.textContent = `${formatPrice(price)} X ${quantity}`;
        subtotalBreakdown.classList.add('item__total-breakdown');

        const updateQuantity = document.createElement('div');
        updateQuantity.classList.add('update-quantity');

        const decQuantityBtn = document.createElement('button');
        decQuantityBtn.textContent = '-';
        decQuantityBtn.classList.add('update-quantity__button--dec');

        const incQuantityBtn = document.createElement('button');
        incQuantityBtn.textContent = '+'
        incQuantityBtn.classList.add('update-quantity__button--inc');

        const removeFromCartBtn = document.createElement('button');
        removeFromCartBtn.textContent = '❌'; 
        removeFromCartBtn.classList.add('item__button');

        const itemStyleDiv1 = document.createElement('div');
        itemStyleDiv1.classList.add('item__info');

        const itemStyleDiv2 = document.createElement('div');
        itemStyleDiv2.classList.add('item__actions');

        subtotal.append(subtotalValue, subtotalBreakdown);
        updateQuantity.append(decQuantityBtn, itemQuantity, incQuantityBtn);
        itemStyleDiv1.append(itemImage, itemName, updateQuantity);
        itemStyleDiv2.append(subtotal, removeFromCartBtn);
        cartItem.append(itemStyleDiv1, itemStyleDiv2);
        cartList.append(cartItem);

    });

    const total = document.createElement('p');
    total.textContent = `Total: ${formatPrice(calculateTotal(products, cart))}`;
    total.classList.add('cart__total');
    
    cartList.append(total);
    
};