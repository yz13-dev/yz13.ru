const Footer = dynamic(() => import("@/components/footer"));
import dynamic from "next/dynamic";



type Props = {
  children: React.ReactNode
}
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="w-full">
        {children}
      </div>
      <Footer />
    </>
  )
}
