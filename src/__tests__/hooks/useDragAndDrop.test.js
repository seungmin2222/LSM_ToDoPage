import { useKanbanStore } from '@/stores/kanban';

describe('useDragAndDrop 훅 테스트', () => {
  beforeEach(() => {
    useKanbanStore.setState({
      board: {
        columns: {
          'column-1': {
            id: 'column-1',
            title: 'To Do',
            taskIds: ['task-1', 'task-2'],
          },
          'column-2': {
            id: 'column-2',
            title: 'Doing',
            taskIds: ['task-3'],
          },
        },
        tasks: {
          'task-1': {
            id: 'task-1',
            title: 'Task 1',
            columnId: 'column-1',
            content: 'Test content',
            dueDate: {
              start: new Date(),
              end: new Date(),
            },
          },
          'task-2': {
            id: 'task-2',
            title: 'Task 2',
            columnId: 'column-1',
            content: 'Test content',
            dueDate: {
              start: new Date(),
              end: new Date(),
            },
          },
          'task-3': {
            id: 'task-3',
            title: 'Task 3',
            columnId: 'column-2',
            content: 'Test content',
            dueDate: {
              start: new Date(),
              end: new Date(),
            },
          },
        },
        columnOrder: ['column-1', 'column-2'],
      },
    });
  });

  test('태스크 이동 로직 테스트', () => {
    const { moveTask } = useKanbanStore.getState();

    moveTask('task-1', 'column-1', 'column-2', 0);

    const updatedStore = useKanbanStore.getState();

    expect(updatedStore.board.columns['column-1'].taskIds).not.toContain(
      'task-1'
    );
    expect(updatedStore.board.columns['column-2'].taskIds).toContain('task-1');
    expect(updatedStore.board.tasks['task-1'].columnId).toBe('column-2');
  });

  test('컬럼 재정렬 테스트', () => {
    const { reorderColumn } = useKanbanStore.getState();

    reorderColumn(0, 1);

    const updatedStore = useKanbanStore.getState();

    expect(updatedStore.board.columnOrder).toEqual(['column-2', 'column-1']);
  });
});
