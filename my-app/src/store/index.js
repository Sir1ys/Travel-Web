import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/userSlice/userSlice';
import eventReducer from './slices/eventSlice/eventSlice';
import reviewReducer from './slices/reviewSlice/reviewSlice';
import orderReducer from './slices/orderSlice/orderSlice';
import packageReducer from './slices/packageSlice/packageSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        events: eventReducer,
        reviews: reviewReducer,
        order: orderReducer,
        packages: packageReducer,
    }
}); 