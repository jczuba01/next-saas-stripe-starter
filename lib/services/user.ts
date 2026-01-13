import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export class UserService {
  static async getUserByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  static async createUser(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  }

  static async registerUser(data: { email: string; password: string }) {
    const { email, password } = data;

    if (!email || !password) {
      return { error: "Email and password required" };
    }

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return { error: "User already exists" };
    }

    await this.createUser(email, password);

    return { success: true };
  }
}
