interface BadgeProps {
  children: React.ReactNode;
  bg: string;
  text: string;
  dot?: string;
  className?: string;
}

export default function Badge({ children, bg, text, dot, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bg} ${text} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot}`} />}
      {children}
    </span>
  );
}
