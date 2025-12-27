import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { industries } from "@/data/industries";
import OnboardingForm from "./_components/onboarding-form";

const OnboardingPage = async () => {
  // Get auth directly in server component
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Check if user is already onboarded
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  // If already onboarded (has industry), redirect to dashboard
  if (user?.industry) {
    redirect("/dashboard");
  }

  return (
    <main className="container mx-auto py-8">
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;