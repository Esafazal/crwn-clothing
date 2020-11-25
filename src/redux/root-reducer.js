import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducers";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import directoryReducer from "./directory/directory.reducers";

//redux persist config
const persistConfig = {
    key: 'root',
    // type localstorage
    storage,
    // the reducers that we want persisted
    whitelist: ['cart']
}

const rootReducer = combineReducers({
    user: userReducer,
    cart: cartReducer,
    directory: directoryReducer
});

// export default combineReducers({
//     user: userReducer,
//     cart: cartReducer
// });

export default persistReducer(persistConfig, rootReducer);