import React from "react"

import ButtonCard from "./button-card"

const PurchaseSection = ({
  courseId,
  searchUrl,
}: {
  courseId: string
  searchUrl: string
}) => {
  return (
    <section
      className="text-text-primary -mt-24 grid items-center gap-40 bg-black py-12 max-xl:px-4"
      id="purchase-details"
    >
      <center>
        <div className="mt-14">
          <ButtonCard
            arrowIcon={<></>}
            scrollTo={`/purchase/${courseId}?${searchUrl}`}
            text="Enroll Now!"
          />
        </div>
      </center>
    </section>
  )
}

export default PurchaseSection
