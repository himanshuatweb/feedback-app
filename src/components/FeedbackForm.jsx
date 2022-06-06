import { useState, useContext, useEffect } from 'react';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';
function FeedbackForm() {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(7);
  const [btnDisable, setBtnDisable] = useState(true);
  const [message, setMessage] = useState('');

  const { addFeedback, feedbackEdit, updateFeedback } =
    useContext(FeedbackContext);

  useEffect(() => {
    if (feedbackEdit.edit === true) {
      setBtnDisable(false);
      setText(feedbackEdit.feed.text);

      setRating(feedbackEdit.feed.rating);
    }
  }, [feedbackEdit]);

  const handleTextChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      setBtnDisable(true);
      setMessage(null);
    } else if (value !== '' && value.trim().length <= 10) {
      setBtnDisable(true);
      setMessage('Text must be atleast 10 characters.');
    } else {
      setMessage(null);
      setBtnDisable(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim().length > 10) {
      const newFeedback = {
        text,
        rating,
      };
      if (feedbackEdit.edit === true) {
        updateFeedback(feedbackEdit.feed.id, newFeedback);
      } else {
        addFeedback(newFeedback);
      }
      setBtnDisable(true);
      setRating(10);
      setText('');
    }
  };
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>Rate Us !</h2>
        <RatingSelect select={setRating} selected={rating} />
        <div className='input-group'>
          <input
            type='text'
            placeholder='Write a review'
            onChange={handleTextChange}
            value={text}
          />
          <Button type='submit' isDisabled={btnDisable}>
            Submit
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}
export default FeedbackForm;
