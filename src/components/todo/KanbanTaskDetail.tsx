import { useKanbanStore } from '@/stores/kanban';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

interface KanbanTaskDetailProps {
  taskId: string;
  onEdit: () => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export default function KanbanTaskDetail({
  taskId,
  onEdit,
  onDelete,
  onClose,
}: KanbanTaskDetailProps) {
  const task = useKanbanStore((state) => state.board.tasks[taskId]);

  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'PPP', { locale: ko });
  };

  if (!task) return null;

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md space-y-4 rounded-xl bg-gray-800 p-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-lg font-medium text-white">일정 상세</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-1 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Ｘ
          </button>
        </div>
        <p className="float-end text-xs text-gray-400">
          {task.updatedAt
            ? `최종 수정 : ${formatDate(task.updatedAt)}`
            : `생성 날짜 : ${formatDate(task.createdAt)}`}
        </p>
        <div className="select-text space-y-6 py-2">
          <div>
            <p className="mb-1 text-sm font-medium text-gray-400">제목</p>
            <div className="rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white">
              {task.title}
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-400">내용</p>
            <div className="min-h-[100px] whitespace-pre-wrap rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white">
              {task.content}
            </div>
          </div>
          <div>
            <p className="mb-1 text-sm font-medium text-gray-400">기간</p>
            <div className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-white">
              <span>{formatDate(task.dueDate.start)}</span>
              <span className="text-gray-500">―</span>
              <span>{formatDate(task.dueDate.end)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-gray-700 pt-4">
          <button
            type="button"
            onClick={() => onDelete(taskId)}
            className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-300"
          >
            삭제
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onEdit}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              수정
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
