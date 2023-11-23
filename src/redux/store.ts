import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { shoppingCartReducer } from './shoppingCart';
import { favoritesReducer } from './favorites';
import { mobileMenuReducer } from './mobileMenu';
import { productListSlice } from './productList';
import { searchSlice } from './search';

export const store = configureStore({
  reducer: {
    shoppingCart: shoppingCartReducer,
    favorites: favoritesReducer,
    mobileMenu: mobileMenuReducer,
    productList: productListSlice.reducer,
    search: searchSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
