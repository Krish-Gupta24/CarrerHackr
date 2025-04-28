"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function isOnboarded() {
  const session = await auth();
  if (!session?.user) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email }, 
      select: { industry: true }, 
    });

    if (user?.industry) return { Onboarded: true };
    return { Onboarded: false }; 
  } catch (error) {
    console.error("Error checking onboarding status:", error);
    throw new Error("Failed to check onboarding status");
  }
}

export async function updateUser(data) {
  const { industry, experience, skills, bio } = data;
  const session = await auth();
  if (!session?.user) return null;

  try {
    let user = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        industry,
        experience,
        bio,
        skills,
      },
    });

    return user;
  } catch (error) {
    console.error("Error updating user information:", error);
    throw new Error("Failed to update user information");
  }
}


