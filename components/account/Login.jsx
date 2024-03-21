import { StyleSheet, View } from "react-native";
import Button from "../Button";
import css from "../../styles";
import { useContext, useState } from "react";
import Text from "../Text";
import { SaviorContext } from "../../contexts/SaviorContext";
import LoginForm from "./LoginForm";


export default function Login({ navigation }) {
  const [ user, setUser ] = useState({username: "", password: ""})
  const { login } = useContext(SaviorContext);
  const [ error , setError ] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>sprive logo here</Text>
        <LoginForm 
          setUser={setUser}
          setError={setError}
          user={user}
          error={error}
          onSubmit={() => login(user, setError)}
         />
         {/* <Text style={{alignSelf: "center"}} color={css.gray}>or</Text> */}
         <View style={styles.createAccount}>
        <Button 
          style={styles.createButton}
          text="Create an account"
          onPress={() => navigation.navigate("signup")}
          textColor={css.secondary}
          
          />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    justifyContent: "center",
    gap: 30,
    flex: 1
  },

  logo: {
    width: "100%",
    textAlign: "center",
    alignItems: "center"
  },

  buttonText: {
    textAlign: "center",
    alignSelf: "center",
    color: css.black
  },

  createAccount: {
    justifyContent: "flex-end",
    alignSelf: "center",
    marginTop: 20,
    display: "flex",
    alignItems: "center",
  },

  createButton: {
    backgroundColor: css.ecoNeutral,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    height: 30,
  }

})