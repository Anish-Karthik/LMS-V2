import { Head, Html, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=ABeeZee:ital@0;1&family=Orbitron&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
