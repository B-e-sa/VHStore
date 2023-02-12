import axios from "axios";
import { useEffect, useState } from "react";
import { API_KEY } from "../utils/API";
import { IGenres } from "../utils/types";
import BottomShelf from "./Shelves/BottomShelf";
import LeftShelf from "./Shelves/LeftShelf";
import MidShelf from "./Shelves/MidShelf";
import RightShelf from "./Shelves/RightShelf";
import TopShelf from "./Shelves/TopShelf";

const RenterInsides = () => {

    const [genres, setGenres] = useState<IGenres[]>()

    // const searchedGenre = useAppSelector(state => state.genre.genre);
    // const dispatch = useAppDispatch();

    const getGenres = async () => {
        await
            axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`)
                .then(res => {
                    setGenres([...res.data.genres, { id: 999, name: 'Popular' }])
                });
    }

    useEffect(() => {
        getGenres();
    }, [])

    const leftShelf = genres?.slice(0, 3);
    const topShelf = genres?.slice(3, 5);
    const midShelf = genres?.slice(5, 11);
    const bottomShelf = genres?.slice(11, 15);
    const rightShelf = genres?.slice(15, 17);

    return (
        <div style={{ display: 'flex', marginRight: '35px' }}>
            <LeftShelf shelvesContent={leftShelf} />
            <div>
                <TopShelf shelvesContent={topShelf} />
                <MidShelf shelvesContent={midShelf} />
                <BottomShelf shelvesContent={bottomShelf} />
            </div>
            <RightShelf shelvesContent={rightShelf} />
        </div>
    )
}

export default RenterInsides;