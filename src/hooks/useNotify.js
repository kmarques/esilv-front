import { useContext } from "react";
import { AlertContext } from "../contexts/AlertProvider";

export default function useNotify() {
  const { notify } = useContext(AlertContext);

  return notify;
}
