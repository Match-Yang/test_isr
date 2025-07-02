
<div class = 'mk-hint'>

Skip this session if you are direct publishing streams to the CDN.

</div>


After you publish a stream to ZEGO's real-time streaming cloud successfully, to forward a stream to ZEGO's CDN or third-party CDN, call the [`addPublishCdnUrl`](@addPublishCdnUrl) method to start forwarding the stream to the specified CDN URL. RTMP streams are supported.

<div class = 'mk-hint'>

If you need to forward a stream to multiple third-party CDNs:

- Call the [`addPublishCdnUrl`](@addPublishCdnUrl) method multiple times with the corresponding CDN URLs and the same stream ID. (Each URL needs to be different.) 

- Accordingly, you need to call the [`removePublishCdnUrl`](@removePublishCdnUrl) method multiple times to stop the stream forwarding for different CDN URLs.

- You can obtain the status update of the stream forwarding to each URL from the `infoList` parameter of the [`onPublisherRelayCDNStateUpdate`](@onPublisherRelayCDNStateUpdate) callback.
</div>








