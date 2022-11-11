import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

//conatiners
import TheHeader from "./TheHeader";
import TheSidebar from "./TheSidebar";
import TheContent from "./TheContent";
import TheFooter from "./TheFooter";
import PageSpinner from "../components/common/spinner/PageSpinner";

const TheLayout = ({ history, pathname }) => {
  const { isAuthenticated, loadingDetails } = useSelector(state => state.auth);

  const getLayout = () => {
    if (pathname === "/") {
      return "public";
    }

    if (/^\/auth(?=\/|$)/i.test(pathname)) {
      return "auth";
    }

    return "main";
  };
  const isAuthLayout = getLayout() === "auth";

  useEffect(() => {}, [history, isAuthenticated, loadingDetails]);

  if (loadingDetails || (!isAuthenticated && isAuthLayout)) {
    return <PageSpinner />;
  }

  if (!isAuthLayout && !isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthLayout && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      <TheSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <TheHeader />
        <div className="body flex-grow-1 px-3">
          <TheContent />
        </div>
        <TheFooter />
      </div>
    </div>
  );
};

export default TheLayout;
