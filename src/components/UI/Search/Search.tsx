import React, { useState, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { LabelIdVO } from '../../../types/LabelIdVO';
import styles from './Search.module.scss';

type Props = {
  onSelectItem: (item: object) => void;
  onClickSearch: (query: string) => void;
  onInput: (query: string) => void;
  items: LabelIdVO[];
};

export const Search = (props: Props) => {
  const [query, setQuery] = useState<string>('');
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);

  const searchRef = useRef(null);
  useOnClickOutside(searchRef, () => setDropdownVisible(false));

  return (
    <div ref={searchRef} className={styles['search']}>
      <div className={styles['input-wrapper']}>
        <input
          onInput={(e: React.FormEvent<HTMLInputElement>) => props.onInput(e.currentTarget.value)}
          onChange={e => setQuery(e.target.value)}
          placeholder="Поиск"
          className={styles['input']}
          onClick={() => setDropdownVisible(true)}
        />
        <div onClick={() => props.onClickSearch(query)} className={styles['search-button']}>
          <img height="25px" src="./search-30.png" alt="search-button" />
        </div>
      </div>
      <div className={`${styles['search-dropdown']} ${dropdownVisible ? styles['active'] : ''}`}>
        {props.items.map(i => (
          <div onClick={() => props.onSelectItem(i)} key={i.id} className={styles['dropdown-item']}>
            {i.label}
          </div>
        ))}
      </div>
    </div>
  );
};
