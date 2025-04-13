import React from "react";
import { EasyDialogContext, OpenDialogProps } from "./dialog-context";
import { EasyDialog } from "@/components/dialogs/easy-dialog";

type Props = React.PropsWithChildren<object>;
export function ConfirmationDialogProvider(props: Props) {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogConfig, setDialogConfig] = React.useState<OpenDialogProps>(
    {} as OpenDialogProps
  );

  const openDialog = (props: OpenDialogProps): void => {
    setDialogOpen(true);
    setDialogConfig(props);
  };

  const resetDialog = () => {
    setDialogOpen(false);
    setDialogConfig({} as OpenDialogProps);
  };

  const onConfirm = () => {
    resetDialog();
    dialogConfig?.callback(true);
  };

  const onDismiss = () => {
    resetDialog();
    dialogConfig?.callback(false);
  };

  return (
    <EasyDialogContext.Provider value={{ openDialog }}>
      <EasyDialog
        open={dialogOpen}
        title={dialogConfig.title}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      >
        {dialogConfig.children}
      </EasyDialog>
      {props.children}
    </EasyDialogContext.Provider>
  );
}
