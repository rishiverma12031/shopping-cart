
export const displayProducts = (products, productList) => {
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

export const renderCart = (products, cartList, cart, calculateTotal) => {

    cartList.innerHTML = "";

    if(cart.length === 0) return;

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

    const total = document.createElement('div');

    const totalLabel = document.createElement('p');
    totalLabel.textContent = 'Total: ';

    const totalValue = document.createElement('p');
    totalValue.textContent = calculateTotal(products, cart);

    total.append(totalLabel, totalValue);
    cartList.append(total);
    
};