import React from "react"
import {loadStripe} from "@stripe/stripe-js"
import {
  CardElement,
  Elements,
} from "@stripe/react-stripe-js"

//import Input from "./index"
import config from '../../../config'


// interface CardInputProps {
//   stripe?: ReactStripeElements.StripeProps
// }

// let CardInput = ({ stripe, ...props }: CardInputProps) => (
//   <CardElement {...props} />
// )

//const CardInputWithStripe = injectStripe(CardInput)

const CardInputWithStripe = () => {
 // const stripe = useStripe();
  //const elements = useElements();

  return (
    <CardElement />
  )
}


const ELEMENTS_OPTIONS = {
  fonts: [
    {
      family: "CircularStd Book",
      src: require("@src/components/Layout/fonts/CircularStd/CircularStd-Book.woff")
    }
  ]

};

const stripePromise = loadStripe(config.STRIPE_PK)

const Stripe = ({ ...props }) => {
 // const stripe = useStripe();
 // const elements = useElements();
  // useEffect(() => {
  //   const stripeAPI = (window as any).Stripe
  //   stripeAPI && setStripe(stripeAPI(config.STRIPE_PK))
  // }, [])
  return (
      <Elements stripe={stripePromise}
        options = {ELEMENTS_OPTIONS}
      >
        <CardInputWithStripe {...props}/>
      </Elements>
  )
}

export default Stripe
