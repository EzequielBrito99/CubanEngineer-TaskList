import { Badge } from "@/components/ui/badge";
import type { EntityBadgeProps } from "../types";
import { FiMail } from "react-icons/fi";

type EmailBadgeProps = EntityBadgeProps & {
  /** The email address (e.g., "user\@gmail.com") */
  email: string;
}

/**
 * Component to render an email badge with a mailto link.
 * Uses a pastel orange theme and ensures the link inherits the dark contrast color.
 */
export const EmailBadge: React.FC<EmailBadgeProps> = ({ email, label }) => (
  <Badge className="bg-entity-email hover:bg-entity-email-hover border-none mx-0.5">
    <a href={`mailto:${email}`} className="text-entity-email-dark no-underline">
      <span className="flex gap-1 items-center">
        <FiMail className="text-entity-mail-dark w-3 h-3" />
        {label}
      </span>
    </a>
  </Badge>
);