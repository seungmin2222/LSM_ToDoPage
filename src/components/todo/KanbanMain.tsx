import KanbanColumn from './KanbanColumn';
import KanbanFooter from './KanbanFooter';
import KanbanHeader from './KanbanHeader';

export default function KanbanMain() {
  return (
    <main className="rounded-xl bg-gray-800 p-6">
      <KanbanHeader />
      <KanbanColumn />
      <KanbanFooter />
    </main>
  );
}
