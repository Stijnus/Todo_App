import React, { useState } from 'react';
import { Plus, Hash } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-xl mb-8">
      <div className="flex items-start space-x-4">
        <div className="flex-1">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="
              w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl
              focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100
              transition-all duration-200 placeholder-gray-400
            "
          />
          
          <div className="flex items-center space-x-4 mt-3">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category (optional)"
                className="
                  px-3 py-2 text-sm border border-gray-200 rounded-lg
                  focus:outline-none focus:border-blue-300
                  transition-all duration-200 placeholder-gray-400
                "
              />
            </div>
            
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="
                px-3 py-2 text-sm border border-gray-200 rounded-lg
                focus:outline-none focus:border-blue-300
                transition-all duration-200
              "
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          disabled={!text.trim()}
          className="
            px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white
            rounded-xl font-semibold transition-all duration-200
            hover:from-blue-600 hover:to-purple-700 hover:shadow-lg
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center space-x-2
          "
        >
          <Plus className="w-5 h-5" />
          <span>Add Task</span>
        </button>
      </div>
    </form>
  );
}
