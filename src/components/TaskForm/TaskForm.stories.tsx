import type { Meta, StoryObj } from "@storybook/react-vite";
import { TaskForm } from "./TaskForm";

/**
 * `TaskForm` is the main input component for creating and editing tasks.
 * It integrates an avatar for user context and standardized action buttons.
 */
const meta: Meta<typeof TaskForm> = {
  title: "Components/TaskForm",
  component: TaskForm,
  tags: ["autodocs"],
  argTypes: {
    onSave: { action: "onSave" },
    onCancel: { action: "onCancel" },
  },
};

export default meta;
type Story = StoryObj<typeof TaskForm>;

/**
 * Default state: Shows 'Ok' with 'X' icon because no text is entered.
 */
export const EmptyCreate: Story = {
  args: {
    userFallback: "U",
  },
};

/**
 * Edit mode: Initially shows 'Ok' because content matches initialValue.
 * Try typing to see it switch to 'Save' (Diskette icon).
 */
export const EditMode: Story = {
  args: {
    initialValue: "Update this task",
    userImage: "https://github.com/shadcn.png",
  },
};