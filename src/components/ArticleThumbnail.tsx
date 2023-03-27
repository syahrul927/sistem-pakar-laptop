import Image from "next/image";

const ArticleThumbnail = () => {
    return (
        <a className="cursor-pointer">
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
        </a>
    );
};
export default ArticleThumbnail;
