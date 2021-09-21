export const Resume = `
  type Resume {
    openApprovalTasks: Int
    openProvisioningTasks: Int
    openCertificationTasks: Int
    openSodTasks: Int
    openRoleRightsTasks: Int
    openUserRevalidationTasks: Int
    totalOpenTasks: Int
    links: [Link]
  }
`;

export const Queries = `
  getResume(listStatus: String): Resume
`;
