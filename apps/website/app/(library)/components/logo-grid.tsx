


export default function LogoGrid({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full container px-6 mx-auto h-fit md:pt-32 pt-24 md:pb-16 pb-12 gap-12 grid lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-3 grid-cols-2">
      {children}
    </div>
  )
}
