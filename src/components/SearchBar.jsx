/**
 * @fileOverview SearchBar component
 * @param {string} handleSearch - value of the search input
 * @returns 
 */
const SearchBar = ({ handleSearch }) => {
  return (
    
      <form action="">
        <input type="text" placeholder="search..." onChange={handleSearch} />
      </form>
  );
};
export default SearchBar