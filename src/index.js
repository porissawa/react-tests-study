import React from "react";
import ReactDOM from "react-dom";

import App from "components/App";
import { setupStore } from "Root";

ReactDOM.render(setupStore(<App />), document.getElementById("root"));
