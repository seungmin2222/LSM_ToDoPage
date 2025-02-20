'use client';

import { MenuItem } from '@/types/kanban';
import { useRef, useState } from 'react';
import KanbanDropdownMenu from './KanbanDropdownMenu';
import TodoItem from './KanbanItem';
import KanbanItemForm from './KanbanItemForm';

interface KanbanColumnProps {
  title: string;
}

export default function KanbanColumn({ title }: KanbanColumnProps) {
  const [showForm, setShowForm] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [dropdownPosition, setDropdownPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartEditing = () => {
    setIsEditing(true);
    setEditedTitle(title);
    requestAnimationFrame(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    });
  };

  const handleTitleSubmit = () => {
    if (editedTitle.trim()) {
      console.log('보드명 변경:', editedTitle);
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTitleSubmit();
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditedTitle(title);
    }
  };

  const menuItems: MenuItem[] = [
    {
      label: '보드명 수정',
      onClick: handleStartEditing,
    },
    {
      label: '보드 삭제',
      onClick: () => {
        if (window.confirm('정말로 이 보드을 삭제하시겠습니까?')) {
          console.log('보드 삭제');
        }
      },
      variant: 'danger',
    },
  ];

  return (
    <div className="w-80 flex-shrink-0">
      <div className="group mb-3 flex items-center justify-between rounded-lg border border-gray-700 p-3 transition-colors [&:hover:not(:has(button:hover))]:bg-gray-700">
        {isEditing ? (
          <input
            ref={inputRef}
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={handleKeyDown}
            className="w-full rounded border border-gray-600 bg-gray-900 px-2 py-1 text-white focus:border-blue-500 focus:outline-none"
          />
        ) : (
          <h3 className="font-medium text-white">{title}</h3>
        )}
        <div className="flex gap-2">
          <div className="relative">
            <button
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setDropdownPosition({ x: rect.left, y: rect.bottom });
                setShowOptions(!showOptions);
              }}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
            >
              ・・・
            </button>
            {showOptions && (
              <KanbanDropdownMenu
                items={menuItems}
                onClose={() => setShowOptions(false)}
                position={dropdownPosition}
              />
            )}
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-400/10 px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:bg-blue-600 hover:text-white"
          >
            ＋
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <TodoItem
          id={1}
          title={'시작전'}
          content="1"
          startDate={new Date('2025-01-13')}
          endDate={new Date('2025-01-14')}
        />
        <TodoItem
          id={2}
          title={'진행중'}
          content="2"
          startDate={new Date('2025-01-13')}
          endDate={new Date('2025-01-13')}
        />
        <TodoItem
          id={3}
          title={'마무리'}
          content="3"
          startDate={new Date('2025-01-11')}
          endDate={new Date('2025-01-11')}
        />
        <button
          onClick={() => setShowForm(true)}
          className="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-3 text-left text-gray-400 transition-all hover:bg-gray-700"
        >
          ＋ 새 일정 추가
        </button>
      </div>

      {showForm && <KanbanItemForm onClose={() => setShowForm(false)} />}
    </div>
  );
}
