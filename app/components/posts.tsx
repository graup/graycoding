import Link from "next/link";
import { formatDate, formatDateShort } from "app/(blog)/utils";

export function BlogPosts({
  posts,
}: {
  posts: Array<{
    slug: string;
    metadata: {
      title: string;
      publishedAt: string;
    };
  }>;
}) {
  return (
    <div className="grid sm:grid-cols-[max-content_auto] items-baseline gap-x-6 gap-y-1 sm:gap-y-2 text-base">
      {posts
        .sort(
          (a, b) =>
            +new Date(b.metadata.publishedAt) -
            +new Date(a.metadata.publishedAt),
        )
        .map((post) => (
          <>
            <span className="text-muted-foreground tabular-nums text-sm sm:text-base">
              {formatDateShort(post.metadata.publishedAt)}
            </span>
            <span>
              <Link
                key={post.slug}
                href={`/post/${post.slug}`}
                className="mb-4 sm:mb-0"
              >
                {post.metadata.title}
              </Link>
            </span>
          </>
        ))}
    </div>
  );
}
