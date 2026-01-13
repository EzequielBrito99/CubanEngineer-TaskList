import React from "react"
import { Button, type ButtonProps } from "./button"
import { cn } from "@/lib/utils"
import type { IconType } from "react-icons"

interface IconButtonProps extends ButtonProps {
  icon: IconType
}

/**
 * IconButton component for standardized icon-text buttons using react-icons.
 * @remarks
 * Uses IconType for strict typing of react-icons library.
 * The icon is rendered at a fixed size with consistent spacing.
 */
const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, children, className = "", ...props }, ref) => {
    return (
      <Button
        ref={ref}
        className={cn("gap-2 cursor-pointer", className)}
        {...props}
      >
        <Icon data-testid="button-icon" size={16} />
        {props.size !== 'icon' ? children : ''}
      </Button>
    )
  }
)
IconButton.displayName = "IconButton"

export { IconButton }