import authReducer from "./authReducer";
import userReducer from "./userReducer";
import postReducer from "./postReducer";
import provinceReducer from "./provinceReducer";
import categoryReducer from "./categoryReducer";
import appReducer from "./appReducer";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import persistReducer from "redux-persist/es/persistReducer";
const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2
}

const authConfig = {
    ...commonConfig,
    key: 'auth',
    whitelist: ['isLoggedIn','token' ]
}

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer), // reducer nào muốn persist thì bọc nó trong persistReducer cùng với config của nó.
    user: userReducer,
    post: postReducer, 
    province: provinceReducer, 
    category: categoryReducer, 
    app: appReducer, 
})

export default rootReducer