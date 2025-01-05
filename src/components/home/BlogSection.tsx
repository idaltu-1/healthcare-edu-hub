import React from "react";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const BlogSection = () => {
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

  return (
    <section id="blog" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Stay updated with the latest insights in healthcare management and
            business education.
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
  );
};

export default BlogSection;