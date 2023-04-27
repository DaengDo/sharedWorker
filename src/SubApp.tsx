import { useEffect } from "react";
import SharedWorker from "./sharedWorker?sharedworker";

const SubApp = () => {
  let sharedWorker: SharedWorker;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    sharedWorker = new SharedWorker();

    sharedWorker.port.start();

    sharedWorker.port.addEventListener("message", (event) => {
      console.log(`received message: ${event.data}`);
    });

    return () => {
      sharedWorker.port.close();
    };
  }, []);

  const handleClickButton = () => {
    console.log("먼데");
    // sharedWorker.port.postMessage("subwindow");
    sharedWorker.port.postMessage({ type: "REQUEST", payload: "이게 가나?" });
  };

  return (
    <div>
      subwindow 입니당
      <button type="button" onClick={handleClickButton}>
        shared 전송
      </button>
    </div>
  );
};

export { SubApp };
