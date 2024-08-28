// app/blog/page.tsx

import Container from "@/components/container";
import Hero from "@/components/hero";
import React from "react";
import BlogClient from "@/components/blog-client";

export const metadata = {
  title: "ブログ | CUBE",
  description: "Generated by create next app",
};

export default function Blog() {
  return (
    <Container>
      <Hero title="Blog" subtitle="Recent Posts" />
      <BlogClient /> {/* クライアントサイドのロジックを含むコンポーネント */}
    </Container>
  );
}
