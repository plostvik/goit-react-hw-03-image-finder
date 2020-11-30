import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  getLargeImage,
}) => (
  <li className={styles.imageGalleryItem}>
    <img
      src={webformatURL}
      alt={tags}
      className={styles.imageGalleryItemImage}
      onClick={() => getLargeImage(largeImageURL)}
    />
  </li>
);

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  getLargeImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
