import { useEffect, useState } from 'react';
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

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [maxPages, setMaxPages] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = evt => {
    evt.preventDefault();
    setQuery(`${Date.now()}/${evt.target.elements.search.value.toLowerCase()}`);
    setImages([]);
    setPage(1);
  };

  useEffect(() => {
    if (query !== '' && page === 1) {
      async function getImages() {
        try {
          setIsLoading(true);
          const imgs = await fetchImages(query, page);
          if (imgs.hits.length === 0) {
            toast.error('No images were found for your request!');
            return;
          }
          setImages(prevImages => [...prevImages, ...imgs.hits]);
          setMaxPages(Math.round(imgs.totalHits / 12));
        } catch (error) {
          toast.error('Oops! Something went wrong!');
        } finally {
          setIsLoading(false);
        }
      }
      getImages();
    }
  }, [query, page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleImageClick = evt => {
    const selectedImage = images.find(
      img => img.webformatURL === evt.target.src
    );
    if (selectedImage) {
      setSelectedImage(selectedImage.largeImageURL);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery onImageClick={handleImageClick} images={images} />
      )}
      {isLoading && <Loader />}
      {maxPages > 0 && images.length > 0 && page !== maxPages && (
        <Button onLoadMore={handleLoadMore} />
      )}
      <CustomModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        selectedImage={selectedImage}
      >
        {selectedImage && <img src={selectedImage} alt="Selected" />}
        <button onClick={closeModal}>Close</button>
      </CustomModal>
      <Toaster />
      <GlobalStyle />
    </Layout>
  );
};
