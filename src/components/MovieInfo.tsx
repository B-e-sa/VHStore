import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import vhsLeft from '../assets/vhs-left.png'
import { API_KEY, API_URL } from "../utils/API";

const MovieInfo = () => {

    const [data, setData] = useState<any>();

    const { movieId } = useParams();

    useEffect(() => {

        const getMovieCover = () => {
            axios.get(`${API_URL}/${movieId}?api_key=${API_KEY}&language=en-US`)
                .then(res => { 
                    setData(res.data)
                    console.log(res.data)
                })
        }

        getMovieCover();

    }, []);

    return (
        <>
            <div>
                <img src={vhsLeft} alt="" width={350} height={525} style={{ position: 'absolute' }} />
                <img
                    width={350}
                    src={`https://image.tmdb.org/t/p/original${data?.poster_path}`}
                    alt=""
                />
                <Sticker>
                    <p>{ data.title }</p>
                </Sticker>
            </div>
        </>
    )

}

const Sticker = styled.div`
    width: 190px;
    height: 190px;
    background-color: white;
    border-radius: 10px;
    position: absolute;
`

const DvdBackCover = styled.div`
    background-color: white;
    width: 250px;
    height: 350px;
`

const VHSCover = styled.img`
`

export default MovieInfo;