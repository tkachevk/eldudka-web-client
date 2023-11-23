import React from 'react';
import styles from './SquareButtonWithNumber.module.scss';

export const SquareButtonWithNumber = ({
  number,
  onClick,
  active = false,
}: {
  number: number;
  onClick: (number: number) => void;
  active?: boolean;
}) => (
  <button
    className={`${styles['button-with-number']} ${active ? styles['active'] : ''}`}
    onClick={() => {
      if (!active) onClick(number);
    }}
  >
    {number}
  </button>
);
