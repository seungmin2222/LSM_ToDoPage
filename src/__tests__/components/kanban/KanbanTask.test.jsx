import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanTask from '@/components/kanban/board/KanbanTask';
import { useKanbanStore } from '@/stores/kanban';

jest.mock('@/components/kanban/forms/KanbanTaskForm', () => {
  return function MockKanbanTaskForm({ onClose, initialData }) {
    return (
      <div data-testid="kanban-task-form">
        <span>{initialData.title}</span>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/components/kanban/forms/KanbanTaskDetail', () => {
  return function MockKanbanTaskDetail({ taskId, onEdit, onDelete, onClose }) {
    return (
      <div data-testid="kanban-task-detail">
        <button onClick={() => onEdit()}>Edit</button>
        <button onClick={() => onDelete(taskId)}>Delete</button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanTask 컴포넌트', () => {
  const mockTask = {
    id: 'task-1',
    title: 'Test Task',
    content: 'Test Content',
    dueDate: {
      start: new Date('2024-01-01'),
      end: new Date('2024-01-02'),
    },
  };

  const mockDeleteTask = jest.fn();

  beforeEach(() => {
    window.confirm = jest.fn().mockReturnValue(true);

    useKanbanStore.mockImplementation((selector) =>
      selector({
        deleteTask: mockDeleteTask,
      })
    );
  });

  test('태스크 기본 정보 렌더링', () => {
    render(<KanbanTask taskId="task-1" columnId="column-1" task={mockTask} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('2024-01-01 → 2024-01-02')).toBeInTheDocument();
  });

  test('태스크 카드 클릭 시 상세 모달 열기', () => {
    render(<KanbanTask taskId="task-1" columnId="column-1" task={mockTask} />);

    fireEvent.click(screen.getByText('Test Task'));

    const detailModal = screen.getByTestId('kanban-task-detail');
    expect(detailModal).toBeInTheDocument();
  });

  test('삭제 버튼 클릭 시 태스크 삭제', () => {
    render(<KanbanTask taskId="task-1" columnId="column-1" task={mockTask} />);

    const deleteButton = screen.getByText('Ｘ');
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      '정말로 이 일정을 삭제하시겠습니까?'
    );
    expect(mockDeleteTask).toHaveBeenCalledWith('task-1');
  });

  test('상세 모달에서 수정', () => {
    render(<KanbanTask taskId="task-1" columnId="column-1" task={mockTask} />);

    fireEvent.click(screen.getByText('Test Task'));

    fireEvent.click(screen.getByText('Edit'));

    const taskForm = screen.getByTestId('kanban-task-form');
    expect(taskForm).toBeInTheDocument();
  });

  test('상세 모달에서 삭제', () => {
    render(<KanbanTask taskId="task-1" columnId="column-1" task={mockTask} />);

    fireEvent.click(screen.getByText('Test Task'));

    fireEvent.click(screen.getByText('Delete'));

    expect(window.confirm).toHaveBeenCalledWith(
      '정말로 이 일정을 삭제하시겠습니까?'
    );
    expect(mockDeleteTask).toHaveBeenCalledWith('task-1');
  });
});
