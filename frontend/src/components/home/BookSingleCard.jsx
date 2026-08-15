import { Link } from 'react-router-dom';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BookSingleCard = ({ book }) => {

  return (
    <div
      className="
    group
    relative
    bg-white
    border
    border-gray-200
    rounded-2xl
    p-5
    shadow-sm
    hover:shadow-lg
    hover:-translate-y-1
    transition-all
    duration-300
  "
    >
      {/* Publish Year */}
      <span
        className="
      absolute
      top-4
      right-4
      bg-sky-100
      text-sky-700
      text-sm
      font-semibold
      px-3
      py-1
      rounded-full
    "
      >
        {book.publishYear}
      </span>

      {/* Book ID */}
      <p
        className="
      text-xs
      text-gray-400
      mb-4
      truncate
      pr-20
    "
        title={book._id}
      >
        ID: {book._id}
      </p>

      {/* Book Title */}
      <div className="flex items-start gap-3 mb-4">
        <div
          className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        bg-sky-100
        shrink-0
      "
        >
          <PiBookOpenTextLight className="text-sky-600 text-2xl" />
        </div>

        <div className="min-w-0">
          <h2
            className="
          text-lg
          font-semibold
          text-gray-800
          line-clamp-2
          group-hover:text-sky-600
          transition-colors
          duration-200
        "
            title={book.title}
          >
            {book.title}
          </h2>
        </div>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        bg-gray-100
        shrink-0
      "
        >
          <BiUserCircle className="text-gray-600 text-2xl" />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-gray-400">
            Author
          </p>

          <p
            className="text-sm font-medium text-gray-700 truncate"
            title={book.author}
          >
            {book.author}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-5"></div>

      {/* Operations */}
      <div className="flex items-center justify-between">

        {/* Details */}
        <Link
          to={`/books/details/${book._id}`}
          title="View Details"
          className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        text-sky-600
        hover:bg-sky-100
        hover:text-sky-700
        transition-all
        duration-200
      "
        >
          <BsInfoCircle className="text-xl" />
        </Link>

        {/* Edit */}
        <Link
          to={`/books/edit/${book._id}`}
          title="Edit Book"
          className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        text-amber-500
        hover:bg-amber-100
        hover:text-amber-600
        transition-all
        duration-200
      "
        >
          <AiOutlineEdit className="text-xl" />
        </Link>

        {/* Delete */}
        <Link
          to={`/books/delete/${book._id}`}
          title="Delete Book"
          className="
        flex
        items-center
        justify-center
        w-10
        h-10
        rounded-lg
        text-red-500
        hover:bg-red-100
        hover:text-red-600
        transition-all
        duration-200
      "
        >
          <MdOutlineDelete className="text-xl" />
        </Link>

      </div>
    </div>
  );
};

export default BookSingleCard;