1. Receive notifications that new stream published through the callback [`onRoomStreamUpdate`](@onRoomStreamUpdate) after the host published the stream.
2. Get the encoding format of the stream from the App Server side. 
- If the stream is in H.264 format, call the [`startPlayingStream`](@startPlayingStream) to play the stream directly from the CDN. 
- If the stream is in H.265 format, call the [`isVideoDecoderSupported`](@isVideoDecoderSupported) method to test the H.265 decoding ability of the device first. 
    - If supported, call the [`startPlayingStream`](@startPlayingStream) method to play the H.265 stream from the CDN.
    - If it is not supported, call the [`startPlayingStream`](@startPlayingStream) method to play the H.264 stream from the CDN.





