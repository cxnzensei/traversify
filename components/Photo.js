/* eslint-disable @next/next/no-img-element */
import Icon from "@mdi/react"
import { mdiAlphabetAurebesh } from "@mdi/js"

const Photo = () => {
  return (
    <div className="relative">
      <img className="lg:h-screen h-[211.11px] w-full object-cover" src="/assets/image.jpg" alt="background" />
      <div className="absolute bg-black py-5 h-full lg:h-36 flex items-center justify-center w-full lg:bg-opacity-70 bg-opacity-40 lg:top-[40%] top-0">
          <Icon path={mdiAlphabetAurebesh} size={4} color="white" rotate={90} />
      </div>
    </div>
  )
}

export default Photo
