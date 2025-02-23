import React from 'react';
import { render, screen } from '@testing-library/react';
import KanbanBoard from '@/components/kanban/board/KanbanBoard';
import { useKanbanStore } from '@/stores/kanban';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

jest.mock('@/components/kanban/board/KanbanHeader', () => {
  return function MockKanbanHeader() {
    return <div data-testid="kanban-header">Kanban Header</div>;
  };
});

jest.mock('@/components/kanban/board/KanbanScrollGuide', () => {
  return function MockKanbanScrollGuide() {
    return <div data-testid="kanban-scroll-guide">Scroll Guide</div>;
  };
});

jest.mock('@/components/kanban/board/KanbanColumn', () => {
  return function MockKanbanColumn({ title }) {
    return <div data-testid="kanban-column">{title}</div>;
  };
});

jest.mock('@/hooks/useDragAndDrop', () => ({
  useDragAndDrop: jest.fn(),
}));

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanBoard 컴포넌트', () => {
  beforeEach(() => {
    useKanbanStore.mockImplementation((selector) =>
      selector({
        board: {
          columns: {
            'column-1': {
              id: 'column-1',
              title: 'Todo',
              taskIds: ['task-1', 'task-2'],
            },
            'column-2': {
              id: 'column-2',
              title: 'Doing',
              taskIds: ['task-3'],
            },
          },
          columnOrder: ['column-1', 'column-2'],
        },
      })
    );

    useDragAndDrop.mockReturnValue({
      handleDragOver: jest.fn(),
      handleDragEnd: jest.fn(),
    });
  });

  test('컬럼들이 올바르게 렌더링되어야 함', () => {
    render(<KanbanBoard />);

    const columns = screen.getAllByTestId('kanban-column');
    expect(columns).toHaveLength(2);

    expect(screen.getByText('Todo')).toBeInTheDocument();
    expect(screen.getByText('Doing')).toBeInTheDocument();
  });

  test('KanbanHeader와 KanbanScrollGuide 컴포넌트가 렌더링되어야 함', () => {
    render(<KanbanBoard />);

    expect(screen.getByTestId('kanban-header')).toBeInTheDocument();
    expect(screen.getByTestId('kanban-scroll-guide')).toBeInTheDocument();
  });

  test('DnD 관련 함수들이 초기화되어야 함', () => {
    render(<KanbanBoard />);

    expect(useDragAndDrop).toHaveBeenCalledWith({
      columns: expect.any(Object),
      columnOrder: expect.any(Array),
    });
  });
});
