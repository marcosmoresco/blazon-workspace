import { Task } from  "@modules/Task/types";

export type ForwardDialogProps = {
  modalOpen: boolean;
  setModalOpen: any;
  execute(queueId: number): void;
};

export type ForwardDialogContentProps = {  
  execute(queueId: number): void;
};

