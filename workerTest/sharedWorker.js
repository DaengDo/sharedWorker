self.addEventListener("connect", (e) => {
  const port = e.ports[0];

  port.addEventListener("message", (event) => {
    console.log(`Worker received message: ${event.data}`);
    port.postMessage(`Worker says: ${event.data}`);
  });

  port.start();
});
