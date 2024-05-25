import React, { useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import anime from "animejs";
import { useTranslation } from "react-i18next";

function RouterLink({ to, pathname, children }) {
  if (to === pathname) {
    return (
      <div className="h-full flex items-center py-4 px-4 sm:px-4 justify-center">
        <div>{children}</div>
      </div>
    );
  }
  return (
    <Link to={to}>
      <div className="h-full flex items-center sm:hover:text-gray-700 py-4 px-4 sm:px-4 justify-center">
        <div>{children}</div>
      </div>
    </Link>
  );
}

function Navigator() {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dashboardRef = useRef();
  const metronomeRef = useRef();
  const toolsRef = useRef();
  const supportRef = useRef();

  const bgRef = useRef();
  useEffect(() => {
    const metronomeWidth = metronomeRef.current.clientWidth;
    const dashboardWidth = dashboardRef.current.clientWidth;
    const toolsWidth = toolsRef.current.clientWidth;
    const supportWidth = supportRef.current.clientWidth;
    const widthArray = [
      metronomeWidth,
      dashboardWidth,
      toolsWidth,
      supportWidth
    ];
    const routes = ["/", "/dashboard", "/tools", "/support"];

    const pathIndex = routes.indexOf(pathname);
    let left = "0";
    let right = "100%";
    if (pathIndex >= 0) {
      left = `${widthArray
        .slice(0, pathIndex)
        .reduce((prev, sum) => prev + sum, 0)}px`;
      right = `${widthArray
        .slice(pathIndex + 1)
        .reduce((prev, sum) => prev + sum, 0)}px`;
    }
    anime({
      targets: bgRef.current,
      left,
      right,
      duration: 800
    });
  }, [pathname]);
  return (
    <div className="flex h-full sm:text-2xl relative">
      <div
        ref={bgRef}
        className="top-0 bottom-0 absolute bg-color-main z-0"
      ></div>
      <div className="flex-auto sm:flex-none z-10" ref={metronomeRef}>
        <RouterLink to="/" pathname={pathname}>
          {t("common:metronome")}
        </RouterLink>
      </div>
      <div className="flex-auto sm:flex-none z-10" ref={dashboardRef}>
        <RouterLink to="/dashboard" pathname={pathname}>
          {t("common:dashboard")}
        </RouterLink>
      </div>
      <div className="sm:flex-none z-10" ref={toolsRef}>
        <RouterLink to="/tools" pathname={pathname}>
          {t("common:tools")}
        </RouterLink>
      </div>
      <div className="hidden sm:block sm:flex-none z-10" ref={supportRef}>
        <RouterLink to="/support" pathname={pathname}>
          {/* <div className="rounded-full w-12 h-12 bg-gray-400 flex items-center justify-center">
            <div className="text-2xl text-gray-600 ">?</div>
          </div> */}
          {t("common:support")}
        </RouterLink>
      </div>
    </div>
  );
}

export default Navigator;
