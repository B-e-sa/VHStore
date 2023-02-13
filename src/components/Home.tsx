import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAppSelector } from '../hooks/hooks';
import { API_KEY, API_URL } from '../utils/API';
import RenterInsides from './RenterInsides';
import waiter from '../assets/waiter.svg';
import chat from '../assets/chat.png';
import menu from '../assets/menu.png';

interface IData {
    results: [
        {
            title: string
            id: number
            poster_path: string
        }
    ]
}

interface IHome {
    mapActive: boolean
}

const Home = () => {

    const genreId = useAppSelector(state => state.genre.genreId)
    const genreName = useAppSelector(state => state.genre.genreName)

    const [data, setData] = useState<IData>();

    const [search, setSearch] = useState('');

    const [insidesShowing, setInsidesShowing] = useState(true);

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
            axios.get(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}&with_watch_monetization_types=flatrate`)
                .then(res => setData(res?.data))
    }

    useEffect(() => { getPopularMovies(); }, []);

    useEffect(() => { searchGenres() }, [genreId])

    useEffect(() => {

        search == '' ? getPopularMovies() : searchMovie();

    }, [search])

    return (
        <HomeContainer mapActive={insidesShowing}>
            <div>
                <div style={{ display: 'flex' }}>
                    <img src={waiter} width={50} alt="" />
                    <div style={{ position: 'relative' }} >
                        <ChatQuote>
                            Hey! You can ask me to search a movie title for you right
                            below! Or... click on the "menu" button on the search's left
                            to open the store map
                        </ChatQuote>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Search
                        type="text"
                        placeholder='Search'
                        onChange={(e) => setSearch(e.target.value)}
                        name='Search'
                    />
                    <img
                        src={menu}
                        onClick={() => setInsidesShowing(!insidesShowing)}
                        width={50}
                        height={50}
                        alt=""
                    />
                </div>
                {insidesShowing && <RenterInsides />}
            </div>
            <Shelf>
                <GenreTag>{ genreName == '' ? 'Popular' : genreName.toUpperCase()}</GenreTag>
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

const GenreTag = styled.h1`
    position: absolute;
    top: 25px;
`

const ChatQuote = styled.p`
    border: 2px solid black;
    background-color: white;
    padding: 10px;
    width: 510px;
    margin-block: 5px;
    font-size: 15pt;
`

const HomeContainer = styled.div<IHome>`
    display: flex;
    flex-direction: ${props => props.mapActive ? 'row' : 'column'};
    justify-content: center;
    align-items: center;
    width: 100vw;
    position: relative;
    height: ${props => props.mapActive ? '100vh' : 'fit-content'};
`

const Search = styled.input`
    width: 500px;
    height: 50px;
    margin-bottom: 10px;
    font-size: 20pt;
    padding-left: 20px;
    margin-right: 10px;
`;

const Shelf = styled.div`
    display: flex;
    height: 600px;
    width: 550px;
    background-color: #887143;
    align-items: center;
    justify-content: center;
    position: relative;
`

const FirstShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    top: 75px;
    position: absolute;
`

const SecondShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    position: absolute;
    top: 335px;
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
    top: 37px;
    position: relative;
`;

const MovieTitle = styled.p`
    writing-mode: vertical-rl;
    rotate: 180deg;
    text-align: center;
`

export default Home;