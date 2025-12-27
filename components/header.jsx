// components/header.jsx

import React from "react";
import { SignedOut, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronDown, LayoutDashboard, Stars, FileText, Mic, FileEdit } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { checkUser } from "@/lib/checkUser";

export default async function Header() {
  await checkUser();
  // Ensure user is checked on header load
  return (
    <header className="fixed top-[0.25px] w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/80">
      <nav className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/logo.jpg"
            alt="PrepPal Logo"
            width={500}
            height={240}
            className="h-[180px] w-[200px] object-contain"
          />
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/dashboard">
            <Button variant="ghost" className="text-lg">
              <LayoutDashboard className="mr-2 h-5 w-5" />
              <span className="hidden md:inline">Industry Insights</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton>
              <Button variant="outline">Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                baseTheme: "dark",
                elements: { userButtonAvatarBox: "size-8" },
              }}
            />
          </SignedIn>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">
                <Stars className="h-5 w-5" />
                <span className="hidden md:inline">Tools</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href="/resume" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Build Resume</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/cover-letter" className="flex items-center gap-2">
                  <FileEdit className="h-4 w-4" />
                  <span>Cover Letter</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/interview-prep" className="flex items-center gap-2">
                  <Mic className="h-4 w-4" />
                  <span>Interview Prep</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/subscription" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Subscription</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

