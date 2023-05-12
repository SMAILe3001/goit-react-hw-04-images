import { useState } from 'react';
import PropTypes from 'prop-types';
import CSS from './ImageGalleryItem.module.css';
import { Modal } from 'components/Modal';

export function ImageGalleryItem({ image }) {
  const { previewURL, tags, largeImageURL } = image;
  const [showModal, setShowModal] = useState(false);

  return (
    <li className={CSS.imageGalleryItem}>
      <img
        className={CSS.imageGalleryItemImage}
        src={previewURL}
        alt={tags}
        onClick={() => {
          setShowModal(true);
        }}
      />
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <img src={largeImageURL} alt={tags} />
        </Modal>
      )}
    </li>
  );
}

ImageGalleryItem.propType = {
  image: PropTypes.object,
};
