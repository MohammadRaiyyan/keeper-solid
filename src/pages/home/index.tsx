import { Link } from "@tanstack/solid-router";

import { For, createEffect, createSignal } from "solid-js";
import PageTitle from "~/components/common/PageTitle";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Chart } from "~/components/ui/charts";
import { Col, Grid } from "~/components/ui/grid";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useInsights } from "../../hooks/insights";

type DistributionChartType = {
  labels: string[];
  datasets: { data: number[] }[];
};

const Home = () => {
  const insightsQuery = useInsights();
  const [chartData, setChartData] = createSignal<DistributionChartType>();

  createEffect(() => {
    if (insightsQuery.data?.data?.insights.taskBreakdown) {
      const data = {
        labels: insightsQuery.data?.data?.insights.taskBreakdown.map(
          (task) => task.title,
        ),
        datasets: [
          {
            data: insightsQuery.data?.data?.insights.taskBreakdown.map(
              (task) => task.count,
            ),
            borderRadius: {
              topLeft: 12,
              topRight: 12,
            },
          },
        ],
      };
      setChartData(data);
    }
  });
  return (
    <div class="space-y-8">
      <div class="space-y-4">
        <PageTitle title="Dashboard" />
        <Grid cols={1} colsMd={4}>
          <Col span={1}>
            <Card class="card-hover">
              <CardHeader class="flex flex-row items-center justify-between pb-2">
                <CardTitle class="text-sm font-medium">Total Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="text-2xl font-bold">
                  {insightsQuery.data?.data?.insights.totalTasks || 0}
                </div>
                <p class="text-xs text-muted-foreground">
                  Across all projects and categories
                </p>
              </CardContent>
            </Card>
          </Col>
        </Grid>
      </div>
      <div class="space-y-4">
        <Tabs defaultValue="overview">
          <TabsList class="grid  grid-cols-2 w-[400px] bg-accent">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="recent">Recent Tasks</TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <Grid cols={5}>
              <Col span={3}>
                <Card>
                  <CardHeader>
                    <CardTitle>Task status distribution of the month</CardTitle>
                  </CardHeader>
                  <CardContent class="h-[400px] w-full">
                    {chartData() && (
                      <Chart
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,

                          plugins: {
                            legend: { display: false },
                          },
                          backgroundColor: "#7c3be8",

                          scales: {
                            y: {
                              beginAtZero: true,
                              ticks: {
                                stepSize: 1,
                                callback: (value) => {
                                  if (
                                    typeof value === "number" &&
                                    value % 1 === 0
                                  ) {
                                    return value;
                                  }
                                },
                              },
                            },
                          },
                        }}
                        type="bar"
                        data={chartData() as DistributionChartType}
                      />
                    )}
                  </CardContent>
                </Card>
              </Col>
            </Grid>
          </TabsContent>
          <TabsContent value="recent">
            <Card class="card-hover">
              <CardHeader>
                <CardTitle>Recent Tasks</CardTitle>
                <CardDescription>
                  Your most recently created tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <For each={insightsQuery.data?.data?.recentTasks}>
                    {(task) => (
                      <div class="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                        <div class="space-y-1">
                          <Link
                            to="/tasks/$taskId"
                            params={{ taskId: task._id }}
                            class="font-medium hover:underline"
                          >
                            {task.title}
                          </Link>
                          <div class="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              // class={statusColors[task.status]}
                            >
                              {task.status.label}
                            </Badge>
                            <Badge
                              variant="outline"
                              // class={priorityColors[task.priority]}
                            >
                              {task.priority.label}
                            </Badge>
                          </div>
                        </div>
                        <div class="text-sm text-muted-foreground">
                          {new Date(task.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    )}
                  </For>
                </div>
              </CardContent>
            </Card>
            {/* <div class="grid gap-4">
              <For each={insightsQuery.data?.data?.recentTasks}>
                {(item) => (
                  <>
                    <Card class="overflow-hidden w-full">
                      <CardHeader class="p-4">
                        <div class="flex items-start justify-between">
                          <Link
                            to="/tasks/$taskId"
                            params={{ taskId: item._id }}
                            class="hover:underline"
                          >
                            <CardTitle class="text-lg">{item.title}</CardTitle>
                          </Link>
                          <div class="flex items-center gap-2">
                            <Badge
                              variant="outline"
                              // class={statusColors[task.status]}
                            >
                              {item.status}
                            </Badge>
                            <Badge
                              variant="outline"
                              // class={priorityColors[task.priority]}
                            >
                              {item.priority}
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent class="p-4 pt-0">
                        <p class="text-sm text-muted-foreground mb-4">
                          {item.description}
                        </p>
                        <div class="flex items-center justify-between text-sm">
                          <div class="flex items-center gap-2">
                            <span class="text-muted-foreground">Assignee:</span>
                            {/* <span>{task.assignee}</span> */}
            {/* </div>
                          {item.dueOn && (
                            <div class="flex items-center gap-2">
                              <HiSolidCalendarDays class="h-4 w-4 text-muted-foreground" />
                              <span>
                                Due: {new Date(item.dueOn).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </For>
            </div> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
