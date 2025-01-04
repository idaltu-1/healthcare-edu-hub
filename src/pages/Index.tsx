import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Rss, Mail, Users, MessageSquare } from "lucide-react";

export default function Index() {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    toast({
      title: "Success!",
      description: "Thank you for subscribing to our newsletter.",
    });
    setEmail("");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      {/* Blog Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Rss className="h-6 w-6 text-[#c6a052]" />
          <h2 className="text-2xl font-semibold text-[#1a1f2c]">Latest Blog Posts</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Healthcare Entrepreneurship 101",
              description: "Essential tips for medical professionals starting their business journey.",
              date: "March 15, 2024"
            },
            {
              title: "Practice Management Essentials",
              description: "Key strategies for running an efficient healthcare practice.",
              date: "March 12, 2024"
            },
            {
              title: "Digital Marketing for Doctors",
              description: "Modern marketing techniques for healthcare professionals.",
              date: "March 10, 2024"
            }
          ].map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg text-[#1a1f2c]">{post.title}</CardTitle>
                <CardDescription className="text-sm text-[#8ba3bc]">{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-[#1a1f2c]/80">{post.description}</p>
                <Button variant="link" className="mt-4 text-[#c6a052] hover:text-[#c6a052]/80 p-0">
                  Read more →
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mb-16 bg-[#1a1f2c] text-[#f5f5f0] rounded-lg p-8">
        <div className="flex items-center gap-2 mb-6">
          <Mail className="h-6 w-6 text-[#c6a052]" />
          <h2 className="text-2xl font-semibold">Subscribe to Our Newsletter</h2>
        </div>
        <p className="mb-6 text-[#f5f5f0]/80">
          Get the latest insights on healthcare business and leadership delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="flex gap-4 max-w-md">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white text-[#1a1f2c]"
            required
          />
          <Button type="submit" className="bg-[#c6a052] hover:bg-[#c6a052]/90 text-white">
            Subscribe
          </Button>
        </form>
      </section>

      {/* Community Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <Users className="h-6 w-6 text-[#c6a052]" />
          <h2 className="text-2xl font-semibold text-[#1a1f2c]">Join Our Community</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Connect with Peers</CardTitle>
              <CardDescription>Network with healthcare professionals and entrepreneurs</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-[#c6a052] hover:bg-[#c6a052]/90 text-white">
                Join Community
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Participate in our exclusive networking events</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="bg-[#c6a052] hover:bg-[#c6a052]/90 text-white">
                View Events
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Forum Section */}
      <section className="mb-16">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-6 w-6 text-[#c6a052]" />
          <h2 className="text-2xl font-semibold text-[#1a1f2c]">Discussion Forum</h2>
        </div>
        <div className="grid gap-4">
          {[
            {
              title: "Practice Management",
              posts: 156,
              lastActive: "2 hours ago"
            },
            {
              title: "Marketing Strategies",
              posts: 98,
              lastActive: "4 hours ago"
            },
            {
              title: "Financial Planning",
              posts: 203,
              lastActive: "1 hour ago"
            }
          ].map((forum, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <h3 className="font-semibold text-[#1a1f2c]">{forum.title}</h3>
                  <p className="text-sm text-[#8ba3bc]">{forum.posts} posts • Last active {forum.lastActive}</p>
                </div>
                <Button variant="outline" className="border-[#c6a052] text-[#c6a052] hover:bg-[#c6a052]/10">
                  View Topics
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}