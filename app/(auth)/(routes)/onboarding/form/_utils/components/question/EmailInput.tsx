import { ChangeEventHandler } from "react"
import Image from "next/image"
import classNames from "classnames"

import {
  BtnContainer,
  Error,
  QuestionBoxPara,
  QuestionInputText,
  QuestionNumHeading,
} from "../index"
import { useQuestions, useSharedStates } from "./../../contexts"
import { SET_EMAIL } from "./../../reducers"
import styles from "./Question.module.css"

export function EmailInput() {
  const { errorMsg: error, setErrorMsg, handleOkClick } = useSharedStates()
  const { state, dispatch } = useQuestions()

  const errorMsg = error.email ?? ""
  const { email } = state

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    errorMsg &&
      setErrorMsg &&
      setErrorMsg((prevValue) => {
        delete prevValue.email
        return prevValue
      })

    dispatch({ type: SET_EMAIL, payload: event.target.value })
  }

  return (
    <>
      <QuestionNumHeading questionNum={6}>
        Email you&apos;d like to register with? *
      </QuestionNumHeading>

      <QuestionBoxPara>
        We will keep all our communications with you through this email. Do
        check your span inbox if you can&apos;t find our application received
        email.
      </QuestionBoxPara>

      <QuestionInputText
        type="email"
        placeholder="name@example.com"
        value={email}
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
