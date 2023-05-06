"use client";

import {
  ThroneAPIData,
  ThroneDataContext,
  ThroneDataContextType,
} from "@/contexts/throne-data-context";
import { initializeIconList } from "@/loader/icon";
import axios from "axios";
import "ducduchy-react-components/dist/ducduchy-react-components.cjs.production.min.css";
import { Cinzel } from "next/font/google";
import { useEffect, useState } from "react";
import { AppHeader } from "../components/AppHeader";
import "./globals.scss";

initializeIconList();

const cinzel = Cinzel({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data, isFetching } = useManageThroneData();

  return (
    <html lang="en">
      <body className={cinzel.className}>
        <AppHeader />

        <ThroneDataContext.Provider value={{ data, isFetching }}>
          {children}
        </ThroneDataContext.Provider>
      </body>
    </html>
  );
}

const useManageThroneData = (): ThroneDataContextType => {
  const [data, setThroneData] = useState<ThroneAPIData[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  useEffect(() => {
    setIsFetching(true);

    const throneAPIUrl = "https://thronesapi.com/api/v2/Characters";
    axios.get<ThroneAPIData[]>(throneAPIUrl).then((response) => {
      const throneData = response.data.map((character) => {
        const { family } = character;
        const goodFamily = badFamilyLookupMap[family] ?? family;
        return { ...character, family: goodFamily };
      });

      setThroneData(throneData);
      setIsFetching(false);
    });
  }, []);

  return { data, isFetching };
};

/** Mapping from a possible bad family name to a good one */
const badFamilyLookupMap: Record<string, string> = {
  "": "Unknown",
  None: "Unknown",
  Unkown: "Unknown",
  Lorathi: "Lorathi",
  "House Lanister": "House Lannister",
};
