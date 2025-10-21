type Props = {
  children: React.ReactNode;
};

export default function ({ children }: Props) {
  return (
    <div className="w-full h-dvh flex flex-col gap-3 items-center justify-center">
      {children}
    </div>
  );
}
