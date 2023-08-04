import { Request, Response } from "express";
import { prisma } from "../config/prisma";

const GET = async (request: Request, response: Response) => {
  try {
    const users = await prisma.user.findMany();
    return response.status(200).send({ users });
  } catch (error) {
    return response.status(500).send({ message: "Error", error });
  }
};

export default { GET };
