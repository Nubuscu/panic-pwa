import { setArchetype } from "../../features/hero/heroSlice"
import { useAppDispatch, useAppSelector } from "../hooks"
import { archetypes, defaultArchetype } from "../textContent"
import { Ability, Archetype, HeroType } from "../types"

interface ArchetypeDisplayProps {
  arch: Archetype
  heroType: HeroType
  display: boolean
}

const ArchetypeDisplay = ({
  arch,
  heroType,
  display,
}: ArchetypeDisplayProps) => {
  let ability: Ability
  switch (heroType) {
    case HeroType.Focused:
      ability = arch.focusedAbility
      break
    case HeroType.Fused:
      ability = arch.fusedAbility
      break
    case HeroType.Frantic:
      ability = arch.franticAbility
  }

  const headerBlock = <div>header goes here</div>
  return (
    <div>
      {headerBlock}
      {display ? (
        <div>
          <h1>
            {heroType} {arch.name}
          </h1>
          <p>{ability.description}</p>{" "}
        </div>
      ) : null}
    </div>
  )
}

export const Archetypes = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()

  let allHeroArchetypes = []
  switch (hero.type) {
    case HeroType.Focused:
      allHeroArchetypes.push(hero.archetype1)
      break
    case HeroType.Fused:
      allHeroArchetypes.push(hero.archetype1)
      allHeroArchetypes.push(hero.archetype2)
      break
    case HeroType.Frantic:
      allHeroArchetypes.push(hero.archetype1)
      allHeroArchetypes.push(hero.archetype2)
      allHeroArchetypes.push(hero.archetype3)
  }
  const selectedArchetypes = allHeroArchetypes.filter(a => a !== defaultArchetype)

  const availableOptions = archetypes.filter(a => !allHeroArchetypes.includes(a))
  return (
    <div>
      {allHeroArchetypes.map((a, i) => (
        <div>
          <select
            value={a.name}
            onChange={e => {
              dispatch(
                setArchetype({ archetypeName: e.target.value, number: i + 1 }),
              )
            }}
          >
            {availableOptions.map(arch => (
              <option key={arch.name} value={arch.name}>
                {arch.name}
              </option>
            ))}
          </select>
        </div>
      ))}
      {selectedArchetypes.map(a => (
        <ArchetypeDisplay arch={a} heroType={hero.type} display={true} />
      ))}
    </div>
  )
}
