"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "@/styles/BlogGrid.module.css"; // 正しいパスでCSSモジュールをインポート

export default function BlogClient() {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_MICROCMS_ENDPOINT}?offset=${
            (currentPage - 1) * itemsPerPage
          }&limit=${itemsPerPage}`,
          {
            headers: {
              "X-API-KEY": process.env.NEXT_PUBLIC_MICROCMS_API_KEY || "",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        console.log("取得したデータ:", JSON.stringify(result, null, 2));
        setItems(result.contents);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchData();
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className={styles.grid}>
        {items.map((item) => (
          <div key={item.id} className={styles.gridItem}>
            <Link href={`/blog/blogpage?slug=${item.slug}`}>
              {item.eyecatch ? (
                <img
                  src={item.eyecatch.url}
                  alt={item.title}
                  className={styles.image}
                />
              ) : (
                <div className={styles.placeholder} />
              )}
              <h3 className={styles.title}>{item.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button onClick={handleNextPage}>Next</button>
      </div>
    </div>
  );
}
