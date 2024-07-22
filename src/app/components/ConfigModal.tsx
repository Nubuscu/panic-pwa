import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { setCharacterType, setName } from "../../features/hero/heroSlice"
import {
  Button,
  Card,
  CardContent,
  Dialog,
  Divider,
  MenuItem,
  Select,
  Table,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
} from "@mui/material"
import { HeroConfig } from "./config/hero/HeroConfig"
import { CharacterType } from "../types"
import { StoogeConfig } from "./config/StoogeConfig"
import { WarriorConfig } from "./config/WarriorConfig"
import { BossConfig } from "./config/BossConfig"
import { useTheme } from "@mui/material/styles"
import CloseIcon from "@mui/icons-material/Close"

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
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))
  return (
    <>
      <Button onClick={handleOpen}>Edit Character</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="md"
      >
        {fullScreen && (
          <Button onClick={handleClose} startIcon={<CloseIcon />}>
            Close
          </Button>
        )}
        <Card sx={{ overflowY: "scroll" }}>
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
      </Dialog>
    </>
  )
}
