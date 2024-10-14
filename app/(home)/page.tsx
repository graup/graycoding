import { getBlogPosts } from "app/(blog)/utils";
import { BlogPosts } from "app/components/posts";
import { MDXRemote } from "next-mdx-remote-client/rsc";

const content = `
Paul is a senior product engineer bridging the gap between _engineers_, _designers_, and _product managers_.
He has work experience in the fields of ML, Big Data, and Web3,
and a background in Human-computer interaction research.

Elsewhere: [LinkedIn](http://linkedin.com/in/paulgrau), [Twitter](http://twitter.com/graycoding), [GitHub](http://github.com/graup)

E-mail: paul@graycoding.com
`;

export default function Page() {
  let allBlogs = getBlogPosts().slice(0, 5);

  return (
    <>
      <section className="prose rainbow">
        <MDXRemote source={content} />
      </section>
      <section className="mt-8">
        <h2 className="text-xl">Latest Writing</h2>
        <div className="my-4 mb-8">
          <BlogPosts posts={allBlogs} />
        </div>
      </section>
    </>
  );
}
