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
    modalIsOpen: false,
    isLoading: false,
    selectedImage: null,
    // error: false,
  };

  async componentDidMount() {
    try {
      this.setState({
        isLoading: true,
      });
      const images = await fetchImages();
      this.setState({
        images,
      });
      console.log(images);
    } catch (error) {
      this.setState({
        error: true,
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSubmit = evt => {
    evt.preventDefault();
    this.setState({
      query: `${Date.now()}/${evt.tareget.elements.query.value}`,
      images: [],
      page: 1,
    });
  };

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
      setIsOpen: false,
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
          error: false,
        });
        const images = await fetchImages(this.state.query);
        if (images.hits.length === 0) {
          toast.error('Your search did not match anything!');
          return;
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
        }));
      } catch (error) {
        toast.error('Oops! Something went wrong!');
      } finally {
        this.setState({ loading: false });
      }
    }
  }

  render() {
    const { isLoading, images, selectedImage, error } = this.state;

    return (
      <div>
        <Searchbar onSubmit={this.handleSubmit} />
        {isLoading && <Loader />}
        {error && !isLoading && <div>Oops! There was an Error!</div>}
        {images.length > 0 && (
          <ImageGallery onImageClick={this.handleImageClick} images={images} />
        )}
        <Button onLoadMore={this.handleLoadMore} />
        <CustomModal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          {selectedImage && <img src={selectedImage} alt="Selected" />}
          <button onClick={this.closeModal}>Close</button>
        </CustomModal>
        <Toaster />
      </div>
    );
  }
}
