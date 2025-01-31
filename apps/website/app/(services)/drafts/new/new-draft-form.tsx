const NewDraftForm = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-2">
        <div className="size-10 rounded-full border" />
        <div className="flex flex-col">
          <span className="text-base font-medium">YZ13</span>
          <span className="text-sm text-secondary underline">123456</span>
        </div>
      </div>
      <div className="w-full aspect-[4/2.5] border-dashed rounded-xl border relative" />
    </div>
  );
};

export default NewDraftForm;
