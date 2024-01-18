import { LandingHero } from "@/components/shared/LandingHero"

const title = "About Us"
const description = `
  In 2019, we established a community in which college students
  joined forces to deepen their understanding and share insights
  on the stock market and various financial markets. Over time,
  our community burgeoned, attracting members and expanding our
  areas of expertise. Our members engage in trading stocks,
  options, futures, derivatives, forex, and cryptocurrencies. We
  are dedicated to assisting fellow traders in acquiring sound
  knowledge about financial markets and ensuring they approach
  trading in a prudent manner.
`
const image = "/landing/about.png"

const page = () => {
  return (
    <LandingHero
      title={title}
      description={description}
      image={image}
      className="bg-text-secondary text-background lg:py-20"
    />
  )
}

export default page
