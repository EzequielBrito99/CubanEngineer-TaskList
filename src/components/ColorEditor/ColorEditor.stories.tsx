import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";
import { ColorEditor } from "./ColorEditor";

/**
 * Storybook documentation for the ColorEditor component.
 * Demonstrates the synchronized overlay technique for real-time highlighting.
 */
const meta: Meta<typeof ColorEditor> = {
  title: "Components/ColorEditor",
  component: ColorEditor,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    text: { control: "text" },
    placeholder: { control: "text" },
    className: { control: "text" },
  },
  decorators: [
    (Story) => (
      <div className="bg-slate-50 p-8 overflow-auto">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ColorEditor>;

/**
 * Internal component to manage local state within the story with strict typing.
 */
const ColorEditorWithState = (args: ComponentProps<typeof ColorEditor>) => {
  const [value, setValue] = useState(args.text);

  return (
    <ColorEditor
      {...args}
      text={value}
      onChange={(newValue) => {
        setValue(newValue);
        args.onChange?.(newValue);
      }}
    />
  );
};

export const Default: Story = {
  args: {
    text: "Hello @user! Try #storytelling with dev@example.com or visit https://google.com",
    className: "w-[500px]",
  },
  render: (args) => <ColorEditorWithState {...args} />,
};

export const Empty: Story = {
  args: {
    text: "",
    placeholder: "Start typing @mentions or #hashtags...",
    className: "w-[500px]",
  },
  render: (args) => <ColorEditorWithState {...args} />,
};

export const CustomStyle: Story = {
  args: {
    text: "Styled editor content with @mentions",
    className: "w-[500px] h-64 bg-slate-50",
  },
  render: (args) => <ColorEditorWithState {...args} />,
};