
The stream publishing quality includes the audio and video capture frame rate, bitrate, RTT, packet loss rate, and others of capturing and encoding stages of the stream publishing process.

The [`ZegoPublishStreamQuality`](@-ZegoPublishStreamQuality) object includes quality attributes of different stages of the stream publishing process. You can find the detailed attribute definitions in this section:

#### Quality attributes of audio and video capturing


The following attributes reflect the stream publishing quality of audio and video capturing, which is close to the user's subjective perception of the local preview. 

- [`audioCaptureFPS`](@audioCaptureFPS-ZegoPublishStreamQuality): The audio capture frame rate (fps).
- [`videoCaptureFPS`](@videoCaptureFPS-ZegoPublishStreamQuality): The video capture frame rate (fps).

#### Quality attributes of video encoding 

The stream publishing quality attributes of video encoding of the encoding stage is as follow:

- [`videoEncodeFPS`](@videoEncodeFPS-ZegoPublishStreamQuality): The target output frame rate (fps) of video encoding.

#### Quality attributes of stream transmission

The stream publishing quality attributes below reflect the quality of stream transmission (sending), which is related to the encoding bitrate and the current network quality. 


- [`audioSendFPS`](@audioSendFPS-ZegoPublishStreamQuality): The actual audio transmission frame rate (fps). 
- [`audioKBPS`](@audioKBPS-ZegoPublishStreamQuality): The actual audio transmission bitrate (kbps).
- [`videoSendFPS`](@videoSendFPS-ZegoPublishStreamQuality): The actual video transmission frame rate (fps).
- [`videoKBPS`](@videoKBPS-ZegoPublishStreamQuality): The actual video transmission bitrate (kbps).
- [`rtt`](@rtt-ZegoPublishStreamQuality): The rount-trip time (ms) from the client device to the ZEGO server.
- [`packetLostRate`](@packetLostRate-ZegoPublishStreamQuality): The client-side upstreaming packet loss rate.

#### Quality attributes of the total number of bytes

The stream publishing quality attributes below reflect the total number of bytes sent.

- [`totalSendBytes`](@totalSendBytes-ZegoPublishStreamQuality): The total number of bytes sent, including audio, video, SEI.
- [`audioSendBytes`](@audioSendBytes-ZegoPublishStreamQuality): The number of audio bytes sent.
- [`videoSendBytes`](@videoSendBytes-ZegoPublishStreamQuality): The number of video bytes sent.

#### Quality attributes of encoding information

The stream publishing quality attributes below reflect the encoding information:

- [`videoCodecID`](@videoCodecID-ZegoPublishStreamQuality): The video codec.
- [`isHardwareEncoder`](@isHardwareEncoder-ZegoPublishStreamQuality): Whether to enable hardware encoding.

#### Quality attributes of published stream quality level

The parameter `quality` has many attributes. If you do not want to handle every one of them, you can just focus on the [`level`](@level-ZegoPublishStreamQuality) attribute, a comprehensive upstreaming network qualityindicator calculated by the `ZegoExpressEngine` based on other quality attributes. 





