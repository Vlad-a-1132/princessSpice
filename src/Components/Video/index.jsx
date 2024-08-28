'use client'

const Video = (props) => {
    return (
      <video width={props.height} height={props.width} autoPlay muted loop preload="auto">
        <source src={props.src} type="video/mp4" />
        {
            props?.captions &&
            <track
                src={props.captions}
                kind="subtitles"
                srcLang="ru"
                label="Russia"
            />
        }
        Your browser does not support the video tag.
      </video>
    )
  }

export default Video