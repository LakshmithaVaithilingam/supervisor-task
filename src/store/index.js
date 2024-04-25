// third-party
import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';

// project import
import persistedReducer from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

// Configure store with persisted reducer
const store = configureStore({
  reducer: persistedReducer
});

// Create persistor
const persistor = persistStore(store);

export { store, persistor };
