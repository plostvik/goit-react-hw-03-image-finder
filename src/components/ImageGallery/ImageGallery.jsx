import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, getLargeImage }) => {
  return (
    <ul className={styles.imageGallery}>
      {images.map(el => {
        return (
          <ImageGalleryItem
            key={el.id}
            webformatURL={el.webformatURL}
            tags={el.tags}
            largeImageURL={el.largeImageURL}
            getLargeImage={getLargeImage}
          />
        );
      })}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  getLargeImage: PropTypes.func.isRequired,
};

export default ImageGallery;
