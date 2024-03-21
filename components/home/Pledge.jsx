import { StyleSheet, View } from "react-native";
import Text from "../Text";
import css from "../../styles";
import { useContext, useRef, useState } from "react";
import { SaviorContext } from "../../contexts/SaviorContext";
import TextInput from "../TextInput"
import { Entypo } from '@expo/vector-icons';
import Button from "../Button";
import RNPickerSelect from "react-native-picker-select";
import { fetchData } from "../../utils";

const { secondary } = css
export default function Pledge({ navigation }) {
  const { 
    savior: { current_pledge: currentPledge }, 
    setSavior 
  } = useContext(SaviorContext);
  const [ pledge, setPledge ] = useState({
    ...currentPledge, co2e: currentPledge.co2e.toString()
  });
  const co2eRef = useRef();
  const [ highlightPicker, setHighlightPicker ] = useState(null);

  const updatePledge = (k, v) => setPledge(prev => ({...prev, [k]: v}));
  const isAnUpdate =  Object.values(currentPledge || {}).some(x => x)
  const header = isAnUpdate
    ? "Your current pledge"
    : "Make a pledge"

    const onSubmit = async () => {
      if (!pledge.frequency) {
        setHighlightPicker("Choose a frequency");
      } else if (!pledge.co2e) {
        co2eRef.current.focus();
      } else {
        const res = await fetchData("saviors/pledges", isAnUpdate ? "PUT" : "POST", {
          ...pledge,
          co2e: Number(pledge.co2e)
        });
        setSavior(prev => ({...prev, current_pledge: {
          ...pledge, co2e: Number(pledge.co2e)
        }}));
        navigation.goBack();
      };
    }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Entypo name="chevron-left" size={24} color={css.secondary} /> */}
        <Text style={{fontSize: 20, fontWeight: css.bold}}>{ header }</Text>
        <Text fontSize={15} style={{ lineHeight: 20 }}>
          Pledges allow you to track 
          your impact with a goal in mind. 
          Set a desired amount of CO2e that you'd
          like to keep your emissions within every day, 
          week, month or year, and support yourself on your journey!
        </Text>
      </View>
      <View style={styles.form}>
        <View style={[styles.field, { position: "relative" }]}>
          <Text>CO2e Amount</Text>
          <TextInput 
            style={styles.input}
            value={pledge.co2e}
            reactRef={co2eRef}
            keyboardType="number-pad"
            onChangeText={val => updatePledge("co2e", val)}
            placeholder="Set your goal!"
          />
          <Text style={styles.co2eLabel}>kg</Text>
        </View>
        <View style={styles.field}>
          <Text>Frequency</Text>
          <RNPickerSelect
            value={pledge.frequency}
            placeholder={{label: "Choose a frequency", value: null}}
            style={{...css.textInput, color: secondary }}
            textInputProps={{style: css.textInput}}
            onValueChange={val => {updatePledge("frequency", val); setHighlightPicker(null)}}
            darkTheme
            items={[
              {label: "daily", value: "day"},
              {label: "weekly", value: "week"},
              {label: "monthly", value: "month"},
              {label: "yearly", value: "year"}
            ]}
            Icon={() => (
            <Entypo 
              name="chevron-down" 
              size={15} 
              style={styles.dropdownArrow} 
              color={secondary}
              />  
              )
            }
          />  
          <Text style={styles.invalid}>{ highlightPicker }</Text>     
        </View>
        {/* <View style={styles.field}>
          <Text>Message to display (optional)</Text>
          <TextInput 
            style={styles.input}
            value={pledge.message}
            onChangeText={val => updatePledge("message", val)}
            defaultValue={pledge.message}
            placeholder={"Optional..."}
            placeholderTextColor={css.gray}
          />
        </View> */}
      </View>
      <Button
        onPress={onSubmit}
        containerStyle={styles.button}
        text={isAnUpdate ? "Update pledge" : "Make pledge"}

      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 40,
    paddingHorizontal: css.homeSpacing,
    gap: 15,
  },

  header: {
    gap: 10,
    width: "90%",
  },

  form: {
    gap: 30,
    marginTop: 40
  },

  field: {
    gap: 10
  },

  picker: {
    padding: 0,
    flex: 1,
  },

  dropdownArrow: {
    position: "absolute",
    right: 7,
    top: 10
  },

  button: {
    backgroundColor: css.ecoGreat,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 13,
    paddingHorizontal: 50,
    borderRadius: 4,
    marginTop: 60,
  },

  invalid: {
    position: "absolute",
    bottom: -20,
    left: 5,
    fontSize: 13,
    color: css.ecoDanger
  },

  co2eLabel: {
    position: "absolute",
    right: 10,
    bottom: 10,
    fontWeight: 600,
    marginTop: "auto",
    marginBottom: "auto",
  }
})