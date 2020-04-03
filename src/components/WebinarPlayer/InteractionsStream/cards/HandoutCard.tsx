
import React from 'react'
import styled from "@emotion/styled"
import BaseCardBody from '@src/components/Card/Base/BaseCardBody'
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle'
import BaseCardBodyContent from '@src/components/Card/Base/BaseCardBodyContent'
import BaseCardButton from '@src/components/Card/Base/BaseCardButton'
import tw from 'tailwind.macro'
import { InteractionCardProps } from './index'

const FooterStyleComponent = styled.div`
    ${tw`text-center mt-2`}

`

const HandOutCard: React.FC<InteractionCardProps> = ({ interaction }) => {
    const { details } = interaction
    return (
        <BaseCardBody>
            <BaseCardBodyTitle
                content={details && details.title || ''}
            />
            <BaseCardBodyContent
                content={details && details.description || ''}
            />
            <FooterStyleComponent>
            <BaseCardButton value={details && details.buttonText || 'Submit'} />
            </FooterStyleComponent>
        </BaseCardBody>
    )
}

export default HandOutCard