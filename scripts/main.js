import { productData } from "./data.js";
import { saveCart, loadCart } from "./storage.js";
import { addToCartClickHandler, cartClickHandler, calculateTotal } from "./cart.js";
import { displayProducts, renderCart } from "./render.js";

const productList = document.querySelector('.products__list');
const cartList = document.querySelector('.cart');

let cart = loadCart();

productData.then(products => {

    displayProducts(products, productList);
    addToCartClickHandler(products, productList, saveCart, cart, renderCart, cartList, calculateTotal);
    cartClickHandler(products, cartList, saveCart, cart, renderCart, calculateTotal);
    renderCart(products, cartList, cart, calculateTotal);

});
