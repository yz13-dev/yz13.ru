import TerminalHeader from "./terminal-header";
import TerminalInput from "./terminal-input";
import TerminalOutput from "./terminal-output";

const page = () => {
  return (
    <>
      <div className="terminal">
        <TerminalHeader />
        <TerminalOutput />
        <TerminalInput commandsOnStart={["greeting"]} />
      </div>
    </>
  );
};

export default page;
