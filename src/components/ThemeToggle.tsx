import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const themes = ["light", "dark"];

export default function ThemeToggle() {
    const [isMounted, setIsMounted] = useState(false);
    const [theme, setTheme] = useState(() => {
        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem("theme")
        ) {
            return localStorage.getItem("theme");
        }
        return "light";
    });
    const toggleTheme = () => {
        const t = theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", t);
        setTheme(t);
    };

    useEffect(() => {
        const root = document.documentElement;
        if (theme === "light") {
            root.classList.remove("dark");
        } else {
            root.classList.add("dark");
        }
    }, [theme]);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return isMounted ? (
        <div className="inline-flex items-center rounded-3xl bg-zinc-300  dark:bg-zinc-600">
            {themes.map((t) => {
                const checked = t === theme;
                return (
                    <button
                        key={t}
                        className={`${
                            checked ? "bg-white text-black" : ""
                        } cursor-pointer rounded-3xl px-2`}
                        onClick={toggleTheme}
                        aria-label="Toggle theme"
                    >
                        {t === "light" ? (
                            <FontAwesomeIcon icon={faSun} size={"sm"} />
                        ) : (
                            <FontAwesomeIcon icon={faMoon} size={"sm"} />
                        )}
                    </button>
                );
            })}
        </div>
    ) : (
        <div />
    );
}
