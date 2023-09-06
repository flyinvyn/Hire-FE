import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./config/store";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap");
  },[]);

  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  )
}

export default MyApp;