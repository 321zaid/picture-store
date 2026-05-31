export default function Watermark({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none select-none ${className}`}
    >
      <div className="absolute inset-0 watermark" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-dark-50/10 text-2xl md:text-3xl font-bold tracking-widest rotate-[-30deg] uppercase select-none">
          Sexpixel
        </div>
      </div>
    </div>
  );
}
