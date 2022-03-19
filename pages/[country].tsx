import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { BsArrowLeft } from "react-icons/bs";

import Navbar from "../components/Navbar";

const CountryPage = (props: any) => {
  console.log(props);
  return (
    <>
      <div className="app-container">
        <main className="main">
          <Navbar />
          <div className="back">
            <BsArrowLeft />
            <p>Back</p>
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

          .main {
            display: flex;
            flex-direction: column;
          }

          .back {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 88px;
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 5px rgb(0 0 0 / 20%);
            padding: 6px 12px;
            font-size: 14px;
          }

          @media (min-width: 768px) {
            .main {
              max-width: 1120px;
              margin: auto;
            }
          }
        `}
      </style>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/alpha/${context.params.country}`
    );
    return {
      props: {
        data: data[0],
      },
    };
  } catch (err) {
    return {
      props: {
        data: [],
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export default CountryPage;
