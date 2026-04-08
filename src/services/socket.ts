import { io, Socket } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_API || "http://localhost:8080";

class SocketService {
  private static instance: SocketService;
  public socket: Socket | null = null;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        transports: ["websocket"],
        autoConnect: true,
      });

      if (process.env.NODE_ENV !== "production") {
        this.socket.on("connect", () => console.log("Socket connected"));
        this.socket.on("disconnect", () => console.log("Socket disconnected"));
      }
    }
    return this.socket;
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public joinConversation(conversationId: number) {
    if (this.socket && this.socket.connected) {
      this.socket.emit("join_conversation", conversationId);
    }
  }
}

const socketService = SocketService.getInstance();
export default socketService;
