import { Task } from  "@modules/Task/types";

export type ForwardDialogProps = {
  modalOpen: boolean;
  setModalOpen: any;
  execute(userId: number): void;
};

export type ForwardDialogContentProps = {  
  execute(userId: number): void;
};

