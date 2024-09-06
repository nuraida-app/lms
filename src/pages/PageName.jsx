import { Helmet, HelmetProvider } from "react-helmet-async";

const PageName = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{`Nuraida LMS | ${title}`}</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default PageName;
