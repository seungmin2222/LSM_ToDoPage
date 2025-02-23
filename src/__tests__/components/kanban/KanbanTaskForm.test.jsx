import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import KanbanTaskForm from '@/components/kanban/forms/KanbanTaskForm';
import { useKanbanStore } from '@/stores/kanban';

jest.mock('react-datepicker', () => {
  return function MockDatePicker(props) {
    return (
      <input
        data-testid="date-picker"
        type="text"
        value={
          props.startDate ? props.startDate.toISOString().split('T')[0] : ''
        }
        onChange={(e) => {
          const date = new Date(e.target.value);
          props.onChange([date, date]);
        }}
      />
    );
  };
});

jest.mock('@/stores/kanban', () => ({
  useKanbanStore: jest.fn(),
}));

describe('KanbanTaskForm 컴포넌트', () => {
  const mockAddTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockOnClose = jest.fn();

  const defaultProps = {
    onClose: mockOnClose,
    columnId: 'column-1',
  };

  beforeEach(() => {
    useKanbanStore.mockImplementation((selector) =>
      selector({
        addTask: mockAddTask,
        updateTask: mockUpdateTask,
      })
    );
  });

  test('폼 제출 시 새 태스크 추가', () => {
    render(<KanbanTaskForm {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText('제목을 입력하세요'), {
      target: { value: '새 태스크' },
    });

    fireEvent.change(screen.getByPlaceholderText('내용을 입력하세요'), {
      target: { value: '새 내용' },
    });

    const datePicker = screen.getByTestId('date-picker');
    fireEvent.change(datePicker, {
      target: { value: '2024-02-01' },
    });

    fireEvent.click(screen.getByText('추가'));

    expect(mockAddTask).toHaveBeenCalledWith('column-1', {
      title: '새 태스크',
      content: '새 내용',
      dueDate: {
        start: expect.any(Date),
        end: expect.any(Date),
      },
    });
    expect(mockOnClose).toHaveBeenCalled();
  });
});
