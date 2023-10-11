import React from "react";
import { createRoot } from "react-dom/client";
import { assertHTMLElement } from "./utils";
import { App } from "./App";

const container = document.querySelector("#root");

assertHTMLElement<HTMLElement>(container);
const root = createRoot(container);
root.render(<App />);
