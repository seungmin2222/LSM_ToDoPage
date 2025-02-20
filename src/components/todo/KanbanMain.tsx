import {
  KanbanBoard as boarKanbanBoardProps,
  KanbanItem,
} from '@/types/kanban';
import { v4 as uuid } from 'uuid';
import KanbanBoard from './KanbanBoard';
import KanbanFooter from './KanbanFooter';
import KanbanHeader from './KanbanHeader';

export default function KanbanMain() {
  const initialBoards: boarKanbanBoardProps[] = [
    {
      boardId: uuid(),
      title: '시작전',
      items: [
        {
          kanbanId: uuid(),
          title: '요구사항 분석',
          content: '프로젝트 요구사항 검토 및 분석',
          startDate: new Date('2025-02-20'),
          endDate: new Date('2025-02-22'),
          boardId: uuid(),
          order: 0,
          createdAt: new Date('2025-02-19'),
        },
        {
          kanbanId: uuid(),
          title: '프로젝트 설계',
          content: '시스템 아키텍처 및 DB 설계',
          startDate: new Date('2025-02-23'),
          endDate: new Date('2025-02-25'),
          boardId: uuid(),
          order: 1,
          createdAt: new Date('2025-02-19'),
        },
      ] as KanbanItem[],
    },
    {
      boardId: uuid(),
      title: '진행중',
      items: [
        {
          kanbanId: uuid(),
          title: '단위 테스트 작성',
          content: '각 컴포넌트 테스트 코드 구현',
          startDate: new Date('2025-02-15'),
          endDate: new Date('2025-02-17'),
          boardId: uuid(),
          order: 0,
          createdAt: new Date('2025-02-15'),
        },
        {
          kanbanId: uuid(),
          title: '코드 리뷰',
          content: '팀 코드 리뷰 및 수정사항 반영',
          startDate: new Date('2025-02-16'),
          endDate: new Date('2025-02-16'),
          boardId: uuid(),
          order: 1,
          createdAt: new Date('2025-02-16'),
        },
      ] as KanbanItem[],
    },
    {
      boardId: uuid(),
      title: '마무리',
      items: [
        {
          kanbanId: uuid(),
          title: '단위 테스트 작성',
          content: '각 컴포넌트 테스트 코드 구현',
          startDate: new Date('2025-02-15'),
          endDate: new Date('2025-02-17'),
          boardId: uuid(),
          order: 0,
          createdAt: new Date('2025-02-15'),
        },
        {
          kanbanId: uuid(),
          title: '코드 리뷰',
          content: '팀 코드 리뷰 및 수정사항 반영',
          startDate: new Date('2025-02-16'),
          endDate: new Date('2025-02-16'),
          boardId: uuid(),
          order: 1,
          createdAt: new Date('2025-02-16'),
        },
      ] as KanbanItem[],
    },
  ];

  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <div className="mt-8 flex gap-6 overflow-x-auto pb-4">
        {initialBoards.map((board) => (
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
