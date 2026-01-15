import React from "react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FiCalendar, FiMaximize2, FiPlus, FiPlusSquare, FiSave, FiTrash2, FiUnlock } from "react-icons/fi"
import { IconButton } from "@/components/ui/icon-button"
import { MdOutlineLightMode } from "react-icons/md"
import { Bs0Circle } from "react-icons/bs"
import { VscChromeClose } from "react-icons/vsc"
import { ColorEditor } from "@/components/ColorEditor/ColorEditor"

interface TaskFormProps {
  initialValue?: string
  userImage?: string
  userFallback?: string
  onSave: (value: string) => void
  onCancel: () => void
  onDelete?: () => void
  className?: string
  placeholder?: string
}

const actionButtons = [
  { label: 'Today', icon: FiCalendar },
  { label: 'Public', icon: FiUnlock },
  { label: 'Highlight', icon: MdOutlineLightMode },
  { label: 'Estimation', icon: Bs0Circle },
];

/**
 * TaskForm component for creating or editing tasks.
 * @remarks
 * Combines user context (Avatar) with input actions (Save/Cancel/Delete).
 */
export const TaskForm = ({
  initialValue = "",
  userImage = 'https://github.com/shadcn.png',
  userFallback = "U",
  onSave,
  onCancel,
  onDelete,
  className = "",
  placeholder = "Write a task..."
}: TaskFormProps) => {
  const [text, setText] = React.useState(initialValue)

  const handleSave = () => {
    if (text.trim()) onSave(text.trim())
    else onCancel();
  }

  const isEditing = initialValue.length > 0;
  const contentWasEdited = text.trim() !== initialValue.trim();

  const getSubmitButtonContent = () => {
    if (contentWasEdited && text.trim().length > 0) {
      return isEditing ? (
        <>
          <FiSave className="w-4 h-4 not-compact-hide" />
          <span className="compact-hide">Save</span>
        </>
      ) : (
        <>
          <FiPlus className="w-4 h-4 not-compact-hide" />
          <span className="compact-hide">Add</span>
        </>
      );
    }
    return (
      <>
        <VscChromeClose className="w-4 h-4 not-compact-hide" />
        <span className="compact-hide">Ok</span>
      </>
    );
  };

  return (
    <div className={cn("flex flex-col border rounded-sm bg-card shadow-md", className)}>
      <div className="flex gap-3 items-start border border-slate-200 p-2">
        <FiPlusSquare className="text-blue-500 w-5 h-5" />

        <ColorEditor
          text={text}
          placeholder={placeholder}
          onChange={(v) => setText(v)}
          className="flex-1 bg-transparent border-none focus:outline-0 focus:ring-0 resize-none text-sm placeholder:text-muted-foreground"
        />

        <Avatar className={cn('h-6 w-6 bg-secondary', !text.trim() ? 'opacity-40' : 'cursor-pointer')} role="button" data-testid='user-avatar'>
          <AvatarImage src={userImage} alt="User" />
          <AvatarFallback>{userFallback}</AvatarFallback>
        </Avatar>
      </div>

      <div className="flex justify-between gap-2 border-t bg-[#FAFBFB] p-2">
        <div className="flex gap-4">
          <IconButton
            variant="secondary"
            size={"sm"}
            icon={FiMaximize2}
          >
            <span className="max-[1230px]:hidden">
              Open
            </span>
          </IconButton>

          <div className="flex gap-2">
            {actionButtons.map(({ icon, label }) => (
              <IconButton
                key={label}
                variant="outline"
                size={"sm"}
                icon={icon}
                disabled={!text.trim()}
              >
                <span className="max-[1230px]:hidden">
                  {label}
                </span>
              </IconButton>
            ))}

            {isEditing && onDelete && (
              <IconButton
                variant="outline"
                size={"sm"}
                icon={FiTrash2}
                onClick={onDelete}
              >
                <span className="max-[1230px]:hidden">
                  Delete
                </span>
              </IconButton>
            )}
          </div>
        </div>

        <div className="flex gap-1">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancel}
            className="compact-hide"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size={"sm"}
            onClick={handleSave}
          >
            {getSubmitButtonContent()}
          </Button>
        </div>
      </div>
    </div>
  )
}