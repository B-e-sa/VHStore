import axios from "axios"

const axiosGet = async (url: string) => {
    const { data } = 
        await axios.get(url)
    return data;
}

export default axiosGet