const SearchBar = ({ handleSearch }) => {
  return (
    <section>
      <form action="">
        <input type="text" placeholder="search..." onChange={handleSearch} />
      </form>
    </section>
  );
};
export default SearchBar