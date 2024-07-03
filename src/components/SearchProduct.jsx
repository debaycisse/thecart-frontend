const SearchProducts = ({handleSearch, onSearchStringChange}) => {
  // Display both Text field to take input for search
  // And a button to send the search request. -> This button will its click event, handled by the above prop
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