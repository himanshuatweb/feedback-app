import { createContext, useState, useEffect } from 'react';

const FeedbackContext = createContext();

//We have to create a Provider
export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const [feedbackEdit, setFeedbackEdit] = useState({
    feed: {},
    edit: false,
  });

  useEffect(() => {
    setIsLoading(true);
    fetchFeedback();
  }, []);

  // Fetch Feedback
  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id&_order=desc');
    const data = await res.json();
    setFeedback(data);
    setIsLoading(false);
  };

  // Set Feed to be updated
  const editFeedback = (feed) => {
    setFeedbackEdit({
      feed,
      edit: true,
    });
  };

  // Update Feedback item
  const updateFeedback = async (id, updItem) => {
    const response = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem),
    });

    const data = await response.json();

    setFeedback(feedback.map((item) => (item.id === id ? data : item)));
    setFeedbackEdit({
      feed: {},
      edit: false,
    });
  };

  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure, you want to delete')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      });
      setFeedback(feedback.filter((feed) => feed.id !== id));
    }
  };
  const addFeedback = async (newFeedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    });

    const data = await res.json();
    setFeedback([data, ...feedback]);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
        deleteFeedback,
        addFeedback,
        feedbackEdit,
        editFeedback,
        updateFeedback,
        isLoading,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
