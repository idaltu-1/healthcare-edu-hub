import React from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

const ForumSection = () => {
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
    <section id="forum" className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <MessageSquare className="mx-auto h-12 w-12 text-primary mb-4" />
          <h2 className="text-3xl font-bold text-primary mb-4">
            Discussion Forum
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Engage in meaningful discussions with peers about healthcare management
            and MBA topics.
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
  );
};

export default ForumSection;