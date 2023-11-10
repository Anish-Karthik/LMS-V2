import React from "react"

const DisclaimerSection = () => {
  return (
    <section className="flex max-w-3xl flex-col items-center gap-40">
      <div>
        <center>
          <h1 className="mb-6 text-4xl font-bold">Disclaimer </h1>
        </center>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-xl font-medium text-muted-foreground">
            We do not provide investment advice or recommend specific securities
            or financial instruments to buy or sell, as we are not registered
            with SEBI. Our platform serves as a community space for individuals
            to learn about financial markets and make their own trading or
            investment decisions based on personal analysis. Stock market
            trading entails a significant risk of loss and necessitates careful
            consideration of your financial situation, risk tolerance, and
            investment objectives. We emphasize the risks associated with
            trading and technical analysis in our educational materials.
          </p>
        </div>
      </div>
    </section>
  )
}

export default DisclaimerSection
