import { setName, setType } from "../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { HeroType } from "../types"
import { Archetypes } from "./Archetypes"

export const HeroDisplay = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  // TODO components for stances
  // likely made up of form/style
  return (
    <div className="HeroDisplay">
      {hero.name}
      <input
        value={hero.name}
        onChange={e => {
          dispatch(setName(e.target.value))
        }}
      ></input>
      <select
        value={hero.type}
        onChange={e => {
          if (e.target.value in HeroType) {
            dispatch(setType(HeroType[e.target.value as keyof typeof HeroType]))
          }
        }}
      >
        {Object.keys(HeroType).map(t => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
      <Archetypes />
    </div>
  )
}
