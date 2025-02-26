export const abc = [
  "а",
  "б",
  "в",
  "г",
  "д",
  "е",
  "ж",
  "з",
  "и",
  "й",
  "к",
  "л",
  "м",
  "н",
  "о",
  "п",
  "р",
  "с",
  "т",
  "у",
  "ф",
  "х",
  "ц",
  "ч",
  "ш",
  "щ",
  "ъ",
  "ы",
  "ь",
  "э",
  "ю",
  "я",
];
const Empty = () => {
  return (
    <>
      {abc.map((letter, index) => {
        return (
          <div key={letter} className="flex flex-col gap-2 p-6">
            <span className="text-xl font-medium capitalize">{letter}</span>
            <div className="grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-2 *:h-20">
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />

              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
              <div className="w-full rounded-lg bg-background-secondary border" />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Empty;
