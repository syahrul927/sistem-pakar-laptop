import CodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { useState } from "react";

export interface TextCodeMirrorProps {
    title?: string;
    errorMessage?: string;
    value: string;
    className?: string;
    required?: boolean;
    onChange: (e: string) => void;
}
const TextCodeMirror: React.FC<TextCodeMirrorProps> = (props) => {
    const { className, title, errorMessage, required, onChange, value } = props;

    const [theme] = useState(() => {
        if (
            typeof localStorage !== "undefined" &&
            localStorage.getItem("theme")
        ) {
            return localStorage.getItem("theme");
        }
        return "light";
    });
    return (
        <div className="flex w-full flex-col space-y-2">
            {(title || errorMessage) && (
                <div className="flex flex-row space-x-1 text-xs font-semibold capitalize">
                    <div className="text-gray-600 dark:text-gray-300">
                        {title && title}
                    </div>
                    {required && <div className="text-red-600">*</div>}
                    {errorMessage && (
                        <p className="italic text-red-600">{errorMessage}</p>
                    )}
                </div>
            )}
            <CodeMirror
                value={value}
                width="100%"
                height="100%"
                minWidth="100%"
                minHeight="50vh"
                theme={theme === "dark" ? "dark" : "light"}
                extensions={[
                    markdown({
                        base: markdownLanguage,
                        codeLanguages: languages,
                    }),
                ]}
                onChange={(value) => onChange(value)}
                className={`rounded-md border border-zinc-300 bg-gray-50 px-2 py-1.5 text-sm text-gray-600 focus:outline-none dark:border-zinc-600 dark:bg-zinc-800 dark:text-gray-300 ${
                    className ? className : ""
                }`}
            />
        </div>
    );
};
export default TextCodeMirror;
