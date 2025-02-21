import { useKanbanStore } from '@/stores/kanban';
import { KanbanItem as KanbanItemType } from '@/types/kanban';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import KanbanItemDetail from './KanbanItemDetail';
import KanbanItemForm from './KanbanItemForm';

export default function KanbanItem({
  kanbanId,
  title,
  content,
  startDate,
  endDate,
  boardId,
  order,
  createdAt,
  updatedAt,
}: KanbanItemType) {
  const deleteItem = useKanbanStore((state) => state.deleteItem);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleUpdate = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFormOpen(true);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteItem(kanbanId);
    }
  };

  const handleCardClick = () => {
    setIsDetailOpen(true);
  };

  const handleEditFromDetail = () => {
    setIsDetailOpen(false);
    setIsFormOpen(true);
  };

  const handleDeleteFromDetail = (itemId: string) => {
    if (window.confirm('정말로 이 일정을 삭제하시겠습니까?')) {
      deleteItem(itemId);
      setIsDetailOpen(false);
    }
  };

  const formattedStartDate = format(new Date(startDate), 'yyyy-MM-dd', {
    locale: ko,
  });
  const formattedEndDate = format(new Date(endDate), 'yyyy-MM-dd', {
    locale: ko,
  });

  return (
    <>
      <div
        className="group cursor-pointer rounded-lg border border-gray-700 bg-gray-900 p-3 transition-all hover:bg-gray-700"
        onClick={handleCardClick}
      >
        <div className="flex items-center gap-2">
          <div className="min-w-0 flex-1">
            <div className="w-full truncate text-white">{title}</div>
            <div className="mt-1 text-sm text-gray-400">
              {formattedStartDate === formattedEndDate
                ? formattedStartDate
                : `${formattedStartDate} → ${formattedEndDate}`}
            </div>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="rounded border border-gray-400/50 px-2 py-1 text-gray-400 opacity-0 transition-all hover:border-white hover:text-white group-hover:opacity-100"
          >
            ✎
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="rounded border border-red-400/50 px-2 py-1 text-red-400 opacity-0 transition-all hover:border-red-300 hover:text-red-300 group-hover:opacity-100"
          >
            Ｘ
          </button>
        </div>
      </div>
      {isFormOpen && (
        <KanbanItemForm
          onClose={() => setIsFormOpen(false)}
          boardId={boardId}
          initialData={{
            kanbanId,
            title,
            content,
            startDate,
            endDate,
            order,
            createdAt,
          }}
        />
      )}
      {isDetailOpen && (
        <KanbanItemDetail
          item={{
            kanbanId,
            title,
            content,
            startDate,
            endDate,
            boardId,
            order,
            createdAt,
            updatedAt: updatedAt || undefined,
          }}
          onEdit={handleEditFromDetail}
          onDelete={handleDeleteFromDetail}
          onClose={() => setIsDetailOpen(false)}
        />
      )}
    </>
  );
}
