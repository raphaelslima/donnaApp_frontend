export interface socialService {
  id: string;
  name: string;
  category: string;
  address?: string;
  phoneNumbers: string[];
  coordinator?: string;
  email?: string;
}