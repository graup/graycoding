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
    <section>
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
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
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

      <aside className="prose rainbow border-t border-b border-muted mt-12 text-sm opacity-80 pt-2">
        <MDXRemote source={content} />
      </aside>

      <aside className="prose text-muted-foreground opacity-70 text-sm mt-8">
        ⚙ AI Disclosure: I use GenAI to improve my writing.
        <br />I manually write outlines and main points I want to make, and then
        ask an LLM to offer critique.
        <br />I find this streamlines my process, letting me focus on the
        overall argument and flow—especially considering English is not my
        native language.
      </aside>
    </section>
  );
}
