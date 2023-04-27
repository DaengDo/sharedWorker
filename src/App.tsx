import { useEffect } from "react";
import SharedWorker from "./sharedWorker?sharedworker";

const App = () => {
  console.log(process.env.MY_VARIABLE);

  useEffect(() => {
    const sharedWorker = new SharedWorker();

    sharedWorker.port.start();

    sharedWorker.port.postMessage("Hello from React!");

    sharedWorker.port.addEventListener("message", (event) => {
      const { type, data } = event.data;
      if (type === "response") {
        console.log(`received: ${data}`);
      }
      console.log(`received message: ${event.data}`);
    });

    return () => {
      sharedWorker.port.close();
    };
  }, []);

  return <div className="App">Success on running vite + TS project!!</div>;
};

export { App };
