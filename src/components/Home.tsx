import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { API_KEY, API_SEARCH_URL, API_URL } from '../utils/API';
import RenterInsides from './RenterInsides';

interface IData {
    results: [
        {
            title: string
            id: number
            poster_path: string
        }
    ]
}

const Home = () => {

    const genre = useAppSelector(state => state.genre.genre)

    const [data, setData] = useState<IData>();

    const [search, setSearch] = useState('');

    const [genres, setGenres] = useState<string[]>();

    const getPopularMovies = async () => {
        await
            axios.get(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
                .then(res => setData(res?.data))
                .catch(err => console.log(err));
    }

    const searchMovie = async () => {
        await
            axios.get(`${API_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
                .then((res) => setData(res?.data))
                .catch(err => console.log(err))
    }

    const searchGenres = async () => {
        await
            axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`)
                .then(res => setData(res?.data))
    }

    useEffect(() => { getPopularMovies(); }, []);

    useEffect(() => { searchGenres() }, [genre])

    useEffect(() => {

        search == '' ? getPopularMovies() : searchMovie();

    }, [search])

    return (
        <HomeContainer>
            <div>
                <Search
                    type="text"
                    placeholder='Search'
                    onChange={(e) => setSearch(e.target.value)}
                    name='Search'
                />
                <RenterInsides />
            </div>
            <Shelf>
                <FirstShelfSpace />
                <SecondShelfSpace />
                {data &&
                    <MoviesContainer>
                        {data.results.map(movie => {
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
                        })}
                    </MoviesContainer>}
            </Shelf>
        </HomeContainer>
    )
}

const HomeContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: relative;
    height: 100vh;
`

const Search = styled.input`
`;

const Shelf = styled.div`
    display: flex;
    height: 550px;
    width: 550px;
    background-color: white;
    align-items: center;
    justify-content: center;
`;

const FirstShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    top: 160px;
    position: absolute;
`

const SecondShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    position: absolute;
    top: 410px;
`

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

const MoviesContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(10, 50px);
    grid-template-rows: repeat(2, 190px);
    row-gap: 70px;
    overflow: hidden;
    transform: skew(-3deg);
    margin-top: 50px;
`;

const MovieTitle = styled.p`
    writing-mode: vertical-rl;
    rotate: 180deg;
    text-align: center;
`

export default Home;