import TerminalInput from "./terminal-input"
import TerminalOutput from "./terminal-output"



const page = () => {
  return (
    <>
      <div className="w-full max-w-screen-2xl space-y-3 mx-auto h-[calc(100dvh-36px)] bg-background p-6">
        <TerminalOutput />
        <TerminalInput />
      </div>
    </>
  )
}



export default page