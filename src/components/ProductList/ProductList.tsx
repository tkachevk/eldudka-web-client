import React from 'react';
import Card from '../Card/Card';
import Container from '../Container/Container';
import classes from './ProductList.module.scss';
import CatalogMagic from './CatalogMagicSkeleton';
import { Product } from '../../types/Product';
import { Pagination } from '../UI';

export const VISIBLE_PRODUCTS_ON_PAGE_COUNT: number = 30;

type Props = {
  items: Product[];
  onChangePage: (selectedPage: number) => void;
  itemsTotal: number;
};

export const ProductList = (props: Props) => {
  return (
    <div className={classes['cards-block']}>
      <Container>
        <div className={classes['cards-wrapper']}>
          {props.items && props.items.length > 0 ? (
            <>
              {props.items.map((item, index) => (
                <Card data={item} key={index} />
              ))}
              {props.itemsTotal > VISIBLE_PRODUCTS_ON_PAGE_COUNT && (
                <Pagination
                  maxPages={Math.ceil(props.itemsTotal / VISIBLE_PRODUCTS_ON_PAGE_COUNT)}
                  onSelectPage={number => props.onChangePage(number)}
                />
              )}
            </>
          ) : (
            <CatalogMagic />
          )}
        </div>
      </Container>
    </div>
  );
};
