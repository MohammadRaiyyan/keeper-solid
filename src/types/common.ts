import type { IconTypes } from "solid-icons";

export type BaseResponse<T> = {
  message: string;
  status: number;
  data?: T;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
};

export interface ApiError {
  message: string;
  code: string;
  status: number;
}
export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

export type TaskEntityType = {
  value: string;
  label: string;
  color: string;
  _id: string;
};
export type Manifest = {
  user: User | null;
  statuses: TaskEntityType[];
  priorities: TaskEntityType[];
};

type DropdownItemBase = {
  title: string;
  icon?: IconTypes;
  isFooter?: boolean;
};
type LinkType = DropdownItemBase & {
  as: "link";
  href: string;
};
type ButtonType = DropdownItemBase & {
  as: "button";
  onClick: () => void;
};
export type DropdownItem = LinkType | ButtonType;

export type GlobalLoaderType = {
  message?: string;
  isLoading: boolean;
};
