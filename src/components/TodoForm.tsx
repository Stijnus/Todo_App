import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface TodoFormProps {
  onSubmit: (text: string, priority: 'low' | 'medium' | 'high', category?: string) => void;
}

export function TodoForm({ onSubmit }: TodoFormProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text.trim(), priority, category.trim() || undefined);
      setText('');
      setCategory('');
      setPriority('medium');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="bg-white dark:bg-dark-800 rounded-2xl p-6 border-2 border-gray-200 dark:border-dark-700 shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What needs to be done?"
              className="
                w-full px-4 py-3 border-2 border-gray-200 dark:border-dark-600 rounded-xl
                focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20
                transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-100
              "
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:w-auto">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="
                px-4 py-3 border-2 border-gray-200 dark:border-dark-600 rounded-xl
                focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20
                transition-all duration-200 bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-100
              "
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="
                px-4 py-3 border-2 border-gray-200 dark:border-dark-600 rounded-xl
                focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900/20
                transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500
                bg-white dark:bg-dark-700 text-gray-800 dark:text-gray-100
              "
            />
            
            <button
              type="submit"
              disabled={!text.trim()}
              className="
                px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600
                text-white rounded-xl font-medium transition-all duration-200
                flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg transform hover:scale-105
              "
            >
              <Plus className="w-5 h-5" />
              <span>Add Task</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
