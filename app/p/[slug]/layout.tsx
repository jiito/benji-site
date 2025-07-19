export default function PostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-2xl mx-auto p-4">{children}</div>;
}