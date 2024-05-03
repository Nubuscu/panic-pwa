import { Card, Grid, Stack, Tab, Tabs } from "@mui/material"
import { useAppSelector } from "../hooks"
import type { Archetype, Form, Hero, Style } from "../types"
import { HeroType } from "../types"
import type { ReactNode, SyntheticEvent } from "react"
import { useState } from "react"
import { ActionDisplay } from "./character/Action"
import { defaultArchetype } from "../textContent"
import { StyleDisplay } from "./character/Style"
import { FormDisplay } from "./character/Form"
import { ArchetypeDisplay } from "./character/Archetype"
import { BuildDisplay } from "./character/Build"

interface TabPanelProps {
  children?: ReactNode
  index: number
  selectedTab: number
}

const TabPanel = ({ children, index, selectedTab }: TabPanelProps) => {
  return (
    <div role="tabpanel" hidden={selectedTab !== index}>
      {children}
    </div>
  )
}

const StancesTabs = ({ hero }: { hero: Hero }) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue)
  }
  const stances = [
    {
      style: hero.style1,
      form: hero.form1,
      name: `${hero.style1.name} ${hero.form1.name}`,
    },
    {
      style: hero.style2,
      form: hero.form2,
      name: `${hero.style2.name} ${hero.form2.name}`,
    },
    {
      style: hero.style3,
      form: hero.form3,
      name: `${hero.style3.name} ${hero.form3.name}`,
    },
  ]
  return (
    <Stack spacing={1}>
      <Tabs value={selectedTab} onChange={handleChangeTab}>
        {stances.map(s => (
          <Tab label={s.name} />
        ))}
      </Tabs>
      {stances.map((s, i) => (
        <TabPanel index={i} selectedTab={selectedTab}>
          <Stack rowGap={1}>
            <Grid container columnSpacing={1}>
              <StyleDisplay style={s.style} width={6} />
              <FormDisplay form={s.form} width={6} />
            </Grid>
            {[...s.form.actions, ...s.style.actions].map(action => (
              <ActionDisplay action={action} />
            ))}
          </Stack>
        </TabPanel>
      ))}
    </Stack>
  )
}

const FranticTabs = ({ hero }: { hero: Hero }) => {
  const [selectedFormTab, setSelectedFormTab] = useState(0)
  const handleChangeFormTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedFormTab(newValue)
  }
  const [selectedStyleTab, setSelectedStyleTab] = useState(0)
  const handleChangeStyleTab = (event: SyntheticEvent, newValue: number) => {
    setSelectedStyleTab(newValue)
  }

  const activeForms = [hero.form1, hero.form2, hero.form3]
  const activeStyles = [hero.style1, hero.style2, hero.style3]

  return (
    <Card>
      {/* styles */}
      <Tabs value={selectedStyleTab} onChange={handleChangeStyleTab}>
        {activeStyles.map(style => (
          <Tab label={style.name} />
        ))}
      </Tabs>
      {activeStyles.map((style, i) => (
        <TabPanel index={i} selectedTab={selectedStyleTab}>
          <StyleDisplay style={style} width={12} />
          <Stack spacing={1}>
            {style.actions.map(action => (
              <ActionDisplay action={action} />
            ))}
          </Stack>
        </TabPanel>
      ))}
      {/* forms */}
      <Tabs value={selectedFormTab} onChange={handleChangeFormTab}>
        {activeForms.map(form => (
          <Tab label={form.name} />
        ))}
      </Tabs>
      {activeForms.map((form, i) => (
        <TabPanel index={i} selectedTab={selectedFormTab}>
          <FormDisplay form={form} width={12} />
          <Stack spacing={1}>
            {form.actions.map(action => (
              <ActionDisplay action={action} />
            ))}
          </Stack>
        </TabPanel>
      ))}
    </Card>
  )
}
export const CurrentHero = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const activeArchetypes = [
    hero.archetype1,
    hero.archetype2,
    hero.archetype3,
  ].filter(arch => arch !== defaultArchetype)

  return (
    <Grid item xs={6}>
      <h2>Stances/Unique Actions</h2>
      <Stack spacing={1}>
        <BuildDisplay build={hero.build} />
        {activeArchetypes.map(arch => (
          <ArchetypeDisplay arch={arch} type={hero.type} />
        ))}
        {hero.type === HeroType.Frantic ? (
          <FranticTabs hero={hero} />
        ) : (
          <StancesTabs hero={hero} />
        )}
      </Stack>
    </Grid>
  )
}
