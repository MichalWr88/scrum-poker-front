"use server";
import UserModel from "@/src/services/mongodb/user/UserSchema";
import { auth } from "@/auth";
import { revalidatePath } from 'next/cache';
export const updateRole = async (formData: FormData) => {
  "use server";
  const session = await auth();

  const user = session?.user;

  if (!user) {
    throw new Error("User not found");
  }

  const newRole = formData.get("role") as string;
  const response = await UserModel.findOneAndUpdate(
    { _id: user.dbId },
    { role: newRole },
    { new: true }
  );
  console.log("rr", response);
  if (!response) {
    throw new Error("Failed to update user role");
  }
  session.user.role = response.role;
  console.log(`Updated user ${user.dbId} to role ${newRole}`);
  revalidatePath("/")
};
