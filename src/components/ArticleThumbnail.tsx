import Image from "next/image";
import Link from "next/link";

const ArticleThumbnail = () => {
    return (
        <Link href={"/article/cara-buat-article"} className="cursor-pointer">
            <div className="overflow-hidden rounded-lg border border-zinc-300">
                <Image
                    className="aspect-[1.5] "
                    src={"/placeholder.jpeg"}
                    width={720 * 2}
                    height={720 * 2}
                    alt={"placeholder"}
                />
            </div>
            <div className="pl-1">
                <p className="text-lg font-bold">Your Title Article</p>
                <p className="text-sm">Sparepart</p>
            </div>
        </Link>
    );
};
export default ArticleThumbnail;
