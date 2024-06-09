import { StyleSheet, View } from "react-native";
import Button from "../Button";
import { Feather } from '@expo/vector-icons';
import css from "../../styles";
import { useContext, useRef, useState } from "react";
import LoginForm from "./LoginForm";
import TextInput from "../TextInput";
import { emailRegex } from "../../utils";
import Text from "../Text";
import { SaviorContext } from "../../contexts/SaviorContext";
import IconButton from "../IconButton";


export default function CreateAcount({ navigation }) {
  const [ user, setUser ] = useState({
    username: "", 
    password: "", 
    email: "",
  })
  const [ error , setError ] = useState("");
  const [ formStep, setFormStep ] = useState(1);
  const { createSavior } = useContext(SaviorContext);
  const [ emailInUse, setEmailInUse ] = useState(false);
  const emailRef = useRef();
  const [ canContinue, setCanContinue ] = useState(true);
  
  const updateEmail = text => {
    setCanContinue(true)
    setUser(prev => ({...prev, email: text}))
  }

  const toStepTwo = async () => {
    let emailOk = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/emails/${user.email}`, )
    emailOk = await emailOk.json();
    ({ content: emailOk } = emailOk);
    if (emailOk?.is_available) {
      setFormStep(2);
    } else {
      setEmailInUse(emailOk.email);
    }
  } 
  const { email } = user

  const onPressContinue = () => {
    const canContinue = email !== emailInUse && emailRegex.test(email);
    if (canContinue) {
      toStepTwo();
    } else {
      emailRef.current.focus();
      if (email !== "") {
        setCanContinue(false);
      }
    }
  }

  return (
    <View style={styles.container}>
      <IconButton onPress={() => navigation.goBack()}>
        <Feather name="x" size={24} color={css.secondary} style={styles.exit}/>
      </IconButton>
      {formStep === 1 
      ? (
        <View style={styles.container}>
          <View >
          <TextInput
            value={email}
            reactRef={emailRef}
            onChangeText={updateEmail}
            placeholder="email address"
          />
            <View style={styles.error}>
            { !canContinue && 
              <Text color={css.ecoDanger} fontSize={15} >
                {
                emailInUse === email ? "That email address is already in use" 
                : !canContinue &&  "Invalid email"
                }
                </Text>
            }
            </View>
          </View> 
            <Button
              onPress={onPressContinue}
              text="continue"
              containerStyle={{
                ...css.defaultBtn, 
                paddingVertical: 12,
              }}
              />
        </View>
      )
      : formStep === 2 && (
        <LoginForm 
          user={user}
          setUser={setUser} 
          style={styles.form}
          error={error}
          onSubmit={() => createSavior(user, setError)}
          submitText="create account"
        />
      )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    gap: 40,
    flex: 1,
    paddingHorizontal: 15,
  },

  form: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: "center",
  },

  error: {
    position: "absolute",
    bottom: -25,
    justifyContent: "flex-start",
  },

  submitButton: {
    width: "100%",
    alignItems: "center",
    display: "flex",
    backgroundColor: css.secondary,
    paddingVertical: 10
  },

  exit: {
    paddingLeft: 15,
    paddingTop: 15,
  },

})