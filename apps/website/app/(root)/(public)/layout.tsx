import Header from "../header";

type LayoutProps = {
  children: React.ReactNode;
};

const layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header className="max-w-4xl mx-auto lg:!mt-24 mt-0" />
      {children}
      <div className="mt-20" />
    </>
  );
};

export default layout;
