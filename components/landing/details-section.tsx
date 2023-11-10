import Image from "next/image"

import ButtonCard from "./button-card"
import VideoPlayerLanding from "./video-player-landing"

const DetailsSection = () => {
  return (
    <section className="flex flex-col items-center gap-40">
      <div>
        <center>
          <h1 className="relative mb-16 text-4xl font-bold ">
            <Image
              className="absolute left-[-20px] z-[-1] translate-x-4 translate-y-[-25px]  scale-75 sm:scale-100"
              src="/landing/brain.svg"
              alt="landing-image-1"
              width={80}
              height={80}
            />
            <span>Learn Investing</span>
            <Image
              className="absolute right-[-20px] z-[-1] translate-x-2 translate-y-[-40px] scale-75 max-md:translate-y-[-80px] sm:scale-100"
              src="/landing/brain.svg"
              alt="landing-image-1"
              width={80}
              height={80}
            />
          </h1>
        </center>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-muted-foreground">
            Learn swing trading from scratch to benefit from the trending
            markets for a better return than the banks offer you.{" "}
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
        </div>
      </div>
      <div>
        <center>
          <h1 className="mb-6 text-4xl font-bold">Make a Monthly Income </h1>
        </center>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <div className="mt-16 h-[500px] rounded-xl bg-clip-text">
            <VideoPlayerLanding url="https://youtu.be/SO8lBVWF2Y8?si=aafhnkzdHhVy6_7f" />
          </div>
        </div>
      </div>
      <div id="course-details">
        <center>
          <h1 className="mb-6 text-4xl font-bold">
            Deep dive & understand how it works
          </h1>
        </center>
        <div className="flex flex-col gap-4">
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <p className="text-xl font-medium text-muted-foreground">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quibusdam.
          </p>
          <div className="mt-16 h-[500px] rounded-xl bg-clip-text">
            <VideoPlayerLanding url="https://youtu.be/SO8lBVWF2Y8?si=aafhnkzdHhVy6_7f" />
          </div>
        </div>
      </div>
      <div className="max-md:w-full">
        <center>
          <h1 className="mb-6 text-4xl font-bold">Discord Server</h1>
        </center>
        <center>
          <h1 className="mb-6 text-xl font-bold">
            Individual section for different segments
          </h1>
        </center>
        <div className="flex flex-col gap-4">
          <div className="flex justify-evenly gap-4 max-md:flex-col">
            <div className="flex w-full flex-col items-center gap-3">
              <Image
                className="rounded-md max-md:w-[300px] max-md:max-w-[400px] max-xs:w-[200px]"
                src="/images/forex.jpeg"
                alt="discord"
                width={180}
                height={80}
              />
              <div className="text-3xl text-muted-foreground">Forex</div>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <Image
                className="rounded-md max-md:w-[300px] max-md:max-w-[400px] max-xs:w-[200px]"
                src="/images/equity.webp"
                alt="discord"
                width={180}
                height={80}
              />
              <div className="text-3xl text-muted-foreground">Equity</div>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <Image
                className="rounded-md max-md:w-[300px] max-md:max-w-[400px] max-xs:w-[200px]"
                src="/images/options.webp"
                alt="discord"
                width={180}
                height={80}
              />
              <div className="text-3xl text-muted-foreground">Options</div>
            </div>
            <div className="flex w-full flex-col items-center gap-3">
              <Image
                className="rounded-md max-md:w-[300px] max-md:max-w-[400px] max-xs:w-[200px]"
                src="/images/crypto.webp"
                alt="discord"
                width={180}
                height={80}
              />
              <div className="text-3xl text-muted-foreground">Crypto</div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-10">
        <ButtonCard
          scrollTo="#course-purchase"
          text="Scroll to purchase details"
        />
      </div>
    </section>
  )
}

export default DetailsSection
