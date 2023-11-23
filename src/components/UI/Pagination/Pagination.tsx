import React, { useState, useEffect } from 'react';
import styles from './Pagination.module.scss';
import { SquareButtonWithNumber } from '../';
import { IdActiveVO } from '../../../types/IdActiveVO';

export const calculateNearestNumbersByCurrentNumber = (
  currentNumber: number,
  maxNumber: number,
  nearestNumber: number
) => {
  const blockList: number[] = [];
  for (let i = 1; i <= maxNumber; i++) {
    if (i === currentNumber || Math.abs(currentNumber - i) <= nearestNumber) blockList.push(i);
  }
  return blockList;
};

export const MAX_NEAREST_NUMBERS: number = 2;

export const Pagination = ({
  maxPages,
  onSelectPage,
}: {
  maxPages: number;
  onSelectPage: (number: number) => void;
}) => {
  const [items, setItems] = useState<IdActiveVO[]>([]);

  useEffect(() => {
    setItems(
      calculateNearestNumbersByCurrentNumber(1, maxPages, MAX_NEAREST_NUMBERS).map(n => ({
        id: n,
        active: n === 1,
      }))
    );
  }, []);

  const selectPageHandler = (number: number = 1) => {
    onSelectPage(number);
    setItems(
      calculateNearestNumbersByCurrentNumber(number, maxPages, MAX_NEAREST_NUMBERS).map(n => ({
        id: n,
        active: n === number,
      }))
    );
  };

  return (
    <div className={styles['pagination-wrapper']}>
      <button
        onClick={() => {
          const selectedPage: number = items.find(i => i.active)?.id ?? -1;

          if (selectedPage !== -1 && selectedPage !== 1) selectPageHandler(1);
        }}
        className={`${styles['pagination-button']} ${
          (items.find(i => i.active)?.id ?? 0) === 1 ? styles['disable'] : ''
        }`}
      >
        В начало
      </button>
      {items
        .filter(i => i)
        .map(i => (
          <div key={i.id} className={i.id !== 1 ? styles['ml-8px'] : ''}>
            <SquareButtonWithNumber
              number={i.id}
              active={i.active}
              onClick={number => selectPageHandler(number)}
            />
          </div>
        ))}
      <button
        onClick={() => {
          const selectedPage: number = items.find(i => i.active)?.id ?? -1;

          if (selectedPage !== -1 && selectedPage !== maxPages) selectPageHandler(selectedPage + 1);
        }}
        className={`${styles['pagination-button']} ${
          (items.find(i => i.active)?.id ?? 0) === maxPages ? styles['disable'] : ''
        }`}
      >
        Дальше
      </button>
    </div>
  );
};
