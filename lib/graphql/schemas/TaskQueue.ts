export const TaskQueue = `  

  type TaskQueue {
    identifier: Int
    amountTasks: Int
    name: String
    description: String   
    links: [Link]
  }

  type TaskQueueRepresentation {
    links: [Link]
    representation: [TaskQueue]
  } 
`;

export const Queries = `
  getTaskQueues: TaskQueueRepresentation
  getTaskQueuesFilters(category: String, type: String): [TaskFilter]
  getTaskQueueTasks(id: Int, page: Int, size: Int, ord: String, filters: String): TaskRepresentation
`;
