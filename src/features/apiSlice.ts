import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { API_KEY, API_URL } from '../utils/API';
import axiosGet from "../utils/axiosGet";

export const fetchPopularMovies = createAsyncThunk(
    'api/fetchPopularMovies',
    async (page) => {

        return axiosGet(`${API_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`)

    }
);

export const fetchMoviesByQuery = createAsyncThunk(
    'api/fetchMoviesByQuery',
    async (name, page) => {

        return axiosGet(`${API_URL}/api/movie?api_key=${API_KEY}&language=en-US&query=${name}&page=${page}}&include_adult=true`)
    
    }
);

export const fetchMoviesByGenre = createAsyncThunk(
    'api/fetchMoviesByGenre',
    async ({ genreId, currentPage }: any, thunkAPI) => {

        return axiosGet(`${API_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${currentPage}&with_genres=${genreId}&with_watch_monetization_types=flatrate`)

    }
);

const initialState: {
    data: any,
    loading: boolean,
    currentQuery: string,
    currentPage: number,
    currentGenreName: string,
    currentGenreId: number,
    lastFetch: string
} = {
    data: { page: 1, results: [] },
    loading: false,
    currentQuery: '',
    currentPage: 1,
    currentGenreId: 0,
    currentGenreName: '',
    lastFetch: ''
}

const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        setQuery(state, { payload }) {
            state.currentQuery = payload.query
        },
        goToPreviousPage(state, { payload }) {
            if (payload.currentPage > 0) {
                state.currentPage--
                state.data.page = state.currentPage
            }
        },
        goToNextPage(state) {
            state.currentPage++
            state.data.page = state.currentPage
            if (state.lastFetch == 'genre') {
                console.log(fetchMoviesByGenre({ genreId: state.currentGenreId, currentPage: state.currentPage }))
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesByGenre.fulfilled, (state, { payload }) => {
            state.data = payload;
            state.currentGenreId = payload.genreId;
            state.loading = false;
            state.lastFetch = 'genre';
        }),

            builder.addMatcher(isAnyOf(
                fetchMoviesByGenre.rejected,
                fetchMoviesByQuery.rejected,
                fetchPopularMovies.rejected
            ), (state) => {
                state.data = ['An error ocurred'],
                    state.loading = false
            }),

            builder.addMatcher(isAnyOf(
                fetchPopularMovies.fulfilled,
                fetchMoviesByQuery.fulfilled
            ), (state, { payload }) => {
                state.data = payload,
                    state.loading = false
            }),

            builder.addMatcher(isAnyOf(
                fetchPopularMovies.pending,
                fetchMoviesByQuery.pending,
                fetchMoviesByGenre.pending
            ), (state) => { state.loading = true })

        builder.addMatcher(isAnyOf(
            fetchMoviesByGenre.fulfilled,
            fetchMoviesByQuery.fulfilled,
            fetchPopularMovies.fulfilled
        ), (state, { payload }) => {
            state.data = payload,
                state.loading = false
        })
    }
})

export const { setQuery, goToNextPage, goToPreviousPage } = apiSlice.actions;

export default apiSlice;
