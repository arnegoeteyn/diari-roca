import { EasyDialogContext, OpenDialogProps } from "@/contexts/dialog-context";
import React from "react";

export default function useConfirmationDialog() {
  const { openDialog } = React.useContext(EasyDialogContext);

  const easyDialog = (
    props: Omit<OpenDialogProps, "callback">
  ): Promise<boolean> =>
    new Promise((res) => {
      openDialog({ callback: res, ...props });
    });

  return { easyDialog };
}
