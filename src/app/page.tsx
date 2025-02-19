import KanbanMetrics from '@/components/dashboard/KanbanMetrics';
import KanbanMain from '@/components/todo/KanbanMain';

export default function KanbanPage() {
  return (
    <div className="min-h-screen select-none bg-gray-900 p-6">
      <KanbanMetrics />
      <KanbanMain />
    </div>
  );
}
