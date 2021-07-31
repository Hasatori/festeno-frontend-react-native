import {applyMiddleware, combineReducers, createStore} from 'redux';
import userReducer, {UserState} from './reducers/profile';
import generalReducer, {GeneralState} from "./reducers/general";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers<AppState>({
    userState: userReducer,
    generalState: generalReducer
});

export interface AppState {
    userState: UserState,
    generalState: GeneralState
}

const configureStore = () => {
    return createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk)))
};

export default configureStore;