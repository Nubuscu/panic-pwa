import {
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Stack,
} from "@mui/material"
import { ArchetypeSelector, FormSelector, StyleSelector } from "./selectors"

export const BossConfig = () => {
  return (
    <>
      <FormGroup>
        <FormLabel>Archetype</FormLabel>
        <ArchetypeSelector includeUnselected index={0} />
      </FormGroup>
      <Stack spacing={1} direction={"row"}>
        {[0, 1, 2].map(i => (
          <FormGroup className="stanceFormGroup">
            <FormControl sx={{ m: 1 }}>
              <StyleSelector fromArchetypes={[]} index={i} />
              <FormHelperText>Style {i + 1}</FormHelperText>
            </FormControl>
            <FormControl sx={{ m: 1 }}>
              <FormSelector index={i} />
              <FormHelperText>Form {i + 1}</FormHelperText>
            </FormControl>
          </FormGroup>
        ))}
      </Stack>
    </>
  )
}
