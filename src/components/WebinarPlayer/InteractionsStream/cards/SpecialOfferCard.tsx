
import React from 'react'
import styled from "@emotion/styled"
import tw from 'tailwind.macro'
import BaseCardBody from '@src/components/Card/Base/BaseCardBody'
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle'
import BaseCardBodyContent from '@src/components/Card/Base/BaseCardBodyContent'
import BaseCardButton from '@src/components/Card/Base/BaseCardButton'
import { InteractionCardProps } from './index'
interface FooterProps {
    withTimer: boolean;
}

const FooterStyleComponent = styled.div<FooterProps>`
    ${tw`text-center mt-2 flex items-center`}
    justify-content: ${({ withTimer }) => withTimer ? 'space-between' : 'center'};
`
const CountDownTimerStyleComponent = styled.div`
    ${tw`h-5 text-red-1 font-body text-sm font-light text-center`}
`

const SpecialOfferCard: React.FC<InteractionCardProps> = ({ interaction }) => {
    const { details } = interaction
    return (
        <BaseCardBody>
            <BaseCardBodyTitle
                content={details && details.title || ''}
            />
            <BaseCardBodyContent
                content={details && details.description || ''}
            />
            <FooterStyleComponent withTimer={!!(details && details.resultsAppearAt)}>
                {details && details.resultsAppearAt && <CountDownTimerStyleComponent>
                    <p>Expires in 0:30:02</p>
                </CountDownTimerStyleComponent>}
                <BaseCardButton value={details && details.buttonText || 'Submit'} />           
            </FooterStyleComponent>
        </BaseCardBody>
    )
}

export default SpecialOfferCard