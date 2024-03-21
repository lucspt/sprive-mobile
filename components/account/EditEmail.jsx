import EditField from "./EditField"
import { useContext, useState } from "react"
import { SaviorContext } from "../../contexts/SaviorContext"
import { useMemo } from "react"
import { emailRegex } from "../../utils"
export default function EditEmail({ navigation }) {
  const { savior: { email: _email }, updateSavior } = useContext(SaviorContext);
  const [ email, setEmail ] = useState(_email);
  const [ emailInUse, setEmailInUse ] = useState(null);
  const emailValid = useMemo(() => 
    email === _email 
    || (email !== emailInUse) && (email === "" || emailRegex.test(email)), 
    [email, emailRegex]
  );

  const onSave = () => updateSavior({"email": email}, () => setEmailInUse(email))

  const errorText = (
    email === emailInUse 
      ? "That email is already in use"
      : !emailValid && "invalid email"
  );

  return (
    <EditField 
      value={email}
      canSave={emailValid}
      initialValue={_email}
      onSave={onSave}
      errorText={errorText}
      goBack={navigation.goBack}
      onChangeText={setEmail}
      placeholder="Email"
    />
  )
}