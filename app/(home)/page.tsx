import { getBlogPosts } from "app/(blog)/utils";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  let allBlogs = getBlogPosts().slice(0, 5);

  return (
    <>
      <section>
        <p className="mb-4 rainbow">
          Paul is a senior product engineer bridging the gap between{" "}
          <i>engineers</i>, <i>designers</i>, and <i>product managers</i>. He
          has work experience in the fields of ML, Big Data, and Web3, and a
          background in Human-computer interaction research.
        </p>
        <p>
          Elsewhere: <a href="http://linkedin.com/in/paulgrau">LinkedIn</a>,{" "}
          <a href="http://twitter.com/graup">Twitter</a>,{" "}
          <a href="http://github.com/graup">GitHub</a>
        </p>
        <p>
          E-mail: <a href="mailto:paul@graycoding.com">paul@graycoding.com</a>
        </p>
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
