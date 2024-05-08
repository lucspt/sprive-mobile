import { Platform, StyleSheet, View } from "react-native";
import Button from "../Button";
import { fetchData } from "../../utils";
import { useContext, useState } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import css from "../../styles";
import Text from "../Text";
import ModalWrapper from "../ModalWrapper";
import IconButton from "../IconButton";

export default function SaviorDeactivator({ navigate, containerStyle={}, ...props }) {
  
  const [ modalVisible, setModalVisible ] = useState(false);
  const { setSavior, savior } = useContext(SaviorContext);

  const onPress = async () => {
    if (modalVisible) {
      await fetchData("saviors/sprivers", "DELETE");
      setSavior(prev => ({...prev, spriving: false}))
    } else {
      setModalVisible(true);
    }
  }

  const yesBtnProps = {
    text: "Yes",
    onPress,
    ariaLabel: "Yes, deactivate my subscription",
    ariaRole: "button",
    textColor: css.ecoDanger,
  }

  const cancelBtnProps = {
    text: "Cancel",
    ariaLabel: "Cancel",
    ariaRole: "button",
    onPress: () => setModalVisible(false),
    style: styles.modalOption,
  }
  
  return (
    <View>
      <Button 
        text="Stop Spriving"
        ariaLabel="Cancel membership and stop Spriving"
        ariaRole="button"
        onPress={onPress}
        style={styles.button}
        containerStyle={styles.container}
        {...props}
      />
      <ModalWrapper 
        animationType="fade" 
        backgroundColor={css.highlight}
        visible={modalVisible} 
        setVisible={setModalVisible}
      >
          {
            Platform.select({
              android: (
                <View style={{ flex: 1, }}>
                  <Text style={[styles.modalTitle, {fontSize: 15.3}]}>Are you sure you want to stop Spriving, {savior.username}?</Text>
                  <View style={styles.androidOptions}>
                    <IconButton {...cancelBtnProps} />
                    <IconButton {...yesBtnProps} />
                  </View>
                </View>
              ),
              ios: (
                <>
                  <Text style={styles.modalTitle}>Are you sure you want to stop Spriving, {savior.username}?</Text>
                  <View>
                  <Button  {...yesBtnProps} style={styles.iosOption}/>
                  <Button 
                    containerStyle={{ 
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}
                    {...cancelBtnProps}
                    style={[
                      styles.iosOption, 
                      {borderBottomWidth: 0, marginBottom: 2}
                    ]} 
                    />
                  </View>
                </>
              )
            })
          }
      </ModalWrapper>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 30,
    alignSelf: "center",
    width: 160,
  },

  button: {
    ...css.boxShadow,
    borderColor: css.secondary,
    height: "100%",
    width: "100%",
    borderRadius: 4,
    backgroundColor: css.ecoDanger,
    justifyContent: "center",
    alignItems: "center",
  },

  modalTitle: {
    fontWeight: css.bold,
    paddingTop: 17,
    fontSize: css.smallFont,
    textAlign: "center",
    lineHeight: 25,
    paddingHorizontal: 20,
  },

  androidOptions: {
    justifyContent: "flex-end",
    gap: 20,
    flexDirection: "row",
    marginTop: "auto",
    paddingBottom: 20,
    paddingRight: 30,
  },

  iosOption: {
    paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    width: 260,
    borderBottomWidth: 1,
    borderTopColor: css.borderColor,
    borderBottomColor: css.borderColor
  },
})