import TodoItem from './KanbanItem';

export default function KanbanColumn() {
  return (
    <div className="mt-8 flex-1 overflow-x-auto">
      <div className="flex gap-4 pb-4">
        <div className="gap mt-4 flex snap-x snap-mandatory gap-4">
          <div className="flex gap-4 overflow-x-auto">
            <div className="w-80 flex-shrink-0">
              <div className="mb-3 flex justify-between rounded-lg border border-gray-700 p-3">
                <h3 className="font-medium text-white">In Progress</h3>
                <div>
                  <button className="right-6 top-6 inline-flex items-center gap-2 rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white">
                    ＋
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <TodoItem
                  title={'시작전'}
                  startDate={'2025-01-13'}
                  endDate={'2025-01-14'}
                />
                <TodoItem
                  title={'진행중'}
                  startDate={'2025-01-13'}
                  endDate={'2025-01-13'}
                />
                <TodoItem
                  title={'마무리'}
                  startDate={'2025-01-11'}
                  endDate={'2025-01-11'}
                />
                <button className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-left text-gray-400 transition-all hover:bg-gray-700">
                  ＋ 새 일정 추가
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
