import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";

import Navbar from "../components/Navbar";

const filterOptions = ["Africa", "America", "Asia", "Europe", "Oceania"];

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("Filter by Region");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFiltersText = (text) => {
    setCurrentFilter(text);
    setFilterOpen(false);
  };

  return (
    <>
      <div className="app-container">
        <main className="main">
          <Navbar />
          <div className="sub-navbar">
            <div className="search">
              <AiOutlineSearch className="icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a country..."
              />
            </div>
            <div className="filters">
              <div
                className="filter-heading"
                onClick={() => setFilterOpen((prev) => !prev)}
              >
                <p>{currentFilter}</p>
                <MdKeyboardArrowDown />
              </div>
              {filterOpen ? (
                <div className="options">
                  {filterOptions.map((el) => (
                    <div
                      onClick={() => handleFiltersText(el)}
                      className="option"
                    >
                      {el}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </main>
      </div>
      <style jsx>
        {`
          .app-container {
            background-color: #fafafa;
            padding: 12px;
            margin-top: 64px;
            height: 100vh;
          }

          .sub-navbar {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }

          .search {
            display: flex;
            align-items: center;
            padding: 18px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            font-size: 16px;
            gap: 12px;
          }

          .search > input::placeholder {
            color: #d4d1d1;
          }

          .search > input {
            border: none;
            font-size: 12px;
          }

          .search > input:focus {
            outline: none;
          }

          .search :global(.icon) {
            color: hsl(0, 1%, 72%);
            font-weight: 500;
          }

          .filters {
            max-width: 200px;
            position: relative;
          }

          .filter-heading {
            display: flex;
            align-items: center;
            padding: 18px;
            background-color: #fff;
            border-radius: 4px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            gap: 12px;
            justify-content: space-between;
            cursor: pointer;
          }

          .filter-heading > p {
            font-size: 12px;
          }

          .options {
            position: absolute;
            margin-top: 2px;
            background-color: #fff;
            width: 200px;
            border-radius: 4px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 12px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            padding: 12px 0px;
          }

          .option {
            padding: 4px 16px;
          }
        `}
      </style>
    </>
  );
};

export default HomePage;
