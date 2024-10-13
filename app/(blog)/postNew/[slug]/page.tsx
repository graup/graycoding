import { Suspense } from "react";
import { MDXRemote } from "next-mdx-remote-client/rsc";
import type {
  MDXRemoteOptions,
  MDXComponents,
} from "next-mdx-remote-client/rsc";
import rehypeMdxImportMedia from "rehype-mdx-import-media";

//import { calculateSomeHow, getSourceSomeHow } from "../utils";
//import { ErrorComponent, LoadingComponent } from "../components";
//import { Test } from '../mdxComponents';
import { getBlogPosts } from "app/(blog)/utils";
import { notFound } from "next/navigation";
import path from "path";

const baseUrl = path.join(process.cwd(), "app", "(blog)", "_posts");

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

const components: MDXComponents = {
  //Test,
  wrapper: function ({ children }: React.ComponentPropsWithoutRef<"div">) {
    return <div className="mdx-wrapper">{children}</div>;
  },
};

export default async function Page({ params }: { params: { slug: string } }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    return notFound();
  }

  const options: MDXRemoteOptions = {
    mdxOptions: {
      baseUrl: `file://${baseUrl}/`,
      rehypePlugins: [[rehypeMdxImportMedia, { resolve: true }]],
    },
    parseFrontmatter: true,
    scope: {
      //readingTime: calculateSomeHow(source),
    },
  };

  return (
    <Suspense fallback={<>loading</>}>
      <MDXRemote
        source={post.content}
        options={options}
        components={components}
        //onError={ErrorComponent}
      />
    </Suspense>
  );
}
