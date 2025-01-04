export interface CourseResource {
  id: string;
  title: string;
  description?: string;
  resource_type: string;
  resource_url: string;
  created_at: string;
  updated_at: string;
}