import Link from "next/link";
import Image from "next/image";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkToc from "remark-toc";
import remarkGfm from "remark-gfm";
import { highlight } from "sugar-high";
import React, { type ComponentProps, type ReactNode } from "react";
import path from "path";
import fs from "fs";

function Table({ data }: { data: { headers: string[]; rows: string[][] } }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function CustomLink(props: Omit<ComponentProps<"a">, "ref">) {
  let href = `${props.href}`;

  if (href.startsWith("/")) {
    return <Link {...props} href={href} />;
  }

  if (href.startsWith("#")) {
    return <a {...props} />;
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

function ImportedImage({ src, alt, ...props }: ComponentProps<typeof Image>) {
  // Dynamically import the image
  const importedSrc = require(`${src}`);
  return <Image src={importedSrc} alt={alt} {...props} />;
}

function RoundedImage(props: ComponentProps<typeof Image>) {
  return <Image className="rounded-lg" {...props} />;
}

function Code({ children, ...props }: ComponentProps<"code">) {
  if (typeof children !== "string") {
    return <code {...props}>{children}</code>;
  }
  let codeHTML = highlight(children ?? "");
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str: string) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

function createHeading(level: number) {
  const Heading = ({ children }: { children?: ReactNode }) => {
    if (!children) return null;
    if (typeof children !== "string") {
      throw new Error("Heading children should be a string");
    }
    let slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement("a", {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: "anchor",
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  Image: RoundedImage,
  a: CustomLink,
  code: Code,
  Table,
};

type TreeNode = {
  type: string;
  tagName?: string;
  properties?: Record<string, string>;
  children?: TreeNode[];
};

function rehypeMdxImportMedia({ basePath }: { basePath: string }) {
  return function plugin() {
    // Find all nodes that match
    function* findNodes(
      tree: TreeNode,
      matcher: (node: TreeNode) => boolean,
    ): Generator<TreeNode | null> {
      if (matcher(tree)) {
        yield tree;
      }
      if (tree.children) {
        for (let child of tree.children) {
          yield* findNodes(child, matcher);
        }
      }
    }
    return function (tree: TreeNode) {
      const imageNodes = Array.from(
        findNodes(tree, (node) => node.tagName === "img"),
      );
      imageNodes.forEach((node) => {
        if (!node) return;
        let src = node.properties?.src;
        if (!src) return;
        if (src.startsWith("http")) return;
        node.properties ??= {};

        const absPath = path.resolve(basePath, src);
        const ext = path.extname(absPath).slice(1);
        const mimeType = getMimeType(ext);

        try {
          const imageData = fs.readFileSync(absPath).toString("base64");
          const dataUrl = `data:${mimeType};base64,${imageData}`;
          node.properties.src = dataUrl;
        } catch (err) {
          console.error(`Error reading image file at ${absPath}:`, err);
        }
      });
    };
  };
}

function getMimeType(ext: string) {
  switch (ext.toLowerCase()) {
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "gif":
      return "image/gif";
    case "svg":
      return "image/svg+xml";
    case "webp":
      return "image/webp";
    default:
      return "application/octet-stream";
  }
}

export function CustomMDX(props: ComponentProps<typeof MDXRemote>) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          useDynamicImport: true,
          baseUrl: import.meta.url,
          remarkPlugins: [[remarkToc, { ordered: true }], remarkGfm],
          rehypePlugins: [
            rehypeMdxImportMedia({
              basePath: path.join(process.cwd(), "app", "(blog)", "_posts"),
            }),
          ],
        },
      }}
    />
  );
}
