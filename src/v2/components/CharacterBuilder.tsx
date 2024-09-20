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
  Advancement,
  AdvancementGrants,
  Character,
  CharacterType,
  characterTypes,
  heroTypes,
  isCharacterHero,
} from "../types"
import { useAppDispatch, useAppSelector } from "../hooks"
import { getLevel, setName, setType } from "../features/characterSlice"
import { useState } from "react"
import {
  archetypesReference,
  blankArchetypeReference,
  getAdvancementTrack,
} from "../textContent"

// TODO hardcoded for focused heroes for now
const AdvancementCard = ({
  level,
  character,
  grants,
}: {
  level: number
  character: Character
  grants: AdvancementGrants
}) => {
  // TODO for each thing granted, make input/form things
  // create an advancement for the whole thing and call the apply func
  const [advancement, setAdvancement] = useState<Advancement>(() => ({
    level: level,
    bonusDie: grants.bonusDie,
    stances: new Map(),
    archetypes: new Map(),
    bonusHp: grants.bonusHp,
    // build goes here
  }))
  return (
    <Card>
      <CardContent>
        {grants.totalArchetypes && (
          <Select
            value={
              advancement.archetypes.get(1)?.ref.name ?? blankArchetypeReference
            }
            onChange={e => {
              const selected =
                archetypesReference.find(
                  arch => arch.name === e.target.value,
                ) ?? blankArchetypeReference
              setAdvancement(adv => {
                adv.archetypes.set(1, {
                  ref: selected,
                  type: character.type as any,
                })
                return { ...adv, archetypes: adv.archetypes }
              })
            }}
          >
            {archetypesReference.map(opt => (
              <MenuItem key={opt.name} value={opt.name}>
                {opt.name}
              </MenuItem>
            ))}
          </Select>
        )}
      </CardContent>
    </Card>
  )
}

export const CharacterBuilder = () => {
  const character = useAppSelector(state => state.store.character)
  const characterLevel = getLevel({ character })
  const dispatch = useAppDispatch()

  const advancementTrack = getAdvancementTrack(character.type)

  // show cards to allow levelling up to `goalLevel`
  // TODO add buttons to increase goal level and decrease/remove advancements
  const [goalLevel, setGoalLevel] = useState(characterLevel + 1)

  const levels = [...Array(goalLevel).keys()]
  const advancementCards = levels.map(i => (
    <AdvancementCard
      key={i}
      level={i}
      character={character}
      grants={advancementTrack[i]}
    />
  ))
  return (
    <Grid item>
      <Stack spacing={2}>
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
            <Select
              value={character.type}
              onChange={e => {
                dispatch(setType(e.target.value as CharacterType))
              }}
            >
              {characterTypes.map(t => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </Select>
            XP: <Input />
          </CardContent>
        </Card>
        {...advancementCards}
      </Stack>
    </Grid>
  )
}
