export const Request = `
  type DetailRequest {
    identifier: Int
    name: String
    accountIdentifier: String!
  }

  type Request {
    identifier: Int
    type: String
    status: String
    requester: User
    beneficiary: User
    justification: String
    approvalDetails: [ApprovalDetails]
    account: DetailRequest!
    resource: DetailRequest!
    entitlement: DetailRequest!
    role: DetailRequest!
    createdAt: String
    effectiveDate: String
    links: [Link]
  }

  type RequestRepresentation {
    links: [Link]
    requests: [Request]
  }
`;
