import Image from "next/image";
import Link from "next/link";

interface ArticleThumbnailProps {
    slug: string;
    title: string;
    published: string;
}
const ArticleThumbnail: React.FC<ArticleThumbnailProps> = ({
    title,
    published,
    slug,
}) => {
    return (
        <Link href={`/article/${slug}`} className="cursor-pointer">
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
                <p className="truncate text-lg font-bold">{title}</p>
                <p className="text-sm">{published}</p>
            </div>
        </Link>
    );
};
export default ArticleThumbnail;
