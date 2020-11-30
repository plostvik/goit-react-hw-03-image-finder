import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const Button = ({ getImages }) => (
  <button type="button" onClick={getImages} className={styles.button}>
    Load more
  </button>
);

Button.propTypes = {
  getImages: PropTypes.func.isRequired,
};

export default Button;
