"use client";

import Container from "@/components/container";
import { TwoColumnSidebar } from "@/components/two-columns";
import Contact from "@/components/contact";
import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { TwoColumn, TwoColumnMain } from "@/components/two-columns";

type Post = {
  title: string;
  eyecatch?: {
    url: string;
  };
  content: string;
};

function BlogPage() {
  const [post, setPost] = useState<Post | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const slug = searchParams.get("slug");
    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT}?filters=slug[equals]${slug}`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setPost(data.contents[0] as Post);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
      }
    };

    fetchData();
  }, [searchParams]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <div>
        <h1>{post.title}</h1>
        {post.eyecatch && (
          <Image
            src={post.eyecatch.url}
            alt={post.title}
            width={600}
            height={400}
            sizes="(min-width:1152px) 1152px, 100vw"
            priority
            style={{ width: "100%", height: "auto" }}
            placeholder="blur"
            blurDataURL="/path/to/low-res-image.jpg" // 低解像度画像のURLまたはBase64エンコードデータ
          />
        )}
        <TwoColumn>
          <TwoColumnMain>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </TwoColumnMain>
          <TwoColumnSidebar>
            <Contact />
          </TwoColumnSidebar>
        </TwoColumn>
      </div>
    </Container>
  );
}

export default function SchedulePageWrapper() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogPage />
    </Suspense>
  );
}
