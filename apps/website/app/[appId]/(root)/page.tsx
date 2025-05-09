type PageProps = {
  params: Promise<{
    appId: string;
  }>;
};
export default async function page({ params }: PageProps) {
  return (
    <div className="max-w-screen-2xl w-full mx-auto p-6 space-y-6">
      <></>
    </div>
  );
}
