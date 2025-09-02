import React from 'react';
import { Check, Trash2, Clock, Flag } from 'lucide-react';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500'
  };

  const priorityIcons = {
    low: <Flag className="w-3 h-3" />,
    medium: <Flag className="w-3 h-3" />,
    high: <Flag className="w-3 h-3" />
  };

  return (
    <div className={`
      group p-4 rounded-xl border-2 transition-all duration-300 animate-fade-in
      bg-card text-card-foreground border-border/50
      hover:shadow-lg hover:border-primary/30
      ${todo.completed ? 'opacity-60' : 'opacity-100'}
    `}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <button
            onClick={() => onToggle(todo.id)}
            className={`
              mt-1 p-2 rounded-lg border-2 transition-all duration-200
              flex-shrink-0
              ${todo.completed
                ? 'bg-success border-success text-white'
                : 'bg-transparent border-border hover:border-primary'
              }
              focus:outline-none focus:ring-2 focus:ring-primary/50
            `}
            aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
          >
            <Check className={`w-4 h-4 transition-all ${todo.completed ? 'scale-100' : 'scale-0'}`} />
          </button>

          <div className="flex-1 min-w-0">
            <p className={`
              text-lg font-medium break-words transition-colors
              ${todo.completed ? 'line-through text-text-secondary' : 'text-card-foreground'}
            `}>
              {todo.text}
            </p>
            
            <div className="flex items-center space-x-4 mt-2 text-sm text-text-secondary">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{todo.createdAt.toLocaleDateString()}</span>
              </div>
              
              {todo.category && (
                <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                  {todo.category}
                </span>
              )}
              
              <div className={`flex items-center space-x-1 ${priorityColors[todo.priority]}`}>
                {priorityIcons[todo.priority]}
                <span className="capitalize">{todo.priority}</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => onDelete(todo.id)}
          className={`
            p-2 rounded-lg transition-all duration-200 ml-3
            text-error hover:bg-error/10 hover:text-error
            opacity-0 group-hover:opacity-100 focus:opacity-100
            focus:outline-none focus:ring-2 focus:ring-error/50
          `}
          aria-label="Delete task"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
