import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanColumn from '@/components/kanban/board/KanbanColumn';
import { useKanbanStore } from '@/stores/kanban';

jest.mock('@/components/kanban/board/KanbanTask', () => {
  return function MockKanbanTask({ task }) {
    return <div data-testid="kanban-task">{task.title}</div>;
  };
});

jest.mock('@/components/kanban/forms/KanbanTaskForm', () => {
  return function MockKanbanTaskForm({ onClose }) {
    return (
      <div data-testid="kanban-task-form">
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/components/kanban/ui/KanbanDropdownMenu', () => {
  return function MockKanbanDropdownMenu({ items, onClose }) {
    return (
      <div data-testid="dropdown-menu">
        {items.map((item, index) => (
          <button key={index} onClick={item.onClick}>
            {item.label}
          </button>
        ))}
        <button onClick={onClose}>Close</button>
      </div>
    );
  };
});

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanColumn 컴포넌트', () => {
  const mockTasks = {
    'task-1': { id: 'task-1', title: 'Task 1', content: 'Content 1' },
    'task-2': { id: 'task-2', title: 'Task 2', content: 'Content 2' },
  };

  const mockUpdateColumn = jest.fn();
  const mockDeleteColumn = jest.fn();

  beforeEach(() => {
    window.confirm = jest.fn().mockReturnValue(true);

    useKanbanStore.mockImplementation((selector) =>
      selector({
        board: {
          tasks: mockTasks,
        },
        updateColumn: mockUpdateColumn,
        deleteColumn: mockDeleteColumn,
      })
    );
  });

  test('컬럼 타이틀 렌더링', () => {
    render(
      <KanbanColumn id="column-1" title="Todo" taskIds={['task-1', 'task-2']} />
    );

    expect(screen.getByText('Todo')).toBeInTheDocument();
  });

  test('태스크 렌더링', () => {
    render(
      <KanbanColumn id="column-1" title="Todo" taskIds={['task-1', 'task-2']} />
    );

    const tasks = screen.getAllByTestId('kanban-task');
    expect(tasks).toHaveLength(2);
    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Task 2')).toBeInTheDocument();
  });

  test('컬럼 타이틀 수정 모드', () => {
    render(
      <KanbanColumn id="column-1" title="Todo" taskIds={['task-1', 'task-2']} />
    );

    fireEvent.click(screen.getByText('・・・'));

    fireEvent.click(screen.getByText('컬럼명 수정'));

    const input = screen.getByDisplayValue('Todo');
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'Updated Todo' } });
    fireEvent.blur(input);

    expect(mockUpdateColumn).toHaveBeenCalledWith('column-1', 'Updated Todo');
  });

  test('컬럼 삭제', () => {
    render(
      <KanbanColumn id="column-1" title="Todo" taskIds={['task-1', 'task-2']} />
    );

    fireEvent.click(screen.getByText('・・・'));

    fireEvent.click(screen.getByText('컬럼 삭제'));

    expect(mockDeleteColumn).toHaveBeenCalledWith('column-1');
  });

  test('새 태스크 추가 폼 열기', () => {
    render(
      <KanbanColumn id="column-1" title="Todo" taskIds={['task-1', 'task-2']} />
    );

    fireEvent.click(screen.getByText('＋ 새 태스크 추가'));

    const taskForm = screen.getByTestId('kanban-task-form');
    expect(taskForm).toBeInTheDocument();
  });
});
