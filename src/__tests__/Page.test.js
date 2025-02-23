import { render, screen } from '@testing-library/react';
import KanbanPage from '@/app/page';

jest.mock('@/components/kanban/board/KanbanBoard', () => {
  return function MockKanbanBoard() {
    return <div data-testid="kanban-board">KanbanBoard Component</div>;
  };
});

jest.mock('@/components/metrics/KanbanMetrics', () => {
  return function MockKanbanMetrics() {
    return <div data-testid="kanban-metrics">KanbanMetrics Component</div>;
  };
});

describe('KanbanPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('페이지에 모든 컴포넌트가 렌더링', () => {
    render(<KanbanPage />);

    expect(screen.getByTestId('kanban-metrics')).toBeInTheDocument();
    expect(screen.getByTestId('kanban-board')).toBeInTheDocument();
  });
});
