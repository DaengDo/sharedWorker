import io from "socket.io-client";

import { SOCKET } from "@configs/constants/socket";

interface SharedWorkerGlobalScope {
  addEventListener(
    type: "connect",
    listener: (event: MessageEvent) => void,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

interface WorkerAction {
  type: SOCKET;
  payload: any;
}

const socketOptions = {
  reconnection: true,
  reconnectionAttempts: Infinity,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  randomizationFactor: 1,
} satisfies SocketIOClient.ConnectOpts;

let socket = io(`${import.meta.env.VITE_SSL ? "https://" : "http://"}${import.meta.env.VITE_URL}`, socketOptions);

(globalThis as SharedWorkerGlobalScope).addEventListener("connect", (event: MessageEvent) => {
  const port = event.ports[0];
  port.start();

  port.addEventListener("message", (e: MessageEvent) => {
    const {
      data: { type, payload },
    } = e as { data: WorkerAction };

    socket.on("connect", () => port.postMessage({ type: SOCKET.CONNECT }));
    socket.on("disconnect", () => port.postMessage({ type: SOCKET.DISCONNECT }));

    if (type === SOCKET.CHANGE_URL) socket = io(payload, socketOptions);
    if (type === SOCKET.ON) socket.on(payload, (newData: unknown) => port.postMessage(newData));
    if (type === SOCKET.ONCE) socket.once(payload, (newData: unknown) => port.postMessage(newData));
    if (type === SOCKET.OFF) socket.off(payload);
    if (type === SOCKET.EMIT) socket.emit(payload.channel, payload.emit);
  });
});
