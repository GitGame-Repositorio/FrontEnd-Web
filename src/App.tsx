import { BackendErrorModal } from "./common/modal/modalCustomn/ModalBackendError";
import { useModal } from "./common/modal/useModal";
import { vocabulary } from "./translator";
import Router from "./router";
import { api } from "./api";
import { AxiosError } from "axios";

function App() {
  const { Modal: ModalServerError, openModal } = useModal({
    modal: BackendErrorModal,
  });

  const handleError = async (error: AxiosError) => {
    if (error?.code === "ERR_NETWORK") {
      openModal();
    }
    const message = error.response?.data;
    const objError = {
      ...error,
      response: {
        ...error.response,
        data: vocabulary[message as string],
      },
    };
    return Promise.reject(objError);
  };

  api.interceptors.response.use(null, handleError);

  return (
    <>
      <Router />
      <ModalServerError />
    </>
  );
}

export default App;
