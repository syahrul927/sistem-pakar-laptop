import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { ThemeProvider } from "next-themes";
import { ToastProvider } from "~/hook/ToastHooks";
import { AppType } from "next/app";
import { useEffect } from "react";
import NextNProgress from "nextjs-progressbar";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    return (
        <SessionProvider session={session}>
            <NextNProgress color="#2563EB" />
            <ToastProvider>
                <ThemeProvider enableColorScheme attribute="class">
                    <Component {...pageProps} />
                </ThemeProvider>
            </ToastProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
