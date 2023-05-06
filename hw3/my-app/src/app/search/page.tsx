import type { Metadata } from "next";
import { SearchPage } from "./page-content";
import "./search-page.scss";

export const metadata: Metadata = {
  title: "Search characters",
  description: "Search for characters in the Game of Thrones universe",
};

export default function Search() {
  return <SearchPage />;
}
