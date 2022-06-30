import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import {createRoot} from "react-dom/client";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeFirebase } from "./firebase";

initializeFirebase();

i18next
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ar", "fr"],
    fallbackLng: "en",
    debug: false,
    // Options for language detector
    detection: {
      order: ["path", "cookie", "htmlTag"],
      caches: ["cookie"],
    },
    // react: { useSuspense: false },
    backend: {
      loadPath: "/assets/locales/{{lng}}/translation.json",
    },
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h3>Loading..</h3>
  </div>
);

const rootElement = document.getElementById("root") as HTMLElement;
const root = createRoot(rootElement);

root.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Suspense>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
