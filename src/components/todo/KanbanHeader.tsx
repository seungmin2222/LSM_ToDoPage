'use client';

import { useState } from 'react';

export default function KanbanHeader() {
  const [boardName, setBoardName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (boardName.trim()) {
      console.log('새 보드 이름:', boardName);
      setBoardName('');
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="text-xl font-bold text-white">Kanban Board</div>
      <div className="flex items-center gap-2">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            placeholder="보드 이름 입력"
            className="rounded-lg border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
          />
        </form>
        <button
          onClick={handleSubmit}
          className="inline-flex items-center gap-2 rounded-lg border border-blue-800 bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-400 transition-colors hover:bg-blue-600 hover:text-white"
        >
          ＋ 새 보드 추가
        </button>
      </div>
    </div>
  );
}
