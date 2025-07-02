# Event


## CallEvents


### IExpressEngineEventHandler

设置此 handler 以监听所有 Express SDK 事件，如房间更新、用户进入或离开、流更新等。

示例：
```java
ZegoUIKitPrebuiltCallService.events.callEvents.setExpressEngineEventHandler(new IExpressEngineEventHandler() {

});
```

### onBackPressed

当 Android 的返回按钮被按下时，此回调将被调用。如果返回 false，UIKit 将执行默认动作（结束通话或显示确认对话框）；如果返回 true，则表示您想要自定义逻辑。

<CodeGroup>
```java title="接口原型"
boolean onBackPressed();
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.setBackPressEvent(new BackPressEvent() {
    @Override
    public boolean onBackPressed() {
        return false;
    }
});
```
</CodeGroup>

### onOnlySelfInRoom

当所有其他用户都离开通话，仅剩当前用户留在通话时，当前用户将收到此回调。默认动作是结束当前通话。如果开发者重写此回调，则默认动作将不会执行，开发者可以添加自定义逻辑。
<CodeGroup>
```java title="接口原型"
void onOnlySelfInRoom();
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.setOnlySelfInRoomListener(new ZegoOnlySelfInRoomListener() {
    @Override
    public void onOnlySelfInRoom() {
        
    }
});
```
</CodeGroup>


### onCallEnd

当通话结束时，此监听器将被调用。ZegoCallEndReason 的值可以是LOCAL_HANGUP、REMOTE_HANGUP 或 KICK_OUT。如果 callEndReason 是 KICK_OUT，jsonObject 的值是踢出您的人。如果该值为空，意味着您被服务器踢出。如果您通过挂断或返回按钮退出，callEndReason 将是 LOCAL_HANGUP。如果对方结束通话，callEndReason将是 REMOTE_HANGUP。

<CodeGroup>
```java title="接口原型"
void onCallEnd(ZegoCallEndReason callEndReason, String jsonObject);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.setCallEndListener(new CallEndListener() {
    @Override
    public void onCallEnd(ZegoCallEndReason callEndReason, String jsonObject) {
        
    }
});
```
</CodeGroup>

### onAudioOutputDeviceChanged

音频设备路由变更通知。当有耳机插拔、扬声器和听筒切换等音频路由发生变化时会抛出此回调。

<CodeGroup>
```java title="接口原型"
void onAudioOutputDeviceChanged(ZegoAudioOutputDevice audioOutput);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.addAudioOutputDeviceChangedListener(new ZegoAudioOutputDeviceChangedListener() {
    @Override
    public void onAudioOutputDeviceChanged(ZegoAudioOutputDevice audioOutput) {
    }
});
```
</CodeGroup>




### onClick

监听菜单栏默认枚举类型的按钮的点击事件。当对应枚举类型的按钮被点击的时候会触发此回调。

<CodeGroup>
```java title="接口原型"
void onClick(ZegoMenuBarButtonName name, View view);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.setButtonClickListener(new ZegoMenuBarButtonClickListener() {
    @Override
    public void onClick(ZegoMenuBarButtonName name, View view) {
    }
});
```
</CodeGroup>

### onInRoomCommandReceived

当用户收到其他房间用户发送的信令消息时，将会触发此回调。

<CodeGroup>
```java title="接口原型"
void onInRoomCommandReceived(ZegoUIKitUser fromUser, String command);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.callEvents.addInRoomCommandListener(new ZegoInRoomCommandListener() {
    @Override
    public void onInRoomCommandReceived(ZegoUIKitUser fromUser, String command) {
        
    }
});
```
</CodeGroup>



## InvitationEvents



### onIncomingCallDeclineButtonPressed

当被叫用户在来电界面点击拒绝按钮时，将触发此回调。

<CodeGroup>
```java title="接口原型"
void onIncomingCallDeclineButtonPressed();
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setIncomingCallButtonListener(new IncomingCallButtonListener() {
    @Override
    public void onIncomingCallDeclineButtonPressed() {
        //...
    }
    //...
});
```
</CodeGroup>

### onIncomingCallAcceptButtonPressed

当被叫用户在来电界面点击接受按钮时，将触发此回调。

<CodeGroup>
```java title="接口原型"
void onIncomingCallAcceptButtonPressed();
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setIncomingCallButtonListener(new IncomingCallButtonListener() {
    @Override
    public void onIncomingCallAcceptButtonPressed() {
        //...  
    }
    //...
});
```
</CodeGroup>

### onOutgoingCallCancelButtonPressed

当主叫用户通过点击取消按钮来取消呼叫邀请时，将触发此回调。

<CodeGroup>
```java title="接口原型"
void onOutgoingCallCancelButtonPressed();
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setOutgoingCallButtonListener(new OutgoingCallButtonListener() {
    @Override
    public void onOutgoingCallCancelButtonPressed() {
        //...
    }
});
```
</CodeGroup>

### onIncomingCallReceived

当被叫用户接收到通话时，将触发此回调。

<CodeGroup>
```java title="接口原型"
void onIncomingCallReceived(String callID, ZegoCallUser caller, ZegoCallType callType, List<ZegoCallUser> callees);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onIncomingCallReceived(String callID, ZegoCallUser caller, ZegoCallType callType,
        List<ZegoCallUser> callees) {
        //...
    }
});
```
</CodeGroup>

### onIncomingCallCanceled

当主叫用户取消通话邀请时，将触发此回调给被叫用户。

<CodeGroup>
```java title="接口原型"
public void onIncomingCallCanceled(String callID, ZegoCallUser caller); 
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onIncomingCallCanceled(String callID, ZegoCallUser caller)  {
        //...
    }
});
```
</CodeGroup>

### onIncomingCallTimeout

当被叫用户在呼叫等待呼叫内内未响应呼叫邀请邀请时，将通过此回调通知被叫用户。

<CodeGroup>
```java title="接口原型"
public void onIncomingCallTimeout(String callID, ZegoCallUser caller);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onIncomingCallTimeout(String callID, ZegoCallUser caller)  {
        //...
    }
});
```
</CodeGroup>

### onOutgoingCallAccepted

当被叫用户接受通话邀请时，将通过此回调通知主叫用户。

<CodeGroup>
```java title="接口原型"
public void onOutgoingCallAccepted(String callID, ZegoCallUser callee);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onOutgoingCallAccepted(String callID, ZegoCallUser callee)  {
        //...
    }
});
```
</CodeGroup>

### onOutgoingCallRejectedCauseBusy

当被叫用户因忙碌而拒绝通话邀请时，将通过此回调通知主叫用户。

<CodeGroup>
```java title="接口原型"
public void onOutgoingCallRejectedCauseBusy(String callID, ZegoCallUser callee);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onOutgoingCallRejectedCauseBusy(String callID, ZegoCallUser callee) {
        //...
    }
});
```
</CodeGroup>

### onOutgoingCallDeclined

当被叫用户主动拒绝通话邀请时，将通过此回调通知主叫用户。

<CodeGroup>
```java title="接口原型"
public void onOutgoingCallDeclined(String callID, ZegoCallUser callee);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onOutgoingCallDeclined(String callID, ZegoCallUser callee) {
        //...
    }
});
```
</CodeGroup>


### onOutgoingCallTimeout

当通话邀请在超时持续时间内未得到响应，将通过此回调通知主叫用户。

<CodeGroup>
```java title="接口原型"
public void onOutgoingCallTimeout(String callID, List<ZegoCallUser> callees);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setInvitationListener(new ZegoInvitationCallListener() {
    @Override
    public void onOutgoingCallTimeout(String callID, List<ZegoCallUser> callees) {
        //...
    }
});
```
</CodeGroup>

### onSignalPluginConnectionStateChanged

signal插件连接状态的判断，signal插件默认会在初始化方法 `ZegoUIKitPrebuiltCallInvitationService.init()` 的调用中进行插件的登录。当插件断开连接的时候，将无法发出和接收呼叫邀请。

<CodeGroup>
```java title="接口原型"
void onSignalPluginConnectionStateChanged(ZIMConnectionState state, ZIMConnectionEvent event,JSONObject extendedData);;
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.invitationEvents.setPluginConnectListener(new SignalPluginConnectListener() {
    @Override
    public void onSignalPluginConnectionStateChanged(ZIMConnectionState state, ZIMConnectionEvent event,JSONObject extendedData) {

    }
});
```
</CodeGroup>

## onError

当 SDK 发生错误时，将调用此回调。例如，如果SDK初始化出错，将抛出INIT_PARAM_ERROR。

<CodeGroup>
```java title="接口原型"
void onError(int errorCode, String message);
```

```java title="调用示例"
ZegoUIKitPrebuiltCallService.events.setErrorEventsListener(new ErrorEventsListener() {
    @Override
    public void onError(int errorCode, String message) {
        //...
    }
});
```
</CodeGroup>