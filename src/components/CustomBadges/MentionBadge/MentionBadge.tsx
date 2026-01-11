import React from 'react';
import { Badge } from "@/components/ui/badge";
import { FiAtSign } from "react-icons/fi"; // Feather icon for mentions
import type { EntityBadgeProps } from "../types";

/**
 * Component to render a user mention badge.
 * Uses a pastel green theme with high-contrast emerald text.
 * Removes the leading '\@' and replaces it with an icon.
 */
export const MentionBadge: React.FC<EntityBadgeProps> = ({ label }) => {
  // Remove the '@' from the start for a cleaner look with the icon
  const cleanContent = label.startsWith('@') ? label.slice(1) : label;

  return (
    <Badge className="bg-entity-mention hover:bg-entity-mention-hover border-none mx-0.5 px-2">
      <span className="text-entity-mention-dark flex items-center gap-1">
        <FiAtSign className="w-3 h-3" />
        {cleanContent}
      </span>
    </Badge>
  );
};