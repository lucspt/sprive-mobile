import { useContext, useState } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import EditField from "./EditField";
import { useMemo } from "react";



export default function EditUsername({ navigation }) {

  const { savior: { username: _username }, updateSavior } = useContext(SaviorContext);
  const [ username, setUsername ] = useState(_username);
  const [ usernameInUse, setUsernameInUse ] = useState(null);
  const onSave = () => (
    updateSavior(
      {"username": username}, 
      () => setUsernameInUse(username)
    )
  )
  
  return (
    <EditField 
      value={username}
      onSave={onSave}
      initialValue={_username}
      canSave={username !== ""}
      onChangeText={setUsername}
      errorText={username === usernameInUse && "That username has been taken"}
      placeholder="Username"
      goBack={navigation.goBack}
    />
  )
}