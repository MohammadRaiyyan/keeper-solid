import { Link } from "@tanstack/solid-router";
import { type Component, For } from "solid-js";

type BreadcrumbsType = {
  title: string;
  href?: string;
  disabled?: boolean;
};

const Breadcrumbs: Component<{ list: BreadcrumbsType[] }> = (props) => {
  return (
    <div class="breadcrumbs text-sm">
      <ul>
        <For each={props.list}>
          {(item) => (
            <li>
              <Link disabled={item.disabled} to={item.href || ""}>
                {item.title}
              </Link>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};

export default Breadcrumbs;
