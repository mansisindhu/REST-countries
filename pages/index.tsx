import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import Navbar from "../components/Navbar";

const HomePage = () => {
  const [search, setSearch] = useState("");

  return (
    <>
      <div className="app-container">
        <main className="main">
          <Navbar />
          <div className="filters">
            <div className="search">
              <AiOutlineSearch className="icon" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for a country..."
              />
            </div>
            <div className="filters"></div>
          </div>
        </main>
      </div>
      <style jsx>
        {`
          .app-container {
            background-color: #fafafa;
            padding: 12px;
            margin-top: 64px;
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
        `}
      </style>
    </>
  );
};

export default HomePage;
