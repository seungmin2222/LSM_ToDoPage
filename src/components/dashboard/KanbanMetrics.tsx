import MetricCard from './MetricCard';

export default function KanbanMetrics() {
  return (
    <header className="mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">To-Do List</h1>
          <p className="mt-1 text-sm text-gray-400">
            작업을 효율적으로 관리하세요
          </p>
        </div>
      </div>
      <div className="flex overflow-x-auto pb-4">
        <div className="mt-4 flex gap-4">
          <MetricCard label="시작전" value={3} />
          <MetricCard label="진행중" value={13} />
          <MetricCard label="마무리" value={11} />
        </div>
      </div>
    </header>
  );
}
