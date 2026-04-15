
export const saveCart = (cart) => {

    localStorage.setItem('cart', JSON.stringify(cart));

};

export const loadCart = () => {

    const cart = localStorage.getItem('cart');

    return cart ? JSON.parse(cart) : [] ;

};