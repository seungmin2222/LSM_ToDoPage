export interface KanbanItem {
  kanbanId: string;
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  boardId: string;
  order: number;
  createdAt: Date;
  updatedAt?: Date;
}

export interface KanbanBoard {
  boardId: string;
  title: string;
  items: KanbanItem[];
}

export interface MenuItem {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export interface KanbanItemFormProps {
  onClose: () => void;
  boardId: string;
  initialData?: Omit<KanbanItem, 'boardId'>;
}

export interface KanbanItemDetailProps {
  item: KanbanItem;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export interface KanbanDropdownMenuProps {
  items: MenuItem[];
  onClose: () => void;
  position: { x: number; y: number };
}

export interface DropdownMenuProps {
  items: MenuItem[];
  onClose: () => void;
}
