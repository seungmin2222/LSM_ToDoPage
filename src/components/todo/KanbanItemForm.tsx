import { KanbanItem } from '@/types/kanban';
import { ko } from 'date-fns/locale';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface KanbanItemFormProps {
  onClose: () => void;
  initialData?: KanbanItem;
}

export default function KanbanItemForm({
  onClose,
  initialData,
}: KanbanItemFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    initialData?.startDate ?? null,
    initialData?.endDate ?? null,
  ]);
  const [startDate, endDate] = dateRange;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('기간을 선택해주세요');
      return;
    }

    console.log({
      title,
      content,
      startDate,
      endDate,
    });
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-black/50"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md space-y-4 rounded-xl bg-gray-800 p-6">
        <div className="flex items-center justify-between border-b border-gray-700 pb-3">
          <h3 className="text-lg font-medium text-white">
            {initialData ? '일정 수정' : '새 일정 추가'}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Ｘ
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-gray-400">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="제목을 입력하세요"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="내용을 입력하세요"
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              rows={3}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm text-gray-400">기간</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: [Date | null, Date | null]) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="기간을 선택하세요"
              dateFormat="yyyy-MM-dd"
              locale={ko}
              className="w-full rounded-lg border border-gray-700 bg-gray-900 px-3 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              wrapperClassName="w-full"
            />
          </div>
          <div className="flex w-full border-t border-gray-700 pt-4">
            <button
              type="submit"
              className="w-full rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
            >
              {initialData ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
