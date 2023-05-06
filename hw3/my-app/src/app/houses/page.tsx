import { Metadata } from "next";
import { HousesPage } from "./page-content";

export const metadata: Metadata = {
  title: "House Information",
  description: "Information about the houses in the Game of Thrones universe",
};

export default function Houses() {
  return <HousesPage />;
}
