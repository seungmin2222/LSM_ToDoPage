import { KanbanBoard, KanbanItem } from '@/types/kanban';
import { v4 as uuid } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface KanbanStore {
  boards: KanbanBoard[];
  addBoard: (title: string) => void;
  updateBoard: (boardId: string, title: string) => void;
  deleteBoard: (boardId: string) => void;
  addItem: (item: Omit<KanbanItem, 'updatedAt'>) => void;
  updateItem: (updatedItem: KanbanItem) => void;
  deleteItem: (kanbanId: string) => void;
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
      addItem: (newItem) =>
        set((state) => {
          const targetBoard = state.boards.find(
            (board) => board.boardId === newItem.boardId
          );
          const newOrder = targetBoard?.items.length ?? 0;

          const itemWithOrder = {
            ...newItem,
            order: newOrder,
          };

          return {
            boards: state.boards.map((board) =>
              board.boardId === newItem.boardId
                ? { ...board, items: [...board.items, itemWithOrder] }
                : board
            ),
          };
        }),
      updateItem: (updatedItem) => {
        set((state) => {
          const newState = {
            boards: state.boards.map((board) => ({
              ...board,
              items: board.items.map((item) =>
                item.kanbanId === updatedItem.kanbanId
                  ? { ...updatedItem, updatedAt: new Date() }
                  : item
              ),
            })),
          };
          return newState;
        });
      },
      deleteItem: (kanbanId) =>
        set((state) => ({
          boards: state.boards.map((board) => ({
            ...board,
            items: board.items.filter((item) => item.kanbanId !== kanbanId),
          })),
        })),
    }),
    {
      name: 'kanban-storage',
    }
  )
);
