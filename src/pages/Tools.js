import React, { useState } from "react";
import { saveAs } from "file-saver";
import {
  getAllLocalStorage,
  restoreAllLocalStorage
} from "../lib/other/dataSync";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

function OperationBlock({ text, children, onClick, used }) {
  const [innerUsed, setInnerUsed] = useState(false);
  const finalUsed = used === null ? innerUsed : used;
  return (
    <div className="flex bg-gray-200 h-32">
      <div className="flex items-center px-2 sm:px-8 flex-auto">
        <div className="text-gray-600 sm:text-2xl">{text}</div>
      </div>
      <div
        onClick={() => {
          if (finalUsed) return;
          setInnerUsed(true);
          onClick && onClick();
        }}
        className={`w-32 ${
          finalUsed
            ? "cursor-not-allowed bg-gray-400"
            : "cursor-pointer bg-blue-200"
        }`}
        style={{ transition: "background-color 0.5s" }}
      >
        {children}
      </div>
    </div>
  );
}

function downloadStorage() {
  const data = getAllLocalStorage();
  const file = new File([JSON.stringify(data)], "usage.json", {
    type: "application/json;charset=utf-8"
  });
  saveAs(file);
}

function uploadStorage(e, onSuccess) {
  let files = e.target.files;
  let reader = new FileReader();
  reader.onload = e => {
    const data = e.target.result;
    restoreAllLocalStorage(JSON.parse(data));
    onSuccess && onSuccess();
  };
  reader.readAsText(files[0]);
}

function Tools() {
  const [dataUploaded, setDataUploaded] = useState(false);
  const { t } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>{t("tools:title")}</title>
        <meta name="description" content={t("tools:desc")} />
      </Helmet>
      <div className="text-2xl sm:text-4xl text-gray-600 mb-5 px-2">
        {t("tools:title")}
      </div>
      <div className="px-2 text-gray-600 mb-5">
        {t("tools:titleDesc1")}
        <br />
        {t("tools:titleDesc2")}
      </div>
      <div className="mb-5">
        <OperationBlock text={t("tools:download")} onClick={downloadStorage}>
          <div className="flex items-center justify-center h-full text-gray-600">
            <div>{t("tools:downloadButton")}</div>
          </div>
        </OperationBlock>
      </div>
      <div>
        <OperationBlock text={t("tools:upload")} used={dataUploaded}>
          {dataUploaded ? (
            <div
              className="cursor-pointer flex justify-center items-center w-full h-full"
              onClick={() => {
                window.location = "/";
              }}
            >
              <div>{t("tools:reload")}</div>
            </div>
          ) : (
            <div className="h-full text-gray-600">
              <input
                type="file"
                id="file"
                style={{
                  width: "0.1px",
                  height: "0.1px",
                  opacity: "0",
                  overflow: "hidden",
                  zIndex: "-1"
                }}
                className="absolute"
                onChange={e => uploadStorage(e, () => setDataUploaded(true))}
              />
              <label
                for="file"
                className="w-full h-full block flex justify-center items-center cursor-pointer"
              >
                <div>{t("tools:uploadButton")}</div>
              </label>
            </div>
          )}
        </OperationBlock>
      </div>
    </div>
  );
}

export default Tools;
