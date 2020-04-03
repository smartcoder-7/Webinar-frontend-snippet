import gql from 'graphql-tag';
import { EWEBINAR_FRAGMENT } from '@src/hooks/useEWebinar';

export const SET_FRAGMENT = gql`
  fragment EWebinarSet on EWebinarSet {
    id
    publicWebinar {
      ...EWebinar
    }
    draftWebinar{
      ...EWebinar
    }
  }
  ${EWEBINAR_FRAGMENT}
`;

export const PUBLIC_SET = gql`
  query publicSet($id: String!) {
    publicSet(id: $id) {
      ...EWebinarSet
    }
  }
  ${SET_FRAGMENT}
`;
