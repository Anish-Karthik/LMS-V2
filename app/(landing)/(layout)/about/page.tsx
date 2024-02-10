import ContactUs from "@/components/landing/contact-us"
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
    <section className="h-full w-full bg-black">
      <div
        className="fixed bottom-[-130%] left-[10%] mx-auto h-[80rem] w-[80rem] rounded-full bg-gradient-to-br"
        style={{
          background:
            "radial-gradient(closest-side, #fff 40%, hsl(263 76.2 53.9))",
          filter: "blur(80px)",
        }}
      ></div>
      <LandingHero
        title={title}
        description={description}
        image={image}
        className="relative z-40 pt-40 lg:py-20"
      />
      <ContactUs className="z-40 lg:fixed lg:inset-x-0 lg:-bottom-1" />
    </section>
  )
}

export default page
