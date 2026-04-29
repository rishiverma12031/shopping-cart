
export const loadProducts = async () => {

    try {

        const response = await fetch('./assets/products.json');
        
        if(!response.ok) throw new Error (`HTTP error! status: ${response.status}`);

        const data = await response.json();

        return data.products;

    }

    catch(error) {

        console.error(`Failed to load products: ${error}`);
        
        return [];

    }

}