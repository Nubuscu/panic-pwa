import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { setCharacterType, setName } from "../../features/hero/heroSlice"
import {
  Button,
  Card,
  CardContent,
  Divider,
  MenuItem,
  Modal,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { HeroConfig } from "./config/HeroConfig"
import { CharacterType } from "../types"
import { StoogeConfig } from "./config/StoogeConfig"
import { WarriorConfig } from "./config/WarriorConfig"
import { BossConfig } from "./config/BossConfig"

const boxStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  boxShadow: 24,
}

export const ConfigModal = () => {
  const hero = useAppSelector(state => state.hero.hero)
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const nameInput = (
    <input
      value={hero.name}
      onChange={e => {
        dispatch(setName(e.target.value))
      }}
    />
  )
  const characterTypeSelector = (
    <Select
      value={hero.characterType}
      onChange={e => {
        dispatch(
          setCharacterType(
            CharacterType[e.target.value as keyof typeof CharacterType],
          ),
        )
      }}
    >
      {Object.keys(CharacterType).map(t => (
        <MenuItem key={t} value={t}>
          {t}
        </MenuItem>
      ))}
    </Select>
  )
  return (
    <>
      <Button onClick={handleOpen}>Edit Character</Button>
      <Modal open={open} onClose={handleClose}>
        <Card sx={boxStyle}>
          <CardContent>
            <Table>
              <TableHead>
                <TableCell align="right">Character Type:</TableCell>
                <TableCell>{characterTypeSelector}</TableCell>
              </TableHead>
              <TableRow>
                <TableCell align="right">Name:</TableCell>
                <TableCell>{nameInput}</TableCell>
              </TableRow>
            </Table>
            <br />
            <Divider>{hero.characterType} Config</Divider>
            {hero.characterType === CharacterType.Hero && <HeroConfig />}
            {hero.characterType === CharacterType.Stooge && <StoogeConfig />}
            {hero.characterType === CharacterType.Warrior && <WarriorConfig />}
            {hero.characterType === CharacterType.Boss && <BossConfig />}
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}
