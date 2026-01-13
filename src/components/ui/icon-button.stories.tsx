import type { Meta, StoryObj } from "@storybook/react-vite"
import { IconButton } from "./icon-button"
import { FaPlus, FaTrash, FaSave, FaChevronRight, FaCalendar } from "react-icons/fa"

/**
 * `IconButton` is a functional wrapper around the atomic `Button` component.
 * It ensures a standardized layout for buttons that include an icon from `react-icons`.
 */
const meta: Meta<typeof IconButton> = {
  title: "Components/UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      description: "The visual style of the button.",
      control: "radio",
      options: ["primary", "secondary", "outline", "ghost"],
    },
    size: {
      description: "The size of the button container.",
      control: "radio",
      options: ["default", "sm", "lg", "icon"],
    },
    icon: {
      description: "A component from `react-icons` to be rendered.",
      control: { type: undefined }
    },
    onClick: {
      description: "Callback function for click events.",
      action: "clicked"
    },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

/**
 * Standard usage with the primary brand color. 
 * Use this for the main action of a view.
 */
export const Primary: Story = {
  args: {
    children: "Add Task",
    icon: FaPlus,
    variant: "primary",
  },
}

/**
 * Secondary actions that shouldn't draw as much attention as the primary button.
 */
export const Secondary: Story = {
  args: {
    children: "Delete Item",
    icon: FaTrash,
    variant: "secondary",
  },
}

/**
 * Subtle button style used for secondary actions or when placed on top of other backgrounds.
 */
export const Outline: Story = {
  args: {
    children: "Save Changes",
    icon: FaSave,
    variant: "outline",
  },
}

/**
 * Subtle button style used for secondary actions or when placed on top of other backgrounds.
 */
export const Ghost: Story = {
  args: {
    children: null,
    icon: FaCalendar,
    variant: "ghost",
  },
}

/**
 * Icon-only variation. 
 * **Note:** Always provide an `aria-label` when no text is present to ensure accessibility.
 */
export const OnlyIcon: Story = {
  args: {
    children: null,
    icon: FaChevronRight,
    size: "icon",
    variant: "primary",
    "aria-label": "Next Step",
  },
}