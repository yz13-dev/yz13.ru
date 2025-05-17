import packageJson from "@/package.json";

export default function () {
  return (
    <footer className="max-w-4xl w-full mx-auto p-6 flex items-center justify-between">
      <span className="text-muted-foreground text-sm">
        Новостной аггрегатор, {packageJson.version}
      </span>
      <span className="text-muted-foreground text-sm">YZ13</span>
    </footer>
  );
}
