import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts, getTags } from "app/(blog)/utils";
import { baseUrl } from "app/sitemap";
import { BlogPosts } from "app/components/posts";

export async function generateStaticParams() {
  let posts = getTags();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
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
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  let tag = getTags().find((post) => post.slug === params.slug);

  if (!tag) {
    notFound();
  }

  let posts = getBlogPosts().filter((post) =>
    post.metadata.tags?.includes(params.slug),
  );

  return (
    <section>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            headline: tag.metadata.title,
            datePublished: tag.metadata.publishedAt,
            dateModified: tag.metadata.publishedAt,
            description: tag.metadata.summary,
            url: `${baseUrl}/tag/${tag.slug}`,
            author: {
              "@type": "Person",
              name: "Paul Grau",
            },
          }),
        }}
      />
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {tag.metadata.title}
      </h1>
      <article className="prose sm:text-lg">
        <CustomMDX source={tag.content} />
      </article>
      {!posts.length && <p>Sorry, no posts yet.</p>}
      <BlogPosts posts={posts} />
    </section>
  );
}
