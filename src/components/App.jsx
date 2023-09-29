import { Component } from 'react';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { CustomModal } from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import React from 'react';
import { fetchImages } from 'services/api';
import toast, { Toaster } from 'react-hot-toast';

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    maxPages: 0,
    modalIsOpen: false,
    isLoading: false,
    selectedImage: null,
    // error: false,
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.target.elements.search.value.toLowerCase()}`,
      images: [],
      page: 1,
    });
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
          toast.error('Your search did not match anything!');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...imgs.hits],
          maxPages: Math.round(imgs.totalHits / 12),
        }));
        if (prevState.page === this.state.page) {
          toast.success(`You have ${imgs.totalHits} images`);
        }
        window.scrollBy({
          top: 520,
          behavior: 'smooth',
        });
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

  render() {
    const { isLoading, images, selectedImage, maxPages, page, modalIsOpen } =
      this.state;

    return (
      <div>
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
      </div>
    );
  }
}
