
import React from 'react'
import BaseCardBody from '@src/components/Card/Base/BaseCardBody'
import BaseCardBodyContent from '@src/components/Card/Base/BaseCardBodyContent'
import ApolloForm from "@src/components/ApolloForm"
import { InteractionCardProps } from './index'

const WelcomeCard: React.FC<InteractionCardProps> = ({ interaction }) => {
    const { details } = interaction
    return (
        <ApolloForm>
            <BaseCardBody>
                <BaseCardBodyContent 
                    content={details && details.description || ''}
                />
            </BaseCardBody>
        </ApolloForm>
    )
}

export default WelcomeCard