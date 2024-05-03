import type { Build } from "../../types"
import Card from "@mui/material/Card"
import "./Build.css"
import { CardContent } from "@mui/material"

export const BuildDisplay = ({ build }: { build: Build }) => (
  <Card className="buildCard">
    <CardContent>
      <strong>{build.name}</strong>: {build.description}
    </CardContent>
  </Card>
)
