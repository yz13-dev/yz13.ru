"use client";

import { useEffect } from "react";
import useThemeStore, { getTheme, isTheme } from "./theme.store";

const ThemeObserver = () => {
  useEffect(() => {
    useThemeStore.subscribe(({ theme }) => {
      window.document.body.classList.forEach((className) => {
        const isClassNameIsThemeToken = isTheme(className);
        if (isClassNameIsThemeToken) {
          window.document.body.classList.replace(className, theme);
        }
      });
    });
  }, []);
  useEffect(() => {
    const theme = getTheme();
    window.document.body.classList.add(theme);
  }, []);
  return <></>;
};

export default ThemeObserver;
