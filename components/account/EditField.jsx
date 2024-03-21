import { ActivityIndicator, Platform, StyleSheet, View } from "react-native"
import TextInput from "../TextInput"
import { useContext, useEffect, useRef, useState } from "react"
import IconButton from "../IconButton"
import { SaviorContext } from "../../contexts/SaviorContext"
import { useMemo } from "react"
import css from "../../styles"
import Text from "../Text"

export default function EditField({ 
  canSave, 
  errorText, 
  value, 
  onChangeText, 
  onSave, 
  placeholder,
  goBack,
  initialValue
 }) {
  const [ loading, setLoading ] = useState(false);
  const inputRef = useRef();

  async function _onSave() {
    if (initialValue === value) {
      goBack();
    } else {
      setLoading(true)
      await onSave();
      setLoading(false);
      goBack();
    };
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.save}>
        <IconButton text="Back" onPress={goBack} />
        { 
          loading ? <ActivityIndicator /> 
          : value !== initialValue && 
            value !== "" &&
            canSave && 
            <IconButton text="Save" onPress={_onSave}/>
        }
      </View>
      <View style={styles.field}>
        <TextInput 
          onChangeText={onChangeText}
          style={styles.input}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={css.gray}
          reactRef={inputRef}
          />
          { errorText &&
            <Text color={css.ecoDanger} style={styles.invalid}>{ errorText}</Text>
          }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  save: {
    height: 50,
    alignItems: "flex-end",
    paddingHorizontal: 15,
    paddingTop: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },

  field: {
    paddingTop: 30,
  },

  input: {
    borderTopColor: css.highlight,
    borderBottomColor: css.highlight,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopColor: css.highlight,
    borderBottomColor: css.highlight,
    borderWidth: 2,
    width: "100%",
  },

  invalid: {
    paddingLeft: 3,
    paddingTop: 13,
  }

})