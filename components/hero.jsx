"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10 px-4">
      <div className="space-y-6 text-center">
        <h1 className=" text-5xl md:text-6xl lg:text-7xl xl:text-8xl gradient-text pb-2 pr-2">
          PrepPal – Your AI-Powered Career Coach
        </h1>

        <p className="mx-auto max-w-[600px] text-muted-foreground md-text-xl">
          Accelerate your career with smart resume feedback, tailored job matches, and interview prep — all in one place.
        </p>
    <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-md mx-auto">
    <Link href="/dashboard" className="w-full sm:w-auto">
    <Button
      size="lg"
      className="w-full px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      Get Started for Free
    </Button>
    </Link>
    <Link href="/features" className="w-full sm:w-auto">
    <Button
      size="lg"
      variant="secondary"
      className="w-full px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      Explore Features
    </Button>
    </Link>
    </div>


        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div>
            <Image
              ref={imageRef}
              src="/banner3.jpeg"
              alt="PrepPal Preview"
              width={1280}
              height={720}
              className="hero-image rounded-lg shadow-2xl border mx-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
