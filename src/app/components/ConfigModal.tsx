import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../hooks"

import { setName } from "../../features/hero/heroSlice"
import {
  Button,
  Card,
  CardContent,
  Divider,
  Modal,
  Table,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material"
import { HeroConfig } from "./config/HeroConfig"

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
  return (
    <>
      <Button onClick={handleOpen}>Edit Character</Button>
      <Modal open={open} onClose={handleClose}>
        <Card sx={boxStyle}>
          <CardContent>
            <Table>
              <TableHead>
                <TableCell align="right">Character Type:</TableCell>
                <TableCell>Character Type:</TableCell>
              </TableHead>
              <TableRow>
                <TableCell align="right">Name:</TableCell>
                <TableCell>{nameInput}</TableCell>
              </TableRow>
            </Table>
            <br />
            <Divider>{hero.characterType} Config</Divider>
            <HeroConfig />
          </CardContent>
        </Card>
      </Modal>
    </>
  )
}
