import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import { Users, BookOpen, Rss, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
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
            <p className="text-gray-600 max-w-2xl mx-auto">Connect with fellow healthcare professionals pursuing their MBA journey. Share experiences, network, and grow together.</p>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <BookOpen className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Latest Blog Posts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Stay updated with the latest insights in healthcare management and business education.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Rss className="mx-auto h-12 w-12 text-primary mb-4" />
            <h2 className="text-3xl font-bold text-primary mb-4">Subscribe to Our Newsletter</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">Get weekly updates on healthcare management trends and educational resources.</p>
            <form className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="default" className="bg-primary text-white hover:bg-primary/90">
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
            <p className="text-gray-600 max-w-2xl mx-auto">Engage in meaningful discussions with peers about healthcare management and MBA topics.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;