import React from "react"

import ButtonCard from "./button-card"

const PurchaseSection = () => {
  return (
    <section
      className="bg-background-color text-text-primary -mt-24 grid items-center gap-40 py-12 max-xl:px-4"
      id="purchase-section"
    >
      <center>
        <div className="mt-14">
          <ButtonCard
            arrowIcon={<></>}
            scrollTo="#main-details"
            text="Enroll Now!"
          />
        </div>
      </center>
    </section>
  )
}

export default PurchaseSection
