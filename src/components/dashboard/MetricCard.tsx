interface MetricCardProps {
  label: string;
  value: number;
}

export default function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="flex flex-shrink-0 gap-4">
      <div className="flex-shrink-0 justify-items-center rounded-lg bg-gray-800 px-4 py-3">
        <p className="text-sm text-gray-400">{label}</p>
        <p className="text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}
