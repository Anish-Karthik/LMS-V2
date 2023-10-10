
import { User } from "@prisma/client";
import { db } from "../db";

export const isTeacher = async (userId: string | null) => {
  try {
    if (!userId) return false;
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    return user?.role === "teacher";
  }
  catch (e) {
    console.log(e);
    return false;
  }
}

export const createUser = async ({
  userId,
  email,
  phoneNo,
  name,
  image,
  role = "student",
}: User) => {
  try {
    if (!userId) return false;
    const user = await db.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (user) return false;
    await db.user.create({
      data: {
        userId,
        role,
        email,
        phoneNo,
        image,
        name,
      },
    });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}