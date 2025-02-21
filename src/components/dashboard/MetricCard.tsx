interface MetricCardProps {
  label: string;
  value: number;
  onDelete: () => void;
}

export default function MetricCard({
  label,
  value,
  onDelete,
}: MetricCardProps) {
  return (
    <div className="group flex flex-shrink-0 gap-4">
      <div className="relative flex-shrink-0 justify-items-center rounded-lg bg-gray-800 px-4 py-3 text-center">
        <div className="min-w-10 transition-opacity group-hover:opacity-0">
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (window.confirm(`'${label}' 보드를 삭제하시겠습니까?`)) {
              onDelete?.();
            }
          }}
          className="absolute inset-0 flex items-center justify-center rounded border border-red-400/50 px-2 py-1 text-red-400 opacity-0 transition-all hover:border-red-300 hover:text-red-300 group-hover:opacity-100"
        >
          Ｘ
        </button>
      </div>
    </div>
  );
}
