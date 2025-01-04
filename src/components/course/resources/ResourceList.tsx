import { CourseResource } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Video } from "lucide-react";

interface ResourceListProps {
  resources: CourseResource[];
}

const ResourceList = ({ resources }: ResourceListProps) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
        return <Video className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {getResourceIcon(resource.resource_type)}
              <div>
                <h3 className="font-semibold">{resource.title}</h3>
                {resource.description && (
                  <p className="text-sm text-gray-500">{resource.description}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;