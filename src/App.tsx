import React, { useState, useMemo } from 'react';
import { CheckSquare } from 'lucide-react';
import { Todo } from './types/todo';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { StatsCard } from './components/StatsCard';
import { FilterBar } from './components/FilterBar';
import { AdvancedThemeToggle } from './components/AdvancedThemeToggle';
import { useTheme } from './hooks/useTheme';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { isDarkMode } = useTheme();

  const addTodo = (text: string, priority: 'low' | 'medium' | 'high', category?: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
      priority,
      category
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilter =
        filter === 'all' ||
        (filter === 'active' && !todo.completed) ||
        (filter === 'completed' && todo.completed) ||
        (filter === 'high' && todo.priority === 'high' && !todo.completed) ||
        (filter === 'medium' && todo.priority === 'medium' && !todo.completed) ||
        (filter === 'low' && todo.priority === 'low' && !todo.completed);

      const matchesSearch = todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (todo.category && todo.category.toLowerCase().includes(searchTerm.toLowerCase()));

      return matchesFilter && matchesSearch;
    });
  }, [todos, filter, searchTerm]);

  return (
    <div className={`
      min-h-screen transition-colors duration-500
      ${isDarkMode 
        ? 'bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 text-foreground' 
        : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 text-foreground'
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute top-0 right-0">
            <AdvancedThemeToggle />
          </div>
          
          <div className="flex items-center justify-center space-x-3 mb-4">
            <CheckSquare className="w-12 h-12 text-primary" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TaskFlow
            </h1>
          </div>
          <p className="text-xl text-text-secondary mb-6">
            Organize your tasks with elegance and efficiency
          </p>
        </div>

        {/* Stats */}
        <StatsCard todos={todos} />

        {/* Add Todo Form */}
        <TodoForm onSubmit={addTodo} />

        {/* Filter and Search */}
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Todo List */}
        <div className="space-y-3">
          {filteredTodos.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 opacity-40">
                <CheckSquare className="w-full h-full text-text-secondary" />
              </div>
              <p className="text-text-secondary text-lg">
                {searchTerm ? 'No tasks match your search' : 'No tasks yet. Add one above!'}
              </p>
            </div>
          ) : (
            filteredTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <p className="text-text-secondary">
            {todos.length} tasks • {todos.filter(t => t.completed).length} completed
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
