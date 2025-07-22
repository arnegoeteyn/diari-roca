import { DialogForm } from "@/contexts/dialog-context";
import { ReactNode } from "react";

type Props = {
  title: string;
  open: boolean;
  dialogForm: (props: DialogForm) => ReactNode;
  onConfirm: () => void;
  onDismiss: () => void;
};

export function EasyDialog(props: Props) {
  const onSubmit = () => {
    props.onConfirm();
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        <props.dialogForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
