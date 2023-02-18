import { useState } from 'react';
import styled from 'styled-components';
import menu from '../assets/menu.png';
import waiter from '../assets/waiter.svg';
import { goToNextPage, goToPreviousPage } from '../features/apiSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import RenterInsides from './RenterInsides';
import VHSCover from './VHSCover';

interface Iata {
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

    // data isFetching isLoading error

    const dispatch = useAppDispatch()

    const currentPage = useAppSelector(state => state.api.currentPage);
    const genreId = useAppSelector(state => state.api.currentGenreId);
    const genreName = useAppSelector(state => state.api.currentGenreName);

    const [insidesShowing, setInsidesShowing] = useState(true);

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
                        onChange={(e) => {}}
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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
                    <span onClick={() => dispatch(goToPreviousPage({ currentPage }))}> {'<'} </span>
                    <GenreTag>{genreName == '' ? 'Popular' : genreName.toUpperCase()}</GenreTag>
                    <span onClick={() => dispatch(goToNextPage())}> {'>'} </span>
                </div>
                <FirstShelfSpace>
                    <VHSContainer>
                        <VHSCover division={1} />
                    </VHSContainer>
                </FirstShelfSpace>
                <SecondShelfSpace>
                    <VHSContainer>
                        <VHSCover division={2} />
                    </VHSContainer>
                </SecondShelfSpace>
            </Shelf>
        </HomeContainer >
    )
}

const GenreTag = styled.h1`
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
    flex-direction: column;
    height: 600px;
    width: 550px;
    background-color: #887143;
    align-items: center;
    justify-content: center;
    position: relative;
`

const VHSContainer = styled.div`
display: grid;
grid-template-columns: repeat(10, 50px);
grid-template-rows: repeat(2, 190px);
row-gap: 70px;
overflow: hidden;
transform: skew(-3deg);
top: 37px;
position: relative;
`

const FirstShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    position: relative;
`

const SecondShelfSpace = styled.div`
    width: 530px;
    height: 230px;
    background-color: black;
    position: relative;
`

const MoviesContainer = styled.div`
`;


export default Home;