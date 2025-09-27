import { User } from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    user: {
      username: string;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      role: string;
      isVerified: boolean;
      _id: string;
      createdAt: string;
    };
  }

  interface Session {
    user: User["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: User["user"];
    token: string;
  }
}
