import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineDelete } from 'react-icons/md';

const BooksTable = ({ books }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[650px] text-sm text-left text-gray-600">

        {/* Table Header */}
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-4 text-center rounded-l-lg"
            >
              No
            </th>

            <th
              scope="col"
              className="px-6 py-4"
            >
              Title
            </th>

            <th
              scope="col"
              className="px-6 py-4 max-md:hidden"
            >
              Author
            </th>

            <th
              scope="col"
              className="px-6 py-4 max-md:hidden"
            >
              Publish Year
            </th>

            <th
              scope="col"
              className="px-6 py-4 text-center rounded-r-lg"
            >
              Operations
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {books.map((book, index) => (
            <tr
              key={book._id}
              className="
            bg-white
            border-b
            border-gray-100
            hover:bg-sky-50
            transition-colors
            duration-200
          "
            >

              {/* Number */}
              <td className="px-6 py-4 text-center font-medium text-gray-500">
                {index + 1}
              </td>

              {/* Title */}
              <td className="px-6 py-4">
                <Link
                  to={`/books/details/${book._id}`}
                  className="
                font-semibold
                text-gray-800
                hover:text-sky-600
                transition-colors
                duration-200
              "
                >
                  {book.title}
                </Link>
              </td>

              {/* Author */}
              <td className="px-6 py-4 max-md:hidden">
                {book.author}
              </td>

              {/* Publish Year */}
              <td className="px-6 py-4 max-md:hidden">
                {book.publishYear}
              </td>

              {/* Operations */}
              <td className="px-6 py-4">
                <div className="flex justify-center items-center gap-3">

                  {/* View */}
                  <Link
                    to={`/books/details/${book._id}`}
                    title="View Book"
                    className="
                  flex
                  items-center
                  justify-center
                  w-9
                  h-9
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
                  w-9
                  h-9
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
                  w-9
                  h-9
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
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default BooksTable;