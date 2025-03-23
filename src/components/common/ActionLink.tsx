import { Link } from "@tanstack/solid-router";
import type { Component } from "solid-js";

type ActionLinkProps = {
  title: string;
  actionName: string;
  url: string;
};
const ActionLink: Component<ActionLinkProps> = (props) => {
  return (
    <p class="text-sm">
      {props.title}
      <Link to={props.url} class="hover:underline text-primary ml-1">
        {props.actionName}
      </Link>
    </p>
  );
};

export default ActionLink;
