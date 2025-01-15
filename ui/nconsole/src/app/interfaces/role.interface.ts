export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: string[];
  usersCount: number;
  lastModified: string;
}

export interface ConfigSection {
  id: string;
  name: string;
  icon: string;
  description: string;
}