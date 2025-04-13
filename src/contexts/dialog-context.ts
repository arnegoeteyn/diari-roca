import React, { ReactNode } from "react";

export type DialogForm = {
  onSubmit: () => void;
};

export type OpenDialogProps = React.PropsWithChildren<{
  title: string;
  dialogForm: (props: DialogForm) => ReactNode;
  callback: (result: boolean) => void;
}>;

type EasyDialogContextType = {
  openDialog: (props: OpenDialogProps) => void;
};

export const EasyDialogContext = React.createContext<EasyDialogContextType>(
  {} as EasyDialogContextType
);
