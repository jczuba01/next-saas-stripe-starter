"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

export async function registerUser(data: { email: string; password: string }) {
  const { email, password } = data;

  if (!email || !password) {
    return { error: "Email and password required" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "User already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return { success: true };
}
