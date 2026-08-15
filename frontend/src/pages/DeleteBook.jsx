import { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:8000/api/books/delete/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

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
            Delete Book
          </h1>
          <p className="mt-2 text-gray-500">
            Permanently remove this book from your store.
          </p>
        </div>

        {/* Delete Confirmation Card */}
        <div className="max-w-xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">

          {loading ? (
            <div className="flex justify-center items-center py-6">
              <Spinner />
            </div>
          ) : (
            <div className="text-center">

              {/* Warning Icon */}
              <div className="flex justify-center mb-5">
                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-8 h-8 text-red-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3.75m0 3.75h.007v.008H12v-.008ZM10.5 3.75h3L19.5 18.75h-15L10.5 3.75Z"
                    />
                  </svg>
                </div>
              </div>

              {/* Confirmation Message */}
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                Are you sure?
              </h2>

              <p className="mt-3 text-gray-500 leading-relaxed">
                Are you sure you want to delete this book? This action cannot be
                undone.
              </p>

              {/* Delete Button */}
              <button
                onClick={handleDeleteBook}
                className="
              mt-7
              w-full
              bg-red-600
              hover:bg-red-700
              active:bg-red-800
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
                Yes, Delete Book
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default DeleteBook;