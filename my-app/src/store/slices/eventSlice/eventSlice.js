import { createSlice } from '@reduxjs/toolkit';
 
const eventSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        uploadEvents(state, action) {
            state.events = action.payload.events;
        },
        addEvent(state, action) {
            state.events.push({
                title: action.payload.title,
                description: action.payload.description,
                img: action.payload.img,
                price: action.payload.price,
                id: action.payload.eventID
            })
        },
        updateEvent(state, action) {
            state.events = state.events.map(event => {
                return event.id === action.payload.id ? (
                    {
                        title: action.payload.title,
                        description: action.payload.description,
                        price: action.payload.price,
                        id: event.id,
                        img: event.img
                    }
                ) : event
            })
        },  
        removeEvent(state, action) {
            state.events = state.events.filter(event => event.id !== action.payload.id);
        }
    }
})



export const {addEvent, updateEvent, removeEvent, uploadEvents} = eventSlice.actions;

export default eventSlice.reducer;