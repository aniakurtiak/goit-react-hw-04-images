import { ImageItem } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({
  image: { tags, webformatURL },
  onImageClick,
}) => {
  return (
    <div>
      <ImageItem
        loading="lazy"
        src={webformatURL}
        alt={tags}
        onClick={onImageClick}
      />
    </div>
  );
};
