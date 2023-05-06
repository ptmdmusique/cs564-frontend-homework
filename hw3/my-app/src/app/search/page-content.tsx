"use client";

import { LoadingBar } from "@/components/LoadingBar";
import { useThroneData } from "@/contexts/throne-data-context";
import { Input } from "ducduchy-react-components";
import Fuse from "fuse.js";
import Head from "next/head";
import Image from "next/image";
import { useMemo, useState } from "react";
import "./search-page.scss";

export const SearchPage = () => {
  const { data, isFetching } = useThroneData();

  const [searchParam, setSearchParam] = useState("");
  const displayData = useMemo(() => {
    if (!searchParam) {
      return data ?? [];
    }

    const fuse = new Fuse<(typeof data)[number]>(data, {
      keys: ["fullName", "title", "family"],
      threshold: 0.3,
    });

    return fuse.search(searchParam).map((result) => result.item);
  }, [searchParam, data]);

  return (
    <main className="search-page">
      <Head>
        <title>Character Search</title>

        <meta property="og:title" content="Character Search" />
        <meta property="og:image" content="https://i.imgur.com/ipcYMd2.png" />
      </Head>

      <div className="content-container">
        <h1>Character Search</h1>

        <Input
          label="Name, title, family"
          onChange={(event) => setSearchParam(event.target.value)}
          className="search-input"
          leadingAdornment={["fas", "magnifying-glass"]}
        />

        {isFetching ? (
          <LoadingBar />
        ) : (
          <ul className="character-list">
            {displayData.map(({ id, fullName, title, family, imageUrl }) => (
              <li key={id} className="character-card">
                <Image src={imageUrl} alt={fullName} height={270} width={999} />

                <div className="content-container">
                  <p className="full-name">{fullName}</p>
                  <p className="title">{title}</p>
                </div>

                <div className="family">
                  <span>{family}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
};
