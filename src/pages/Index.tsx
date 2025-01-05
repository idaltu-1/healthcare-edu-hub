import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import BlogSection from "@/components/home/BlogSection";
import ForumSection from "@/components/home/ForumSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import MessagingSection from "@/components/messaging/MessagingSection";
import { useSession } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { UserCog, Settings2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const session = useSession();

  const AccountNavigation = () => {
    if (!session) return null;
    
    return (
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-4">
            <Button
              variant="default"
              className="bg-primary text-white flex items-center gap-2"
              onClick={() => navigate("/my-account")}
            >
              <UserCog className="h-5 w-5" />
              My Account
            </Button>
            <Button
              variant="default"
              className="bg-primary text-white flex items-center gap-2"
              onClick={() => navigate("/settings")}
            >
              <Settings2 className="h-5 w-5" />
              Settings
            </Button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <AccountNavigation />
      {session && <MessagingSection />}
      <BlogSection />
      <ForumSection />
      <NewsletterSection />
    </div>
  );
};

export default Index;