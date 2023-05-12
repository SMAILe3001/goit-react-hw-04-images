import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem';
import { Button } from 'components/Button';
import { Loader } from 'components/Loader';
import CSS from './ImageGallery.module.css';

export function ImageGallery({ images, onClick, totalHits, isLoading }) {
  return (
    <>
      <ul className={CSS.imageGallery}>
        {images.map(image => (
          <ImageGalleryItem image={image} key={image.id} />
        ))}
      </ul>
      <Loader visible={isLoading} />
      {totalHits > images.length && !isLoading && <Button onClick={onClick} />}
    </>
  );
}

ImageGallery.propType = {
  pistures: PropTypes.array,
  onClick: PropTypes.func,
  totalHits: PropTypes.number,
  isLoading: PropTypes.func,
  toggleModal: PropTypes.func,
  contentModal: PropTypes.func,
};
