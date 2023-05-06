"use client";

import cx from "classnames";
import { Icon, IconProps } from "ducduchy-react-components";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./AppHeader.scss";

export const AppHeader = () => {
  const pathname = usePathname();

  return (
    <nav className="app-header">
      <ul className="content-container">
        {routeList.map(({ icon, path, displayName }) => (
          <li key={path}>
            <Link
              href={path}
              className={cx("link", { "link--active": pathname === path })}
            >
              <Icon icon={icon} />
              <p>{displayName}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const routeList = [
  {
    path: "/",
    icon: ["fas", "dragon"],
    displayName: "Home",
  },
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
