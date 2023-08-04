import { Socket } from "socket.io";
import { prisma } from "../config/prisma";

export default async function SocketController(socket: Socket, io: any) {
  const userId = socket.handshake.query.userId;
  if (userId) {
    // console.log(userId);
    await prisma.user.update({
      where: { id: userId as string },
      data: { status: "ONLINE", socketId: socket.id },
    });
  }

  // Join rooms
  socket.on("join-room", (userId: string, roomId: string) => {
    socket.join(roomId);
  });
  socket.on("send-message", ({ message, roomId }) => {
    console.log({ message, roomId });
    io.to(roomId).emit("receive-message", message);
  });

  socket.on("disconnect", async () => {
    console.log("connection disconnected");
  });
}
