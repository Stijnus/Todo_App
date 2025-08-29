import React from 'react';
import { Check, Trash2, Star, Clock, Calendar } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const priorityIcons = {
  low: <Clock className="w-4 h-4 text-blue-400" />,
  medium: <Star className="w-4 h-4 text-yellow-400" />,
  high: <Star className="w-4 h-4 text-red-400 fill-red-400" />
};

const priorityColors = {
  low: 'border-blue-200 hover:border-blue-300',
  medium: 'border-yellow-200 hover:border-yellow-300',
  high: 'border-red-200 hover:border-red-300'
};

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(todo.createdAt);

  return (
    <div
      className={`
        group flex items-center justify-between p-4 bg-white rounded-xl border-2 transition-all duration-200
        hover:shadow-lg hover:scale-[1.02] ${priorityColors[todo.priority]}
        ${todo.completed ? 'opacity-60' : ''}
      `}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 transition-all duration-200
            flex items-center justify-center
            ${todo.completed
              ? 'bg-gradient-to-r from-green-400 to-blue-500 border-transparent'
              : 'border-gray-300 hover:border-gray-400'
            }
          `}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>
        
        <div className="flex-1 min-w-0">
          <p
            className={`
              text-lg font-medium transition-all duration-200
              ${todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'}
              truncate
            `}
          >
            {todo.text}
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
            {todo.category && (
              <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                {todo.category}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-2 ml-4">
        <div className="opacity-70 group-hover:opacity-100 transition-opacity">
          {priorityIcons[todo.priority]}
        </div>
        
        <button
          onClick={() => onDelete(todo.id)}
          className="
            p-2 text-gray-400 hover:text-red-500 hover:bg-red-50
            rounded-lg transition-all duration-200 transform hover:scale-110
          "
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
