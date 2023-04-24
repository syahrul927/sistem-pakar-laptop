import Image from "next/image";
import Link from "next/link";
import Button from "./Button";
import Navbar from "./Navbar";

const Header = () => {
    return (
        <header>
            <Navbar />
            <section className="relative mb-6 flex h-80 items-center justify-center">
                <div className="absolute h-full w-full overflow-hidden">
                    <Image
                        className="absolute inset-0 min-h-full min-w-full object-cover opacity-30 md:-top-52"
                        src={"/pict_home.jpeg"}
                        width={400}
                        height={500}
                        alt="pict_home"
                    />
                </div>
                <div className="z-10 px-8 text-center shadow-black drop-shadow-lg">
                    <div className="mb-4 text-sm uppercase">Selamat Datang</div>
                    <div className="mb-5 font-mplus text-4xl font-medium">
                        Tempat Konsultasi{" "}
                        <span className="text-blue-500">Laptop</span> dan{" "}
                        <span className="text-blue-500">Komputer</span>
                    </div>
                    <Link href={"/diagnosa"}>
                        <Button>Mulai Diagnosa</Button>
                    </Link>
                </div>
            </section>
        </header>
    );
};
export default Header;
