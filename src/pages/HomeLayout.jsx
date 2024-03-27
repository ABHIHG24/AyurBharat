import { Outlet, useNavigation } from "react-router-dom";
import { Headers, Navbar, Loading2 } from "../components";
import { Helmet } from "react-helmet";
const HomelLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state == "loading";
  return (
    <>
      <Helmet>
        <title>AyurBharat --- Natural</title>
        <meta name="Home" content="indian ayurveda" />
      </Helmet>
      <nav>
        <Headers />
        <Navbar />

        <span className="text-4xl text-primary">AyurBharat</span>
        {isPageLoading ? (
          <Loading2 />
        ) : (
          <section className=" my-custom-style py-20 ">
            <Outlet />
          </section>
        )}
      </nav>
    </>
  );
};
export default HomelLayout;
