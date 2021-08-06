import { Task } from  "@modules/Task/types";

export type DisapproveDialogProps = {
  modalOpen: boolean;
  setModalOpen: any;
  task?: Task | undefined; 
  execute(justification: string): void;
};

export type DisapproveDialogContentProps = {
  form: any,  
};

