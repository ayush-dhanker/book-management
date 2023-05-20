import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import reportWebVitals from "./reportWebVitals";
import store from "./Components/store";
import { Provider } from "react-redux";

// const app = (
//   <>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </>
// );

// ReactDOM.render(app, document.getElementById("root"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

reportWebVitals();
