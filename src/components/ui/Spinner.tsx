interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizes = { sm: 'w-4 h-4', md: 'w-8 h-8', lg: 'w-12 h-12' };

export default function Spinner({ size = 'md', label }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-3 border-earth-200 border-t-earth-500 rounded-full animate-spin`} />
      {label && <p className="text-sm text-earth-500">{label}</p>}
    </div>
  );
}
