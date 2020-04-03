import gql from 'graphql-tag';
import { PRESENTER_FRAGMENT } from './useEWebinar'

export const GET_ALL_PRESENTERS = gql`
  query presenters {
    presenters {
      ...Presenter
    }
  }
  ${PRESENTER_FRAGMENT}
`;

export const ADD_PRESENTER = gql`
  mutation addPresenter($data: EditPresenterInput!) {
    addPresenter(data: $data) {
      ...Presenter
    }
  }
  ${PRESENTER_FRAGMENT}
`;

export const UPDATE_PRESENTER = gql`
  mutation updatePresenter($data: EditPresenterInput!) {
    updatePresenter(data: $data) {
      ...Presenter
    }
  }
  ${PRESENTER_FRAGMENT}
`;

export const REMOVE_PRESENTER = gql`
  mutation removePresenter($id: String!) {
    removePresenter(id: $id)
  }
`;
