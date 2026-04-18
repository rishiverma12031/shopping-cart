import { productData } from "./data.js";
import { saveCart, loadCart } from "./storage.js";
import { addItemToCart, incQuantity, decQuantity, removeItemFromCart } from "./cart.js";
import { renderProducts, renderCart } from "./render.js";

const productList = document.querySelector('.products__list');
const cartList = document.querySelector('.cart');

let cart = loadCart();

productData.then(products => {

    renderProducts(products, productList);
    renderCart(products, cartList, cart);
    clickHandler(products);

});


const clickHandler = (products)=> {

    productList.addEventListener('click', e => {

        if(!e.target.classList.contains('product__button')) return;

        const productCard = e.target.closest('article');

        const id = Number(productCard.dataset.id);
        
        cart = addItemToCart(id, cart);

        saveCart(cart);

        renderCart(products, cartList, cart);

    });

    cartList.addEventListener('click', e => {

        if(!(e.target.classList.contains('update-quantity__button--inc')
            || e.target.classList.contains('update-quantity__button--dec')
            || e.target.classList.contains('item__button'))
        ) return;

        const cartItem = e.target.closest('li');

        const id = Number(cartItem.dataset.id);

        if(e.target.classList.contains('update-quantity__button--inc')) cart = incQuantity(id, cart);

        if(e.target.classList.contains('update-quantity__button--dec')) cart =  decQuantity(id, cart);
        
        if(e.target.classList.contains('item__button')) cart = removeItemFromCart(id, cart);

        saveCart(cart);

        renderCart(products, cartList, cart);

    });

}
