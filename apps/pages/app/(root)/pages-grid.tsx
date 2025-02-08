const PagesGrid = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full grid lg:!grid-cols-4 sm:!grid-cols-2 grid-cols-1 gap-4">
      {children}
    </div>
  );
};

export default PagesGrid;
