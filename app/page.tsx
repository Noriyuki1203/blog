import { url } from "inspector";
import Image from "next/image";
import { title } from "process";
import React, { ReactNode } from "react";

export default function Home() {
  const props1 = { title: "タイトル1変数", url: "post.html" };
  const props2 = { title: "タイトル2変数", url: "post2.html" };
  return (
    <>
      <Decoration>
        <h2>おすすめ記事</h2>
        <EachPost {...props1} />
        <EachPost {...props2} />
      </Decoration>
    </>
  );
}

function Decoration(props: DecorationProps) {
  return <div style={{ color: "red" }}>{props.children}</div>;
}

function EachPost(props: EachPostProps) {
  return (
    <article>
      <a href={props.url}>
        <h3>{props.title}</h3>
      </a>
    </article>
  );
}

interface EachPostProps {
  url: string;
  title: string;
}

interface DecorationProps {
  children: ReactNode;
}
