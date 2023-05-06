"use client";

import { useThroneData } from "@/contexts/throne-data-context";
import { Icon } from "ducduchy-react-components";
import "./search-page.scss";

export default function SearchPage() {
  const { data, isFetching } = useThroneData();
  console.log("isFetching:", isFetching);
  console.log("data:", data);

  return (
    <div className="search-page">
      <div className="content-container">{isFetching && <LoadingBar />}</div>
    </div>
  );
}

const LoadingBar = () => {
  return (
    <div className="loading-bar">
      <Icon icon={["fas", "fan"]} className="fa-flip" />
      <span>Loading data...</span>
    </div>
  );
};
