import { useState } from "react";

export type AddSnackbar = (
  type: SnackbarType,
  text: string,
  customRemainTime?: number
) => void;

type SnackbarType = "error" | "success" | "progress";

interface Snackbar {
  key: number;
  type: SnackbarType;
  isHidden: boolean;
  text: string;
  setTimeoutId?: NodeJS.Timeout;
}

interface Props {
  maxSnackbarCount: number;
  snackbarRemainTime: number;
}

const useSnackbarContent = ({
  maxSnackbarCount,
  snackbarRemainTime,
}: Props): { snackbars: Snackbar[]; addSnackbar: AddSnackbar } => {
  const [snackbars, setSnackbars] = useState<Snackbar[]>(
    [...Array(maxSnackbarCount)].map(
      (_, index): Snackbar => ({
        key: index,
        type: "success",
        isHidden: true,
        text: "",
      })
    )
  );

  const removeSnackbar = (key: number) => {
    setSnackbars((state) =>
      state.map((snackbar) => {
        if (snackbar.key !== key) {
          return snackbar;
        }

        return { ...snackbar, isHidden: true };
      })
    );
  };

  const addSnackbar: AddSnackbar = (type, text, customRemainTime?: number) => {
    if (!text) {
      console.error("빈 메세지는 스낵바에 등록할 수 없습니다.");

      return;
    }

    setSnackbars((state) => {
      const [firstSnackbar, ...restSnackbar] = state;

      if (firstSnackbar?.setTimeoutId) {
        clearTimeout(firstSnackbar.setTimeoutId);
      }

      const setTimeoutId = setTimeout(
        () => removeSnackbar(newSnackbar.key),
        customRemainTime || snackbarRemainTime
      );

      const newSnackbar: Snackbar = {
        key: firstSnackbar.key,
        isHidden: false,
        type,
        text,
        setTimeoutId,
      };

      return [...restSnackbar, newSnackbar];
    });
  };

  return {
    snackbars,
    addSnackbar,
  };
};

export default useSnackbarContent;
