import React from "react"
import Button from "@components/Button"

import "./_scWidget.scss"

const SoundCloudWidget: React.FC<{ url: string }> = ({ url }) => {
  return (
    <div className={"sc-widget sc-widget--default"}>
    <iframe
      width="100%"
      height="100%"
      scrolling="no"
      frameBorder="no"
      src={`https://w.soundcloud.com/player?url=${url}&sharing=false&buying=false&show_user=false&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false`}
    ></iframe>
    </div>
  )
}

const SoundCloudWidgetPlayer: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  return (
    <div className={"sc-widget sc-widget--fixed-player"}>
      <iframe
        width="100%"
        height="70"
        scrolling="no"
        frameBorder="no"
        src={`https://w.soundcloud.com/player?url=https://soundcloud.com/paul-kim-590010884/sets/orchestra&sharing=false&buying=false&share=false&show_user=false&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&show_artwork=false`}
      ></iframe>
      <Button onClick={onClose} variant="negative">
        x
      </Button>
    </div>
  )
}

export { SoundCloudWidgetPlayer, SoundCloudWidget as default }
