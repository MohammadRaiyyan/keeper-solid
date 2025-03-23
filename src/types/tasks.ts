export type BaseOptionType = {
  label: string;
  color: string;
  _id: string
};



export type Task = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: BaseOptionType;
  priority: BaseOptionType;
  tag: BaseOptionType;
  dueOn?: string;
  userId: string;
  subTaskCount: number
};

export type TaskPayload = {
  title: string;
  description: string;
  status?: string;
  priority?: string;
  dueOn: Date | null;
};

type TaskBreakdown = {
  title: string;
  count: number;
};

type Insights = {
  totalTasks: number;
  taskBreakdown: TaskBreakdown[];
};
export type Insight = {
  recentTasks: Task[];
  insights: Insights;
};
