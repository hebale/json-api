import React from "react";
import { createRoot } from "react-dom/client";

import App from "~/App";
import "~/assets/style.scss";

createRoot(document.querySelector("#app")).render(<App />);
