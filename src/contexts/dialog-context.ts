import React from "react";

// export interface DialogForm<T> {
//   onSubmit: (result: T) => void;
// }

export type OpenDialogProps = React.PropsWithChildren<{
  title: string;
  callback: (result: boolean) => void;
}>;

type EasyDialogContextType = {
  openDialog: (props: OpenDialogProps) => void;
};

export const EasyDialogContext = React.createContext<EasyDialogContextType>(
  {} as EasyDialogContextType
);
