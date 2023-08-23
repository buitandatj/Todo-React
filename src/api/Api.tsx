import axios, { Method } from 'axios';
import { ITodo } from '../components/formTodo/FormTodos';

export const myAxios = axios.create({
    baseURL: 'http://localhost:3002/',
})
export default myAxios

export const fetchApi = async (url: string, method: Method ,body:ITodo[]) => {
    try {
        let data;
        switch (method) {
            case 'GET':
                data = await myAxios.get(url)
                break;
            case 'POST':
                data = await myAxios.post(url,body)
                break;
            case 'PUT':
                data = await myAxios.put(url,body)
                break;
            case 'DELETE': 
                data=await myAxios.delete(url)
                break;
            default:
                break;
        }        
        return data ? data.data: null;
    } catch (error) {
        console.log(error);
    }
}

// export const fetchApi = async ({ url, body, method = "get", params }: {
//     url: string,
//     body?: object,
//     method: "delete" | "post" | "get" | "put",
//     params?: object
// }) => {
//     let data;
//     if ( method === "post" || method === "put"  ) {
//         const response = await myAxios[method](url, body, {
//             params
//         });
//         data = response.data;
//         return data;
//     }

//     const response = await myAxios[method](url, {
//         params
//     });
//     data = response.data;
//     return data;

// }
