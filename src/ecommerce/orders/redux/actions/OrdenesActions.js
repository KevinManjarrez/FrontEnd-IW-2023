import axios from 'axios';
export async function getOrdenesAll() {
let result = await axios.get(`${import.meta.env.VITE_REST_API_SECURITY_EDUCATION}`);
console.log('<<AXIOS-ORDENES>>: ', result.data);
return result.data;
}