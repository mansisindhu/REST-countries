import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import Card from "../components/Card";

import Navbar from "../components/Navbar";

const filterOptions = ["Africa", "America", "Asia", "Europe", "Oceania"];

const HomePage = (props) => {
  const [search, setSearch] = useState("");
  const [currentFilter, setCurrentFilter] = useState("Filter by Region");
  const [filterOpen, setFilterOpen] = useState(false);

  const handleFiltersText = (text: string) => {
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
                      key={el}
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

          <div className="countries">
            {props.data.map((el, i: number) => (
              <Card cardData={el} key={i} />
            ))}
          </div>
        </main>
      </div>
      <style jsx>
        {`
          .app-container {
            background-color: #fafafa;
            padding: 12px;
            padding-top: 86px;
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
            border-radius: 3px;
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
            border-radius: 3px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            gap: 12px;
            justify-content: space-between;
            cursor: pointer;
            width: 200px;
          }

          .filter-heading > p {
            font-size: 12px;
          }

          .options {
            position: absolute;
            margin-top: 4px;
            background-color: #fff;
            width: 200px;
            border-radius: 3px;
            display: flex;
            flex-direction: column;
            gap: 4px;
            font-size: 12px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            padding: 12px 0px;
            z-index: 1;
          }

          .option {
            padding: 4px 16px;
          }

          .countries {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 36px;
            gap: 36px;
          }

          @media (min-width: 768px) {
            .main {
              max-width: 1120px;
              margin: auto;
            }

            .sub-navbar {
              flex-direction: row;
              justify-content: space-between;
            }

            .search {
              min-width: 400px;
            }

            .countries {
              flex-direction: row;
              flex-wrap: wrap;
              justify-content: center;
              gap: 64px;
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const { data } = await axios.get("https://restcountries.com/v3.1/all");
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
      },
      notFound: true,
    };
  }
};

export default HomePage;
