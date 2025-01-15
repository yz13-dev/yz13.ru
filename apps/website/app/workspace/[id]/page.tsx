type PageProps = {
  params: {
    id: string;
  };
};
const page = ({ params }: PageProps) => {
  const id = params.id;
  return <div>{id}</div>;
};

export default page;
