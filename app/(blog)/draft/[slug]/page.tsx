import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPostDrafts } from "app/(blog)/utils";
import { baseUrl } from "app/sitemap";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { content } from "app/(home)/content";

export async function generateStaticParams() {
  let posts = getBlogPostDrafts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamic = "force-static";

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post = getBlogPostDrafts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
  } = post.metadata;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/post/${post.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  let post = getBlogPostDrafts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <section className="mt-6">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${baseUrl}${post.metadata.image}`
              : undefined,
            url: `${baseUrl}/post/${post.slug}`,
            author: {
              "@type": "Person",
              name: "Paul Grau",
            },
          }),
        }}
      />
      <h1 className="title tracking-tighter">{post.metadata.title}</h1>
      {post.metadata.subTitle && (
        <h2 className="subtitle mb-3">{post.metadata.subTitle}</h2>
      )}
      <div className="flex justify-between items-center mt-2 mb-8 text-sm">
        <p className="text-sm text-muted-foreground flex flex-row gap-2">
          {formatDate(post.metadata.publishedAt)}
          {post.metadata.tags && (
            <span className="flex gap-2">
              in
              {post.metadata.tags.map((tag) => (
                <Link key={tag} href={`/tag/${tag}`}>
                  {tag}
                </Link>
              ))}
            </span>
          )}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>

      <aside className="prose rainbow border-t border-b border-muted mt-12 text-sm opacity-80 pt-4 pb-2">
        <p className="article-meta">
          <a href="/" className="uppercase">
            ∞ Humanloop
          </a>
        </p>
        <MDXRemote source={content} />
      </aside>
    </section>
  );
}
