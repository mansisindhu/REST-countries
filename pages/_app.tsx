import "../styles/global.css";
import { LayoutGroup } from "framer-motion";
import { useRouter } from "next/router";

const CustomApp = ({ Component, pageProps }) => {
  const router = useRouter();
  return (
    <>
      <LayoutGroup>
        <Component {...pageProps} key={router.route} />
      </LayoutGroup>
    </>
  );
};

export default CustomApp;
