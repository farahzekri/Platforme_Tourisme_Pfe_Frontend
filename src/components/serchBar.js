import { FaSearch, FaCalendarAlt, FaDollarSign, FaUsers, FaBed } from "react-icons/fa";

const SearchBar = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-10">
      <form className="grid grid-cols-6 gap-4 items-center">
        {/* Destination */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">DESTINATION</label>
          <div className="flex items-center border-b-2 border-gray-300 py-2">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search place"
              className="outline-none w-full"
            />
          </div>
        </div>

        {/* Check-in Date */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">CHECK-IN DATE</label>
          <div className="flex items-center border-b-2 border-gray-300 py-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input type="date" className="outline-none w-full" />
          </div>
        </div>

        {/* Check-out Date */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">CHECK-OUT DATE</label>
          <div className="flex items-center border-b-2 border-gray-300 py-2">
            <FaCalendarAlt className="text-gray-500 mr-2" />
            <input type="date" className="outline-none w-full" />
          </div>
        </div>

        {/* Price Limit */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">PRICE LIMIT</label>
          <div className="flex items-center border-b-2 border-gray-300 py-2">
            <FaDollarSign className="text-gray-500 mr-2" />
            <select className="outline-none w-full bg-transparent">
              <option>$5,000</option>
              <option>$10,000</option>
              <option>$50,000</option>
            </select>
          </div>
        </div>

        {/* Number of People and Rooms */}
        <div className="flex flex-col">
          <label className="text-sm font-bold text-gray-700">GUESTS & ROOMS</label>
          <div className="flex items-center border-b-2 border-gray-300 py-2 gap-2">
            <FaUsers className="text-gray-500" />
            <input type="number" min="1" placeholder="Adults" className="outline-none w-1/3 text-center" />
            <input type="number" min="0" placeholder="Children" className="outline-none w-1/3 text-center" />
            <FaBed className="text-gray-500" />
            <input type="number" min="1" placeholder="Rooms" className="outline-none w-1/3 text-center" />
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center items-end">
          <button className="bg-orange-500 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-600 transition">
            SEARCH
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
