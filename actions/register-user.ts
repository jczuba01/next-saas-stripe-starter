'use server';

import { UserService } from "@/lib/services/user";

export async function registerUser(data: {
  email: string;
  password: string;
}) {
  return UserService.registerUser(data);
}