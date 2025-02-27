export interface Task {
  id: string;
  title: string;
  content: string;
  dueDate: {
    start: Date;
    end: Date;
  };
  createdAt: Date;
  updatedAt?: Date;
  columnId: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export interface Board {
  columns: {
    [key: string]: Column;
  };
  tasks: {
    [key: string]: Task;
  };
  columnOrder: string[];
}

export interface MenuItem {
  label: string;
  onClick: () => void;
  variant?: 'default' | 'danger';
}

export interface PositionedDropdownProps {
  items: MenuItem[];
  onClose: () => void;
  position: { x: number; y: number };
}

export interface PreviewState {
  activeId: string;
  sourceColumnId: string;
  targetColumnId: string;
  newIndex: number;
}
