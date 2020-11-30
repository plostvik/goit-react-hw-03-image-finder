import React, { Component } from 'react';
import styles from './App.module.css';
import fetchImages from './utils/imageApi.js';
import SearchBar from './components/SearchBar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Notification from './components/Notification';
import Modal from './components/Modal';

export default class App extends Component {
  state = {
    images: [],
    page: 1,
    query: '',
    loading: false,
    error: null,
    totalPages: 0,
    moreItems: true,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.page > 2) {
      window.scrollTo({
        top:
          document.documentElement.scrollTop +
          document.documentElement.clientHeight -
          180,
        behavior: 'smooth',
      });
    }
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;

    if (prevQuery !== nextQuery) {
      this.getImages();
    }
  }

  getImages = () => {
    const { query, page } = this.state;

    this.setState({ loading: true });

    fetchImages(query, page)
      .then(fetchedData => {
        if (fetchedData.hits.length) {
          this.setState(prevState => ({
            images: [...prevState.images, ...fetchedData.hits],
            page: prevState.page + 1,
            totalPages: Math.round(fetchedData.totalHits / 12),
          }));
        } else this.setState({ moreItems: false });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  getSearchFormSubmit = query => {
    this.setState({
      query: query,
      page: 1,
      images: [],
      error: null,
      moreItems: true,
    });
  };

  getLargeImage = url => {
    this.setState({
      largeImageURL: url,
    });
  };

  closeModal = () => {
    this.setState({ largeImageURL: '' });
  };

  render() {
    const {
      images,
      loading,
      page,
      totalPages,
      error,
      moreItems,
      largeImageURL,
    } = this.state;

    return (
      <div className={styles.app}>
        <SearchBar getSearchFormSubmit={this.getSearchFormSubmit} />
        {error && (
          <Notification
            message={`Whoops, something went wrong: ${error.message}`}
          />
        )}
        {!moreItems && (
          <Notification
            message={`It looks like there's no matches for your search :( Try another query!`}
          />
        )}
        <ImageGallery images={images} getLargeImage={this.getLargeImage} />
        {loading && <Loader />}
        {!loading && totalPages >= page && (
          <Button getImages={this.getImages} />
        )}
        {largeImageURL && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </div>
    );
  }
}
