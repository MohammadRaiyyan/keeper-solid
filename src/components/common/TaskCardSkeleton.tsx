import { Card, CardContent, CardHeader } from "../ui/card";
import { Flex } from "../ui/flex";
import { Skeleton } from "../ui/skeleton";

const TaskCardSkeleton = () => {
  return (
    <Card>
      <CardHeader class="p-4 pb-0">
        <Skeleton height={24} radius={4} />
      </CardHeader>
      <CardContent class="p-4">
        <Flex class="pt-3 border-t">
          <div class="flex items-center">
            <Skeleton height={20} width={150} radius={4} />
          </div>
          <Flex alignItems="center" class="gap-2 w-auto">
            <Skeleton height={20} width={48} radius={4} />
            <Skeleton height={20} width={48} radius={4} />
            <Skeleton height={20} width={48} radius={4} />
          </Flex>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default TaskCardSkeleton;
