import axios from 'axios';

export const myAxios = axios.create({
    baseURL: `http://localhost:3000/`,
})
export default myAxios

export const fetchApi = async ({ url, body, method = "get", params }: {
    url: string,
    body?: object,
    method: "delete" | "post" | "get" | "put",
    params?: object
}) => {
    let data;
    if ( method === "post" || method === "put"  ) {
        const response = await myAxios[method](url, body, {
            params
        });
        data = response.data;
        return data;
    }

    const response = await myAxios[method](url, {
        params
    });
    data = response.data;
    return data;

}
