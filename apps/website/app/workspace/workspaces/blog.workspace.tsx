


const BlogWorkspace = () => {
  return (
    <div className="max-w-screen-2xl mx-auto p-8 w-full min-h-[calc(100dvh-36px)]">
      <div className="mt-20 w-full h-full space-y-8">
        <h1 className="text-4xl font-semibold">Blog</h1>
        <div className="w-full h-full flex flex-row gap-4">
          <div className="sticky top-9 w-64 h-fit flex flex-col gap-3">
            <div className="w-full flex items-start justify-between">
              <div className="flex flex-col gap-1">
                <span className="text-base text-foreground">December</span>
                <span className="text-xs text-secondary">2024</span>
              </div>
              <div className="flex flex-col w-11">
                <span className="w-full aspect-square flex items-center justify-center font-medium">
                  12
                </span>
                <span className="w-full aspect-square flex items-center justify-center font-medium">
                  13
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-fit">
            <section className="w-full space-y-4">
              <h2 className="text-2xl font-semibold">Mon, 15 December</h2>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BlogWorkspace