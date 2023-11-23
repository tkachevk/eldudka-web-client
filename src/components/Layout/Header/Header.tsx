import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../Container/Container';
import styles from './Header.module.scss';
import { SOCIAL_MEDIA } from '../../../utils/constants';
import { setVisibleModal } from '../../../redux/mobileMenu';
import { Logo } from '../../Logo/Logo';
import { Search } from '../../UI/Search/Search';
import { LabelIdVO } from '../../../types/LabelIdVO';
import { RootState, AppDispatch } from '../../../redux/store';
import { getProductsByFilters as getProductsByFiltersForSearch } from '../../../redux/search';
import { getProductsByFilters as getProductsByFiltersForProductList } from '../../../redux/productList';

export const Header = () => {
  const dispatch: AppDispatch = useDispatch();
  const searchItems: LabelIdVO[] = useSelector<RootState, LabelIdVO[]>(state => state.search.items);

  return (
    <header className={styles.headerSecond}>
      <div className={styles['mobile-block']}>
        <Logo />
        <div
          onClick={() => dispatch(setVisibleModal(true))}
          className={styles['mobile-menu-icon']}
        />
      </div>
      <Container>
        <div className={styles.headerSecondWrapper}>
          <div className={styles['desktop-logo']}>
            <Logo />
          </div>
          <Search
            items={searchItems}
            onSelectItem={item => console.log(item)}
            onClickSearch={query => {
              dispatch(getProductsByFiltersForProductList([{ label: 'name', values: [query] }]));
            }}
            onInput={query => {
              dispatch(getProductsByFiltersForSearch([{ label: 'name', values: [query] }]));
            }}
          />
          <div className={styles.iconsContainer}>
            {Object.keys(SOCIAL_MEDIA).map((key, index) => (
              <a key={index} href={SOCIAL_MEDIA[key].href}>
                <img className={styles.mainIcon} src={SOCIAL_MEDIA[key].mainSrc} alt="icon" />
              </a>
            ))}
          </div>
        </div>
      </Container>
    </header>
  );
};
