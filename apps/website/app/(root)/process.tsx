const Process = () => {
  // https://vercel.com/frameworks/nextjs - partial rendering section
  return (
    <div className="w-full space-y-6">
      <span className="text-secondary text-center block text-xl font-medium">
        Что я делаю в процессе разработки?
      </span>
      <div className="w-full gap-6 flex flex-row">
        <div className="w-2/3 aspect-video border rounded-xl" />
        <div className="w-1/3" />
      </div>
    </div>
  );
};

export default Process;
