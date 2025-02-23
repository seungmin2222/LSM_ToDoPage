import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanTaskDetail from '@/components/kanban/forms/KanbanTaskDetail';
import { useKanbanStore } from '@/stores/kanban';

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanTaskDetail 컴포넌트', () => {
  const mockTask = {
    id: 'task-1',
    title: '테스트 태스크',
    content: '테스트 내용',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-02'),
    dueDate: {
      start: new Date('2024-02-01'),
      end: new Date('2024-02-03'),
    },
  };

  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    useKanbanStore.mockImplementation((selector) =>
      selector({
        board: {
          tasks: {
            'task-1': mockTask,
          },
        },
      })
    );
  });

  test('태스크 상세 정보 렌더링', () => {
    render(
      <KanbanTaskDetail
        taskId="task-1"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    expect(screen.getByText('테스트 태스크')).toBeInTheDocument();
    expect(screen.getByText('테스트 내용')).toBeInTheDocument();

    expect(screen.getByText(/2024년 2월 1일/)).toBeInTheDocument();
    expect(screen.getByText(/2024년 2월 3일/)).toBeInTheDocument();
  });

  test('수정 버튼 클릭', () => {
    render(
      <KanbanTaskDetail
        taskId="task-1"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    const editButton = screen.getByText('수정');
    fireEvent.click(editButton);

    expect(mockOnEdit).toHaveBeenCalled();
  });

  test('삭제 버튼 클릭', () => {
    render(
      <KanbanTaskDetail
        taskId="task-1"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    const deleteButton = screen.getByText('삭제');
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledWith('task-1');
  });

  test('닫기 버튼 클릭', () => {
    render(
      <KanbanTaskDetail
        taskId="task-1"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    const closeButton = screen.getByText('Ｘ');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });

  test('태스크 없을 경우 null 반환', () => {
    useKanbanStore.mockImplementation((selector) =>
      selector({
        board: {
          tasks: {},
        },
      })
    );

    const { container } = render(
      <KanbanTaskDetail
        taskId="task-1"
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onClose={mockOnClose}
      />
    );

    expect(container.firstChild).toBeNull();
  });
});
