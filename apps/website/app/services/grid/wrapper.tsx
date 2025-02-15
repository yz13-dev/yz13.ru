const Wrapper = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="w-full md:h-[70dvh] h-[200dvh] grid md:!grid-cols-3 border-x divide-y divide-x sm:!grid-cols-2 grid-cols-1 !pb-0">
      {children}
    </div>
  );
};

export default Wrapper;
