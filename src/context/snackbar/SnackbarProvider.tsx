import React, { createContext, useMemo } from "react";
import ReactDOM from "react-dom";
import { ReactComponent as ErrorSignIcon } from "../../asset/icon/errorSign.svg";
import { ReactComponent as SuccessSignIcon } from "../../asset/icon/successSign.svg";
import Loading from "../../component/@common/Loading/Loading";
import { Snackbar, SnackbarWrapper } from "./SnackbarProvider.styles";
import useSnackbarContent, { AddSnackbar } from "./useSnackbarContent";

interface Props {
  children: React.ReactNode;
}

interface SnackbarContext {
  addSnackbar: AddSnackbar;
}

export const Context = createContext<SnackbarContext | null>(null);

const snackbarRoot = document.getElementById("snackbar-root");

const SnackbarProvider = ({ children }: Props) => {
  const { snackbars, addSnackbar } = useSnackbarContent({
    maxSnackbarCount: 1,
    snackbarRemainTime: 3000,
  });

  const snackbarSignMap = {
    error: <ErrorSignIcon width="1.5rem" />,
    success: <SuccessSignIcon width="1.5rem" />,
    progress: <Loading size="1.5rem" thickness="4px" />,
  };

  const contextValue = useMemo(() => ({ addSnackbar }), []);

  const snackbarElement = (
    <SnackbarWrapper>
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.key} isHidden={snackbar.isHidden}>
          {snackbarSignMap[snackbar.type]}
          <span>{snackbar.text}</span>
        </Snackbar>
      ))}
    </SnackbarWrapper>
  );

  return (
    <Context.Provider value={contextValue}>
      {children}
      {snackbarRoot && ReactDOM.createPortal(snackbarElement, snackbarRoot)}
    </Context.Provider>
  );
};

export default SnackbarProvider;
