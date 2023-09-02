import data from '../assets/data.json';
import { getDatabase, ref, push, set } from 'firebase/database';

function script() {
    const db = getDatabase();
    const productsRef = ref(db, 'products');

    // Access the products array nested within the imported JSON
    data.products.forEach(async (product) => {
        const newProductRef = push(productsRef);

        await set(newProductRef, product);
    });
}

export default script;
