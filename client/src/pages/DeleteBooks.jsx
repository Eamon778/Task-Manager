import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import { useNavigate, useParams } from 'react-router-dom'

function DeleteBooks() {
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { id } = useParams()
  
  const deleteBook = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${id}`)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-8">Delete Book</h1>
      <button onClick={deleteBook} className="p-2 bg-red-500 text-white rounded">Delete</button>
    </div>
  )
}

export default DeleteBooks;