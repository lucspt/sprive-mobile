import { StyleSheet, View, Platform } from "react-native";
import TextInput from "../../TextInput";
import { AntDesign } from '@expo/vector-icons';
import Button from "../../Button";
import css from "../../../styles";
import IconButton from "../../IconButton";
import ModalWrapper from "../../ModalWrapper";

const { buttonBg, modalBorderRadius } = css

export default function LoggerModal({ 
    visible, 
    hide,
    value,
    setVisible,
    calculateEmissions,
    setLogInfo,
  })  {

  const onPress = () => {hide(); calculateEmissions()};

  const updateLogCount = value => {
    if (value.length > 0) {
      setLogInfo(prev => ({...prev, value,}));
    };
  }

  const logCountPlus = () => {
    setLogInfo(prev => ({...prev, value: Number(prev.value) + 1}));
  }

  const logCountMinus = () => {
    setLogInfo(prev => ({
        ...prev, 
        value: Math.max(1, Number(prev.value) - 1)
    })
);
  }

  const buttonProps = (textStyle={}) => ({
    onPress,
    text: "calculate",
    ariaLabel: "Calculate emissions",
    ariaRole: "button",
    textStyle: {
      fontSize: css.smallFont,
      color: css.secondary,
      ...textStyle,
    },
    onLongPress: () => null,
  })

  return (
    <ModalWrapper 
      visible={visible} 
      closeOnOutsideClick
      setVisible={setVisible} 
      animationType="fade"
      backgroundColor={css.highlight}
    >
      <View style={styles.modalContent}>
        <View style={styles.inputs}>
          <IconButton
          onPress={logCountMinus}
          accessibilityRole="button"
          accessibilityLabel="minus one product quantity"
          buttonProps={{activeOpacity: 1}}
          >
            <AntDesign 
              name="minus" 
              size={24} 
              style={{paddingBottom: 3}}
            />
          </IconButton>
          <TextInput

            style={styles.modalInput}
            value={value}
            keyboardType="number-pad"
            onChangeText={updateLogCount}
          />
          <IconButton
            onPress={logCountPlus}
            accessibilityLabel="add one to log"
            buttonProps={{activeOpacity: 1}}
          >
            <AntDesign
              name="plus" 
              size={24} 
              color={buttonBg}
              style={{paddingBottom: 3}}
            />
          </IconButton>
          </View>
        {
          Platform.select({
            ios: (
              <Button
                {...buttonProps()}
                style={[styles.iosButton, styles.button]}
                containerStyle={styles.iosButtonContainer}
              />
            ),
            android: (
              <View style={styles.androidButtonContainer}>
                <IconButton 
                  {...buttonProps({
                    textTransform: 
                    "capitalize", fontSize: css.defaultFont
                  })} 
                  />
              </View>
            )
          })
        }
      </View>
    </ModalWrapper>
  )
}
const styles = StyleSheet.create({

  modalContent: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: "100%",
    gap: 40,
    paddingTop: 30,
    width: "100%",
    flex: 1,
  },

  inputs: {
    alignSelf: "center",
    gap: 20,
    flexDirection: "row",
    alignItems: "center",
    ...Platform.select({ ios: { flex: 1 }})
  },
  
  modalInput: {
    width: 70,
    height: 35,
    borderRadius: 7,
    paddingHorizontal: 5,
    backgroundColor: buttonBg,
    textAlign: "center",
  },


  iosButton: {
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    paddingVertical: 15,
    borderTopColor: css.borderColor,
    borderTopWidth: .7,
    paddingBottom: 15,

  },

  button: {
    width: "100%",
  },
  
  androidButtonContainer: {
    alignItems: "center",
    alignSelf: "center",
  },

  iosButtonContainer: {
    width: "100%",
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    borderBottomRightRadius: modalBorderRadius,
    borderBottomLeftRadius: modalBorderRadius,
  }
})