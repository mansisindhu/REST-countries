import axios from "axios";
import { GetStaticPaths, GetStaticProps } from "next";
import { BsArrowLeft } from "react-icons/bs";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "../components/Navbar";
import { mainUrl } from "../utils";

const CountryPage = (props: any) => {
  const router = useRouter();

  if (router.isFallback) {
    return <p>Loading....</p>;
  }

  const { data } = props;

  const handleReturn = useCallback(() => {
    const { history } = window;
    if (history.state.idx === 0) {
      router.push("/");
    } else {
      router.back();
    }
  }, []);

  return (
    <>
      <div className="app-container">
        <main className="main">
          <Navbar />
          <div className="back" onClick={handleReturn}>
            <BsArrowLeft />
            <p>Back</p>
          </div>
          <div className="wrapper">
            <div className="main-info">
              <div className="flag">
                <AnimatePresence key={data.cca2}>
                  <motion.img
                    layoutId={`card-image-container-${data.cca2}`}
                    src={data.flags?.svg}
                    alt="flag"
                    width={400}
                    height={220}
                    key={data.cca2}
                  />
                </AnimatePresence>
              </div>
              <div className="details">
                <p className="name">{data.name.common}</p>
                <div className="flex">
                  <div className="info">
                    <p>
                      Native Name:{" "}
                      <span className="span">
                        {data.name?.nativeName?.spa?.official ||
                          data.name.common}
                      </span>
                    </p>
                    <p>
                      Population:{" "}
                      <span className="span">
                        {data.population.toLocaleString()}
                      </span>
                    </p>
                    <p>
                      Region: <span className="span">{data.region}</span>
                    </p>
                    <p>
                      Sub Region: <span className="span">{data.subregion}</span>
                    </p>
                    <p>
                      Capital: <span className="span">{data.capital[0]}</span>
                    </p>
                  </div>
                  <div className="info">
                    <p>
                      Top level domain:{" "}
                      <span className="span">{data.tld[0]}</span>
                    </p>
                    <p>
                      Currencies:{" "}
                      <span className="span">
                        {data.currencies?.GMD?.name || "N/A"}
                      </span>
                    </p>
                    <p>
                      Languages:{" "}
                      <span className="span">
                        {data.languages?.eng || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>
        {`
          .app-container {
            background-color: #fafafa;
            padding: 12px;
            padding-top: 86px;
            height: 100vh;
          }

          .main {
            display: flex;
            flex-direction: column;
          }

          .name {
            font-size: 24px;
            font-weight: 800;
          }

          .info > p {
            font-weight: 600;
            font-size: 14px;
          }

          .info {
            display: flex;
            flex-direction: column;
            gap: 8px;
            margin-top: 18px;
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
            cursor: pointer;
          }

          .main-info {
            margin-top: 52px;
          }

          .span {
            font-weight: 400;
          }

          @media (min-width: 768px) {
            .main {
              max-width: 1120px;
              margin: auto;
            }

            .main-info {
              display: flex;
              gap: 28px;
            }

            .flex {
              display: flex;
              gap: 50px;
            }

            .wrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              min-height: 65vh;
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
  const { data: countries } = await axios.get(mainUrl);
  const paths = countries.slice(0, 10).map((el: any) => {
    return {
      params: { country: el.cca2 },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export default CountryPage;
