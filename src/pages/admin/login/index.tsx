import Button from "~/components/Button";
import TextInput from "~/components/TextInput";

const LoginAdmin = () => {
    return (
        <div className="break-words bg-white leading-6 text-zinc-900 transition-colors duration-500 dark:bg-zinc-800 dark:text-zinc-300">
            <main className="flex h-screen w-full items-center justify-center">
                <div className="flex w-full max-w-lg flex-col space-y-5 rounded-md bg-zinc-700 px-10 py-5">
                    <h2>Login Page</h2>
                    <div className="flex flex-col space-y-2">
                        <TextInput placeholder="Username" type="text" />
                        <TextInput placeholder="Password" type="password" />
                    </div>
                    <div className="flex items-center justify-between">
                        <Button>Login</Button>
                        <p className="text-sm">
                            Masalah?{" "}
                            <a className="cursor-pointer select-none text-blue-400 dark:text-blue-300">
                                Hubungi Admin
                            </a>
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default LoginAdmin;
