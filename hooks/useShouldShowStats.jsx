import AsyncStorage from "@react-native-async-storage/async-storage"
import { useSharedValue, Easing} from "react-native-reanimated"
const easing = Easing.ease
const expEasing = Easing.exp
const duration = 170
BAR_HIDE = 100
BUTTON_HIDE = -100
BUTTON_SHOW = 15
BAR_SHOW = 0
async function setShouldHide(shouldHide) {
  await AsyncStorage.setItem("hideStats", JSON.stringify(shouldHide));
}

async function checkShouldHide(_res) {
  const res = await AsyncStorage.getItem("hideStats");
  return JSON.parse(res);
}

class StatsBarHandler {
  constructor() {
    this.BAR_HIDE = BAR_HIDE
    this.BUTTON_HIDE = BUTTON_HIDE
    this.BUTTON_SHOW = BUTTON_SHOW
    this.BAR_SHOW = BAR_SHOW
    this._posOffset = useSharedValue(BAR_HIDE)
    this._showButton = useSharedValue(BUTTON_HIDE);
    console.log("Contstructed");
  }

  get posOffset() {
    return this._posOffset.value;
  }

  get showButton() {
    return this._showButton.value;
  }

  hide() {
    this.posOffset.value = this.BAR_HIDE;
    this.showButton.value = this.BAR_SHOW;
  }

  show() {
    this.posOffset.value = this.BAR_SHOW;
    this.showButton.value = this.BUTTON_HIDE;
  }
}


export default function useShouldShowStats() {

  const statsBar = new StatsBarHandler();
  return statsBar;  
}