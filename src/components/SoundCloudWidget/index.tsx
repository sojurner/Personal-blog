import React from "react"
import { useMediaQuery } from "react-responsive"

const SoundCloudWidget: React.FC<{ url: string }> = ({ url, ...props }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 950px)" })

  return (
    <iframe
      width={isMobile ? "100%" : "600"}
      height="390"
      scrolling="no"
      frameBorder="no"
      src={`https://w.soundcloud.com/player?url=${url}&sharing=false&buying=false&show_user=false&auto_play=true&hide_related=true&show_comments=true&show_user=true&show_reposts=false&show_teaser=false`}
    ></iframe>
  )
}

export default SoundCloudWidget
