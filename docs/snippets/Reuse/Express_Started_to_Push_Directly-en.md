<div class = 'mk-hint'>

Skip this session if you are forwarding streams to the CDN.
</div>

To direct publish streams to the CDN, call the [`enablePublishDirectToCDN`](@enablePublishDirectToCDN) method.

<div class = 'mk-warning'>

You can not forward the streams to the CDN by calling these two methods ([`addPublishCdnUrl`](@addPublishCdnUrl) and [`removePublishCdnUrl`](@removePublishCdnUrl)) after you enabled the direct publishing to CDN feature ([`enablePublishDirectToCDN`](@enablePublishDirectToCDN)).

- Because these two methods are working for the forwarding streams to the CDN feature.

</div> 







