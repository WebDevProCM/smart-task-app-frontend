export interface Task{ 
    userId: number;
    title: string;
    description: string;
    status: "pending"| "in-progress" | "completed";
    priority: "high" | "normal" | "low";
    dueDate: Date;
    completedAt: null|Date
}


//type for the redux auth-slice state
export interface AuthSliceType {
  user: Record<string,string>
  isAuthenticated: boolean
}