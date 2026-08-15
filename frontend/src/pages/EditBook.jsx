import { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function EditBook() {

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/books/details/${id}`)
      .then((response) => {
        // console.log(response.data.book);
        setAuthor(response.data.book.author);
        setPublishYear(response.data.book.publishYear);
        setTitle(response.data.book.title);
        setDescription(response.data.book.description);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
      description
    };
    setLoading(true);
    axios.put(`http://localhost:8000/api/books/edit/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Edit Book
          </h1>
          <p className="mt-2 text-gray-500">
            Update the details of this book.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 sm:p-8">

          {loading ? (
            <div className="flex justify-center items-center py-4">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-6">

              {/* Title */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Title
                </label>

                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter book title"
                  className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                text-gray-800
                placeholder-gray-400
                outline-none
                transition
                focus:border-sky-500
                focus:ring-2
                focus:ring-sky-100
              "
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>

                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Enter author name"
                  className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                text-gray-800
                placeholder-gray-400
                outline-none
                transition
                focus:border-sky-500
                focus:ring-2
                focus:ring-sky-100
              "
                />
              </div>

              {/* Publish Year */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publish Year
                </label>

                <input
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  placeholder="e.g. 2024"
                  className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                text-gray-800
                placeholder-gray-400
                outline-none
                transition
                focus:border-sky-500
                focus:ring-2
                focus:ring-sky-100
              "
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>

                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a short description of the book..."
                  rows={5}
                  className="
                w-full
                px-4 py-3
                border border-gray-300
                rounded-lg
                text-gray-800
                placeholder-gray-400
                outline-none
                resize-none
                transition
                focus:border-sky-500
                focus:ring-2
                focus:ring-sky-100
              "
                />
              </div>

              {/* Edit Button */}
              <div className="pt-2">
                <button
                  onClick={handleEditBook}
                  className="
                w-full
                bg-sky-500
                hover:bg-sky-600
                active:bg-sky-700
                text-white
                font-semibold
                py-3
                px-6
                rounded-lg
                shadow-sm
                hover:shadow-md
                transition-all
                duration-200
                cursor-pointer
              "
                >
                  Save Changes
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default EditBook;