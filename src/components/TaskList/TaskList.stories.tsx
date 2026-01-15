import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskList } from "./TaskList";

/**
 * `TaskList` manages a collection of tasks with inline creation and editing.
 * It uses localStorage to persist data between sessions.
 */
const meta: Meta<typeof TaskList> = {
  title: "Components/TaskList",
  component: TaskList,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="bg-slate-50 min-h-screen p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TaskList>;

/**
 * Shows the initial state. 
 * Note: If you have tasks in your browser's localStorage, they will appear here.
 */
export const Default: Story = {
  render: () => {
    localStorage.removeItem("tasks");
    return <TaskList />;
  },
};

/**
 * Demonstrates the list with pre-populated data.
 * This story clears and then sets specific items in localStorage for demonstration.
 */
export const WithTasks: Story = {
  render: () => {
    const mockTasks = [
      { id: "1", text: "Welcome to the Task List! 🚀" },
      { id: "2", text: "You can mention @user, use #hashtags, emails@gmail.com or www.links.com" },
      { id: "3", text: "Click on me to edit or delete this task." },
    ];
    localStorage.setItem("tasks", JSON.stringify(mockTasks));
    
    return <TaskList />;
  },
};

/**
 * Use this story to test how the list looks in narrow containers.
 */
export const CompactContainer: Story = {
  decorators: [
    (Story) => (
      <div className="max-w-100 mx-auto border-x p-4 bg-white shadow-sm">
        <Story />
      </div>
    ),
  ],
  render: () => <TaskList />,
};