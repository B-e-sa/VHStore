import { API_URL, API_KEY } from './API';
import axios from "axios";

interface IData {
    results: [
        { title: string }
    ]
}

const getPopularMovies = async () => {

    let data!: IData;

    await axios.get(`${API_URL}/popular?api_key=${API_KEY}&language=en-US&page=1`)
        .then(res => data = (res?.data))
        .catch(err => console.log(err));
        
    return data;
    
}

export default getPopularMovies;