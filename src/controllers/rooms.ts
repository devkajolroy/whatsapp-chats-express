import { Request, Response } from "express";
import { prisma } from "../config/prisma";

// Method GET
const GET = async (request: Request, response: Response) => {
  try {
    const { userId } = request.params;
    if (!userId)
      return response.status(400).send({ message: "Invalid credentials" });

    const data = await prisma.rooms.findMany({
      take: 20,
      where: {
        memberIds: { has: userId },
      },
      select: {
        members: true,
        created_at: true,
        updated_at: true,
        icon: true,
        id: true,
        isGroup: true,
        // message: true,
        name: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({ error });
  }
};

// Method GET
const GET_Room = async (request: Request, response: Response) => {
  try {
    const { roomId } = request.params;
    if (!roomId)
      return response.status(400).send({ message: "Invalid credentials" });

    const data = await prisma.rooms.findFirst({
      take: 20,
      where: {
        id: roomId,
      },
      select: {
        members: true,
        created_at: true,
        updated_at: true,
        icon: true,
        id: true,
        isGroup: true,
        // message: true,
        name: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });
    return response.status(200).send(data);
  } catch (error) {
    return response.status(500).send({ error });
  }
};
// Method POST
export const POST = async (request: Request, response: Response) => {
  try {
    const { userId, membersId }: { userId: string; membersId: string[] } =
      request.body;
    // input & check user id from body
    if (!userId || !membersId)
      return response.status(400).send({ message: "Invalid credentials" });

    // already existing chat rooms
    const existing = await prisma.rooms.findFirst({
      where: { memberIds: { hasEvery: [userId, ...membersId] } },
    });
    if (existing)
      return response
        .status(400)
        .send({ message: "Already start with chats !", rooms: existing });

    // find user by userId and check valid user
    const findUser = await prisma.user.findFirst({ where: { id: userId } });
    if (!findUser)
      return response.status(400).send({ message: "User not found !" });

    // create empty conversation
    const rooms = await prisma.rooms.create({
      data: { memberIds: [...membersId, userId] },
    });
    // many to many relationships conversation with user

    return response.status(200).send({ rooms });
  } catch (error) {
    return response.status(500).send({ error });
  }
};

// Method Put
const PUT = async () => {
  try {
  } catch (error) {}
};

// Method DELETE
const DELETE = async () => {
  try {
  } catch (error) {}
};

export default { GET, PUT, POST, GET_Room, DELETE };
