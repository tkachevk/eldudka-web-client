import React from 'react';
import classes from './Categories.module.scss';
import Container from '../../Container/Container';
import { NavLink } from 'react-router-dom';

const categories = [
  { name: 'Жидкости', link: '/liquid' },
  { name: 'Одноразки', link: '/disposable' },
  { name: 'Поды', link: '/pod' },
  { name: 'Картриджи', link: '/cartridge' },
  { name: 'Испарители', link: 'evaporator' },
];

export const Categories = () => {
  return (
    <header className={classes.headerThird}>
      <Container>
        <div className={classes.categoriesWrapper}>
          {categories.map((category, index) => {
            return (
              <NavLink to="/" data-category-name={category.name} key={index}>
                <p className={classes.categoriesItemName}>{category.name}</p>
              </NavLink>
            );
          })}
        </div>
      </Container>
    </header>
  );
};
