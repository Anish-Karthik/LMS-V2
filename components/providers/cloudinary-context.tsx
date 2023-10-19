import { Cloudinary } from "@cloudinary/url-gen"

export const CloudinaryContext = ({ children }: { children: any }) => {
  const cld = new Cloudinary({
    cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
  })
  return <>{children}</>
}
