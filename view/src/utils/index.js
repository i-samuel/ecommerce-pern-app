export const fetchProducts = async() => {
    try{
        const res = await fetch('http://localhost:4001/api/products/');
        const jsonResponse = await res.json();
        return jsonResponse;
    } catch (err) {
        console.log(err);
    }
}