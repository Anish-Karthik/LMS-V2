

export default function FormLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full items-center justify-center !w-[600px]">{children}</div>
  )
}