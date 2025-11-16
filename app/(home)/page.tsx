import { getBlogPosts } from "app/(blog)/utils";
import { BlogPosts } from "app/components/posts";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import { content } from "./content";

export default function Page() {
  let allBlogs = getBlogPosts().slice(0, 10);

  return (
    <>
      <section className="prose rainbow sm:pr-12">
        <MDXRemote source={content} />
      </section>
      <section className="mt-8">
        <h2 className="text-xl">Latest Articles</h2>
        <div className="my-4 mb-8">
          <BlogPosts posts={allBlogs} />
        </div>
      </section>
    </>
  );
}
