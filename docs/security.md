# Proposal: Security of Analytics Environment and Safe Inputs

## Authentication: Analytics Environment

All users of the Google Cloud Platform (GCP) tenant will be required to set up Multi-Factor Authentication (MFA) with the following methods:

1. [Default] Security Key (with [Yubikey](https://www.yubico.com/))
2. [Backup] Authentication App (e.g. [Google Authenticator](https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en_CA&gl=US), [Microsoft Authenticator](https://www.microsoft.com/en-ca/security/mobile-authenticator-app))

Security keys provide a phishing resistant form of MFA (see this [Inside the mind of an ethical hacker](https://www.youtube.com/watch?v=UwPK_ietuxg) video to see why legacy MFA methods are susceptible to phishing attacks).

