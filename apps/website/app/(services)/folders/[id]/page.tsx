type PageProps = {
  params: {
    id: string;
  };
};
const page = ({ params }: PageProps) => {
  const id = params.id;
  return <></>;
};

export default page;
