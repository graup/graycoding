import Link from "next/link";
import { formatDate } from "app/(blog)/utils";

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
    <div className="grid grid-cols-[max-content_auto] gap-x-6 gap-y-2">
      {posts
        .sort(
          (a, b) =>
            +new Date(b.metadata.publishedAt) -
            +new Date(a.metadata.publishedAt),
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="contents"
            href={`/post/${post.slug}`}
          >
            <span className="text-muted-foreground tabular-nums">
              {formatDate(post.metadata.publishedAt, false)}
            </span>
            <span className="[:hover_>_&]:underline decoration-muted underline-offset-3 decoration-[0.1em] title">
              {post.metadata.title}
            </span>
          </Link>
        ))}
    </div>
  );
}
