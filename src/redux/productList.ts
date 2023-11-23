import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LabelObjectValuesVO } from 'src/types/LabelObjectValuesVO';
import { DataWithTotalVO } from 'src/types/DataWithTotalVO';

export const getProductsByFilters = createAsyncThunk(
  'productList/getProductsByFilters',
  async (filters: LabelObjectValuesVO[]) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/product/filter`, {
      method: 'POST',
      body: JSON.stringify(filters),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return (await response.json()) as DataWithTotalVO;
  }
);

export type ProductListState = {
  isLoading: boolean;
  data: DataWithTotalVO;
  isError: boolean;
};

export const productListSlice = createSlice({
  name: 'productList',
  initialState: {
    isLoading: false,
    data: { total: 0, data: [] },
    isError: false,
  } as ProductListState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(getProductsByFilters.pending, (state: ProductListState, _action: any) => {
      state.isLoading = true;
    });
    builder.addCase(getProductsByFilters.fulfilled, (state: ProductListState, _action: any) => {
      state.isLoading = false;
      state.data = _action.payload;
    });
    builder.addCase(getProductsByFilters.rejected, (state: ProductListState, _action: any) => {
      state.isError = true;
    });
  },
});
