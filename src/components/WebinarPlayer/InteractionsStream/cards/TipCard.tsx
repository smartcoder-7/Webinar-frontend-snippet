import React, { FunctionComponent } from 'react';
import BaseCardBody from '@src/components/Card/Base/BaseCardBody';
import BaseCardBodyTitle from '@src/components/Card/Base/BaseCardBodyTitle';
import BaseCardBodyContent from '@src/components/Card/Base/BaseCardBodyContent';
import ApolloForm from "@src/components/ApolloForm"
import { InteractionCardProps } from './index'

const TipCard: FunctionComponent<InteractionCardProps> = ({ interaction }) => {
    const { details } = interaction
    return (
        <ApolloForm
            onSubmit={(data) => console.log(data)}
        >
            <BaseCardBody>
                <BaseCardBodyTitle
                    content={details && details.title || ''}
                />
                <BaseCardBodyContent
                    content={details && details.description || ''}
                />
            </BaseCardBody>
        </ApolloForm>
    )
}

export default TipCard;
