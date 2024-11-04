import { ImageResponse } from "next/og";
import { getBlogPosts } from "../../utils";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const alt = "Post on graycoding.com";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 100,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {post?.metadata.title ?? "Title"}
      </div>
    ),
    {
      ...size,
    },
  );
}
