
export const addItemToCart = (id, cart) =>
    
    cart.find(product =>
    
        product.id === id) ?
        incQuantity(id, cart):
        [...cart, {id, quantity:1}];


export const incQuantity = (id, cart) =>
    
    cart.map(item =>
    
        item.id === id ?
        {...item, quantity: item.quantity + 1} :
        item);


export const decQuantity = (id, cart) => {

    const item = cart.find(product => product.id === id);

    if (item && item.quantity === 1) return removeItemFromCart(id, cart);

    return cart.map(item =>
            item.id === id ?
            {...item, quantity: item.quantity - 1} :
            item);

};

export const removeItemFromCart = (id, cart) => cart.filter(item => item.id !== id);

export const calculateTotal = (products, cart) => {

    return cart.map(item => {
       
                const {price} = products.find(element => element.id === item.id );

                return { ...item, price};

            })
            .reduce((acc, cur) => acc += cur.quantity * cur.price, 0);

};