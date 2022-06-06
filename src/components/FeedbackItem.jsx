import { useContext } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';
import FeedbackContext from '../context/FeedbackContext';
import PropTypes from 'prop-types';
import Card from './shared/Card';

function FeedbackItem({ feedback }) {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext);

  const { rating, text, id } = feedback;
  return (
    <Card>
      <div className='num-display'> {rating} </div>
      <button className='close' onClick={() => deleteFeedback(id)}>
        <FaTimes color='purple' />
      </button>
      <button className='edit' onClick={() => editFeedback(feedback)}>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'> {text} </div>
    </Card>
  );
}

FeedbackItem.propTypes = {
  feedback: PropTypes.object.isRequired,
};

export default FeedbackItem;
