import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Users, BookOpen, Rss, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState } from "react";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    toast.success("Thank you for subscribing to our newsletter!");
    setEmail("");
  };

  const blogPosts = [
    {
      title: "Healthcare Business Essentials",
      excerpt: "Key business concepts every healthcare professional should know.",
      date: "March 15, 2024",
    },
    {
      title: "Practice Management Tips",
      excerpt: "Optimize your healthcare practice with these proven strategies.",
      date: "March 12, 2024",
    },
    {
      title: "Financial Planning for Doctors",
      excerpt: "Essential financial strategies for medical professionals.",
      date: "March 10, 2024",
    },
  ];

  const forumTopics = [
    {
      title: "Practice Growth Strategies",
      replies: 24,
      views: 156,
    },
    {
      title: "Healthcare Marketing Tips",
      replies: 18,
      views: 142,
    },
    {
      title: "Staff Management Best Practices",
      replies: 32,
      views: 203,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Community Section */}
      <section id="community" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Users className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Join Our Community</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Connect with fellow healthcare professionals pursuing their MBA journey. Share experiences, network, and grow together.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                variant="default" 
                className="bg-primary text-white"
                onClick={() => toast.success("Community feature coming soon!")}
              >
                Join Community
              </Button>
              <Button 
                variant="outline"
                onClick={() => toast.success("Directory feature coming soon!")}
              >
                Browse Directory
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Stay updated with the latest insights in healthcare management and business education.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{post.date}</p>
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <Button 
                    variant="link" 
                    className="p-0 text-primary"
                    onClick={() => toast.success("Blog post coming soon!")}
                  >
                    Read More →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Rss className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Get weekly updates on healthcare management trends and educational resources.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto flex gap-4">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="default" className="bg-primary text-white">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Forum Section */}
      <section id="forum" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Discussion Forum</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Engage in meaningful discussions with peers about healthcare management and MBA topics.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            {forumTopics.map((topic, index) => (
              <Card 
                key={index} 
                className="mb-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => toast.success("Forum topic coming soon!")}
              >
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold">{topic.title}</h3>
                    <div className="text-sm text-gray-500">
                      <span className="mr-4">{topic.replies} replies</span>
                      <span>{topic.views} views</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="text-center mt-8">
              <Button 
                variant="default" 
                className="bg-primary text-white"
                onClick={() => toast.success("New topic feature coming soon!")}
              >
                Start New Topic
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;