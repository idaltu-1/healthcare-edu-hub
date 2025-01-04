import { Resource } from "@/components/CourseResourceManager";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Link as LinkIcon, ExternalLink } from "lucide-react";

interface ResourceListProps {
  resources: Resource[];
  loading: boolean;
}

const ResourceList = ({ resources, loading }: ResourceListProps) => {
  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-5 w-5" />;
      default:
        return <LinkIcon className="h-5 w-5" />;
    }
  };

  const handleResourceClick = (resourceUrl: string) => {
    window.open(resourceUrl, '_blank');
  };

  if (loading) {
    return <div>Loading resources...</div>;
  }

  if (resources.length === 0) {
    return <div className="text-gray-500">No resources available yet.</div>;
  }

  return (
    <div className="space-y-4">
      {resources.map((resource) => (
        <Card key={resource.id} className="hover:shadow-md transition-all duration-200">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {getResourceIcon(resource.resource_type)}
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  {resource.description && (
                    <p className="text-sm text-gray-500">{resource.description}</p>
                  )}
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleResourceClick(resource.resource_url)}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Open Resource
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;