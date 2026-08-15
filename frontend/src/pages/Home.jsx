import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import Spinner from '../components/Spinner';
import { useState } from 'react';
import { useEffect } from 'react';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

function Home() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');


  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8000/api/books/list')
      .then((response) => {
        // console.log(response.data.book)
        setBooks(response.data.book);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5 mb-8">

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              Books List
            </h1>

            <p className="mt-2 text-gray-500">
              Browse and manage your book collection.
            </p>
          </div>

          {/* Add Book Button */}
          <Link
            to="/books/create"
            className="
          inline-flex
          items-center
          justify-center
          gap-2
          bg-sky-500
          hover:bg-sky-600
          active:bg-sky-700
          text-white
          font-semibold
          px-5
          py-3
          rounded-lg
          shadow-sm
          hover:shadow-md
          transition-all
          duration-200
        "
          >
            <MdOutlineAddBox className="text-2xl" />
            <span>Add Book</span>
          </Link>

        </div>

        {/* View Toggle */}
        <div className="flex justify-center sm:justify-start mb-6">
          <div className="inline-flex bg-white border border-gray-200 rounded-lg p-1 shadow-sm">

            <button
              onClick={() => setShowType("table")}
              className={`
            px-5 py-2
            rounded-md
            font-medium
            transition-all
            duration-200
            ${showType === "table"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                }
          `}
            >
              Table
            </button>

            <button
              onClick={() => setShowType("card")}
              className={`
            px-5 py-2
            rounded-md
            font-medium
            transition-all
            duration-200
            ${showType === "card"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-gray-600 hover:bg-gray-100"
                }
          `}
            >
              Card
            </button>

          </div>
        </div>

        {/* Books Content */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Spinner />
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
            {showType === "table" ? (
              <BooksTable books={books} />
            ) : (
              <BooksCard books={books} />
            )}
          </div>
        )}

      </div>
    </div>
  )
}

export default Home