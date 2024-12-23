import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useParams } from "react-router-dom";

function showBooks() {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/books/${id}`)
      .then((response) => {
        setBook(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id])

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Show Book</h1>
      {loading ? (<Spinner />) : (
        <div className="flex flex-col items-center">
          <div className="my-4">
            <span className="font-semibold">Title:</span> {book.title}
          </div>
          <div className="my-4">
            <span className="font-semibold">Author:</span> {book.author}
          </div>
          <div className="my-4">
            <span className="font-semibold">Publish Year:</span> {book.publishYear}
          </div>
        </div>
      )}
    </div>
  );
}

export default showBooks;