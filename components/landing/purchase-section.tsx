import React from 'react'
import ButtonCard from './button-card'

const PurchaseSection = () => {
  return (
    <section className="-mt-24 grid items-center gap-40 bg-background-color py-12 text-text-primary max-xl:px-4" id="purchase-section">
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