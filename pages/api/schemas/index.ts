import  {  gql  }  from  'apollo-server-micro'

export  const  typeDefs  =  gql`

    type Link {
        rel: String
        href: String
    }

    type User {
        identifier: ID
        username: String
        displayName: String,
        links: [Link]
    }

    type Resume {
        openApprovalTasks: Int,
        openProvisioningTasks: Int,
        openCertificationTasks: Int,
        openSodTasks: Int,
        openRoleRightsTasks: Int,
        totalOpenTasks: Int,
        links: [Link]
    }

    type Permission {
        user: User,
        modify: Boolean,
        share: Boolean,
        read: Boolean,        
        links: [Link]
    }

    type PasswordVault {
        identifier: Int,
        name: String,
        description: String,
        username: String,
        password: String,
        createdAt: String,
        permissions: [Permission]
        links: [Link]
    }

    type  Query {       
        getResume: Resume,
        getPasswordVaultEntries: [PasswordVault]
    }`