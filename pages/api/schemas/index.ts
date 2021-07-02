import  {  gql  }  from  'apollo-server-micro'

export  const  typeDefs  =  gql`

    type Link {
        rel: String
        href: String
    }

    type User {
        identifier: ID
        username: String
        displayName: String
        links: [Link]
    }

    type Resume {
        openApprovalTasks: Int
        openProvisioningTasks: Int
        openCertificationTasks: Int
        openSodTasks: Int
        openRoleRightsTasks: Int
        totalOpenTasks: Int
        links: [Link]
    }

    type Permission {
        user: User
        modify: Boolean
        share: Boolean
        read: Boolean        
        links: [Link]
    }

    type PasswordVault {
        identifier: Int
        name: String
        description: String
        username: String
        password: String
        createdAt: String
        permissions: [Permission]
        links: [Link]
    }

    type Detail {
        identifier: Int
        name: String
        accountIdentifier: String!
    }

    type ApprovalDetails {
        identifier: Int
        creation: String
        approvalDate: String
        outcome: String
        taskId: Int
    }

    type Request {
        identifier: Int
        type: String
        status: String
        requester: User
        beneficiary: User
        justification: String
        approvalDetails: [ApprovalDetails]
        account: Detail!
        resource: Detail!
        entitlement: Detail!
        role: Detail!
        createdAt: String
        effectiveDate: String
        links: [Link]
    }

    type RequestRepresentation {
        links: [Link]
        requests: [Request]
    }

    type  Query {       
        getResume: Resume
        getPasswordVaultEntries: [PasswordVault]
        getRequests(page: Int, size: Int): RequestRepresentation 
    }`