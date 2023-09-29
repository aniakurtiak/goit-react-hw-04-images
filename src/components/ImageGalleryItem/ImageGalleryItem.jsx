export const ImageGalleryItem = ({
  image: { id, tags, webformatURL },
  onImageClick,
}) => {
  return (
    <li key={id} onClick={onImageClick}>
      <img loading="lazy" src={webformatURL} alt={tags} />
    </li>
  );
};
