import { useKanbanStore } from '@/stores/kanban';

const resetStore = () => {
  useKanbanStore.setState({
    board: {
      columns: {},
      tasks: {},
      columnOrder: [],
    },
  });
};

describe('Kanban Store', () => {
  beforeEach(() => {
    resetStore();
  });

  test('새 컬럼을 추가해야 함', () => {
    const { addColumn } = useKanbanStore.getState();

    addColumn('To Do');

    const { board } = useKanbanStore.getState();

    expect(board.columnOrder).toHaveLength(1);
    expect(Object.keys(board.columns)).toHaveLength(1);

    const columnId = board.columnOrder[0];
    const column = board.columns[columnId];

    expect(column.title).toBe('To Do');
    expect(column.taskIds).toEqual([]);
  });

  test('컬럼 제목을 수정해야 함', () => {
    const { addColumn, updateColumn } = useKanbanStore.getState();

    addColumn('To Do');
    const columnId = useKanbanStore.getState().board.columnOrder[0];

    updateColumn(columnId, '업데이트된 컬럼');

    const { board } = useKanbanStore.getState();
    const updatedColumn = board.columns[columnId];

    expect(updatedColumn.title).toBe('업데이트된 컬럼');
  });

  test('컬럼과 해당 컬럼의 모든 태스크를 삭제해야 함', () => {
    const { addColumn, addTask, deleteColumn } = useKanbanStore.getState();

    addColumn('To Do');
    const columnId = useKanbanStore.getState().board.columnOrder[0];

    addTask(columnId, {
      title: '테스트 태스크',
      content: '테스트 내용',
      dueDate: {
        start: new Date(),
        end: new Date(),
      },
    });

    const initialState = useKanbanStore.getState().board;
    const taskId = initialState.columns[columnId].taskIds[0];

    deleteColumn(columnId);

    const { board } = useKanbanStore.getState();

    expect(board.columnOrder).toHaveLength(0);
    expect(Object.keys(board.columns)).toHaveLength(0);
    expect(board.tasks[taskId]).toBeUndefined();
  });

  test('지정된 컬럼에 새 태스크를 추가해야 함', () => {
    const { addColumn, addTask } = useKanbanStore.getState();

    addColumn('To Do');
    const columnId = useKanbanStore.getState().board.columnOrder[0];

    addTask(columnId, {
      title: '새 태스크',
      content: '태스크 내용',
      dueDate: {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-02'),
      },
    });

    const { board } = useKanbanStore.getState();

    expect(board.columns[columnId].taskIds).toHaveLength(1);

    const taskId = board.columns[columnId].taskIds[0];
    const task = board.tasks[taskId];

    expect(task.title).toBe('새 태스크');
    expect(task.content).toBe('태스크 내용');
    expect(task.columnId).toBe(columnId);
    expect(task.createdAt).toBeDefined();
  });

  test('태스크를 다른 컬럼으로 이동해야 함', () => {
    const { addColumn, addTask, moveTask } = useKanbanStore.getState();

    addColumn('To Do');
    addColumn('Doing');

    const [sourceColumnId, destColumnId] =
      useKanbanStore.getState().board.columnOrder;

    addTask(sourceColumnId, {
      title: '테스트 태스크',
      content: '태스크 내용',
      dueDate: {
        start: new Date(),
        end: new Date(),
      },
    });

    const taskId =
      useKanbanStore.getState().board.columns[sourceColumnId].taskIds[0];

    moveTask(taskId, sourceColumnId, destColumnId, 0);

    const { board } = useKanbanStore.getState();

    expect(board.columns[sourceColumnId].taskIds).toHaveLength(0);
    expect(board.columns[destColumnId].taskIds).toHaveLength(1);
    expect(board.tasks[taskId].columnId).toBe(destColumnId);
  });
});
