import { MenuItem, Select } from "@mui/material"
import { setBuild } from "../../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../../hooks"
import { builds } from "../../textContent"

export const BuildSelector = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  return (
    <Select
      value={hero.build.name}
      onChange={e => {
        const buildForName = builds.find(b => b.name === e.target.value)
        if (buildForName !== undefined) {
          dispatch(setBuild(buildForName))
        }
      }}
    >
      {builds.map(b => (
        <MenuItem key={b.name} value={b.name}>
          {b.name}
        </MenuItem>
      ))}
    </Select>
  )
}
