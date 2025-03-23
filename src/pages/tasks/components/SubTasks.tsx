import { For, Match, Show, Switch } from "solid-js";
import TaskCard from "~/components/common/TaskCard";
import TaskCardSkeleton from "~/components/common/TaskCardSkeleton";
import { Flex } from "~/components/ui/flex";
import { useSubTasks } from "~/hooks/tasks";

const ZeroState = (props: { message: string | undefined }) => {
  return (
    <Flex alignItems="center" justifyContent="center" class="space-y-1">
      <h2>No Subtasks!</h2>
      <Show when={props.message}>
        <p>{props.message}</p>
      </Show>
    </Flex>
  );
};

type SubTasksProps = {
  parentId: string;
};
function SubTasks(props: SubTasksProps) {
  const subTasksQuery = useSubTasks(props.parentId);

  return (
    <div class="space-y-2">
      <Switch fallback={<ZeroState message={subTasksQuery.data?.message} />}>
        <Match when={subTasksQuery.isLoading}>
          <For each={[1, 2, 3]}>{() => <TaskCardSkeleton />}</For>
        </Match>
        <Match when={subTasksQuery.data?.data?.length}>
          <For each={subTasksQuery.data?.data}>
            {(task) => <TaskCard item={task} />}
          </For>
        </Match>
      </Switch>
    </div>
  );
}

export default SubTasks;
