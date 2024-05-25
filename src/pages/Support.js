import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation, Trans } from "react-i18next";

function QuestionBlock({ Question, children }) {
  return (
    <div className="mb-5 text-gray-600">
      <div className="mb-2 text-xl sm:text-2xl">{Question}</div>
      <div className="text-sm sm:text-base">{children}</div>
    </div>
  );
}

function Support() {
  const { t } = useTranslation();
  return (
    <div>
      <Helmet>
        <title>{t("support:title")}</title>
        <meta name="description" content={t("support:desc")} />
      </Helmet>
      <div className="text-2xl sm:text-4xl text-gray-600 mb-5 px-2">
        <div>{t("support:title")}</div>
        <div className="text-gray-600 text-base">v0.2.8</div>
      </div>

      <div className="px-2">
        <QuestionBlock Question={t("support:preventLockQ")}>
          <Trans i18nKey="support:preventLockA">
            Currently, mobile phone wake lock is not supported by all browsers.
            <br />
            Once the <strong>go</strong> button is pressed, the metronome will
            try to setup the wake lock. The wake lock will be fully functional
            in several months due to a new standard proposed last year.
          </Trans>
        </QuestionBlock>
        <QuestionBlock Question={t("support:transferDataQ")}>
          <Trans i18nKey="support:transferDataA">
            Press the <strong>tools</strong> button in the naviagtion bar.
            <br />
            Click the <strong>download</strong> button to download the usage
            data.
            <br />
            Upload the file downloaded from the former device, by pressing the
            <strong>choose a file</strong> button.
            <br />
            After the uploading, a <strong>reload page</strong> will be shown,
            click the button to reload the page.
          </Trans>
        </QuestionBlock>
      </div>
    </div>
  );
}
export default Support;
