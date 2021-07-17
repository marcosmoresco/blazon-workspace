export const Request = `
  type DetailRequest {
    identifier: Int
    name: String
    description: String
    accountIdentifier: String
  }

  type UserDetail {
    firstName: String
    middleName: String
    lastName: String
    email: String
    personalEmail: String
    displayName: String
    mobilePhone: String
    phone: String
    birthDate: String
    username: String
    links: [Link]
  }

  type Request {
    identifier: Int
    type: String
    status: String
    requester: User
    beneficiary: User
    justification: String
    approvalDetails: [ApprovalDetails]
    sodDetails: [ApprovalDetails]
    account: DetailRequest
    resource: DetailRequest
    entitlement: DetailRequest
    role: DetailRequest
    user: UserDetail
    createdAt: String
    effectiveDate: String
    finalizedAt: String
    links: [Link]
  }

  type RequestRepresentation {
    links: [Link]
    requests: [Request]
  }

  type RequestFilters {
    identifier: String
  }

  type RequestTransitionState {
    sourceState: String
    targetState: String
    date: String
    description: String
    detail: String
  }
`;
