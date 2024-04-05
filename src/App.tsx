import "./App.css"
import { HeroDisplay } from "./app/components/HeroDisplay"
import { useAppDispatch, useAppSelector } from "./app/hooks"

const App = () => {
  const hero = useAppSelector((state) => state.hero.hero)
  const dispatch = useAppDispatch()
  return (
    <div className="App">
      <HeroDisplay />
    </div>
  )
}

export default App
