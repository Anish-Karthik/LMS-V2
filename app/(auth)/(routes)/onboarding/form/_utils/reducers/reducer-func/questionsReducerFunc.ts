import {
  QuestionsActionsType,
  QuestionsStateType,
  REMOVE_GOAL,
  SET_EMAIL,
  SET_FIRST_NAME,
  SET_GOALS,
  SET_INDUSTRY,
  SET_LAST_NAME,
  SET_ROLE,
} from "../index"

export function questionsReducerFunc(
  state: QuestionsStateType,
  action: QuestionsActionsType
) {
  switch (action.type) {
    case SET_FIRST_NAME:
      return { ...state, firstName: action.payload }

    case SET_LAST_NAME:
      return { ...state, lastName: action.payload }

    case SET_INDUSTRY:
      return { ...state, industry: action.payload }

    case SET_ROLE:
      return { ...state, role: action.payload }

    case SET_GOALS:
      return { ...state, goals: [...state.goals, action.payload] }

    case REMOVE_GOAL:
      return {
        ...state,
        goals: state.goals.filter((goal) => goal !== action.payload),
      }

    case SET_EMAIL:
      return { ...state, email: action.payload }

    default:
      return state
  }
}
