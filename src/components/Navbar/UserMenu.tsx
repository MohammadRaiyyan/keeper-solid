import { useNavigate } from "@tanstack/solid-router";
import {
  HiOutlineArrowLeftOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineUser,
} from "solid-icons/hi";
import { type Component, createMemo } from "solid-js";
import toast from "solid-toast";
import { useLogout } from "../../hooks/auth";
import type { DropdownItem, User } from "../../types/common";
import Dropdown from "../common/Dropdown";
import { DropdownMenuLabel } from "../ui/dropdown-menu";

const userDropdownOptions = (props: {
  logout: () => void;
}): { main: DropdownItem[]; footer: DropdownItem[] } => ({
  main: [
    {
      as: "link",
      href: "/profile",
      title: "Profile",
      icon: HiOutlineUser,
    },
    {
      as: "link",
      href: "/settings",
      title: "Settings",
      icon: HiOutlineCog6Tooth,
    },
  ],
  footer: [
    {
      as: "button",
      onClick: props.logout,
      title: "Logout",
      icon: HiOutlineArrowLeftOnRectangle,
    },
  ],
});

const UserMenu: Component<{ user: User }> = (props) => {
  const navigate = useNavigate();
  const logoutQuery = useLogout();
  const initials = createMemo(() => {
    if (props) {
      const first = props.user.firstName.charAt(0).toUpperCase();
      const last = props.user.lastName.charAt(0).toUpperCase();
      return first + last;
    }
    return "";
  });

  const Header = () => {
    return (
      <DropdownMenuLabel class="font-normal">
        <div class="flex flex-col space-y-1">
          <p class="text-sm font-medium leading-none">{`${props.user.firstName} ${props.user.lastName}`}</p>
          <p class="text-xs leading-none text-muted-foreground">
            {props.user.email}
          </p>
        </div>
      </DropdownMenuLabel>
    );
  };
  const logout = async () => {
    const indicator = toast.loading("Logging you out please wait");
    await logoutQuery
      .mutateAsync()
      .then((res) => {
        navigate({ to: "/login" });
        toast.success(res.message);
      })
      .catch((error) => {
        if (error instanceof Error) {
          toast.error(error.message);
          return;
        }
        toast.error(error);
      });
    toast.remove(indicator);
  };

  return (
    <Dropdown
      header={<Header />}
      items={userDropdownOptions({ logout })}
      trigger={<span title="Profile"> {initials()}</span>}
      placement="top-end"
      menuClass="w-56"
      triggerClass="border  rounded-full bg-rose-500 text-white p-2 h-9 flex items-center justify-center font-medium"
    />
  );
};

export default UserMenu;
