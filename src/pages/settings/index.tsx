import { HiOutlinePencil, HiOutlinePlus, HiOutlineTrash } from "solid-icons/hi";
import { createStore } from "solid-js/store";
import PageTitle from "~/components/common/PageTitle";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Flex } from "~/components/ui/flex";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import ManageTaskEntityModal from "./components/ManageTaskEntityModal";

type ManageEntityType = {
  isOpen: boolean;
  action: "ADD" | "UPDATE" | "DELETE";
  entity: "STATUS" | "PRIORITY" | "LABEL";
  dataId: string;
};

const Settings = () => {
  const [manageEntity, setManageEntity] = createStore<ManageEntityType>({
    isOpen: false,
    action: "ADD",
    entity: "STATUS",
    dataId: "",
  });

  const handleEntity = (
    entity: ManageEntityType["entity"],
    action: ManageEntityType["action"],
    dataId: string,
  ) => {
    setManageEntity(() => {
      return {
        action: action,
        entity: entity,
        isOpen: true,
        dataId,
      };
    });
  };

  return (
    <div class="space-y-8">
      <PageTitle title="Settings" />

      <div class="space-y-2">
        <Tabs defaultValue="statuses">
          <TabsList class="bg-accent">
            <TabsTrigger value="statuses">Statuses</TabsTrigger>
            <TabsTrigger value="priorities">Priorities</TabsTrigger>
            <TabsTrigger value="labels">Labels</TabsTrigger>
          </TabsList>
          <TabsContent value="statuses">
            <Card>
              <CardHeader>
                <Flex>
                  <div class="space-y-1.5">
                    <CardTitle>Task Statuses</CardTitle>
                    <CardDescription>
                      Customize the statuses used for your tasks
                    </CardDescription>
                  </div>
                  <div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEntity("STATUS", "ADD", "")}
                    >
                      <HiOutlinePlus class="size-5" />{" "}
                    </Button>
                  </div>
                </Flex>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        <Badge>Todo</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("STATUS", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("STATUS", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        {" "}
                        <Badge>Inprogress</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("STATUS", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("STATUS", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="priorities">
            <Card>
              <CardHeader>
                <CardTitle>Task Priorities</CardTitle>
                <CardDescription>
                  Customize the priority level of your tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        {" "}
                        <Badge>Normal</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("PRIORITY", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("PRIORITY", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        <Badge>Medium</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("PRIORITY", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("PRIORITY", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="labels">
            <Card>
              <CardHeader>
                <CardTitle>Task Labels</CardTitle>
                <CardDescription>
                  Create and manage labels to categorize your tasks{" "}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div class="space-y-4">
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        <Badge>Bug</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("LABEL", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("LABEL", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                  <div class="border rounded-md p-2">
                    <Flex justifyContent="between">
                      <div class="flex-1">
                        {" "}
                        <Badge>Feature</Badge>
                      </div>
                      <Flex class="w-max gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEntity("LABEL", "UPDATE", "abcd")
                          }
                        >
                          <HiOutlinePencil class="size-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() =>
                            handleEntity("LABEL", "DELETE", "abcd")
                          }
                        >
                          <HiOutlineTrash class="size-4" />
                        </Button>
                      </Flex>
                    </Flex>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <ManageTaskEntityModal
        open={manageEntity.isOpen}
        setIsOpen={(state) => setManageEntity("isOpen", state)}
        actionType={manageEntity.action}
        entity={manageEntity.entity}
      />
    </div>
  );
};

export default Settings;
