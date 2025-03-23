import {
  MutationCache,
  QueryCache,
  QueryClient,
  type QueryKey,
} from "@tanstack/solid-query";
import toast from "solid-toast";

interface QueryMeta {
  successMessage?: string;
  errorMessage?: string;
  invalidateQueries?: QueryKey | QueryKey[];
  mutationId?: string;
}

const showSuccessMessage = (query: unknown) => {
  const meta = query as QueryMeta | undefined;
  if (meta?.successMessage) {
    toast.success(meta.successMessage);
  }
};

const showErrorMessage = (query: unknown, error: Error) => {
  const meta = query as QueryMeta | undefined;
  const message = meta?.errorMessage || error.message;
  if (message) {
    toast.error(message);
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: 0 },
  },
  queryCache: new QueryCache({
    onSuccess: (_, query) => {
      showSuccessMessage(query);
    },
    onError: (error, query) => {
      showErrorMessage(query, error);
    },
  }),
  mutationCache: new MutationCache({
    onSuccess: (_, query) => {
      const meta = query as QueryMeta | undefined;
      showSuccessMessage(query);

      if (meta?.invalidateQueries) {
        const queriesToInvalidate = Array.isArray(meta.invalidateQueries)
          ? meta.invalidateQueries
          : [meta.invalidateQueries];
        for (const queryKey of queriesToInvalidate) {
          queryClient.invalidateQueries({ queryKey });
        }
      }
    },
    onError: (error, _variables, _context, mutation) => {
      showErrorMessage(mutation.meta, error);
    },
  }),
});

export const queryKeys = {
  tasks: {
    all: ["tasks"],
    byId: (id: string) => ["task", id] as const,
    insight: ["insights"],
    subTasks: (id: string) => ["subtask", id] as const
  },
  user: {
    getUser: ["user"],
  },
  manifest: {
    getManifest: ["manifest"],
  },
  insights: {
    insights: ["insights"],
  },
  config: {
    getStatus: ["status"],
    getPriority: ["priority"],
    getTag: ["tag"],
  }
} as const;
