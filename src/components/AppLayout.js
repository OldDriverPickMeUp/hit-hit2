import React from "react";
import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
import Navigator from "./nav/navigator";
import { useTranslation } from "react-i18next";

function AppLayout({ children }) {
  const { t } = useTranslation();

  return (
    <div className="leading-normal">
      <div className="bg-gray-200 text-gray-600  px-2 sm:px-10  flex justify-between">
        <div className="flex text-1xl sm:text-2xl py-2 sm:py-4">
          <div className="flex items-center">
            <img className="h-8 sm:h-12" src={logo} alt="" />
          </div>
          <div className="flex items-center">
            <div className="ml-5">
              <div>{t("common:appName")}</div>
              <div className="text-xs">@ meter-go-go.net</div>
            </div>
          </div>
        </div>
        <div className="sm:block sm:flex sm:static sm:items-center bg-gray-300 sm:bg-transparent fixed w-screen sm:w-auto bottom-0 left-0 sm:left-auto sm:bottom-auto sm:z-auto z-20">
          <Navigator />
        </div>
        <div className="sm:hidden text-xs flex  items-center">
          <Link to="/support">
            <div className="p-2">{t("common:lock")}</div>
          </Link>
        </div>
      </div>
      <div className="container mx-auto max-w-5xl py-8 sm:py-16 px-2">
        <div className="sm:flex">
          <div className="sm:flex-1">{children}</div>
          <div
            className="bg-gray-300 hidden sm:block"
            style={{ height: "730px", minWidth: "190px" }}
          />
        </div>
      </div>
      <div className="sm:hidden w-screen" style={{ height: "80px" }} />
    </div>
  );
}

export default AppLayout;
