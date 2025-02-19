interface KanbanItemProps {
  title: string;
  startDate: string;
  endDate: string;
}

export default function KanbanItem({
  title,
  startDate,
  endDate,
}: KanbanItemProps) {
  return (
    <div className="group rounded-lg border border-gray-700 bg-gray-900 p-3 transition-all hover:bg-gray-700">
      <div className="flex items-start gap-2">
        <div className="min-w-0 flex-1">
          <div className="text-white">{title}</div>
          <div className="mt-1 text-sm text-gray-400">
            {startDate === endDate ? startDate : `${startDate} → ${endDate}`}
          </div>
        </div>
      </div>
    </div>
  );
}
