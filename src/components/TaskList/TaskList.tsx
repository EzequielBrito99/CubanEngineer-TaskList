import React, { useState, useEffect } from "react";
import { TaskForm } from "../TaskForm/TaskForm";
import { TaskText } from "../TaskText/TaskText";
import { FiPlusSquare } from "react-icons/fi";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  text: string;
}

export const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask = { id: crypto.randomUUID(), text };
    setTasks((prev) => [newTask, ...prev]);
    setIsCreating(false);
  };

  const updateTask = (id: string, newText: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, text: newText } : t)));
    setEditingId(null);
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    setEditingId(null);
  };

  const handleStartCreate = () => {
    setIsCreating(true);
    setEditingId(null);
  };

  const handleStartEdit = (id: string) => {
    setEditingId(id);
    setIsCreating(false);
  };

  const handleCancel = () => setEditingId(null)

  return (
    <div className="max-w-3xl mx-auto p-4 flex flex-col gap-2">
      {isCreating ? (
        <TaskForm onSave={addTask} onCancel={() => setIsCreating(false)} />
      ) : (
        <div
          onClick={handleStartCreate}
          className="flex items-center gap-3 p-3 border border-dashed rounded-sm cursor-pointer hover:bg-secondary/50 transition-colors text-muted-foreground"
        >
          <FiPlusSquare className="text-blue-500 w-5 h-5" />
          <span className="text-sm text-gray-400">Type to add new task...</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <React.Fragment key={task.id}>
            {editingId === task.id ? (
              <TaskForm
                initialValue={task.text}
                onSave={(val) => updateTask(task.id, val)}
                onCancel={handleCancel}
                onDelete={() => deleteTask(task.id)}
              />
            ) : (
              <div
                data-testid="task-item"
                onClick={() => handleStartEdit(task.id)}
                className="flex gap-3 p-3 border rounded-sm bg-card hover:bg-gray-200 shadow-sm transition-all cursor-pointer items-center"
              >
                <Checkbox onClick={e => e.stopPropagation()} />
                <div className="flex-1 text-sm">
                  <TaskText text={task.text} />
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};