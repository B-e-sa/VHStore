import { createSlice } from "@reduxjs/toolkit";

const genreSlice = createSlice({
    name: 'genre',
    initialState: { genreId: 0, genreName: '' },
    reducers: {
        searchedGenre(state, { payload }) {
            state.genreId = payload.genreId
            state.genreName = payload.genreName
        }
    }
})

export const { searchedGenre } = genreSlice.actions;

export default genreSlice.reducer;