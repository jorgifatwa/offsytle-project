import classNames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import {
  CollapsIcon
} from "./icons";
import FileOpenOutlinedIcon from '@mui/icons-material/FileOpenOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

const menuItems = [
  { id: 1, label: "Create", icon: AddCircleOutlineOutlinedIcon, link: "/" },
  { id: 2, label: "Open File", icon: FileOpenOutlinedIcon, link: "/template" },
  { id: 3, label: "Settings", icon: SettingsOutlinedIcon, link: "/users" },
];

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapsible, setIsCollapsible] = useState(false);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname]
  );

  const wrapperClasses = classNames(
    "h-max-full px-4 pt-8 pb-4 bg-light flex justify-between flex-col",
    {
      ["w-80"]: !toggleCollapse,
      ["w-20"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-4 rounded bg-light-lighter absolute right-0",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };

  const handleSidebarToggle = () => {
    setToggleCollapse(!toggleCollapse);
  };

  return (
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 300ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between relative">
          <div className="flex items-center pl-1 gap-4">
            <span
              className={classNames("mt-2 text-lg font-medium text-text-light", {
                hidden: toggleCollapse,
              })}
            >
              Offstyle
            </span>
          </div>
          {isCollapsible && (
            <button
              className={collapseIconClasses}
              onClick={handleSidebarToggle}
            >
              <CollapsIcon />
            </button>
          )}
        </div>

        <div className="flex flex-col items-start mt-24">
            {menuItems.map(({ id, icon: Icon, ...menu }) => {
            const classes = getNavItemClasses(menu);
                return (
                    <div key={id} className={classes}>
                    <Link href={menu.link}>
                        <span className="flex py-4 px-3 items-center w-full h-full">
                        <div style={{ width: "2.5rem" }}>
                            <Icon className="text-text-light" />
                        </div>
                        {!toggleCollapse && (
                            <span
                            className={classNames(
                                "text-md font-medium text-text-light"
                            )}
                            >
                            {menu.label}
                            </span>
                        )}
                        </span>
                    </Link>
                    </div>
                );
            })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})} px-3 py-4`}>
        <div style={{ width: "2.5rem" }}>
          <ExitToAppOutlinedIcon className="text-text-light" />
        </div>
        {!toggleCollapse && (
          <span className={classNames("text-md font-medium text-text-light")}>
            Exit
          </span>
        )}
      </div>
    </div>
  );
};

export default Sidebar;