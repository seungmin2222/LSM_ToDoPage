'use client';

import { useKanbanStore } from '@/stores/kanban';
import { useState } from 'react';

export default function KanbanHeader() {
  const [columnName, setColumnName] = useState('');
  const addColumn = useKanbanStore((state) => state.addColumn);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (columnName.trim()) {
      addColumn(columnName.trim());
      setColumnName('');
    }
  };

  const isButtonDisabled = !columnName.trim();

  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-bold text-white">Kanban Board</div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="새 컬럼 이름 입력"
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </form>
        <button
          onClick={handleSubmit}
          disabled={isButtonDisabled}
          className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
            isButtonDisabled
              ? 'cursor-not-allowed border-gray-700 bg-gray-800 text-gray-500'
              : 'border-blue-800 bg-blue-400/10 text-blue-400 hover:bg-blue-600 hover:text-white'
          }`}
        >
          ＋ 새 컬럼 추가
        </button>
      </div>
    </div>
  );
}
