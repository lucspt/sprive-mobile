import { useContext, useState } from "react"
import { Platform, StyleSheet, View } from "react-native";
import ModalWrapper from "../ModalWrapper";
import Text from "../Text";
import { SaviorContext } from "../../contexts/SaviorContext";
import Button from "../Button";
import css from "../../styles";

const { ecoDanger, modalBorderRadius, highlight, borderColor } = css
export default function LogoutButton() {
  const [ showModal, setShowModal ] = useState(false);
  const { savior, logout, savior: { username } } = useContext(SaviorContext);

  return (
    <View>
      <Button 
        text="Logout" 
        textColor={ecoDanger} 
        onPress={() => setShowModal(true)} 
        style={styles.logoutBtn}
        activeColor={css.black}
        ariaLabel="Logout of your account"
      />
      <ModalWrapper visible={showModal} animationType="fade" backgroundColor={css.highlight}>
        <View style={styles.modalWarn}>
          <Text style={styles.modalTitle}>
            Are you sure you want to logout, {username}?
          </Text>
        </View>
        <View style={styles.modalBtns}>
          <Button
            onPress={logout} 
            text="Yes" 
            textColor={ecoDanger} 
            ariaLabel="Logout"
            containerStyle={styles.modalBtn}
            style={styles.innerModalBtn}
          />
          <Button 
            onPress={() => setShowModal(false)} 
            text="Cancel"
            ariaLabel="Cancel"
            style={[styles.innerModalBtn, {borderBottomWidth: 0}]}
            containerStyle={[styles.modalBtn, styles.cancelBtn, ]}
          />
        </View>
      </ModalWrapper>
    </View>
  )
}

const styles = StyleSheet.create({

  logoutBtn: {
    alignSelf: "center",
    backgroundColor: css.highlight,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    height: Platform.select({ios: 50, android: 60})
  },

  modalWarn: {
    flex: 1,
    textAlign: "center",
    alignItems: "center"
  },

  modalBtns: {
    width: "100%",
    alignItems: "center"
  },

  modalTitle: {
    fontWeight: css.bold,
    paddingTop: 17,
    fontSize: css.smallFont,
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 20,
  },

  modalBtn: {
    width: "100%",
  },

  innerModalBtn: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: borderColor,
    borderBottomColor: borderColor
  },

  cancelBtn: {
    borderBottomLeftRadius: modalBorderRadius,
    borderBottomRightRadius: modalBorderRadius,
    borderBottomWidth: 0,
  }

})