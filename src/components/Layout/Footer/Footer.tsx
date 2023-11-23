import * as React from 'react';
import { Link } from 'react-router-dom';
import classes from './Footer.module.scss';
import { CONTACT_PHONE_NUMBER } from '../../../utils/constants';

export const Footer = () => (
  <div className={classes['footer']}>
    <div className={classes['phone-number-container']}>
      <img src="../phone-icon.png" alt="phone icon" />
      <a href={`tel:+${CONTACT_PHONE_NUMBER.value}`}>
        <span className={classes['phone-number-text']}>{CONTACT_PHONE_NUMBER.text}</span>
      </a>
    </div>

    <Link to="/">
      <img className={classes.logo} src="../logo.png" alt="logo" />
    </Link>
  </div>
);
