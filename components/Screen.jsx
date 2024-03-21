import StatsBar from "./StatsBar";


export default function Screen({ ScreenComponent, ...props }) {
  return (
    <ScreenComponent {...props}>
      <StatsBar />
    </ScreenComponent>
  )
}