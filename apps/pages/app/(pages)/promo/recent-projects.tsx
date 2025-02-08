const RecentProjects = () => {
  return (
    <>
      <section className="hover:bg-background-back transition-colors">
        <div className="container mx-auto w-full px-6 py-12 flex lg:!flex-row flex-col gap-4">
          <div className="lg:!w-1/2 w-full flex flex-col gap-2">
            <h3 className="text-4xl font-medium text-secondary">Reservia</h3>
            <p className="text-4xl font-medium text-foreground">
              Приложение для резервирования столов в ресторанах и кафе.
            </p>
          </div>
          <div className="lg:!w-1/2 w-full flex flex-col gap-2">
            <div className="w-full aspect-[4/3] border rounded-3xl" />
          </div>
        </div>
      </section>
    </>
  );
};

export default RecentProjects;
