export interface Task{ 
  _id: string;
  userId: string | null;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | string;
  priority: 'low' | 'medium' | 'high' | string;
  dueDate: string;
  createdAt: string;
  updatedAt: string| null;
}


//type for the redux auth-slice state
export interface AuthSliceType {
  user: Record<string,string>
  isAuthenticated: boolean
}