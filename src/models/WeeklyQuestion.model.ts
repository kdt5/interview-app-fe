export interface WeeklyQuestion {
  id: number;
  title: string;
  content: string;
  isWeekly: boolean;
  createdAt: string;
  categories: string[];
}
