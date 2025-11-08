"use client";

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background flex justify-center items-center mb-6 py-4 border-b border-border">
      <div>
        <h1 className="text-2xl font-bold text-amber-900">{title}</h1>
      </div>
    </header>
  );
}
