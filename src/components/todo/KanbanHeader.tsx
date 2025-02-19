export default function KanbanHeader() {
  return (
    <div className="flex justify-between">
      <div className="text-xl font-bold text-white">Kanban Board</div>
      <button className="inline-flex items-center gap-2 rounded-lg border border-blue-800 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white">
        ＋ 새 보드 추가
      </button>
    </div>
  );
}
