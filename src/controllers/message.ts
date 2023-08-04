import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { InputMessageData } from "../types/data";

const GET = async (request: Request, response: Response) => {
  try {
    const { roomId } = request.params;
    if (!roomId)
      return response.status(400).send({ message: "Invalid credentials" });
    const data = await prisma.message.findMany({
      take: 20,
      where: { roomId },
    });
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({ message: "Error", error });
  }
};

const POST = async (request: Request, response: Response) => {
  try {
    const { senderId, message, receiverId, roomId }: InputMessageData =
      request.body;
    if (!senderId || !message.trim() || !receiverId.trim()) {
      return response.status(400).send({ message: "Invalid credentials !" });
    }
    // already have conversation to send message
    if (roomId) {
      await prisma.message.create({
        data: { senderId, message, roomId },
      });
      return response
        .status(201)
        .send({ message: "Message sent successfully !" });
    }

    const createConversation = await prisma.rooms.create({
      data: {
        memberIds: [senderId, receiverId],
      },
    });
    await prisma.message.create({
      data: { senderId, message, roomId: createConversation.id },
    });
    return response
      .status(201)
      .send({ message: "Message sent successfully !" });
  } catch (error) {
    return response.status(500).send({ message: "Error", error });
  }
};

const PUT = async (request: Request, response: Response) => {
  try {
  } catch (error) {
    return response.status(500).send({ message: "Error", error });
  }
};

const DELETE = async (request: Request, response: Response) => {
  try {
  } catch (error) {
    return response.status(500).send({ message: "Error", error });
  }
};

export default { GET, POST, PUT, DELETE };
