import { BsArrowLeft } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const BackButton = ({ destination = "/" }) => {
  return (
    <div>
      <Link
        to={destination}
        className="
      inline-flex
      items-center
      gap-2
      text-gray-600
      hover:text-sky-600
      font-medium
      transition-colors
      duration-200
    "
      >
        <BsArrowLeft className="text-xl" />
        <span>Back</span>
      </Link>
    </div>
  )
}

export default BackButton
