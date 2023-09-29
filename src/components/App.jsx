import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { CustomModal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { fetchImages } from 'services/api';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout.styled';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    maxPages: 0,
    modalIsOpen: false,
    isLoading: false,
    selectedImage: null,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements.search.value.toLowerCase()}`,
      images: [],
      page: 1,
    });
  };

  async componentDidUpdate(_, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      try {
        this.setState({
          isLoading: true,
        });
        const imgs = await fetchImages(this.state.query, this.state.page);
        if (imgs.hits.length === 0) {
          toast.error('No images were found for your request!');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...imgs.hits],
          maxPages: Math.round(imgs.totalHits / 12),
        }));
      } catch (error) {
        toast.error('Oops! Something went wrong!');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleImageClick = evt => {
    const selectedImage = this.state.images.find(
      img => img.webformatURL === evt.target.src
    );
    if (selectedImage) {
      this.setState({
        selectedImage: selectedImage.largeImageURL,
        modalIsOpen: true,
      });
    }
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false,
    });
  };

  render() {
    const { isLoading, images, selectedImage, maxPages, page, modalIsOpen } =
      this.state;

    return (
      <Layout>
        <Searchbar onSubmit={this.handleSubmit} />
        {images.length > 0 && (
          <ImageGallery onImageClick={this.handleImageClick} images={images} />
        )}
        {isLoading && <Loader />}
        {maxPages > 0 && images.length > 0 && page !== maxPages && (
          <Button onLoadMore={this.handleLoadMore} />
        )}
        <CustomModal
          isOpen={modalIsOpen}
          onRequestClose={this.closeModal}
          selectedImage={selectedImage}
        >
          {selectedImage && <img src={selectedImage} alt="Selected" />}
          <button onClick={this.closeModal}>Close</button>
        </CustomModal>
        <Toaster />
        <GlobalStyle />
      </Layout>
    );
  }
}
