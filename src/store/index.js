import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import {
    listReducer,
    addItem,
    addList,
    changeItemTerm,
    deleteItem,
    deleteList,
    changeListTitle,
    submitNewListTitle,
    moveItem,
    moveList
} from "./slices/ListSlice";
import {
    formReducer,
    changeNewListTerm
} from "./slices/formSlice";
import {
    modalReducer,
    openModal,
    closeModal,
} from "./slices/ModalSlice";

const persistConfig = {
    key: 'root',
    storage,
};

const rootReducer = combineReducers({
    lists: listReducer,
    form: formReducer,
    modal: modalReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

const persistor = persistStore(store);

export {
    store,
    persistor,
    deleteItem,
    changeNewListTerm,
    changeItemTerm,
    addItem,
    addList,
    deleteList,
    changeListTitle,
    submitNewListTitle,
    moveItem,
    moveList,
    openModal,
    closeModal,
}