import { Match, Switch, createEffect } from "solid-js";
import { createStore } from "solid-js/store";

import { Link, useParams } from "@tanstack/solid-router";
import {
  HiOutlineArrowLeft,
  HiOutlineClock,
  HiOutlinePaperAirplane,
  HiOutlinePlus,
  HiSolidEllipsisVertical,
} from "solid-icons/hi";
import { ReusableDatePicker } from "~/components/common/DatePicker";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import ContentEditableField from "~/components/ui/content-editable";
import { Flex } from "~/components/ui/flex";
import { Col, Grid } from "~/components/ui/grid";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Skeleton } from "~/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { TextField, TextFieldInput } from "~/components/ui/text-field";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { useManifest } from "../../../context/ManifestProvider/useManifest";
import { useTask } from "../../../hooks/tasks";
import type { BaseOptionType } from "../../../types/tasks";
import SubTasks from "../components/SubTasks";

type SelectedOptionType = BaseOptionType | null;
type SelectedStoreType = {
  status: SelectedOptionType;
  priority: SelectedOptionType;
  dueOn: string | null;
};
const TaskDetail = () => {
  const params = useParams({ from: "/_pathlessLayout/tasks/$taskId" });
  const taskDetailsQuery = useTask(params().taskId);
  const [metaData] = useManifest();
  const [selectedStore, setSelectedStore] = createStore<SelectedStoreType>({
    status: null,
    priority: null,
    dueOn: null,
  });
  createEffect(() => {
    console.log("selected store", selectedStore);
  });
  createEffect(() => {
    const statuses = metaData.manifest()?.statuses;
    const priorities = metaData.manifest()?.priorities;
    if (statuses) {
      const status =
        statuses.find(
          (status) => status._id === taskDetailsQuery.data?.data?.status._id,
        ) || null;
      setSelectedStore("status", status);
    }
    if (priorities) {
      const priority =
        priorities.find(
          (priority) =>
            priority._id === taskDetailsQuery.data?.data?.priority._id,
        ) || null;
      setSelectedStore("priority", priority);
    }
  });

  // const handleUpdateEntity = (
  //   option: SelectedOptionType,
  //   entity: keyof SelectedStoreType,
  // ) => {
  //   setSelectedStore(entity, option);
  // };

  // const handleDueDate = (value: string) => {
  //   setSelectedStore("dueOn", value);
  // };
  createEffect(() => {
    console.log("taskDetailsQuery.data?.title", taskDetailsQuery.data);
  });

  return (
    <Switch>
      <Match when={taskDetailsQuery.isLoading}>
        <Grid cols={12}>
          <Col span={8}>
            <Skeleton height={400} />
            <Skeleton height={400} />
          </Col>
          <Col span={4}>
            <Skeleton height={400} />
          </Col>
        </Grid>
      </Match>
      <Match when={taskDetailsQuery.data?.data}>
        <section class="space-y-6">
          <Flex alignItems="center" justifyContent="between" class="gap-2">
            <Button variant="ghost" size="sm">
              <Link
                to="/tasks"
                search={{
                  priority: "",
                  status: "",
                  search: "",
                  sortBy: "Newest",
                }}
                class="flex items-center"
              >
                <HiOutlineArrowLeft class="h-4 w-4 mr-2" />
                Back to Tasks
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              <HiSolidEllipsisVertical class="h-5 w-5" />
            </Button>
          </Flex>
          <div class="space-y-8">
            <div>
              <h2 class="text-3xl font-bold">
                <ContentEditableField
                  initialValue={taskDetailsQuery.data?.data?.title || ""}
                  onSave={() => {}}
                />
              </h2>
            </div>
            {/* <div class="grid grid-flow-col  gap-1 ">
          <div class="card bg-neutral text-neutral-content rounded-r-none">
            <div class="card-body flex items-center flex-row gap-8">
              <h4 class="font-medium">Status</h4>
              <SelectComponent
                options={metaData.manifest()?.statuses || []}
                selected={selectedStore.status}
                setSelected={(option) => handleUpdateEntity(option, "status")}
                icon={AiOutlineCheckCircle}
              />
            </div>
          </div>
          <div class="card bg-neutral text-neutral-content  rounded-none ">
            <div class="card-body flex-row flex items-center gap-8">
              <h4 class="font-medium">Priority</h4>
              <SelectComponent
                options={metaData.manifest()?.priorities || []}
                selected={selectedStore.priority}
                setSelected={(option) => handleUpdateEntity(option, "priority")}
                icon={HiOutlineFlag}
              />
            </div>
          </div>
          <div class="card bg-neutral text-neutral-content rounded-l-none">
            <div class="card-body flex-row flex items-center gap-8">
              <h4 class="font-medium">Due On</h4>
              <Input
                name="dueOn"
                placeholder="Select due date"
                value={selectedStore.dueOn || ""}
                type="date"
                handleInput={handleDueDate}
                outlined
              />
            </div>
          </div>
        </div> */}
            <Grid cols={3} class="gap-6">
              <Col span={2} class="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {taskDetailsQuery.data?.data?.title}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Grid class="gap-4" cols={3}>
                      <Col>
                        <Select
                          id="status"
                          options={["Todo", "Inprogress", "Done"]}
                          value={"Todo"}
                          itemComponent={(props) => (
                            <SelectItem item={props.item}>
                              {props.item.rawValue}
                            </SelectItem>
                          )}
                          class="w-full"
                        >
                          <SelectLabel>Status</SelectLabel>
                          <SelectTrigger>
                            <SelectValue<string>>
                              {({ selectedOption }) => selectedOption()}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent />
                        </Select>
                      </Col>

                      <Col>
                        <Select
                          id="priority"
                          options={["Normal", "Low", "Hight"]}
                          value={"Normal"}
                          itemComponent={(props) => (
                            <SelectItem item={props.item}>
                              {props.item.rawValue}
                            </SelectItem>
                          )}
                        >
                          <SelectLabel>Priority</SelectLabel>
                          <SelectTrigger>
                            <SelectValue<string>>
                              {({ selectedOption }) => selectedOption()}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent />
                        </Select>
                      </Col>

                      <Col>
                        <ReusableDatePicker
                          label="Due Date"
                          placeholder="Pick a due date"
                          class="w-full"
                          onChange={() => {}}
                        />
                      </Col>
                      <Col>
                        <Flex
                          alignItems="center"
                          justifyContent="start"
                          class="gap-2 py-2"
                        >
                          <HiOutlineClock class="h-4 w-4 text-muted-foreground" />
                          <div class="text-sm">
                            <span class="text-muted-foreground mr-1">
                              Created:
                            </span>
                            {taskDetailsQuery.data?.data?.createdAt
                              ? new Date(
                                  taskDetailsQuery.data?.data?.createdAt,
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </Flex>
                      </Col>
                    </Grid>
                  </CardContent>
                </Card>

                <div>
                  <Tabs defaultValue="account" class="">
                    <TabsList class="grid  grid-cols-2 w-[400px] bg-accent">
                      <TabsTrigger value="sub-task">Sub Tasks</TabsTrigger>
                      <TabsTrigger value="attachment">Attachments</TabsTrigger>
                    </TabsList>
                    <TabsContent value="attachment">
                      <Card>
                        <CardHeader>
                          <CardTitle>Attachments</CardTitle>
                        </CardHeader>
                        <CardContent>
                          Lorem ipsum dolor sit amet, consectetur adipisicing
                          elit. Consequuntur odio perferendis labore accusamus
                          nemo aut deleniti nostrum quo voluptatum commodi!
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="sub-task">
                      <Card class="card-hover">
                        <CardHeader>
                          <Flex>
                            <CardTitle>Sub Tasks</CardTitle>
                            <div>
                              <Tooltip placement="top">
                                <TooltipTrigger>
                                  <Button variant="outline" size="iconSm">
                                    <HiOutlinePlus class="size-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Create Subtask</TooltipContent>
                              </Tooltip>
                            </div>
                          </Flex>
                        </CardHeader>
                        <CardContent>
                          <SubTasks parentId={params().taskId} />
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </Col>

              <Col span={1} class="space-y-6">
                <Card class="card-hover">
                  <CardHeader>
                    <CardTitle>Activity</CardTitle>
                  </CardHeader>
                  <CardContent class="space-y-4 h-[600px] overflow-hidden">
                    <div class="flex flex-col items-start gap-2  h-[calc(100%-64px)] overflow-scroll">
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2  h-full overflow-auto">
                        <div class="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                        <div>
                          <div class="text-sm">Priority changed to High</div>
                          <div class="text-xs text-muted-foreground">
                            3 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2  h-full overflow-auto">
                        <div class="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                        <div>
                          <div class="text-sm">Priority changed to High</div>
                          <div class="text-xs text-muted-foreground">
                            3 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2  h-full overflow-auto">
                        <div class="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                        <div>
                          <div class="text-sm">Priority changed to High</div>
                          <div class="text-xs text-muted-foreground">
                            3 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2  h-full overflow-auto">
                        <div class="h-2 w-2 mt-2 rounded-full bg-orange-500" />
                        <div>
                          <div class="text-sm">Priority changed to High</div>
                          <div class="text-xs text-muted-foreground">
                            3 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                        <div>
                          <div class="text-sm">
                            Status changed to In Progress
                          </div>
                          <div class="text-xs text-muted-foreground">
                            2 days ago
                          </div>
                        </div>
                      </div>
                      <div class="flex items-start gap-2">
                        <div class="h-2 w-2 mt-2 rounded-full bg-green-500" />
                        <div>
                          <div class="text-sm">Task created</div>
                          <div class="text-xs text-muted-foreground">
                            {taskDetailsQuery?.data?.data?.createdAt
                              ? new Date(
                                  taskDetailsQuery.data?.data.createdAt,
                                ).toLocaleDateString()
                              : "-"}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <TextField class="flex items-center gap-2 relative">
                        <TextFieldInput
                          class="pr-7"
                          placeholder="Add comment"
                        />
                        <HiOutlinePaperAirplane class="size-4 absolute  right-2 top-1/2 -translate-y-1/2" />
                      </TextField>
                    </div>
                  </CardContent>
                </Card>
              </Col>
            </Grid>
          </div>
        </section>
      </Match>
    </Switch>
  );
};

export default TaskDetail;
