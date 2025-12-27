// app/(main)/dashboard/page.jsx
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

const IndustryInsightsPage = async () => {
  // Get auth directly in server component
  const { userId } = await auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Check onboarding status directly
  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
    select: { industry: true },
  });

  // If not onboarded (no industry set), redirect to onboarding page
  if (!user?.industry) {
    redirect("/onboarding");
  }

  return (
    <div>
      <h1>Industry Insights</h1>
      <p>Welcome to your personalized industry insights!</p>
      {/* Your dashboard content here */}
    </div>
  );
};

export default IndustryInsightsPage;