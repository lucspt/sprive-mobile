import { Modal, Platform, Pressable, StyleSheet, View } from "react-native";
import css from "../styles";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

const AndroidModalChildrenWrapper = gestureHandlerRootHOC(({ children }) => children, {flex: 1, width: "100%"})

export default function ModalWrapper({
  animationType, 
  visible, 
  children, 
  setVisible,
  backgroundColor=css.widgetBg,
  closeOnOutsideClick=false
 }) {

  return (
    <Modal
    animationType={animationType}
    transparent={true}
    visible={visible}
  >
    {
      closeOnOutsideClick 
      ? (
          <Pressable 
            style={styles.modalCancel} 
            onPress={() => setVisible(false)}
            accessibilityLabel="close popup"
            accessible
            accessibilityRole="button"
          >
            <View style={styles.modalContainer}>
              <Pressable style={[styles.modal, {backgroundColor}]}>
              {
                Platform.select({
                  android: <AndroidModalChildrenWrapper>{ children }</AndroidModalChildrenWrapper>,
                  ios: children,
                  web: children
                })
            }
              </Pressable>
            </View>
          </Pressable>
        )
    : (
        <View style={styles.modalContainer}>
          <Pressable style={[styles.modal, {backgroundColor}]}>
            {
              Platform.select({
                android: <AndroidModalChildrenWrapper>{ children }</AndroidModalChildrenWrapper>,
                ios: children,
                web: children
              })
            }
          </Pressable>
        </View>
      )
  }
  </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  modal: {
    ...Platform.select({
      android: {
        width: "85%",
        maxWidth: 325,
        borderRadius: 0
      },
      ios: {
        width: 260,
        borderRadius: 12,
      }
    }),
    height: 180,
    gap: 17,
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalCancel: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    flex: 1
  }
})