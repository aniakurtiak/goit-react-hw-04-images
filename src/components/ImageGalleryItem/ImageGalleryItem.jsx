export const ImageGalleryItem = ({
  image: { tags, webformatURL },
  onImageClick,
}) => {
  return (
    <div>
      <img
        loading="lazy"
        src={webformatURL}
        alt={tags}
        onClick={onImageClick}
      />
    </div>
  );
};
