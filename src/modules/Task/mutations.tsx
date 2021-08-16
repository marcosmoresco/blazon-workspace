import { gql } from "@apollo/client";

export const ASSIGN_TO_ME_TASK = gql`
  mutation assignToMeTask($payload: String) {
    assignToMe: assignToMeTask(payload: $payload)
  }
`;

export const UNASSIGN_TASK = gql`
  mutation unassignTask($payload: String) {
    unassign: unassignTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_TASK = gql`
  mutation forwardToUserTask($payload: String) {
    forwardToUser: forwardToUserTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_TASK = gql`
  mutation forwardToQueueTask($payload: String) {
    forwardToQueue: forwardToQueueTask(payload: $payload)
  }
`;

export const ADD_REQUEST_APPROVAL_TASK_COMMENT = gql`
  mutation addRequestApprovalTaskComment($id: Int, $comment: String) {
    addComment: addRequestApprovalTaskComment(id: $id, comment: $comment)
  }
`;

export const ASSIGN_TO_ME_REQUEST_APPROVAL_TASK = gql`
  mutation assignToMeRequestApprovalTask($payload: String) {
    assignToMe: assignToMeRequestApprovalTask(payload: $payload)
  }
`;

export const UNASSIGN_REQUEST_APPROVAL_TASK = gql`
  mutation unassignRequestApprovalTask($payload: String) {
    unassign: unassignRequestApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_REQUEST_APPROVAL_TASK = gql`
  mutation forwardToUserRequestApprovalTask($payload: String) {
    forwardToUser: forwardToUserRequestApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_REQUEST_APPROVAL_TASK = gql`
  mutation forwardToQueueRequestApprovalTask($payload: String) {
    forwardToQueue: forwardToQueueRequestApprovalTask(payload: $payload)
  }
`;

export const RESOLVE_REQUEST_APPROVAL_TASK = gql`
  mutation resolveRequestApprovalTask($payload: String) {
    resolve: resolveRequestApprovalTask(payload: $payload)
  }
`;

export const ADD_CERTIFICATION_APPROVAL_TASK_COMMENT = gql`
  mutation addCertificationApprovalTaskComment($id: Int, $comment: String) {
    addComment: addCertificationApprovalTaskComment(id: $id, comment: $comment)
  }
`;

export const ASSIGN_TO_ME_CERTIFICATION_APPROVAL_TASK = gql`
  mutation assignToMeCertificationApprovalTask($payload: String) {
    assignToMe: assignToMeCertificationApprovalTask(payload: $payload)
  }
`;

export const UNASSIGN_CERTIFICATION_APPROVAL_TASK = gql`
  mutation unassignCertificationApprovalTask($payload: String) {
    unassign: unassignCertificationApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_CERTIFICATION_APPROVAL_TASK = gql`
  mutation forwardToUserCertificationApprovalTask($payload: String) {
    forwardToUser: forwardToUserCertificationApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_CERTIFICATION_APPROVAL_TASK = gql`
  mutation forwardToQueueCertificationApprovalTask($payload: String) {
    forwardToQueue: forwardToQueueCertificationApprovalTask(payload: $payload)
  }
`;

export const RESOLVE_CERTIFICATION_APPROVAL_TASK = gql`
  mutation resolveCertificationApprovalTask($payload: String) {
    resolve: resolveCertificationApprovalTask(payload: $payload)
  }
`;

export const ADD_SOD_APPROVAL_TASK_COMMENT = gql`
  mutation addSoDApprovalTaskComment($id: Int, $comment: String) {
    addComment: addSoDApprovalTaskComment(id: $id, comment: $comment)
  }
`;

export const ASSIGN_TO_ME_SOD_APPROVAL_TASK = gql`
  mutation assignToMeSoDApprovalTask($payload: String) {
    assignToMe: assignToMeSoDApprovalTask(payload: $payload)
  }
`;

export const UNASSIGN_SOD_APPROVAL_TASK = gql`
  mutation unassignSoDApprovalTask($payload: String) {
    unassign: unassignSoDApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_SOD_APPROVAL_TASK = gql`
  mutation forwardToUserSoDApprovalTask($payload: String) {
    forwardToUser: forwardToUserSoDApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_SOD_APPROVAL_TASK = gql`
  mutation forwardToQueueSoDApprovalTask($payload: String) {
    forwardToQueue: forwardToQueueSoDApprovalTask(payload: $payload)
  }
`;

export const RESOLVE_SOD_APPROVAL_TASK = gql`
  mutation resolveSoDApprovalTask($payload: String) {
    resolve: resolveSoDApprovalTask(payload: $payload)
  }
`;

export const ADD_ROLE_RIGHT_APPROVAL_TASK_COMMENT = gql`
  mutation addRoleRightApprovalTaskComment($id: Int, $comment: String) {
    addComment: addRoleRightApprovalTaskComment(id: $id, comment: $comment)
  }
`;

export const ASSIGN_TO_ME_ROLE_RIGHT_APPROVAL_TASK = gql`
  mutation assignToMeRoleRightApprovalTask($payload: String) {
    assignToMe: assignToMeRoleRightApprovalTask(payload: $payload)
  }
`;

export const UNASSIGN_ROLE_RIGHT_APPROVAL_TASK = gql`
  mutation unassignRoleRightApprovalTask($payload: String) {
    unassign: unassignRoleRightApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_ROLE_RIGHT_APPROVAL_TASK = gql`
  mutation forwardToUserRoleRightApprovalTask($payload: String) {
    forwardToUser: forwardToUserRoleRightApprovalTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_ROLE_RIGHT_APPROVAL_TASK = gql`
  mutation forwardToQueueRoleRightApprovalTask($payload: String) {
    forwardToQueue: forwardToQueueRoleRightApprovalTask(payload: $payload)
  }
`;

export const RESOLVE_ROLE_RIGHT_APPROVAL_TASK = gql`
  mutation resolveRoleRightApprovalTask($payload: String) {
    resolve: resolveRoleRightApprovalTask(payload: $payload)
  }
`;

export const APPROVE_ROLE_RIGHT_APPROVAL_TASK_ITEMS = gql`
  mutation approveRoleRightApprovalTaskItems($id: Int, $payload: String) {
    approveRoleRightApprovalTaskItems(id: $id, payload: $payload)
  }
`;

export const ADD_PROVISIONING_TASK_COMMENT = gql`
  mutation addProvisioningTaskComment($id: Int, $comment: String) {
    addComment: addProvisioningTaskComment(id: $id, comment: $comment)
  }
`;

export const ASSIGN_TO_ME_PROVISIONING_TASK = gql`
  mutation assignToMeProvisioningTask($payload: String) {
    assignToMe: assignToMeProvisioningTask(payload: $payload)
  }
`;

export const UNASSIGN_PROVISIONING_TASK = gql`
  mutation unassignProvisioningTask($payload: String) {
    unassign: unassignProvisioningTask(payload: $payload)
  }
`;

export const FORWARD_TO_USER_PROVISIONING_TASK = gql`
  mutation forwardToUserProvisioningTask($payload: String) {
    forwardToUser: forwardToUserProvisioningTask(payload: $payload)
  }
`;

export const FORWARD_TO_QUEUE_PROVISIONING_TASK = gql`
  mutation forwardToQueueProvisioningTask($payload: String) {
    forwardToQueue: forwardToQueueProvisioningTask(payload: $payload)
  }
`;

export const RESOLVE_PROVISIONING_TASK = gql`
  mutation resolveProvisioningTask($payload: String) {
    resolve: resolveProvisioningTask(payload: $payload)
  }
`;

export const DEFINE_ACCOUNT_IDENTIFIER_PROVISIONING_TASK = gql`
  mutation defineAccountIdentifierProvisioningTask($id: Int, $accountIdentifier: String) {
    defineAccountIdentifierProvisioningTask(id: $id, accountIdentifier: $accountIdentifier)
  }
`;

export const DEFINE_USERNAME_PASSWORD_PROVISIONING_TASK = gql`
  mutation defineUsernamePasswordProvisioningTask($id: Int, $username: String, $password: String) {
    defineUsernamePasswordProvisioningTask(id: $id, username: $username, password: $password)
  }
`;

export const CHANGE_PASSWORD_PROVISIONING_TASK = gql`
  mutation changePasswordProvisioningTask($id: Int, $password: String) {
    changePasswordProvisioningTask(id: $id, password: $password)
  }
`;