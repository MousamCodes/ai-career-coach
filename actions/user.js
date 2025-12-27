"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function updateUser(data) {
  console.log("🔥 updateUser called with data:", JSON.stringify(data, null, 2));
  
  try {
    const { userId } = await auth();
    console.log("🔥 Auth userId:", userId);
    
    if (!userId) {
      console.error("❌ No userId found");
      throw new Error("Unauthorized");
    }

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });
    
    console.log("🔥 Found user:", user ? user.id : "No user found");

    if (!user) {
      console.error("❌ User not found for clerkUserId:", userId);
      throw new Error("User not found");
    }

    // ✅ Simple update - just save the string values directly
    const updateData = {
      industry: data.industry,        // Save as string, not relation
      subIndustry: data.subIndustry,
      experience: Number(data.experience),
      bio: data.bio || null,
      skills: data.skills || null,    // Keep as string
    };

    console.log("🔥 Update data:", JSON.stringify(updateData, null, 2));

    const updatedUser = await db.user.update({
      where: { id: user.id },
      data: updateData,
    });

    console.log("✅ User updated successfully:", updatedUser.id);

    revalidatePath("/");
    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("❌ Error updating user:", error);
    console.error("❌ Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta
    });
    throw new Error(`Failed to update profile: ${error.message}`);
  }
}