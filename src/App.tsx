import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ScrollToTop } from "./components/common/ScrollToTop";
import Routes from "./routes/Routes";
import PageMeta from "./components/common/PageMeta";

export default function App() {
  return (
    <>
      <PageMeta
        title="Fulfillment Dashboard"
        description="Fulfillment Dashboard"
      />
      <Router>
        <ScrollToTop />
        <Routes />
      </Router>
      <ToastContainer
        className="global-toast z-[10001]"
        position="top-right"
        limit={1}
        hideProgressBar
        newestOnTop
        pauseOnHover
        autoClose={false}
        closeOnClick={false}
      />
    </>
  );
}
