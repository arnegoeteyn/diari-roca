import { Area, Pre } from "@/lib/routes/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { AreaForm } from "../forms/area-form";

type Props = {
  open: boolean;
  onSubmit: (area: Pre<Area>) => void;
  onCancel: () => void;
};

export function AreaDialog(props: Props) {
  return (
    <Dialog open={props.open} onOpenChange={props.onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New area</DialogTitle>
        </DialogHeader>
        <AreaForm onSubmit={props.onSubmit} />
      </DialogContent>
    </Dialog>
  );
}
