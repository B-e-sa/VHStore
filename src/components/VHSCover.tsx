import { useEffect, useRef, useState } from "react";
import { shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchPopularMovies } from "../features/apiSlice";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";

interface IMovie {
    id: number
    title: string
}

const VHSCover = ({ division }: any) => {

    const data = useAppSelector(state => state.api.data, shallowEqual)

    const dispatch = useAppDispatch();

    useEffect(() => { dispatch(fetchPopularMovies()); }, [])

    const previousDataPage = useRef<number>(data.page);

    if (division == 1) {

        return (
            data.results &&
            data.results.slice(0, 10).map((movie: IMovie) => {
                return (
                    <Link
                        key={movie.id}
                        to={`/movieinfo/${movie.id}`}
                        style={{ color: 'black' }}
                    >
                        <VhsCover>
                            <MovieTitle>
                                {movie.title}
                            </MovieTitle>
                        </VhsCover>
                    </Link>
                )
            })
        )

    } else {

        return (
            data.results &&
            data.results.slice(10, 20).map((movie: IMovie) => {
                return (
                    <Link
                        key={movie.id}
                        to={`/movieinfo/${movie.id}`}
                        style={{ color: 'black' }}
                    >
                        <VhsCover>
                            <MovieTitle>
                                {movie.title}
                            </MovieTitle>
                        </VhsCover>
                    </Link>
                )
            })
        )
    }
}

const VhsCover = styled.div`
    background-color: white;
    background-repeat: no-repeat;
    background-position-x: -30px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 100%;
    position: relative;
`


const MovieTitle = styled.p`
    writing-mode: vertical-rl;
    rotate: 180deg;
    text-align: center;
`

export default VHSCover;