const SearchBar = ({ handleSearch }) => {
  return (
    
      <form action="">
        <input type="text" placeholder="search..." onChange={handleSearch} />
      </form>
  );
};
export default SearchBar