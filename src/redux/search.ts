import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LabelObjectValuesVO } from 'src/types/LabelObjectValuesVO';
import { DataWithTotalVO } from 'src/types/DataWithTotalVO';
import { LabelIdVO } from 'src/types/LabelIdVO';
import { Product } from 'src/types/Product';

export const getProductsByFilters = createAsyncThunk(
  'search/getProductsByFilters',
  async (filters: LabelObjectValuesVO[]) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/product/filter`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const dataWithTotal: DataWithTotalVO = await response.json();
    return dataWithTotal.data.map((i: Product) => ({ id: i.id, label: i.name }));
  }
);

export type SearchState = {
  isLoading: boolean;
  items: LabelIdVO[];
  isError: boolean;
};

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    isLoading: false,
    items: [],
    isError: false,
  } as SearchState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getProductsByFilters.pending, (state: SearchState, _action: any) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByFilters.fulfilled, (state: SearchState, _action: any) => {
      state.isLoading = false;
      state.items = _action.payload;
    });
    builder.addCase(getProductsByFilters.rejected, (state: SearchState, _action: any) => {
      state.isError = true;
    });
  },
});
