import Modal from 'react-modal';

Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export const CustomModal = ({ isOpen, onRequestClose, selectedImage }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <div>
        <button onClick={onRequestClose} style={{ float: 'right' }}>
          Close
        </button>
      </div>
      <div>
        <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
      </div>
    </Modal>
  );
};

export default CustomModal;
