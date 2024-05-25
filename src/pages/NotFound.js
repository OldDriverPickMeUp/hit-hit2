import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-64 text-2xl p-2 text-gray-600 text-justify">
      <Helmet>
        <title>{t("notFound:title")}</title>
        <meta name="description" content={t("notFound:desc")} />
      </Helmet>
      {t("notFound:text")}
    </div>
  );
}

export default NotFound;
