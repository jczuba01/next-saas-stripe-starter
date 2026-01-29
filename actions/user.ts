'use server'

import { UserService } from "@/lib/services/user";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { User, ActionResult } from '@/types/global';
import { log } from "@/lib/logger";

export async function registerUser(user: User): Promise<ActionResult<User>> {
  const result = await UserService.registerUser(user);
  if (!result || 'error' in result) {
  log.action.error(new Error((result as { error: string }).error));
    return { success: false, error: (result as { error: string }).error };
  }
  log.action.info({ message: `User registered: ${result.email}` });
  return { success: true, data: result as User };
}


export async function updateUserName(user: User): Promise<ActionResult<User>> {
  try {
    //Autentykacja usera
    const session = await auth()

    if (!session?.user || session?.user.id !== user.id) {
      throw new Error("Unauthorized");
    }
    //Koniec autentykacji

    const updatedUser = await UserService.updateUserName(user);
    revalidatePath('/settings');
    return { success: true, data: updatedUser };
  } catch (error) {
    // console.log(error)
    return { success: false, error: (error as Error).message };
  }
}
