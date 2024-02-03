import React, { useEffect, useState } from "react";

import useInView from "../hooks/useInView";
import Skeleton from "./Skeleton";
import Modal from "./Model";

const Contacts = ({ isLoading, data, updatePage }) => {
  const [onlyEvenChecked, setOnlyEvenChecked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState(null);

  const handleCheckboxChange = () => {
    setOnlyEvenChecked(!onlyEvenChecked);
  };

  const handleCountryDetails = (details) => {
    setShowDetails(true);
    setDetails(details);
  };

  const { ref, inView } = useInView({ thresholds: [2] });
  useEffect(() => {
    console.log("useEffect triggered");
    console.log("inView:", inView);
    if (inView) {
     
      updatePage();
     
    }
  }, [inView]);
  return (
    <div>
      <div style={{ maxHeight: "60vh", overflowY: "scroll" }}>
        {data.length > 0 && (
          <table className="table table-striped ">
            <thead className="sticky-top">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Status</th>
                <th scope="col">Country ID</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((dt) => (onlyEvenChecked ? dt.id % 2 === 0 : true))
                .map((dt) => (
                  <tr
                    key={`data_${dt?.id}`}
                    onClick={() => handleCountryDetails(dt)}>
                    <td className="text-capitalize">#{dt.id}</td>
                    <td className="text-capitalize">{dt.phone}</td>
                    <td className="text-capitalize">{dt.country.id}</td>
                    <td className="text-capitalize">{dt.country.name}</td>
                  </tr>
                ))}
              {isLoading && <Skeleton count={10} />}
              {data.length > 0 && (
                <tr
                  ref={ref}
                  colSpan={4}
                  className="w-100"
                  style={{
                    height: "100px",
                    width: "100%",
                    backgroundColor: "Transparent"
                  }}></tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      {/* Checkbox */}
      <div className="form-check mt-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="onlyEvenCheckbox"
          checked={onlyEvenChecked}
          onChange={handleCheckboxChange}
        />
        <label className="form-check-label" htmlFor="onlyEvenCheckbox">
          Only even
        </label>
      </div>
      <Modal
        backdrop="static"
        show={showDetails}
        centered
        header={
          <>
            <h2 className="model-details-title">Country Details</h2>

            <button
              className="btn position-absolute end-5  btn btn-a mr-2"
              onClick={() => setShowDetails(false)}>
              Close
            </button>
          </>
        }
        hideModal={() => setShowDetails(false)}>
        <div className="model-details">
          <h4 className="model-details__title">
            Country: {details?.country?.name}
          </h4>
          <p className="model-details__subtitle">
            Phone: {details?.phone}
          </p>
          <p className="model-details__subtitle">
            #Id: {details?.id}
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Contacts;
