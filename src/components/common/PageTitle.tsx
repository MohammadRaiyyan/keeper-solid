import type { Component } from "solid-js";

const PageTitle: Component<{ title: string }> = (props) => {
  return <h2 class="text-2xl font-bold">{props.title}</h2>;
};

export default PageTitle;
