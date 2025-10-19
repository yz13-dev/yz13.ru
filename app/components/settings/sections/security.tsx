import { postAuthV1Logout } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { useNavigate } from "react-router";


export default function () {

  const navigate = useNavigate()

  const signOut = async () => {
    try {
      await postAuthV1Logout();
      navigate(0)
    } catch (e) {
      console.log(e)
    }
  }


  return (
    <>
      <div className="w-full flex items-center justify-between">
        <span className="text-sm">Выйти из аккаунта</span>
        <Button variant="secondary" onClick={signOut}>Выйти</Button>
      </div>
    </>
  )
}
