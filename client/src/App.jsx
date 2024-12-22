import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/books');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Await the parsed JSON response
        if (result.success) {
          setBooks(result.data); // Access the "data" property
        } else {
          throw new Error('Failed to fetch books');
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures it runs once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {books.length > 0 ? (
        books.map((book) => (
          <div key={book._id}>
            <h1>{book.title}</h1>
            <p>Author: {book.author}</p>
            <p>Published Year: {book.publishYear}</p>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
