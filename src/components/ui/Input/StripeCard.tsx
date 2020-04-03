import React from "react"
import {
  CardElement
} from "@stripe/react-stripe-js"

//import Input from "./index"


// interface CardInputProps {
//   stripe?: ReactStripeElements.StripeProps
// }

// let CardInput = ({ stripe, ...props }: CardInputProps) => (
//   <CardElement {...props} />
// )

//const CardInputWithStripe = injectStripe(CardInput)



const StripeCard = ({ ...props }) => {
 // const stripe = useStripe();
 // const elements = useElements();
  // useEffect(() => {
  //   const stripeAPI = (window as any).Stripe
  //   stripeAPI && setStripe(stripeAPI(config.STRIPE_PK))
  // }, [])
  return (
      <div style={{
         maxHeight:'35px', 
         borderRadius:'0.25em', 
         borderWidth:'1px',
         borderColor:'#99ACAE', 
         paddingTop:'0.5rem', 
         paddingBottom:'0.5rem',
         paddingLeft:'0.75rem',
         paddingRight:'0.75rem'}}>
          <CardElement options={{hidePostalCode:true}} {...props}/>
      </div>
  )
}

export default StripeCard
