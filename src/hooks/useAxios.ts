import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url: string) => {

    const [data, setData] = useState<any>()

    const doRequest = async () => {
        await
            axios.get(url)
                .then(res => setData(res))
                .catch(e => setData(e));
    }

    useEffect(() => { doRequest() }, [])

    return data;

}

export default useAxios;