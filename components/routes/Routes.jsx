import { useContext } from "react"
import { SaviorContext } from "../../contexts/SaviorContext"
import RoutesBar from "./RoutesBar";
import Login from "../Login";


export default function Routes() {
  const { isLoggedIn } = useContext(SaviorContext);


  return isLoggedIn ? (
    <RoutesBar />
  ) : (
    <Login />
  )
}