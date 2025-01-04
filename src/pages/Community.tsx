import { Button } from "@/components/ui/button";
import { Users, MessageSquare, Search } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "@/components/Navbar";

const Community = () => {
  const members = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      location: "New York",
      connections: 156
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Pediatrics",
      location: "California",
      connections: 142
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Neurology",
      location: "Texas",
      connections: 203
    }
  ];

  return (
    <div className="min-h-screen bg-primary-foreground">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <Users className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Healthcare Professional Community</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with fellow healthcare professionals, share experiences, and grow together in your business journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <MessageSquare className="h-6 w-6" />
                Discussion Groups
              </h2>
              <p className="text-gray-600">Join specialized groups based on your interests and specialty.</p>
              <Button 
                onClick={() => toast.info("Discussion groups coming soon!")}
                className="w-full bg-primary"
              >
                Browse Groups
              </Button>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="space-y-4">
              <h2 className="text-2xl font-semibold flex items-center gap-2">
                <Search className="h-6 w-6" />
                Find Members
              </h2>
              <p className="text-gray-600">Search and connect with healthcare professionals in your field.</p>
              <Button 
                onClick={() => toast.info("Member search coming soon!")}
                className="w-full bg-primary"
              >
                Search Directory
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Featured Members</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {members.map((member, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{member.name}</h3>
                  <p className="text-gray-600 text-sm mb-1">{member.specialty}</p>
                  <p className="text-gray-600 text-sm mb-2">{member.location}</p>
                  <p className="text-sm text-primary">{member.connections} connections</p>
                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => toast.info("Connection feature coming soon!")}
                  >
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;