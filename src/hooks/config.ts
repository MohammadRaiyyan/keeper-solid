import { createMutation, createQuery } from "@tanstack/solid-query";
import ConfigService from "~/services/config";
import httpClient from "../api/httpClient";
import { queryKeys } from "../api/queryclient";
import type { BaseOptionType } from "../types/tasks";

const ConfigServices = new ConfigService(httpClient);

const useStatus = () => {
    return createQuery(() => ({
        queryKey: queryKeys.config.getStatus,
        queryFn: () => ConfigServices.getStatus(),
        meta: {
            errorMessage: "Failed to fetch statuses",
        },
    }));
};

const usePriority = () => {
    return createQuery(() => ({
        queryKey: queryKeys.config.getPriority,
        queryFn: () => ConfigServices.getPriority(),
        meta: {
            errorMessage: "Failed to fetch priorities",
        },
    }));
};
const useTag = () => {
    return createQuery(() => ({
        queryKey: queryKeys.config.getTag,
        queryFn: () => ConfigServices.getTag(),
        meta: {
            errorMessage: "Failed to fetch tags",
        },
    }));
};



const useUpdateStatus = (id: string, data: Omit<BaseOptionType, "_id">) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.updateStatus(id, data),
        meta: {
            errorMessage: "Failed to update status",
            invalidateQueries: queryKeys.config.getStatus,
        },
    }));
};
const useUpdatePriority = (id: string, data: Omit<BaseOptionType, "_id">) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.updatePriority(id, data),
        meta: {
            errorMessage: "Failed to update priority",
            invalidateQueries: queryKeys.config.getPriority,
        },
    }));
};
const useUpdateTag = (id: string, data: Omit<BaseOptionType, "_id">) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.updateTag(id, data),
        meta: {
            errorMessage: "Failed to update Tag",
            invalidateQueries: queryKeys.config.getTag,
        },
    }));
};

const useDeleteStatus = (id: string) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.deleteStatus(id),
        meta: {
            errorMessage: "Failed to delete status",
            invalidateQueries: queryKeys.config.getStatus,
        },
    }));
};

const useDeletePriority = (id: string) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.deletePriority(id),
        meta: {
            errorMessage: "Failed to delete priority",
            invalidateQueries: queryKeys.config.getPriority,
        },
    }));
};

const useDeleteTag = (id: string) => {
    return createMutation(() => ({
        queryFn: () => ConfigServices.deleteTag(id),
        meta: {
            errorMessage: "Failed to delete tag",
            invalidateQueries: queryKeys.config.getTag,
        },
    }));
};

export {
    useDeletePriority, useDeleteStatus, useDeleteTag, usePriority, useStatus, useTag, useUpdatePriority, useUpdateStatus, useUpdateTag
};

