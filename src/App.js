import React from "react";
import "./styles/tailwind.css";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import AppLayout from "./components/AppLayout";
import "./resources/i18n";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet titleTemplate={`%s | ${t("common:template")} meter-go-go.net`} />
      <AppLayout>
        <Routes />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
