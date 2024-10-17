import {
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  IconButton,
  Input,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import type {
  Advancement,
  AdvancementGrants,
  Character,
  CharacterType,
} from "../types"
import { characterTypes, heroTypes, isCharacterHero } from "../types"
import { useAppDispatch, useAppSelector } from "../hooks"
import {
  applyAdvancement,
  getLevel,
  revertToLevel,
  setName,
  setType,
} from "../features/characterSlice"
import { useEffect, useState } from "react"
import {
  archetypesReference,
  blankArchetypeReference,
  blankDefaultForm,
  blankDefaultStance,
  blankDefaultStyle,
  formsReference,
  getAdvancementTrack,
  stylesReference,
} from "../textContent"
import { Add, Remove } from "@mui/icons-material"

export const CharacterBuilder = () => {
  const character = useAppSelector(state => state.store.character)
  const characterLevel = getLevel({ character })
  const dispatch = useAppDispatch()

  const advancementTrack = getAdvancementTrack(character.type)

  const [goalLevel, setGoalLevel] = useState(characterLevel)
  const handleGoalLevelChange = (delta: number) => {
    const inputLevel = goalLevel + delta
    const newLevel = Math.min(Math.max(1, inputLevel), advancementTrack.length)
    // drop anything off-screen from the main state
    dispatch(revertToLevel(newLevel))

    setGoalLevel(newLevel)
  }

  // show cards to allow levelling up to `goalLevel`
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
        <Grid alignSelf="center">
          <IconButton onClick={() => handleGoalLevelChange(-1)}>
            <Remove />
          </IconButton>
          <IconButton onClick={() => handleGoalLevelChange(+1)}>
            <Add />
          </IconButton>
        </Grid>
      </Stack>
    </Grid>
  )
}

const AdvancementCard = ({
  level,
  character,
  grants,
}: {
  level: number
  character: Character
  grants: AdvancementGrants
}) => {
  const dispatch = useAppDispatch()
  const [advancement, setAdvancement] = useState<Advancement>(() => ({
    level: level,
    bonusDie: grants.bonusDie,
    stances: {},
    archetypes: {},
    bonusHp: grants.bonusHp,
    // build goes here
  }))

  useEffect(() => {
    dispatch(applyAdvancement(advancement))
  }, [advancement])
  const archetypesRange = [...Array(grants.totalArchetypes ?? 0).keys()]

  // get a range of numbers to assign stances to
  // offset the start of this by the number of existing stances to make sure we can display
  // the expected stance number
  const numExistingStances = getAdvancementTrack(character.type)
    .filter(grant => grant.level < level)
    .reduce((acc, curr) => Math.max(acc, curr.totalStances ?? 0), 0)
  const stancesRange = [...Array(grants.totalStances ?? 0).keys()].filter(
    i => i >= numExistingStances,
  )
  return (
    <Card>
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item>{grants.setBuild && <div>build goes here</div>}</Grid>
          <Grid item>
            {grants.totalArchetypes &&
              archetypesRange.map(i => (
                <AdvancementArchetypeSelect
                  advMapKey={i + 1}
                  character={character}
                  advancement={advancement}
                  setAdvancement={setAdvancement}
                />
              ))}
          </Grid>
          <Grid item>
            {grants.totalStances &&
              stancesRange.map(i => (
                <AdvancementStanceSelect
                  advMapKey={i + 1}
                  character={character}
                  advancement={advancement}
                  setAdvancement={setAdvancement}
                />
              ))}
          </Grid>
          <Grid item>
            {grants.totalSuperMoves && (
              <div>this level grants a super move?</div>
            )}
          </Grid>
          <Grid item>
            {grants.gainFusedArchetype && <div>bonus fused archetype</div>}
          </Grid>
          <Grid item>
            {grants.improveExistingArchetype && (
              <div>improves an archetype</div>
            )}
          </Grid>
          <Grid item>{grants.extra && <div>extra: {grants.extra}</div>}</Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

const AdvancementArchetypeSelect = ({
  advMapKey,
  character,
  advancement,
  setAdvancement,
}: {
  advMapKey: number
  character: Character
  advancement: Advancement
  setAdvancement: React.Dispatch<React.SetStateAction<Advancement>>
}) => {
  return (
    <>
      Archetype {advMapKey}:
      <Select
        value={advancement.archetypes[advMapKey]?.ref.name ?? ""}
        onChange={e => {
          const selected =
            archetypesReference.find(arch => arch.name === e.target.value) ??
            blankArchetypeReference
          setAdvancement(adv => {
            const tmp: Advancement = {
              ...adv,
              archetypes: { ...adv.archetypes },
            }
            tmp.archetypes[advMapKey] = {
              ref: selected,
              type: character.type as any,
            }
            return tmp
          })
        }}
      >
        {archetypesReference.map(opt => (
          <MenuItem key={opt.name} value={opt.name}>
            {opt.name}
          </MenuItem>
        ))}
      </Select>
    </>
  )
}
const AdvancementStanceSelect = ({
  advMapKey,
  character,
  advancement,
  setAdvancement,
}: {
  advMapKey: number
  character: Character
  advancement: Advancement
  setAdvancement: React.Dispatch<React.SetStateAction<Advancement>>
}) => {
  const stance = advancement.stances[advMapKey] ?? blankDefaultStance
  // TODO limit options to what's available from an archetype
  // TODO don't allow duplicate style/form selects from other stances
  // TODO display style and form separately for frantics
  return (
    <Grid container>
      <Grid item>Stance {advMapKey}:</Grid>
      <Grid item>
        Name: <Input value={stance.name}></Input>
      </Grid>
      <Grid item>
        Form:{" "}
        <Select
          value={stance.form.name}
          onChange={e => {
            const selected =
              formsReference.find(f => f.name === e.target.value) ??
              blankDefaultForm
            setAdvancement(adv => {
              const tmp: Advancement = {
                ...adv,
                stances: {
                  ...adv.stances,
                },
              }
              tmp.stances[advMapKey] = { ...stance, form: selected }
              return tmp
            })
          }}
        >
          {formsReference.map(f => (
            <MenuItem key={f.name} value={f.name}>
              {f.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid item>
        Style:{" "}
        <Select
          value={stance.style.name}
          onChange={e => {
            const selected =
              stylesReference.find(s => s.name === e.target.value) ??
              blankDefaultStyle
            setAdvancement(adv => {
              const tmp: Advancement = {
                ...adv,
                stances: {
                  ...adv.stances,
                },
              }
              tmp.stances[advMapKey] = { ...stance, style: selected }
              return tmp
            })
          }}
        >
          {stylesReference.map(s => (
            <MenuItem key={s.name} value={s.name}>
              {s.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}
