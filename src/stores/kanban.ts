import { KanbanBoard } from '@/types/kanban';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KanbanStore {
  boards: KanbanBoard[];
  addBoard: (title: string) => void;
  updateBoard: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
}

export const useKanbanStore = create<KanbanStore>()(
  persist(
    (set) => ({
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

      updateBoard: (boardId, title) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board.boardId === boardId ? { ...board, title } : board
          ),
        })),

      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board.boardId !== boardId),
        })),
    }),
    {
      name: 'kanban-storage',
    }
  )
);
