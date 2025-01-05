import React from "react";
import EmailForm from "./EmailForm";
import SMSForm from "./SMSForm";
import { MessageSquare, Mail } from "lucide-react";

const MessagingSection = () => {
  return (
    <section id="messaging" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center gap-4 mb-4">
            <MessageSquare className="h-8 w-8 text-primary" />
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-4">
            Communication Center
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with your network through SMS and email messaging
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EmailForm />
          <SMSForm />
        </div>
      </div>
    </section>
  );
};

export default MessagingSection;