import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanMetrics from '@/components/metrics/KanbanMetrics';
import { useKanbanStore } from '@/stores/kanban';
import { useDragAndDrop } from '@/hooks/useDragAndDrop';

jest.mock('@/components/metrics/MetricCard', () => {
  return function MockMetricCard({ label, value, onDelete }) {
    return (
      <div data-testid="metric-card">
        <span>{label}</span>
        <span>{value}</span>
        <button onClick={onDelete}>Delete</button>
      </div>
    );
  };
});

jest.mock('@/hooks/useDragAndDrop', () => ({
  useDragAndDrop: jest.fn(),
}));

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanMetrics 컴포넌트', () => {
  const mockColumns = {
    'column-1': {
      title: '할 일',
      taskIds: ['task-1', 'task-2'],
    },
    'column-2': {
      title: '진행 중',
      taskIds: ['task-3'],
    },
  };

  const mockColumnOrder = ['column-1', 'column-2'];
  const mockDeleteColumn = jest.fn();

  beforeEach(() => {
    useDragAndDrop.mockReturnValue({
      handleDragEnd: jest.fn(),
    });

    useKanbanStore.mockImplementation((selector) =>
      selector({
        board: {
          columns: mockColumns,
          columnOrder: mockColumnOrder,
        },
        deleteColumn: mockDeleteColumn,
      })
    );
  });

  test('헤더 및 메트릭 렌더링', () => {
    render(<KanbanMetrics />);

    expect(screen.getByText('To-Do List')).toBeInTheDocument();
    expect(
      screen.getByText('작업을 효율적으로 관리하세요')
    ).toBeInTheDocument();

    const metricCards = screen.getAllByTestId('metric-card');
    expect(metricCards).toHaveLength(2);

    expect(screen.getByText('할 일')).toBeInTheDocument();
    expect(screen.getByText('진행 중')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  test('컬럼 삭제 기능', () => {
    render(<KanbanMetrics />);

    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);

    expect(mockDeleteColumn).toHaveBeenCalledWith('column-1');
  });

  test('DragAndDrop 훅 초기화', () => {
    render(<KanbanMetrics />);

    expect(useDragAndDrop).toHaveBeenCalledWith({
      columns: mockColumns,
      columnOrder: mockColumnOrder,
      enableTaskDrag: false,
    });
  });
});
