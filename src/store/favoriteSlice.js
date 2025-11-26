import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: 'favorite',
    initialState:{
        movies: JSON.parse(localStorage.getItem("favorites")) || [],
    },
    reducers:{
        toggleFavorite:(state,action) => {
            const movie = action.payload;
            const exists = state.movies.find((m) => m.id === movie.id);
            
            if(exists){
                //Remove
                state.movies = state.movies.filter((m) => m.id !== movie.id);
            } else {
                //Add
                state.movies.push(movie);
            }
            localStorage.setItem("favorites", JSON.stringify(state.movies));
        },
    },
});

export const {toggleFavorite} = favoriteSlice.actions;

export default favoriteSlice.reducer;