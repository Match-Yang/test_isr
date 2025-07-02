# ZPNs

- - -

本文介绍 ZPNs Flutter 框架 SDK 版本升级时的一些说明和注意事项。

## 2.6.0 升级指南

ZPNs 2.6.0 分离了 CallKit，使其成为单独的插件。如果您的项目使用了旧版本 ZPNs，在升级后，需要额外集成 zego_callkit 插件，实现兼容。

1. 导入 zego_callkit 插件

    打开 “pubspec.yaml” 文件，以 “pub” 形式，添加 “zego_callkit” 依赖：

    ```yaml
    dependencies:
        # 请填写具体的 SDK 版本号
        # 请从 xxx 查询 SDK 最新版本，并将 x.y.z 修改为具体的版本号
        zego_callkit: ^x.y.z
    ```

2. 依赖新的头文件来兼容升级。

    ```dart
    import 'package:zego_callkit/zego_callkit.dart';
    ```


<a id="2_5_0"></a>

## 2.5.0 升级指南

### 数据类成员变量类型变更

[ZPNsMessage](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsMessage-class.html) 中的 extras 的类型由 Map 字段的 value 类型由 Map\<String, Object> 修改为 Map\<String, Object?> 类型，以兼容 Json 转 map 时，value 可能为 null 的情况。如果您使用的 ZPNs 为 2.5.0 以下版本，如需使用 [extras](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsMessage/extras.html)，请注意该字段 Map 的 value 类型已变更。

#### ZPNsMessage

<CodeGroup>
```dart 新类型
class ZPNsMessage {
    String title = "";
    String content = "";
    Map<String, Object?> extras = {}; // extras 的 value "Objcet?" 支持可空
    ZPNsPushSourceType pushSourceType;
    ZPNsMessage({required this.pushSourceType});
}
```

```dart 旧类型
class ZPNsMessage {
    String title = "";
    String content = "";
    Map<String, Object> extras = {}; // extras 的 value "Objcet" 不支持可空
    ZPNsPushSourceType pushSourceType;
    ZPNsMessage({required this.pushSourceType});
}
```
</CodeGroup>

## 2.2.0 升级指南

### 接口变更

#### enableDebug

[enableDebug](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/enableDebug.html) 接口不再用于 iOS 平台。 

#### setPushConfig

<CodeGroup>
```dart 新接口
static setPushConfig(ZPNsConfig config)
```

```dart 旧接口
static Future<void> setPushConfig(ZPNsConfig config)
```
</CodeGroup>

#### registerPush

在 iOS 端使用 [registerPush](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNs/registerPush.html) 时，[ZPNsIOSEnvironment](https://pub.dev/documentation/zego_zpns/latest/zego_zpns/ZPNsIOSEnvironment.html) 需要根据打包时选择的证书为 development 还是 description 而提前填写该枚举。

<CodeGroup>
```dart 新接口
Future<void> registerPush({ZPNsIOSEnvironment iOSEnvironment});
```

```dart 旧接口
static Future<void> registerPush();
```
</CodeGroup>
  
#### applyNotificationPermission

<CodeGroup>
```dart 新接口
Future<void> applyNotificationPermission();
```

```dart 旧接口
static Future<void> applyNotificationPermission();
```
</CodeGroup>

### 获取 payload 方式变更

- 新方法：

    ```dart
    ZPNsEventHandler.onNotificationClicked = (ZPNsMessage zpnsMessage) {
        if (zpnsMessage.pushSourceType == ZPNsPushSourceType.APNs) {
            Map aps = Map.from(zpnsMessage.extras['aps'] as Map);
            String payload = aps['payload'];
            log("My payload is $payload");
        } else if (zpnsMessage.pushSourceType == ZPNsPushSourceType.FCM) {
            // FCM 不支持此接口，请在 Android Activity 使用 Intent 获取 payload 字段。
        }
        log("user clicked the offline push notification,title is ${zpnsMessage.title},content is ${zpnsMessage.content}");
      };
    ```

- 老方法

    从 ZPNsMessage 中的 payload 获取

