import { useContext } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import FeedbackItem from './FeedbackItem';
import Spinner from './shared/Spinner';

function FeedbackList() {
  const { feedback, isLoading } = useContext(FeedbackContext);

  if ((!feedback || feedback.length === 0) && isLoading === false) {
    return <p>No Feedback Yet...</p>;
  }
  return isLoading ? (
    <Spinner />
  ) : (
    <div className='feedback-list'>
      {feedback.map((feed) => (
        <FeedbackItem key={feed.id} feedback={feed} />
      ))}
    </div>
  );
}
export default FeedbackList;
