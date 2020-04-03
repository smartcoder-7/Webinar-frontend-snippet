import React, { Fragment } from "react"
import { EngagementStatistic } from "./EngagementStatistic"
import Button from "@src/components/ui/Button"
import { Engagement } from "@src/fromBackend/schema"
import { navigate } from "@reach/router"

interface IEngagement {
  data: Engagement
}
const EngagementComponent = (props: IEngagement) => {
  const { data } = props
  return (
    <Fragment>
      <EngagementStatistic data={data} />
      <Button.analytics onClick={() => navigate('./registrants')}>
        View attendees
      </Button.analytics>
    </Fragment>
  )
}

export default EngagementComponent
