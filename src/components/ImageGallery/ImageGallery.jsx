import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ onImageClick, images }) => {
  return (
    <ul>
      {images.map(image => (
        <li key={image.id}>
          <ImageGalleryItem onImageClick={onImageClick} image={image} />
        </li>
      ))}
    </ul>
  );
};
