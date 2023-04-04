import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { useEffect } from "react";
import { ThemeProvider } from "next-themes";

const MyApp: AppType<{ session: Session | null }> = ({
    Component,
    pageProps: { session, ...pageProps },
}) => {
    useEffect(() => {
        const use = async () => {
            await import("tw-elements");
        };
        void use();
    }, []);
    return (
        <SessionProvider session={session}>
            <ThemeProvider enableColorScheme attribute="class">
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    );
};

export default api.withTRPC(MyApp);
