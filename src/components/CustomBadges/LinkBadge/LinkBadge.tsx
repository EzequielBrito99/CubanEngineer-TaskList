import { Badge } from "@/components/ui/badge";
import type { EntityBadgeProps } from "../types";
import { FiLink } from "react-icons/fi";

/**
 * Component to render a URL link badge.
 * Automatically prepends https:// if missing and opens in a new tab.
 * Uses a pastel blue theme.
 */
export const LinkBadge: React.FC<EntityBadgeProps> = ({ label }) => {
  const href = label.startsWith('http') ? label : `https://${label}`;
  return (
    <Badge className="bg-entity-link hover:bg-entity-link-hover border-none mx-0.5">
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-entity-link-dark no-underline">
        <span className="flex gap-1 items-center">
          <FiLink className="text-entity-mail-dark w-3 h-3" />
          {label}
        </span>
      </a>
    </Badge>
  );
};