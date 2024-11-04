import { getBlogPosts } from "app/(blog)/utils";

export const baseUrl = "https://graycoding.com";

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `${baseUrl}/post/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }));

  let routes = ["", "/tag/ui", "/tag/global", "/tag/product"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }));

  return [...routes, ...blogs];
}
