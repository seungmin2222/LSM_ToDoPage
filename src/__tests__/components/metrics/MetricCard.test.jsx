import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MetricCard from '@/components/metrics/MetricCard';
import { useSortable } from '@dnd-kit/sortable';

jest.mock('@dnd-kit/sortable', () => ({
  useSortable: jest.fn(),
}));

describe('MetricCard 컴포넌트', () => {
  const mockOnDelete = jest.fn();
  const defaultProps = {
    id: 'column-1',
    label: '할 일',
    value: 5,
    onDelete: mockOnDelete,
  };

  beforeEach(() => {
    useSortable.mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: null,
      transition: null,
    });

    window.confirm = jest.fn().mockReturnValue(true);
  });

  test('카드 기본 정보 렌더링', () => {
    render(<MetricCard {...defaultProps} />);

    expect(screen.getByText('할 일')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('삭제 버튼 클릭 시 확인 모달 표시', () => {
    render(<MetricCard {...defaultProps} />);

    const deleteButton = screen.getByText('Ｘ');

    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      `'할 일' 컬럼을 삭제하시겠습니까?`
    );
    expect(mockOnDelete).toHaveBeenCalled();
  });

  test('드래그 중 투명도 변경', () => {
    useSortable.mockReturnValue({
      attributes: {},
      listeners: {},
      setNodeRef: jest.fn(),
      transform: { x: 10, y: 0, scaleX: 1, scaleY: 1 },
      transition: 'transform 0.2s',
    });

    const { container } = render(<MetricCard {...defaultProps} />);

    const cardElement = container.firstChild;
    expect(cardElement).toHaveStyle('opacity: 1');
  });
});
