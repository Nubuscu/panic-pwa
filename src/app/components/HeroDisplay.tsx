import { setName } from "../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../hooks"


export const HeroDisplay = () => {
    const hero = useAppSelector((state) => state.hero.hero)
    const dispatch = useAppDispatch()

    // TODO comonents for stances
    // likely made up of form/style
    return (
        <div className="HeroDisplay">
            {hero.name}
            <input value={hero.name} onChange={(e) => {dispatch(setName(e.target.value))}}></input>

        </div>
    )
}