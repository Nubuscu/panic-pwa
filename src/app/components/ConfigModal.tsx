import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"
import * as Mui from '@mui/material'
import { Form, Hero, HeroType, Style } from "../types";
import { archetypes, builds, defaultArchetype, forms, styles } from "../textContent";
import { setArchetype, setName, setType, setStyle, setForm, setBuild } from "../../features/hero/heroSlice";

const boxStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const ArchetypeSelectors = () => {
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
    return (allHeroArchetypes.map((a, i) => (
        <span className="archetypeSelectors">
            <select
                value={a.name}
                onChange={e => {
                    dispatch(
                        setArchetype({ archetypeName: e.target.value, number: i + 1 }),
                    )
                }}
            >
                {archetypes.map(arch => (
                    <option key={arch.name} value={arch.name} disabled={selectedArchetypes.includes(arch)}>
                        {arch.name}
                    </option>
                ))}
            </select>
        </span>
    )))
}

const StyleSelectors = () => {
    const hero = useAppSelector(state => state.hero.hero)
    const dispatch = useAppDispatch()

    const availableStyles = styles.filter(s => [hero.archetype1.name, hero.archetype2.name, hero.archetype3.name].includes(s.parentArchetypeName))

    const handleDisabled = (style: Style) => [hero.style1, hero.style2, hero.style3].includes(style)

    return ([hero.style1, hero.style2, hero.style3].map((style, i) => (
        <select value={style.name} onChange={e => { dispatch(setStyle({ styleName: e.target.value, number: i + 1 })) }}>
            {availableStyles.map(s => (
                <option key={s.name} value={s.name} disabled={handleDisabled(s)}>{s.name}</option>
            ))}
        </select>
    ))
    )
}

const FormSelectors = () => {
    const hero = useAppSelector(state => state.hero.hero)
    const dispatch = useAppDispatch()

    const handleDisabled = (form: Form) => [hero.form1, hero.form2, hero.form3].includes(form)

    return ([hero.form1, hero.form2, hero.form3].map((form, i) => (
        <select value={form.name} onChange={e => { dispatch(setForm({ formName: e.target.value, number: i + 1 })) }}>
            {forms.map(f => (
                <option key={f.name} value={f.name} disabled={handleDisabled(f)}>{f.name}</option>
            ))}
        </select>
    )))

}

export const ConfigModal = () => {
    const hero = useAppSelector(state => state.hero.hero)
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);



    const nameInput = (<input
        value={hero.name}
        onChange={e => {
            dispatch(setName(e.target.value))
        }}
    ></input>)
    const heroTypeSelector = (<select
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
    </select>)

    const buildSelector = (<select
        value={hero.build.name}
        onChange={e => {
            const buildForName = builds.find(b => b.name === e.target.value)
            if (buildForName !== undefined) {
                dispatch(setBuild(buildForName))
            }
        }}>
        {builds.map(b => (<option key={b.name} value={b.name}>
            {b.name}
        </option>))}
    </select>
    )
    return (
        <>
            <Mui.Button onClick={handleOpen}>Edit Character</Mui.Button>
            <Mui.Modal open={open} onClose={handleClose}>
                <Mui.Box sx={boxStyle}>
                    {nameInput}
                    {buildSelector}
                    {heroTypeSelector}
                    <ArchetypeSelectors />
                    <br />
                    <StyleSelectors />
                    <br />
                    <FormSelectors />
                </Mui.Box>
            </Mui.Modal>
        </>
    )
}