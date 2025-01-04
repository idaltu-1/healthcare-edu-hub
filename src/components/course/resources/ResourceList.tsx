import React from "react";
import { Link, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Resource {
  id: string;
  title: string;
  description: string | null;
  resource_type: "pdf" | "link";
  resource_url: string;
}

interface ResourceListProps {
  resources: Resource[];
}

const ResourceList: React.FC<ResourceListProps> = ({ resources }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Resources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {resources?.map((resource) => (
            <div
              key={resource.id}
              className="flex items-start space-x-4 p-4 border rounded-lg"
            >
              {resource.resource_type === "pdf" ? (
                <FileText className="w-6 h-6 text-blue-500" />
              ) : (
                <Link className="w-6 h-6 text-green-500" />
              )}
              <div className="flex-1">
                <h3 className="font-medium">{resource.title}</h3>
                {resource.description && (
                  <p className="text-sm text-gray-500">{resource.description}</p>
                )}
                <a
                  href={resource.resource_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-500 hover:underline mt-1 inline-block"
                >
                  {resource.resource_type === "pdf" ? "View PDF" : "Visit Link"}
                </a>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResourceList;