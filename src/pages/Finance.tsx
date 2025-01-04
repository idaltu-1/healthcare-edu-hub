import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBar, CheckCircle } from "lucide-react";

const Finance = () => {
  const topics = [
    "Financial Planning",
    "Revenue Cycle Management",
    "Investment Strategies",
    "Risk Management",
    "Budgeting and Forecasting",
    "Healthcare Reimbursement"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <ChartBar className="mx-auto h-12 w-12 text-primary mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-4">Financial Strategy</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Develop strong financial acumen for sustainable business growth in healthcare.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{topic}</h3>
                    <p className="text-gray-600">
                      Master the principles of {topic.toLowerCase()} in healthcare business.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Finance;