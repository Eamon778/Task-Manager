import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

function CreateBooks() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishYear, setPublishYear] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            await axios.post("http://localhost:3000/api/books", {
                title,
                author,
                publishYear,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-8">Add Book</h1>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-4">
                    <label htmlFor="title" className="mb-2">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        className="p-2 border border-gray-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="author" className="mb-2">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(event) => setAuthor(event.target.value)}
                        className="p-2 border border-gray-400"
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="publishYear" className="mb-2">Publish Year</label>
                    <input
                        type="number"
                        id="publishYear"
                        value={publishYear}
                        onChange={(event) => setPublishYear(event.target.value)}
                        className="p-2 border border-gray-400"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-sky-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save"}
                </button>
            </form>
        </div>
    );
}

export default CreateBooks;