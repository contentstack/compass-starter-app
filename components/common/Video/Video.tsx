import { VideoComponent } from '@/types/components'

const Video: React.FC<VideoComponent> = (props: VideoComponent) => {
    const { video, video_alt_text, className, addDataCslp=true } = props

    return <>
        {video?.url && (
            <video
                src={video?.url}
                title= {video_alt_text || 'Alt Text for Video in Teaser'}
                {...(addDataCslp && video?.$?.url)}
                className={className}
                data-id='video-component'
                muted autoPlay loop
            />
        )}
    </>
}

export { Video }