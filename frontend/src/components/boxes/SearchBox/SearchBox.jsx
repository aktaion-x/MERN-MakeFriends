import './SearchBox.css';

const SearchBox = () => {
  return (
    <div className="search-box">
      <form>
        <button>
          <span className="material-symbols-outlined">person_search</span>
        </button>
        <input type="text" placeholder="Search" />
      </form>
    </div>
  );
};

export default SearchBox;
