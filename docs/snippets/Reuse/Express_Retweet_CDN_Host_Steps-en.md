1. After the engine is created, call the [`enableHardwareEncoder`](@enableHardwareEncoder) method to enable the hardware encoding first (if modified after the stream publishing, it takes effect when the next stream is published), CPU usage can be improved after this is enabled.
2. Call the [`isVideoEncoderSupported`](@isVideoEncoderSupported) to test whether the specified video encoding format is supported on the host side.



