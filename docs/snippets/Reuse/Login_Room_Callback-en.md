<div class="mk-warning">

- To receive the [`onRoomUserUpdate`](@onRoomUserUpdate) callback, you must set the `isUserStatusNotify` property of the room configuration parameter [`ZegoRoomConfig`](@-ZegoRoomConfig) to `true` when you call the [`loginRoom`](@loginRoom) method to log in to a room.
- To play streams published by other users in the room: you can listen for the [`onRoomStreamUpdate`](@onRoomStreamUpdate) callback, and when there is a stream added, call the [`startPlayingStream`](@startPlayingStream) method to start receiving and playing the newly added stream.
</div>





