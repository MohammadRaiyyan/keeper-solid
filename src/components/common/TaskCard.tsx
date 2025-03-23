import { Link } from "@tanstack/solid-router";
import {
  HiOutlineCheckCircle,
  HiOutlineFlag,
  HiOutlineRectangleGroup,
  HiOutlineTag,
  HiSolidCalendarDays,
} from "solid-icons/hi";
import type { Component } from "solid-js";
import { getContrastColor } from "~/utils/getContrastColor";
import type { Task } from "../../types/tasks";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Flex } from "../ui/flex";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const TaskCard: Component<{ item: Task }> = (props) => {
  return (
    <Card class=" shadow-none">
      <CardHeader class="p-4 pb-0">
        <Link
          class=" hover:underline"
          to="/tasks/$taskId"
          params={{ taskId: props.item._id }}
        >
          <CardTitle class="text-lg line-clamp-1" title={props.item.title}>
            {props.item.title}
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent class="p-4 text-sm">
        <Flex class="gap-2" flexDirection="col" alignItems="start">
          {props.item.status ? (
            <div class="flex items-center gap-2">
              <Tooltip placement="top">
                <TooltipTrigger>
                  <HiOutlineCheckCircle class="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Status</TooltipContent>
              </Tooltip>
              <Badge
                style={{
                  background: props.item.status.color,
                  color: getContrastColor(props.item.status.color),
                }}
              >
                {props.item.status.label}
              </Badge>
            </div>
          ) : null}
          {props.item.priority ? (
            <div class="flex items-center gap-2">
              <Tooltip placement="top">
                <TooltipTrigger>
                  <HiOutlineFlag class="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Priority</TooltipContent>
              </Tooltip>
              <Badge
                style={{
                  background: props.item.priority.color,
                  color: getContrastColor(props.item.priority.color),
                }}
              >
                {props.item.priority.label}
              </Badge>
            </div>
          ) : null}
          {props.item.tag ? (
            <div class="flex items-center gap-2">
              <Tooltip placement="top">
                <TooltipTrigger>
                  <HiOutlineTag class="h-4 w-4" />
                </TooltipTrigger>
                <TooltipContent>Tag</TooltipContent>
              </Tooltip>
              <Badge
                style={{
                  background: props.item.tag.color,
                  color: getContrastColor(props.item.tag.color),
                }}
              >
                {props.item.tag.label}
              </Badge>
            </div>
          ) : null}

          <div class="flex items-center gap-2">
            <HiSolidCalendarDays class="h-4 w-4" />
            <span>
              {props.item.dueOn
                ? new Date(props.item.dueOn).toLocaleDateString()
                : "-"}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <Tooltip placement="top">
              <TooltipTrigger>
                <HiOutlineRectangleGroup class="h-4 w-4" />
              </TooltipTrigger>
              <TooltipContent>Sub Tasks</TooltipContent>
            </Tooltip>

            <span>{props.item.subTaskCount}</span>
          </div>
        </Flex>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
