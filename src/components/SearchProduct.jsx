/**
 * It renders both a textfield to collect a search
 * string and a button to lookup the given search tring.
 */

const SearchProducts = ({ handleSearch, onSearchStringChange }) => {

  return (
    <div className="mx-60 flex flex-row justify-start my-8 gap-8 p-2">
      <input
        type="text"
        name="searcString"
        id="searcString"
        onChange={onSearchStringChange}
        className="rounded-md p-2 border-2 border-slate-900"
      />
      <input
        type="button"
        value="Search"
        onClick={handleSearch}
        className="bg-slate-900 text-slate-400 py-2 px-5 rounded-md hover:bg-slate-950 hover:text-slate-200 hover:cursor-pointer "
      />
    </div>
  );
};

export default SearchProducts;
