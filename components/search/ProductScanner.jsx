import { StyleSheet, View } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera/next';
import css from "../../styles";
import { useEffect } from "react";


export default function ProductScanner({ navigation }) {
  const [ permission, requestPermission ] = useCameraPermissions();

  useEffect(() => {
    if (!permission) {
      const getPerms = async () => {
        await requestPermission();
      }
      getPerms();
    }
  }, []);

  useEffect(() => {
    if (permission && !permission.granted) {
      navigation.goBack();
    }
  }, [permission])

  return permission && (
    <View style={[css.screen, styles.container]}>
      <CameraView 
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr", 
            "aztec", 
            "codabar", 
            "code128", 
            "code39", 
            "code93", 
            "datamatrix", 
            "ean13", 
            "ean8", 
            "itf14", 
            "pdf417", 
            "upc_a", 
            "upc_e"
          ]
        }}
      >


      </CameraView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 0,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },

  camera: {
    height: "100%",
    width: "100%",
  }
})