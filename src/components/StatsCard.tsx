import React from 'react';
import { CheckCircle, Circle, AlertCircle, TrendingUp } from 'lucide-react';
import { Todo } from '../types/todo';

interface StatsCardProps {
  todos: Todo[];
}

export function StatsCard({ todos }: StatsCardProps) {
  const total = todos.length;
  const completed = todos.filter(todo => todo.completed).length;
  const pending = total - completed;
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  const priorityCounts = {
    high: todos.filter(todo => todo.priority === 'high' && !todo.completed).length,
    medium: todos.filter(todo => todo.priority === 'medium' && !todo.completed).length,
    low: todos.filter(todo => todo.priority === 'low' && !todo.completed).length
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-blue-600 font-medium">Total Tasks</p>
            <p className="text-3xl font-bold text-blue-800">{total}</p>
          </div>
          <TrendingUp className="w-8 h-8 text-blue-500" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-green-600 font-medium">Completed</p>
            <p className="text-3xl font-bold text-green-800">{completed}</p>
          </div>
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-2xl border border-yellow-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-yellow-600 font-medium">Pending</p>
            <p className="text-3xl font-bold text-yellow-800">{pending}</p>
          </div>
          <Circle className="w-8 h-8 text-yellow-500" />
        </div>
      </div>

      <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-2xl border border-purple-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-purple-600 font-medium">Completion Rate</p>
            <p className="text-3xl font-bold text-purple-800">{completionRate}%</p>
          </div>
          <AlertCircle className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </div>
  );
}
