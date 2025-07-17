export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>Page {params.slug}</div>;
}
