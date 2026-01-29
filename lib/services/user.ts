import bcrypt from "bcryptjs";
import { userNameSchema } from "@/lib/validations/user";
import { User } from "@/types/global";
import { UserRepository } from "../repositories/user";

export class UserService {
  static async getUserByEmail(email: string): Promise<User | null> {
    return UserRepository.getUserByEmail(email);
  }

  static async createUser(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = { email: user.email, password: hashedPassword } as User;

    return UserRepository.createUser(newUser);
  }

  static async registerUser(user: User): Promise<User | null> {
    const { email, password } = user;

    if (!email || !password) {
      return null;
    }

    const existingUser = await this.getUserByEmail(email);
    if (existingUser) {
      return null; 
    }

    return this.createUser(user);
  }

  static async updateUserName(user: User): Promise<User> {
        const { name } = userNameSchema.parse(user.name);
    return UserRepository.updateUser({ ...user, name });
        // Update the user name.
        
}
}
