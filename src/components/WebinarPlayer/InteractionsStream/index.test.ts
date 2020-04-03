import { getLastInteractionIndex } from "./index"
import { InteractionFragment } from "@src/fromBackend/schema"

const INTERACTIONS: InteractionFragment[] = [
  // { room: "presentation", type: "handout", appearAt: 102 },
  // { room: "presentation", type: "handout", appearAt: 425 },
  // { room: "presentation", type: "handout", appearAt: 520 },
  // { room: "presentation", type: "handout", appearAt: 240 },
  // { room: "presentation", type: "handout", appearAt: 670 },
  // { room: "presentation", type: "handout", appearAt: 790 },
]

describe("getLastInteractionIndex", () => {
  it("returns correct index based on playbackPosition", () => {
    expect(getLastInteractionIndex(INTERACTIONS, 120)).toEqual(0)
    expect(getLastInteractionIndex(INTERACTIONS, 450)).toEqual(2)
  })
})
