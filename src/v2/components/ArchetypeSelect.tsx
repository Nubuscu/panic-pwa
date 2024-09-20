import { MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { Advancement, AdvancementGrants, Archetype, Character, isCharacterHero, isFocusedHero } from "../types"
import { Dispatch, ReactNode, SetStateAction } from "react"
import { archetypesReference } from "../textContent"

interface Props {
    character: Character
    advancement: Advancement
    setAdvancement: Dispatch<SetStateAction<Advancement>>
    grants: AdvancementGrants
}
export const ArchetypeSelect = ({ character, advancement, setAdvancement, grants }: Props) => {

    var selectors: ReactNode[] = []
    // TODO offset or special casing for when we gain an archetype later
    for (let index = 0; index < (grants.totalArchetypes ?? 0); index++) {
        // TODO a "hasArchetypes" guard would make a bit more sense here
        const initValue = isCharacterHero(character) ? (character?.archetypes?.at(index)?.ref) ?? defaultArch : defaultArch
        selectors.push(<SingleSelect value={initValue} options={archetypesReference} handleOnChange={e => {
            const selected = archetypesReference.find(arch => arch.name === e.target.value) ?? defaultArch
            advancement.archetypes.set(index, {ref: selected, type: character.type as any})
            setAdvancement(advancement)
        }} />)
    }
    return <div>{...selectors}</div>
}

const defaultArch: Archetype = {
    name: "",
    actions: [],
    focusedAbility: "",
    fusedAbility: "",
    franticAbility: "",
    keywords: [],
    superMoves: {
        alpha: {
            name: "",
            description: ""
        },
        delta: {
            name: "",
            description: ""
        },
    },
}

const SingleSelect = ({ value, options, handleOnChange }: { value: Archetype, options: Archetype[], handleOnChange: (e: SelectChangeEvent<Archetype>) => void }) => {
    return <Select value={value} onChange={handleOnChange}>
        {options.map(opt => <MenuItem key={opt.name} value={opt.name}>{opt.name}</MenuItem>)}
    </Select>
}
