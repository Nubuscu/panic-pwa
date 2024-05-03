import type { Archetype } from "../../types"
import { HeroType } from "../../types"
import Card from "@mui/material/Card"
import "./Archetype.css"
import { CardContent } from "@mui/material"

const descriptionForArch = (arch: Archetype, type: HeroType) => {
  switch (type) {
    case HeroType.Focused:
      return arch.focusedAbility.description
    case HeroType.Fused:
      return arch.fusedAbility.description
    case HeroType.Frantic:
      return arch.franticAbility.description
  }
}

export const ArchetypeDisplay = ({
  arch,
  type,
}: {
  arch: Archetype
  type: HeroType
}) => (
  <Card className="archetypeCard">
    <CardContent>
      <strong>{arch.name}</strong>: {descriptionForArch(arch, type)}
    </CardContent>
  </Card>
)
