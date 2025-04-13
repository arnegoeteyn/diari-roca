import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props<T> = React.PropsWithChildren<{
  title: string;
  open: boolean;
  onConfirm: (result: T) => void;
  onDismiss: () => void;
}>;

export function EasyDialog<T>(props: Props<T>) {
  return (
    <Dialog open={props.open} onOpenChange={props.onDismiss}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{props.title}</DialogTitle>
        </DialogHeader>
        {props.children}
      </DialogContent>
    </Dialog>
  );
}
