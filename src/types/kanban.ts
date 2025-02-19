export interface KanbanItem {
  id: number;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
}

export interface KanbanItemProps {
  title: string;
  startDate: string;
  endDate: string;
}
