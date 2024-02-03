import React, { useEffect, useState } from "react";
import {  useNavigate, useSearchParams } from "react-router-dom";
import Modal from "./Model";
import ModelHeader from "./ModelHeader";
import Contacts from "./Contacts";

const Problem2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [count, setCount] = useState(10);

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFetchParams = {
    query: "",
    endpoint: "contacts/",
    page: 1
  };

  const [fetchParams, setFetchParams] = useState(defaultFetchParams);

  const updateSearchParams = (params) => {
    const updatedParams = { ...fetchParams, ...params, };
    const searchString = new URLSearchParams(updatedParams).toString();
    navigate({ search: searchString });
  };

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://contact.mediusware.com/api/${fetchParams.endpoint}?page=${fetchParams.page}&page_size=10${
          fetchParams.query ? `&search=${fetchParams.query}` : ""
        }`
      );

      if (!response.ok) {
        setIsLoading(false);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const jsonData = await response.json();
      setCount(jsonData?.count || 0);
      setData((prevData) => [...prevData, ...jsonData.results]);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error("Error during fetch:", error.message);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setData([]);
    setFetchParams(defaultFetchParams);
    updateSearchParams({ showModal: false });
  };

  const handleOpenModal = (contactType) => {
    setShowModal(true);
    setData([]);
    const endpoint =
      contactType === "us_contact"
        ? "country-contacts/United%20States/"
        : "contacts/";
    const params = { endpoint, page: 1 };
    setFetchParams(params);
    updateSearchParams({ ...params, showModal: true });
  };
  const updatePage = () => {
    setFetchParams((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1
    }));
    updateSearchParams({ page: fetchParams.page + 1, showModal });
  };
  const onSearch = (value) => {
    setData([]);
    if (value === "") {
      setCount(10);
    }
    setFetchParams((prevParams) => ({
      ...prevParams,
      query: value,
      page: 1
    }));
    updateSearchParams({ query: value, page: 1, showModal });
  };

  useEffect(() => {
    setShowModal(searchParams.get("showModal") === "true");
    setFetchParams({
      query: searchParams.get("query") || "",
      endpoint: searchParams.get("endpoint") || "contacts/",
      page: parseInt(searchParams.get("page")) || 1
    });
  }, []);

  useEffect(() => {
    if (showModal && data.length < count) {
      fetchData();
    }
  }, [fetchParams, showModal]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-a"
            type="button"
            onClick={() => handleOpenModal("contacts")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-b"
            type="button"
            onClick={() => handleOpenModal("us_contact")}
          >
            US Contacts
          </button>
        </div>
      </div>
      {showModal && (
        <Modal
          show={showModal}
          hideModal={handleCloseModal}
          header={
            <ModelHeader
              onSearch={onSearch}
              active={fetchParams.endpoint}
              handleOpenModal={handleOpenModal}
              handleCloseModal={handleCloseModal}
            />
          }
        >
          <Contacts isLoading={isLoading} data={data} updatePage={updatePage} />
        </Modal>
      )}
    </div>
  );
};

export default Problem2;