import { useKanbanStore } from '@/stores/kanban';
import { KanbanItem, KanbanItemFormProps } from '@/types/kanban';
import { ko } from 'date-fns/locale';
import { FormEvent, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuid } from 'uuid';

export default function KanbanItemForm({
  onClose,
  boardId,
  initialData,
}: KanbanItemFormProps) {
  const addItem = useKanbanStore((state) => state.addItem);
  const updateItem = useKanbanStore((state) => state.updateItem);
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [touched, setTouched] = useState({
    title: false,
    content: false,
    date: false,
  });
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    initialData?.startDate ?? null,
    initialData?.endDate ?? null,
  ]);

  const [startDate, endDate] = dateRange;

  const validation = {
    title: title.trim() === '' ? '제목을 입력해주세요' : '',
    content: content.trim() === '' ? '내용을 입력해주세요' : '',
    date: !startDate || !endDate ? '기간을 선택해주세요' : '',
  };

  const isFormValid = Object.values(validation).every((error) => error === '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTouched({
      title: true,
      content: true,
      date: true,
    });

    if (!isFormValid) return;

    const formData: Omit<KanbanItem, 'updatedAt'> = {
      kanbanId: initialData?.kanbanId ?? uuid(),
      title: title.trim(),
      content: content.trim(),
      startDate: startDate!,
      endDate: endDate!,
      boardId,
      order: initialData?.order ?? 0,
      createdAt: initialData?.createdAt ?? new Date(),
    };

    if (initialData) {
      updateItem(formData);
    } else {
      addItem(formData);
    }

    onClose();
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
            className="rounded-lg px-3 py-1 text-gray-400 hover:bg-gray-700 hover:text-white"
          >
            Ｘ
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm text-gray-400">제목</label>
              {touched.title && validation.title && (
                <span className="text-xs text-red-400">
                  * {validation.title}
                </span>
              )}
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, title: true }))}
              placeholder="제목을 입력하세요"
              className={`w-full rounded-lg border bg-gray-900 px-3 py-2 text-white placeholder-gray-500 transition-colors focus:outline-none ${
                touched.title && validation.title
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-700 focus:border-blue-500'
              }`}
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm text-gray-400">내용</label>
              {touched.content && validation.content && (
                <span className="text-xs text-red-400">
                  * {validation.content}
                </span>
              )}
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={() => setTouched((prev) => ({ ...prev, content: true }))}
              placeholder="내용을 입력하세요"
              className={`w-full rounded-lg border bg-gray-900 px-3 py-2 text-white placeholder-gray-500 transition-colors focus:outline-none ${
                touched.content && validation.content
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-700 focus:border-blue-500'
              }`}
              rows={3}
            />
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <label className="text-sm text-gray-400">기간</label>
              {touched.date && validation.date && (
                <span className="text-xs text-red-400">
                  * {validation.date}
                </span>
              )}
            </div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update: [Date | null, Date | null]) => {
                setDateRange(update);
              }}
              isClearable={true}
              placeholderText="📅 여기를 클릭해서 날짜를 선택하세요"
              dateFormat="yyyy-MM-dd"
              locale={ko}
              className={`w-full rounded-lg border bg-gray-900 px-3 py-2 text-white placeholder-gray-500 transition-colors focus:outline-none ${
                touched.date && validation.date
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-gray-700 focus:border-blue-500'
              }`}
              wrapperClassName="w-full"
            />
          </div>
          <div className="flex w-full border-t border-gray-700 pt-4">
            <button
              type="submit"
              className={`w-full rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                isFormValid
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-600 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {initialData ? '수정' : '추가'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
