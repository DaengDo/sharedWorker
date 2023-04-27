/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-undef
globalThis.addEventListener("connect", (event) => {
  const port = event.ports[0];

  port.addEventListener("message", (e) => {
    const { type, payload } = e.data;
    // port.postMessage(e.data.type);
    if (type === "REQUEST") {
      port.postMessage(`${payload}에 대한 응답입니다!!`);
    }
  });

  port.start();
});
