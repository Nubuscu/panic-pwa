import {
  Divider,
  FormControl,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
} from "@mui/material"
import { ArchetypeSelector, FormSelector, StyleSelector } from "./selectors"

export const BossConfig = () => {
  return (
    <>
      <FormGroup>
        <FormLabel>Archetype</FormLabel>
        <ArchetypeSelector includeUnselected index={0} />
      </FormGroup>
      <Divider>Stances</Divider>
      <Grid container spacing={1} direction={{ xs: "column", sm: "row" }}>
        {[0, 1, 2].map(i => (
          <Grid item md={4} sm={12}>
            <FormGroup className="stanceFormGroup">
              <FormControl>
                <StyleSelector fromArchetypes={[]} index={i} />
                <FormHelperText>Style {i + 1}</FormHelperText>
              </FormControl>
              <FormControl>
                <FormSelector index={i} />
                <FormHelperText>Form {i + 1}</FormHelperText>
              </FormControl>
            </FormGroup>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
