export interface Post {
  id: string;
  description: string;
  title: string;
  tags: string[];
  locations: string[];
  created_by: string;
  created_at: Date;
}
