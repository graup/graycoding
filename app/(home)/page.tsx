import { getBlogPosts } from "app/(blog)/utils";
import { BlogPosts } from "app/components/posts";

export default function Page() {
  let allBlogs = getBlogPosts().slice(0, 10);

  return (
    <>
      <section className="prose large !max-w-[1150px]">
        <p className="overflow-hidden float-right mb-[-40px]  mr-[-60px]">
          <img
            src="./shapes.png"
            width="450"
            height="450"
            className="translate-x-10 -translate-y-4 invert-when-dark"
          />
        </p>
        <p>
          hi, i'm paul grau. this is my creative engineering lab focused on the
          feedback cycle between human intent and system architecture.
        </p>
        <p className="ml-[14px]">
          i translate vision into systems through domain modeling, ux
          exploration, specs that align stakeholders, and resilient scaffolding
          that scales.
        </p>
        <p className="mx-[-10px] max-w-[760px]">
          erasing the gap between business, design, and engineering in complex
          environments like finops, dataops, and web3.
        </p>
        <p className="ml-[130px]">
          less handoffs,
          <br />
          more shared product understanding.
          <br />
        </p>
        <p className="text-right hidden">
          <a href="./intent.html">let intent circulate</a>.
        </p>
      </section>

      <section>
        <h2 className="text-xl">Latest Articles</h2>
        <div className="my-4 mb-8">
          <BlogPosts posts={allBlogs} />
        </div>
      </section>
    </>
  );
}
