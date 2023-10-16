"use client"

import "@/styles/globals.css"
import Head from "next/head"
import Image from "next/image"
import classNames from "classnames"

import styles from "@/styles/Home.module.css"

import { MainContent, ProgressBar } from "./_utils/components"
import {
  QuestionsProvider,
  SharedStatesProvider,
  useQuestions,
} from "./_utils/contexts"
import { questrialFont } from "./_utils/utils"

export default function Home() {
  const { percent } = useQuestions()

  return (
    <div className="html !text-sm">
      <Head>
        <title>Alfaq</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="user onBoarding form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <ProgressBar width={percent} />
        <Image
          src="/images/logo.png"
          alt="GrowthX logo"
          width={96}
          height={24}
          className={"hidden"}
        />
      </header>
      <main className={classNames(styles.main, questrialFont.className)}>
        <QuestionsProvider>
          <SharedStatesProvider>
            <MainContent />
          </SharedStatesProvider>
        </QuestionsProvider>
      </main>
    </div>
  )
}
