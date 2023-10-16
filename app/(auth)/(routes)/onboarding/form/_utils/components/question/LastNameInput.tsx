import { ChangeEventHandler } from "react"
import Image from "next/image"
import classNames from "classnames"

import {
  BtnContainer,
  Error,
  QuestionInputText,
  QuestionNumHeading,
} from "../index"
import { useQuestions, useSharedStates } from "./../../contexts"
import { SET_LAST_NAME } from "./../../reducers"
import styles from "./Question.module.css"

export function LastNameInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates()
  const { state, dispatch } = useQuestions()

  const errorMsg = error.lastName ?? ""
  const { firstName, lastName } = state

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.lastName
        return prevValue
      })

    dispatch({ type: SET_LAST_NAME, payload: event.target.value })
  }

  return (
    <>
      <QuestionNumHeading questionNum={2}>
        and your last name, {firstName}? *
      </QuestionNumHeading>

      <QuestionInputText
        placeholder="Type your answer here..."
        value={lastName}
        onChange={handleInputChange}
      />

      {errorMsg && <Error message={errorMsg} />}

      {errorMsg === "" && (
        <BtnContainer
          className={classNames(styles["btn-container"], styles["ok"])}
          showPressEnter={true}
          onClick={handleOkClick}
        >
          OK{" "}
          <Image
            src="/assets/check-small.svg"
            alt="check small"
            width={34}
            height={34}
          />
        </BtnContainer>
      )}
    </>
  )
}
