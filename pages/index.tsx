import axios from "axios";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GetServerSideProps } from "next";
import Router from "next/router";
import Link from "next/link";

import Card from "../components/Card";
import Navbar from "../components/Navbar";
import { baseUrl, mainUrl } from "../utils";

const filterOptions = ["Africa", "America", "Asia", "Europe", "Oceania"];
let controller = null;

const HomePage = (props: any) => {
  const [search, setSearch] = useState(props.search || "");
  const [currentFilter, setCurrentFilter] = useState(
    props.region || "Filter by Region"
  );
  const [filterOpen, setFilterOpen] = useState(false);
  const [countries, setCountries] = useState(props.data || []);
  const [isLoading, setLoading] = useState(false);

  const handleFiltersText = useCallback(
    (text: string) => {
      setCurrentFilter(text);
      handleCloseFilters();
      setSearch("");
    },
    [search]
  );

  const isMounted = useRef(null);
  const timerId = useRef(null);

  const debounce = useCallback(
    (func: Function, delay: number) => {
      if (timerId.current) {
        clearInterval(timerId.current);
      }
      timerId.current = setTimeout(func, delay);
    },
    [timerId.current]
  );

  const getCountriesOnSearch = useCallback(async () => {
    const queryUrl = `${baseUrl}name/${search}`;
    if (controller) {
      controller.abort();
    }
    controller = new AbortController();
    try {
      setLoading(true);
      const { data } = await axios.get(search ? queryUrl : mainUrl, {
        signal: controller.signal,
      });
      setCountries(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setCountries([]);
    }
  }, [search]);

  const debounced = useCallback(() => {
    debounce(getCountriesOnSearch, 1000);
  }, [search]);

  const filterByRegion = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}region/${currentFilter}`);
      setCountries(data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setCountries([]);
    }
  }, [currentFilter]);

  const handleCloseFilters = useCallback(() => {
    setFilterOpen(false);
  }, []);

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setSearch(e.target.value);
      setCurrentFilter("Filter by Region");
    },
    []
  );

  const handleFiltersSwitch = useCallback(
    () => setFilterOpen((prev) => !prev),
    []
  );

  useEffect(() => {
    if (isMounted.current) {
      if (search) {
        Router.replace(`${Router.basePath}?search=${search}`, undefined, {
          shallow: true,
        });
      } else {
        Router.replace(`${Router.basePath}`, undefined, { shallow: true });
      }
      debounced();
    }
  }, [search]);

  useEffect(() => {
    if (isMounted.current) {
      Router.replace(`${Router.basePath}?region=${currentFilter}`, undefined, {
        shallow: true,
      });
      filterByRegion();
    }
  }, [currentFilter]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  return (
    <>
      <div
        className="app-container"
        onClick={filterOpen ? handleCloseFilters : null}
      >
        <main className="main">
          <Navbar />
          <div className="sub-navbar">
            <div className="search">
              <AiOutlineSearch className="icon" />
              <input
                type="text"
                value={search}
                onChange={handleSearch}
                placeholder="Search for a country..."
              />
            </div>
            <div className="filters">
              <div className="filter-heading" onClick={handleFiltersSwitch}>
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
            {isLoading ? (
              <h1 className="loading">Loading...</h1>
            ) : countries.length ? (
              countries.map((el: any, i: number) => (
                <Link href={`/${el.cca2}`} key={i}>
                  <a>
                    <Card cardData={el} />
                  </a>
                </Link>
              ))
            ) : (
              <h1>No data found.</h1>
            )}
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
            width: 100%;
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
            font-weight: 600;
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
            cursor: pointer;
          }

          .countries {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 36px;
            gap: 36px;
            min-height: 75vh;
          }

          .loading {
            min-height: 75vh;
            display: flex;
            justify-content: center;
            align-items: center;
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query;
  try {
    const { data } = await axios.get(
      query.search
        ? `${baseUrl}name/${query.search}`
        : query.region
        ? `${baseUrl}region/${query.region}`
        : mainUrl
    );
    return {
      props: {
        data,
        region: query.region ? query.region : null,
        search: query.search ? query.search : null,
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
