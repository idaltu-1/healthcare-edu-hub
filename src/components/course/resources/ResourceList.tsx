import { Resource } from "@/types/course";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Link as LinkIcon, Video } from "lucide-react";

export interface ResourceListProps {
  resources: Resource[];
  loading?: boolean;
}

const ResourceList = ({ resources, loading }: ResourceListProps) => {
  if (loading) {
    return <div>Loading resources...</div>;
  }

  const getIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardContent className="flex items-center p-4">
            <div className="mr-4">
              {getIcon(resource.resource_type)}
            </div>
            <div>
              <h3 className="font-medium">{resource.title}</h3>
              {resource.description && (
                <p className="text-sm text-gray-500">{resource.description}</p>
              )}
              <a
                href={resource.resource_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                View Resource
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;