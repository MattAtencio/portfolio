import { Badge } from "@/components/ui/badge"

interface TechBadgeProps {
  name: string
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <Badge variant="secondary" className="text-xs">
      {name}
    </Badge>
  )
}
