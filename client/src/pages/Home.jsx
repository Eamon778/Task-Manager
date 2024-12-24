import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete, MdOutlineAddBox } from 'react-icons/md';

function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get('https://book-list-fg3g.onrender.com/api/books')
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError('Failed to fetch books. Please try again later.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create" aria-label="Add Book">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : books.length === 0 ? (
        <div className="text-center text-gray-500">No books found.</div>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">No.</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Author</th>
              <th className="border p-2">Publish Year</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td className='border text-center p-2'>{index + 1}</td>
                <td className="border text-center p-2">{book.title}</td>
                <td className="border text-center p-2">{book.author}</td>
                <td className="border text-center p-2">{book.publishYear}</td>
                <td className="border p-2 flex justify-center items-center">
                  <Link to={`/books/details/${book._id}`} aria-label="View Book Details">
                    <BsInfoCircle className="text-blue-500 text-2xl mr-2" />
                  </Link>
                  <Link to={`/books/edit/${book._id}`} aria-label="Edit Book">
                    <AiOutlineEdit className="text-yellow-500 text-2xl mr-2" />
                  </Link>
                  <Link to={`/books/delete/${book._id}`} aria-label="Delete Book">
                    <MdOutlineDelete className="text-red-500 text-2xl" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Home;
