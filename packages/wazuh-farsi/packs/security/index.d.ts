import type { Locale, MessageDescriptor, MessageValues } from '../../types.js';

export type MessageKey = "authenticationNotSupported" | "authenticationRequired" | "cancel" | "chooseCustomTenant" | "confirm" | "enableGlobalTenant" | "enableMultiTenancy" | "enablePrivateTenant" | "failedToSwitchTenant" | "global" | "globalTenantAccess" | "globalTenantDescription" | "innovationFundDetail" | "innovationFundName" | "invalidCredentials" | "invalidCredentialsShort" | "invalidNextUrl" | "invalidRequestId" | "login" | "loginAriaLabel" | "logout" | "oidcCaptureTitle" | "oidcSuccessTitle" | "noTargetTenant" | "password" | "private" | "privateTenantAccess" | "privateTenantDescription" | "privateTenantReadOnly" | "productName" | "scienceSponsorDetail" | "scienceSponsorName" | "selectCustomTenant" | "selectTenant" | "sponsorAftaDetail" | "sponsorAftaName" | "sponsors" | "samlCaptureTitle" | "samlSuccessTitle" | "tenantDescription" | "username";
export declare const packId: "security";
export declare const messages: Readonly<Record<MessageKey, MessageDescriptor>>;
export declare const osdMessages: Readonly<Record<string, string>>;
export declare const formats: Readonly<Record<string, unknown>>;
export declare function translate(key: MessageKey, values?: MessageValues | Locale, locale?: Locale): string;
export declare function variants(key: MessageKey): string[];
