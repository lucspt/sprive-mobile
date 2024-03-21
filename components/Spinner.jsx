import { RefreshControl } from "react-native-gesture-handler";


export default function Spinner({ refreshing, onRefresh, ...props }) {
  return (
    <RefreshControl 
      onRefresh={onRefresh} 
      refreshing={refreshing}
      size="default"
      tintColor="#b3b3b3"
      enabled={true} 
      {...props}
    />
  )
}