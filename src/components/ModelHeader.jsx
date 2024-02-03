import React, {  useState } from "react";
import useDebounce from "../hooks/useDebounce";

const Header = ({ handleCloseModal, handleOpenModal, active, onSearch}) => {
  const [query, setQuery] = useState("");

  const handleSearch = useDebounce((query) => {
    // Perform search operation with the debounced term
    onSearch(query)
  }, 500);

  const handleChange = (event) => {
    const { value } = event.target;
    setQuery(value);

    // Debounce the search callback
    handleSearch(value);
  };
  return (
    <div className=" col-12">
      <div className="d-flex  gap-3 ">
        <button
          onClick={() => handleOpenModal("all_contact")}
          className={`btn  btn-a ${active === "contacts/" ? "active" : ""}`}
          type="button">
          All Contacts
        </button>
        <button
          className={`btn btn-b ${
            active === "country-contacts/United%20States/" ? "active" : ""
          }`}
          type="button"
          onClick={() => handleOpenModal("us_contact")}>
          US Contacts
        </button>
        <button
          className="btn position-absolute end-5  btn btn-a mr-2"
          onClick={handleCloseModal}>
          Close
        </button>
      </div>
      <div className="col-12  mt-3">
        <label className="form-label">Search Contact :</label>
        <input
         value={query}
         onChange={handleChange}
          type="search"
          className="form-control "
          placeholder="Search your contact"
        />
      </div>
    </div>
  );
};

export default Header;
