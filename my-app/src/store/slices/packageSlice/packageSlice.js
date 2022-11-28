import { createSlice } from '@reduxjs/toolkit';
 
const packageSlice = createSlice({
    name: 'packages',
    initialState: {
        packages: [],
    },
    reducers: {
        uploadPackages(state, action) {
            state.packages = action.payload.packages;
        },
        addPackage(state, action) {
            state.packages.push({
                title: action.payload.title,
                description: action.payload.description,
                img: action.payload.img,
                price: action.payload.price,
                id: action.payload.packageID,
                duration: action.payload.duration
            })
        },
        updatePackage(state, action) {
            state.packages = state.packages.map(item => {
                return item.id === action.payload.id ? (
                    {
                        title: action.payload.title,
                        description: action.payload.description,
                        price: action.payload.price,
                        id: item.id,
                        img: item.img,
                        duration: action.payload.duration
                    }
                ) : item
            })
        },  
        removePackage(state, action) {
            state.packages = state.packages.filter(item => item.id !== action.payload.id);
        }
    }
})

export const {addPackage, updatePackage, removePackage, uploadPackages} = packageSlice.actions;
export default packageSlice.reducer;