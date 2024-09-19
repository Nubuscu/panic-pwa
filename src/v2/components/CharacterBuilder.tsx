import {
  Card,
  CardContent,
  Divider,
  Grid,
  Input,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import {
  AdvancementGrants,
  Character,
  characterTypes,
  heroTypes,
} from "../types"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getLevel, setName } from "../features/characterSlice"
import { useSelector } from "react-redux"
import { heroAdvancementGrants } from "../textContent"
import { HeroType } from "../../v1/app/types"

const AdvancementCard = ({
  level,
  character,
}: {
  level: number
  character: Character
}) => {
  var grants: AdvancementGrants = {
    level: 0,
  }
  if (heroTypes.includes(character.type as any)) {
    grants = heroAdvancementGrants.find(g => g.level === level) ?? grants
  }
  // TODO for each thing granted, make input/form things
  // create an advancement for the whole thing and call the apply func
  return (
    <Card>
      <CardContent>{grants.extraStances}</CardContent>
    </Card>
  )
}

export const CharacterBuilder = () => {
  const character = useAppSelector(state => state.store.character)
  const characterLevel = getLevel({ character })
  const dispatch = useAppDispatch()

  const advancementCards = [...Array(characterLevel).keys()].map(i => (
    <AdvancementCard key={i} level={1} character={character} />
  ))
  return (
    <Grid item>
      <Stack>
        <Card>
          <CardContent>
            Name:{" "}
            <Input
              value={character.name}
              onChange={e => {
                dispatch(setName(e.target.value))
              }}
            />
            Character type:
            <Select>
              {characterTypes.map(t => (
                <MenuItem>{t}</MenuItem>
              ))}
            </Select>
            Level: <Input />
            XP: <Input />
          </CardContent>
          {advancementCards}
        </Card>
      </Stack>
    </Grid>
  )
}
