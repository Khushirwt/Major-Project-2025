import React, { useEffect } from 'react';
import axios from 'axios';

const SummarizeForm = () => {
  const [url, setUrl] = useState(''); // To store user input URL
  const [summary, setSummary] = useState(''); // To store the summarized text

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    try {
      // Sending POST request with the URL entered by the user
      const response = await axios.post('http://localhost:5000/summarize', { url });

      // Storing the summary from the backend
      setSummary(response.data.summary);
    } catch (error) {
      console.error('Error summarizing video:', error);
    }
  };

  // Handle mobile menu toggle
  useEffect(() => {
    const menuButton = document.querySelector('[data-collapse-toggle="navbar-user"]');
    const menu = document.getElementById('navbar-user');

    if (menuButton) {
      menuButton.addEventListener('click', () => {
        menu.classList.toggle('hidden');
      });
    }

    // Cleanup event listener
    return () => {
      if (menuButton) {
        menuButton.removeEventListener('click', () => {
          menu.classList.toggle('hidden');
        });
      }
    };
  }, []);

  return (
    <div className="container">
      <h1>Summarize YouTube Video</h1>

      {/* Input field to enter the YouTube URL */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter YouTube URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)} // Update URL state on input change
          className="border-2 p-2"
        />

        {/* Summarize button */}
        <button type="submit" className="bg-blue-500 text-white p-2">
          Summarize
        </button>
      </form>

      {/* Display the summary */}
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SummarizeForm;
