import { ReactNode } from "react"
import classNames from "classnames"

import styles from "./QuestionBoxHeading.module.css"

type QuestionBoxHeadingProps = {
  readonly children: ReactNode
  readonly className?: string
}

export function QuestionBoxHeading({
  children,
  className,
}: QuestionBoxHeadingProps) {
  return (
    <h1 className={classNames(styles["question-box__heading"], className)}>
      {children}
    </h1>
  )
}
