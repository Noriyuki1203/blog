import React from "react";

// 動的なパスを定義するために必要な関数
export async function getStaticPaths() {
  const res = await fetch(process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT, {
    headers: {
      "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
    },
  });

  const data = await res.json();

  // 全ての記事のスラッグを取得
  const paths = data.contents.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: "blocking", // 存在しないパスは404ページを表示
  };
}

// 指定されたスラッグの記事データを取得
export async function getStaticProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT}?filters=slug[equals]${params.slug}`,
    {
      headers: {
        "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
      },
    }
  );

  const data = await res.json();

  return {
    props: {
      post: data.contents[0], // スラッグに対応する記事データ
    },
  };
}

export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <img src={post.eyecatch.url} alt={post.title} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
