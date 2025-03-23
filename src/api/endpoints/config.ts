export const ConfigEndpoint = {
    getStatus: () => "config/status",
    getPriority: () => "config/priority",
    getTag: () => "config/tag",
    createStatus: () => "config/status",
    updateStatus: (id: string) => `config/status/${id}`,
    deleteStatus: (id: string) => `config/status/${id}`,
    createPriority: () => "config/priority",
    updatePriority: (id: string) => `config/priority/${id}`,
    deletePriority: (id: string) => `config/priority/${id}`,
    createTag: () => "config/tag",
    updateTag: (id: string) => `config/tag/${id}`,
    deleteTag: (id: string) => `config/tag/${id}`,
};

export type ConfigEndpointType = keyof (typeof ConfigEndpoint)
