
To set the decryption key for played streams, you can call the [`setPlayStreamDecryptionKey`](@setPlayStreamDecryptionKey) method before or after the stream playing operation. 

<div class="mk-warning">

- This method is only available when playing streams from the ZEGOCLOUD Server or Low-Latency Level Streaming Server.
- ZEGOCLOUD supports updating the decryption key during the stream playing operation by calling the [`setPlayStreamDecryptionKey`](@setPlayStreamDecryptionKey) method. To update the encryption key, you need to update the decryption key first.
- The decryption key will be cleared if you call the [`stopPlayingStream`](@stopPlayingStream) method or the [`logoutRoom`](@logoutRoom) method.

</div>







