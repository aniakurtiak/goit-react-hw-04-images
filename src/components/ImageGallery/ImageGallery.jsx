import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ onImageClick, images }) => {
  return (
    <ul>
      {images.map(image => (
        <ImageGalleryItem onImageClick={onImageClick} />
      ))}
    </ul>
  );
};
