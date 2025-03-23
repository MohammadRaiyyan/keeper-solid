import { getRouteApi } from "@tanstack/solid-router";
import { For, Match, Switch } from "solid-js";
import PageTitle from "~/components/common/PageTitle";
import TaskCard from "~/components/common/TaskCard";
import TaskCardSkeleton from "~/components/common/TaskCardSkeleton";
import { Flex } from "~/components/ui/flex";
import { Col, Grid } from "~/components/ui/grid";
import { useTasks } from "~/hooks/tasks";
import TaskFilter from "./components/TaskFilter";

const ZeroState = () => {
  return (
    <Flex alignItems="center" justifyContent="center">
      <h3>No Tasks found!</h3>
    </Flex>
  );
};
const routeApi = getRouteApi("/_pathlessLayout/tasks/");

const Tasks = () => {
  const search = routeApi.useSearch();
  const tasksQuery = useTasks(search());
  return (
    <div class="space-y-5">
      <PageTitle title="Tasks" />
      <TaskFilter />
      <Grid cols={12} class="gap-2">
        <Switch fallback={<ZeroState />}>
          <Match when={tasksQuery.isLoading}>
            <For each={[1, 2, 3, 4, 5]}>
              {() => (
                <Col span={12} spanLg={3} spanMd={4} spanSm={6}>
                  <TaskCardSkeleton />
                </Col>
              )}
            </For>
          </Match>
          <Match when={tasksQuery.data?.data.length}>
            <For each={tasksQuery.data?.data}>
              {(task) => (
                <Col span={12} spanLg={3} spanMd={4} spanSm={6}>
                  {" "}
                  <TaskCard item={task} />
                </Col>
              )}
            </For>
          </Match>
        </Switch>
      </Grid>
    </div>
  );
};

export default Tasks;
