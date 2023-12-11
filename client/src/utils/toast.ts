import { ToastPosition, toast } from "react-toastify";

const toastConfig = {
  autoClose: 1000,
  closeButton: false,
  pauseOnHover: false,
  pauseOnFocusLoss: false,
  position: "top-center" as ToastPosition,
};

const showSingleToast = (toastId: string, message: string) => {
  if (!toast.isActive(toastId)) {
    toast(message, { toastId });
  }
};

export { toastConfig, showSingleToast };
