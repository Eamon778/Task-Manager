import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'

function EditBooks() {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        axios
            .get(`https://book-list-fg3g.onrender.com/api/books/${id}`)
            .then((response) => {
                setTitle(response.data.data.title)
                setAuthor(response.data.data.author)
                setPublishYear(response.data.data.publishYear)
                setLoading(false)
            })
            .catch((error) => {
                console.error(error)
                setLoading(false)
            })
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:3000/api/books/${id}`, {
                title,
                author,
                publishYear
            })
            navigate('/')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-8">Edit Book</h1>
            {loading ? (
                <Spinner />
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-4 max-w-md">
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <label htmlFor="author">Author</label>
                        <input
                            type="text"
                            id="author"
                            name="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <label htmlFor="publishYear">Publish Year</label>
                        <input
                            type="text"
                            id="publishYear"
                            name="publishYear"
                            value={publishYear}
                            onChange={(e) => setPublishYear(e.target.value)}
                            className="p-2 border border-gray-300 rounded"
                        />
                        <button
                            type="submit"
                            className="p-2 bg-blue-500 text-white rounded"
                        >
                            Update Book
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}  

export default EditBooks