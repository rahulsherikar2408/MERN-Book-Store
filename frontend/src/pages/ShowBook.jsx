import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

function ShowBook() {

  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/books/details/${id}`)
      .then((response) => {
        // console.log("data:", response.data.book);
        setBook(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            Book Details
          </h1>
          <p className="mt-2 text-gray-500">
            View detailed information about this book.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

            {/* Book Header */}
            <div className="bg-sky-50 px-6 sm:px-8 py-6 border-b border-gray-200">
              <p className="text-sm font-medium text-sky-600 mb-2">
                BOOK DETAILS
              </p>

              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {book.title}
              </h2>

              <p className="mt-2 text-gray-600">
                by <span className="font-medium">{book.author}</span>
              </p>
            </div>

            {/* Book Information */}
            <div className="p-6 sm:p-8">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                {/* Book ID */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Book ID
                  </p>
                  <p className="text-gray-800 font-medium break-all">
                    {book._id}
                  </p>
                </div>

                {/* Author */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Author
                  </p>
                  <p className="text-gray-800 font-medium">
                    {book.author}
                  </p>
                </div>

                {/* Publish Year */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Publish Year
                  </p>
                  <p className="text-gray-800 font-medium">
                    {book.publishYear}
                  </p>
                </div>

                {/* Created At */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Created At
                  </p>
                  <p className="text-gray-800">
                    {new Date(book.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Updated At */}
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">
                    Last Updated
                  </p>
                  <p className="text-gray-800">
                    {new Date(book.updatedAt).toLocaleString()}
                  </p>
                </div>

              </div>

              {/* Description */}
              {book.description && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-500 mb-2">
                    Description
                  </p>

                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {book.description}
                  </p>
                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default ShowBook;