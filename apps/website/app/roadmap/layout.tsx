


const layout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="relative w-full min-h-screen bg-background-back">
      {children}
    </div>
  )
}

export default layout