import axios from "axios";

const url = `http://localhost:3000/`;

export class ApiService {
    async getMethode(router) {
        try {
            const link = `${url}${router}`;
            const res = await axios.get(link);
            return res.data;
        } catch (error) {
            console.error('Error fetching data:', error);
        };
    };
};
