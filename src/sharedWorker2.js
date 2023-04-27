// eslint-disable-next-line no-undef
globalThis.addEventListener("connect", (event) => {
  const port = event.ports[0];

  port.addEventListener("message", (e) => {
    const { type, payload } = e.data;

    if (type === "request") {
      console.log(`Worker received request: ${payload}`);
      port.postMessage({ type: "response", payload: `Worker says: ${payload}` });
    }
  });

  port.start();
});
