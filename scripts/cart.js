
export const addToCartClickHandler = (products, productList, saveCart, cart, renderCart, cartList, calculateTotal) => {

    productList.addEventListener('click', e => {

        if(!e.target.classList.contains('product__button')) return;

        const productCard = e.target.closest('article');

        const {id} = products.find(product => product.id === Number(productCard.dataset.id));
        
        addItemToCart(id, products, cart, renderCart, cartList, calculateTotal);

        saveCart(cart);

    });

};

export const cartClickHandler = (products, cartList, saveCart, cart, renderCart, calculateTotal) => {
    
    cartList.addEventListener('click', e => {

        if(!(e.target.classList.contains('update-quantity__button--inc')
            || e.target.classList.contains('update-quantity__button--dec')
            || e.target.classList.contains('item__button'))
        ) return;

        const cartItem = e.target.closest('li');

        const id = Number(cartItem.dataset.id);

        if(e.target.classList.contains('update-quantity__button--inc')) incQuantity(id, products, cart, renderCart, cartList, calculateTotal);

        if(e.target.classList.contains('update-quantity__button--dec')) decQuantity(id, products, cart, renderCart, cartList, calculateTotal);
        
        if(e.target.classList.contains('item__button')) removeItemFromCart(id, products, cart, renderCart, cartList, calculateTotal);

        saveCart(cart);

    });

};

const addItemToCart = (id, products, cart, renderCart, cartList, calculateTotal) => {

    if (cart.find(product => product.id === id)) incQuantity(id, products, cart, renderCart, cartList, calculateTotal);

    else {

        cart.push({id:id, quantity: 1});

        renderCart(products, cartList, cart, calculateTotal);
    }
};

const incQuantity = (id, products, cart, renderCart, cartList, calculateTotal) => {

    cart.find(product => product.id === id).quantity++;

    renderCart(products, cartList, cart, calculateTotal);

};

const decQuantity = (id, products, cart, renderCart, cartList, calculateTotal) => {

    cart.find(product => product.id === id).quantity--;

    if (cart.find(product => product.id === id).quantity === 0) removeItemFromCart(id, products, cart, renderCart, cartList, calculateTotal);

    renderCart(products, cartList, cart, calculateTotal);

};

const removeItemFromCart = (id, products, cart, renderCart, cartList, calculateTotal) => {

    const itemIndex = cart.findIndex(product => product.id === id);

    cart.splice(itemIndex, 1);

    renderCart(products, cartList, cart, calculateTotal);

};

export const calculateTotal = (products, cart) => {

    const cartWithPrice = cart.map(item => {
       
        const {price} = products.find(element => element.id === item.id );

        return { ...item, price};

    });

    return cartWithPrice.reduce((acc, cur) => acc += cur.quantity * cur.price, 0);

};