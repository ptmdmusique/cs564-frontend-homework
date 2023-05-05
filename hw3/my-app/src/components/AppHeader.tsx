"use client";

import { Icon, IconProps } from "ducduchy-react-components";
import "./AppHeader.scss";
import Link from "next/link";

export const AppHeader = () => {
  return (
    <div className="app-header">
      <ul className="content-container">
        {routeList.map(({ icon, path, displayName }) => (
          <li key={path}>
            <Link href={path} className="link">
              <Icon icon={icon} />
              <p>{displayName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const routeList = [
  {
    path: "/houses",
    icon: ["fas", "crown"],
    displayName: "Houses",
  },
  {
    path: "/search",
    icon: ["fas", "magnifying-glass"],
    displayName: "Search",
  },
] satisfies readonly RouteProps[];

interface RouteProps {
  path: string;
  icon: IconProps["icon"];
  displayName: string;
}
