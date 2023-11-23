import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Banner from '../components/Banner/Banner';
import Benefits from '../components/Benefits/Benefits';
import { ProductList } from '../components/ProductList/ProductList';
import { RootState, AppDispatch } from '../redux/store';
import { getProductsByFilters } from '../redux/productList';
import { VISIBLE_PRODUCTS_ON_PAGE_COUNT } from '../components/ProductList/ProductList';
import { DataWithTotalVO } from '../types/DataWithTotalVO';

const MainPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.productList.data);

  useEffect(() => {
    dispatch(
      getProductsByFilters([{ label: 'range', values: [0, VISIBLE_PRODUCTS_ON_PAGE_COUNT] }])
    );
  }, []);

  return (
    <>
      <Banner />
      <Benefits />
      <ProductList
        items={products.data}
        itemsTotal={products.total}
        onChangePage={selectedPage =>
          dispatch(
            getProductsByFilters([
              {
                label: 'range',
                values: [
                  selectedPage * VISIBLE_PRODUCTS_ON_PAGE_COUNT - VISIBLE_PRODUCTS_ON_PAGE_COUNT,
                  selectedPage * VISIBLE_PRODUCTS_ON_PAGE_COUNT,
                ],
              },
            ])
          )
        }
      />
    </>
  );
};

export { MainPage };
