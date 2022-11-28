import { createSlice } from '@reduxjs/toolkit';
 
const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
    },
    reducers: {
        uploadReviews(state, action) {
            state.reviews = action.payload.reviews;
        },
        addReview(state, action) {
            state.reviews.push({
                review: action.payload.review,
                userId: action.payload.userId,
                id: action.payload.id
            })
        },
        removeReview(state, action) {
            state.reviews = state.reviews.filter(review => review.id !== action.payload.id);
        }
    }
})

export const {addReview, updateReview, removeReview, uploadReviews} = reviewSlice.actions;
export default reviewSlice.reducer;