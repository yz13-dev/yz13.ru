import TerminalHeader from "./terminal-header"
import TerminalInput from "./terminal-input"
import TerminalOutput from "./terminal-output"
import terminal from "./terminal.module.css"



const page = () => {
  return (
    <>
      <div className={terminal.terminal}>
        <TerminalHeader />
        <TerminalOutput />
        <TerminalInput />
      </div>
    </>
  )
}



export default page