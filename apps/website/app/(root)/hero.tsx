const Hero = () => {
  return (
    <>
      <div className="w-full">
        <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
          <div className="w-full h-full pattern-lines" />
          <div className="lg:!h-20 h-10 border-x p-6 space-y-6" />
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
      <div className="w-full">
        <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
          <div className="w-full h-full pattern-lines" />
          <main className="h-fit border-x px-6 py-3 flex flex-col gap-6">
            <h1 className="text-foreground lg:!text-5xl text-4xl font-medium">
              <span className="font-pixel">YZ13, </span>
              Фронтенд разработчик
            </h1>
            <p className="text-secondary lg:!text-2xl texg-xl font-medium max-w-4xl text-balance">
              Специализируюсь на разработке сайтов, веб-приложений. Увлекаюсь
              разработкой интерфейсов для сайтов и приложений. Стараюсь
              расширить круг компетенций.
            </p>
          </main>
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
      <div className="w-full">
        <div className="grid-template max-w-screen-2xl w-full mx-auto border-x">
          <div className="w-full h-full pattern-lines" />
          <div className="h-6 border-x" />
          <div className="w-full h-full pattern-lines" />
        </div>
      </div>
    </>
  );
};

export default Hero;
