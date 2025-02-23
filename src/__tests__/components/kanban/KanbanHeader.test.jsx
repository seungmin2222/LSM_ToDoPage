import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanHeader from '@/components/kanban/board/KanbanHeader';
import { useKanbanStore } from '@/stores/kanban';

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanHeader 컴포넌트', () => {
  const mockAddColumn = jest.fn();

  beforeEach(() => {
    useKanbanStore.mockImplementation((selector) =>
      selector({
        addColumn: mockAddColumn,
      })
    );
  });

  test('초기 렌더링 시 컴포넌트 확인', () => {
    render(<KanbanHeader />);

    expect(screen.getByText('Kanban Board')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('새 컬럼 이름 입력')
    ).toBeInTheDocument();
    expect(screen.getByText('＋ 새 컬럼 추가')).toBeInTheDocument();
  });

  test('입력값 없을 때 버튼 비활성화', () => {
    render(<KanbanHeader />);

    const input = screen.getByPlaceholderText('새 컬럼 이름 입력');
    const addButton = screen.getByText('＋ 새 컬럼 추가');

    expect(addButton).toBeDisabled();
  });

  test('입력값 있을 때 컬럼 추가', () => {
    render(<KanbanHeader />);

    const input = screen.getByPlaceholderText('새 컬럼 이름 입력');
    const addButton = screen.getByText('＋ 새 컬럼 추가');

    fireEvent.change(input, { target: { value: '새로운 컬럼' } });

    expect(addButton).not.toBeDisabled();

    fireEvent.click(addButton);

    expect(mockAddColumn).toHaveBeenCalledWith('새로운 컬럼');

    expect(input).toHaveValue('');
  });

  test('폼 제출 시 컬럼 추가', () => {
    render(<KanbanHeader />);

    const input = screen.getByPlaceholderText('새 컬럼 이름 입력');

    fireEvent.change(input, { target: { value: '새로운 컬럼' } });

    fireEvent.submit(input);

    expect(mockAddColumn).toHaveBeenCalledWith('새로운 컬럼');

    expect(input).toHaveValue('');
  });
});
