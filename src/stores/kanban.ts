import { create } from 'zustand';
import { KanbanBoard } from '@/types/kanban';
import { v4 as uuid } from 'uuid';

interface KanbanStore {
  boards: KanbanBoard[];
  addBoard: (title: string) => void;
}

export const useKanbanStore = create<KanbanStore>((set) => ({
  boards: [],
  addBoard: (title) =>
    set((state) => ({
      boards: [
        ...state.boards,
        {
          boardId: uuid(),
          title,
          items: [],
        },
      ],
    })),
}));
