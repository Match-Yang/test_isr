<div class="mk-warning">

**本组件相关接口，必须要在角色创建成功后才可以调用。** 不同类型的房间，对应角色创建成功的回调不同：

- 如果您进入的是 [ZMWBaseRoom](@-ZMWBaseRoom) 类型的房间，对应色创建成功回调为 [ZMWEnterCallback](@-ZMWEnterCallback)。
- 如果您进入的是 [ZMWStateSyncedRoom](@-ZMWStateSyncedRoom) 类型的房间，对应色创建成功回调为 [ZMWCharacterCreatedCallback](@-ZMWCharacterCreatedCallback)。
</div>
