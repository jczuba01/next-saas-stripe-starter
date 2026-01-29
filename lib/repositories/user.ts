import { prisma } from "../db";
import { User } from "@/types/global";

export class UserRepository {

  static async updateUser(user: User): Promise<User> {
    return prisma.user.update({
          where: {
            id: user.id,
          },
          data: user,
    });
  }
  static async getUserByEmail(email: string): Promise<User | null> {
      return prisma.user.findUnique({
      where: { email },
    });

  }
  static async createUser(user: User): Promise<User> {
    return prisma.user.create({
      data: {
        email: user.email,
        password: user.password,
      },
    });
  }
}