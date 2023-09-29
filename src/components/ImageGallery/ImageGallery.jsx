import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { GalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ onImageClick, images }) => {
  return (
    <GalleryList>
      {images.map(image => (
        <li key={image.id}>
          <ImageGalleryItem onImageClick={onImageClick} image={image} />
        </li>
      ))}
    </GalleryList>
  );
};
