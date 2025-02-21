'use client';

import { useKanbanStore } from '@/stores/kanban';
import KanbanBoard from './KanbanBoard';
import KanbanFooter from './KanbanFooter';
import KanbanHeader from './KanbanHeader';

export default function KanbanMain() {
  const boards = useKanbanStore((state) => state.boards);

  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <div className="mt-8 flex gap-2 overflow-x-auto pb-4">
        {boards.map((board) => (
          <KanbanBoard
            key={board.boardId}
            boardId={board.boardId}
            title={board.title}
            items={board.items}
          />
        ))}
      </div>
      <KanbanFooter />
    </main>
  );
}
