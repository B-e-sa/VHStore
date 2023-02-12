import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name: 'genre',
    initialState: { genre: 0 },
    reducers: {
        searchedGenre(state, { payload }) {
            state.genre = payload.genre
        }
    }
})

export const { searchedGenre } = genreSlice.actions;

export default genreSlice.reducer;