export const Team = `
  type ResponsibleTeam {
    identifier: ID
    user: User
  }

  type ResponsibleTeamRepresentation {
    links: [Link]
    representation: [ResponsibleTeam]
  }
`;

export const Queries = `
  getResponsibleTeam: ResponsibleTeamRepresentation
  getResponsibleTeamUserData(id: Int): UserDataRepresentation
`;

export const Mutations = `  
  responsibleTeamGenerateRequests(payload: String): Boolean
`;