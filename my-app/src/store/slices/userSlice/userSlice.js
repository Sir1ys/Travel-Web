import { createSlice } from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
    user: {
        email: user !== null ? user.email : '',
        id: user !== null ? user.id : '',
        login: user !== null ? user.login : '',
        isManager: user !== null ? user.isManager : false,
        surname: user !== null ? user.surname : '',
        name: user !== null ? user.name : '',
        img: user !== null ? user.img : '',
    },
    users: []
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        uploadUsers(state, action) {
            state.users = action.payload.users;
        },
        setUser(state, action) {
            state.user.email = action.payload.email;
            state.user.id = action.payload.id;
            state.user.isManager= action.payload.isManager;
            state.user.login = action.payload.login;
            state.user.name = action.payload.name;
            state.user.surname = action.payload.surname;
            state.user.img = action.payload.img;
            state.users.push({
                email: action.payload.email,
                id: action.payload.id,
                isManager: action.payload.isManager,
                login: action.payload.login,
                name: action.payload.name,
                surname: action.payload.surname,
                img: action.payload.img,
            })
        },
        removeUser(state) {
            state.user.email = '';
            state.user.id = '';
            state.user.isManager= '';
            state.user.login = '';
            state.user.name = '';
            state.user.surname = '';
            state.user.img = '';
            localStorage.clear();
        },
        updateUser(state, action) {
            state.user.login = action.payload.login;
            state.user.name = action.payload.name;
            state.user.surname = action.payload.surname;
            state.user.img = action.payload.img;

            state.users = state.users.map(user => {
                return user.id === action.payload.id ? ({  
                    email: user.email,
                    isManager: user.isManager,
                    id: user.id,
                    login: action.payload.login,
                    name: action.payload.name,
                    surname: action.payload.surname,
                    img: action.payload.img,
                    }
                ) : user
            })
        }
    }
})

export const {setUser, removeUser, updateUser, uploadUsers} = userSlice.actions;
export default userSlice.reducer;