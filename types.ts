export interface Task{ 
  _id: string;
  userId: string | null;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | undefined;
  priority: 'low' | 'normal' | 'high' | undefined;
  dueDate: string;
  createdAt: string;
  updatedAt: string| null;
}


//type for the redux auth-slice state
export interface AuthSliceType {
  user: Record<string,string>
  isAuthenticated: boolean
}