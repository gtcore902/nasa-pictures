// Import the toast function from the 'react-hot-toast' library for displaying notifications.
// Documentation at https://react-hot-toast.com/
import toast from 'react-hot-toast';

// Define a function to display a success notification with the given text.
export const notify = (text) => {
  toast.success(text);
};
