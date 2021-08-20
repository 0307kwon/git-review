import { useContext } from "react";
import { Context } from "./UserProvider";

const useUser = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error("useUser 훅은 UserProvider 내에서만 사용할 수 있습니다.");
  }

  return context;
};

export default useUser;
