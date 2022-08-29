declare const notifications: readonly ["success", "warning", "info"];
export declare type LoggerNotifications = typeof notifications[number];
export declare type LoggerNotificationMethod = (code: any) => void;
export declare type LoggerNotificationGetter = (type: LoggerNotifications) => LoggerNotificationMethod;
declare const _default: LoggerNotificationGetter;
export default _default;
//# sourceMappingURL=notification.d.ts.map