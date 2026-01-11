import React from 'react';
import { Badge } from "@/components/ui/badge";
import { FiHash } from "react-icons/fi";
import type { EntityBadgeProps } from "../types";

/**
 * Component to render a hashtag badge.
 * Uses a pastel violet theme with high-contrast purple text.
 * Removes the leading '#' and replaces it with an icon.
 */
export const HashtagBadge: React.FC<EntityBadgeProps> = ({ label }) => {
  // Removes the '#' from the start for a cleaner look with the icon
  const cleanContent = label.startsWith('#') ? label.slice(1) : label;

  return (
    <Badge className="bg-entity-hashtag hover:bg-entity-hashtag-hover border-none mx-0.5 px-2">
      <span className="text-entity-hashtag-dark flex items-center gap-1">
        <FiHash className="w-3 h-3" />
        {cleanContent}
      </span>
    </Badge>
  );
};