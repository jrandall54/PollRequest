import{A as e,B as t,C as n,D as r,E as i,F as a,G as o,H as s,I as c,J as l,K as u,L as d,M as f,N as p,O as m,P as h,Q as g,R as _,S as v,T as y,U as ee,V as te,W as b,X as x,Y as S,Z as C,_ as w,a as T,b as ne,c as E,d as re,f as ie,g as ae,h as D,i as oe,j as se,k as ce,l as O,m as le,n as ue,o as de,p as k,q as fe,r as pe,s as me,u as he,v as A,w as ge,x as j,y as _e,z as M}from"./index.esm-ClPCguc7.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var N=new class{constructor(){this.routes=new Map,this.currentRoute=null,this.currentCleanup=null,this.beforeEachHook=null,window.addEventListener(`hashchange`,()=>this.handleRoute())}addRoute(e,t){return this.routes.set(e,t),this}beforeEach(e){return this.beforeEachHook=e,this}navigate(e){window.location.hash=e}getCurrentPath(){return window.location.hash.slice(1)||`/`}matchRoute(e,t){let n=e.split(`/`),r=t.split(`/`);if(n.length!==r.length)return null;let i={};for(let e=0;e<n.length;e++)if(n[e].startsWith(`:`))i[n[e].slice(1)]=r[e];else if(n[e]!==r[e])return null;return i}async handleRoute(){let e=this.getCurrentPath();if(!(this.beforeEachHook&&await this.beforeEachHook(e,this.currentRoute)===!1)){if(this.currentCleanup&&typeof this.currentCleanup==`function`&&(this.currentCleanup(),this.currentCleanup=null),this.routes.has(e)){this.currentRoute=e;let t=await this.routes.get(e)({});typeof t==`function`&&(this.currentCleanup=t);return}for(let[t,n]of this.routes){let r=this.matchRoute(t,e);if(r){this.currentRoute=e;let t=await n(r);typeof t==`function`&&(this.currentCleanup=t);return}}console.warn(`No route found for: ${e}`),this.navigate(`/`)}}start(){return this.handleRoute(),this}};y(`firebase`,`12.15.0`,`app`);function ve(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}var ye=ve,be=new e(`auth`,`Firebase`,ve()),xe=new r(`@firebase/auth`);function Se(e,...t){xe.logLevel<=i.WARN&&xe.warn(`Auth (${_e}): ${e}`,...t)}function Ce(e,...t){xe.logLevel<=i.ERROR&&xe.error(`Auth (${_e}): ${e}`,...t)}function P(e,...t){throw Ee(e,...t)}function F(e,...t){return Ee(e,...t)}function we(t,n,r){return new e(`auth`,`Firebase`,{...ye(),[n]:r}).create(n,{appName:t.name})}function Te(e){return we(e,`operation-not-supported-in-this-environment`,`Operations that alter the current user are not supported in conjunction with FirebaseServerApp`)}function Ee(e,...t){if(typeof e!=`string`){let n=t[0],r=[...t.slice(1)];return r[0]&&(r[0].appName=e.name),e._errorFactory.create(n,...r)}return be.create(e,...t)}function I(e,t,...n){if(!e)throw Ee(t,...n)}function L(e){let t=`INTERNAL ASSERTION FAILED: `+e;throw Ce(t),Error(t)}function De(e,t){e||L(t)}function Oe(){return typeof self<`u`&&self.location?.href||``}function ke(){return Ae()===`http:`||Ae()===`https:`}function Ae(){return typeof self<`u`&&self.location?.protocol||null}function je(){return typeof navigator<`u`&&navigator&&`onLine`in navigator&&typeof navigator.onLine==`boolean`&&(ke()||t()||`connection`in navigator)?navigator.onLine:!0}function Me(){if(typeof navigator>`u`)return null;let e=navigator;return e.languages&&e.languages[0]||e.language||null}var Ne=class{constructor(e,t){this.shortDelay=e,this.longDelay=t,De(t>e,`Short delay should be less than long delay!`),this.isMobile=o()||u()}get(){return je()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}};function Pe(e,t){De(e.emulator,`Emulator should always be set here`);let{url:n}=e.emulator;return t?`${n}${t.startsWith(`/`)?t.slice(1):t}`:n}var Fe=class{static initialize(e,t,n){this.fetchImpl=e,t&&(this.headersImpl=t),n&&(this.responseImpl=n)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<`u`&&`fetch`in self)return self.fetch;if(typeof globalThis<`u`&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<`u`)return fetch;L(`Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<`u`&&`Headers`in self)return self.Headers;if(typeof globalThis<`u`&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<`u`)return Headers;L(`Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<`u`&&`Response`in self)return self.Response;if(typeof globalThis<`u`&&globalThis.Response)return globalThis.Response;if(typeof Response<`u`)return Response;L(`Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill`)}},Ie={CREDENTIAL_MISMATCH:`custom-token-mismatch`,MISSING_CUSTOM_TOKEN:`internal-error`,INVALID_IDENTIFIER:`invalid-email`,MISSING_CONTINUE_URI:`internal-error`,INVALID_PASSWORD:`wrong-password`,MISSING_PASSWORD:`missing-password`,INVALID_LOGIN_CREDENTIALS:`invalid-credential`,EMAIL_EXISTS:`email-already-in-use`,PASSWORD_LOGIN_DISABLED:`operation-not-allowed`,INVALID_IDP_RESPONSE:`invalid-credential`,INVALID_PENDING_TOKEN:`invalid-credential`,FEDERATED_USER_ID_ALREADY_LINKED:`credential-already-in-use`,MISSING_REQ_TYPE:`internal-error`,EMAIL_NOT_FOUND:`user-not-found`,RESET_PASSWORD_EXCEED_LIMIT:`too-many-requests`,EXPIRED_OOB_CODE:`expired-action-code`,INVALID_OOB_CODE:`invalid-action-code`,MISSING_OOB_CODE:`internal-error`,CREDENTIAL_TOO_OLD_LOGIN_AGAIN:`requires-recent-login`,INVALID_ID_TOKEN:`invalid-user-token`,TOKEN_EXPIRED:`user-token-expired`,USER_NOT_FOUND:`user-token-expired`,TOO_MANY_ATTEMPTS_TRY_LATER:`too-many-requests`,PASSWORD_DOES_NOT_MEET_REQUIREMENTS:`password-does-not-meet-requirements`,INVALID_CODE:`invalid-verification-code`,INVALID_SESSION_INFO:`invalid-verification-id`,INVALID_TEMPORARY_PROOF:`invalid-credential`,MISSING_SESSION_INFO:`missing-verification-id`,SESSION_EXPIRED:`code-expired`,MISSING_ANDROID_PACKAGE_NAME:`missing-android-pkg-name`,UNAUTHORIZED_DOMAIN:`unauthorized-continue-uri`,INVALID_OAUTH_CLIENT_ID:`invalid-oauth-client-id`,ADMIN_ONLY_OPERATION:`admin-restricted-operation`,INVALID_MFA_PENDING_CREDENTIAL:`invalid-multi-factor-session`,MFA_ENROLLMENT_NOT_FOUND:`multi-factor-info-not-found`,MISSING_MFA_ENROLLMENT_ID:`missing-multi-factor-info`,MISSING_MFA_PENDING_CREDENTIAL:`missing-multi-factor-session`,SECOND_FACTOR_EXISTS:`second-factor-already-in-use`,SECOND_FACTOR_LIMIT_EXCEEDED:`maximum-second-factor-count-exceeded`,BLOCKING_FUNCTION_ERROR_RESPONSE:`internal-error`,RECAPTCHA_NOT_ENABLED:`recaptcha-not-enabled`,MISSING_RECAPTCHA_TOKEN:`missing-recaptcha-token`,INVALID_RECAPTCHA_TOKEN:`invalid-recaptcha-token`,INVALID_RECAPTCHA_ACTION:`invalid-recaptcha-action`,MISSING_CLIENT_TYPE:`missing-client-type`,MISSING_RECAPTCHA_VERSION:`missing-recaptcha-version`,INVALID_RECAPTCHA_VERSION:`invalid-recaptcha-version`,INVALID_REQ_TYPE:`invalid-req-type`},Le=[`/v1/accounts:signInWithCustomToken`,`/v1/accounts:signInWithEmailLink`,`/v1/accounts:signInWithIdp`,`/v1/accounts:signInWithPassword`,`/v1/accounts:signInWithPhoneNumber`,`/v1/token`],Re=new Ne(3e4,6e4);function R(e,t){return e.tenantId&&!t.tenantId?{...t,tenantId:e.tenantId}:t}async function z(e,t,n,r,i={}){return ze(e,i,async()=>{let i={},a={};r&&(t===`GET`?a=r:i={body:JSON.stringify(r)});let o=l({...a,key:e.config.apiKey}).slice(1),c=await e._getAdditionalHeaders();c[`Content-Type`]=`application/json`,e.languageCode&&(c[`X-Firebase-Locale`]=e.languageCode);let u={method:t,headers:c,...i};return s()||(u.referrerPolicy=`strict-origin-when-cross-origin`),e.emulatorConfig&&te(e.emulatorConfig.host)&&(u.credentials=`include`),Fe.fetch()(await Ve(e,e.config.apiHost,n,o),u)})}async function ze(e,t,n){e._canInitEmulator=!1;let r={...Ie,...t};try{let t=new Ue(e),i=await Promise.race([n(),t.promise]);t.clearNetworkTimeout();let a=await i.json();if(`needConfirmation`in a)throw We(e,`account-exists-with-different-credential`,a);if(i.ok&&!(`errorMessage`in a))return a;{let[t,n]=(i.ok?a.errorMessage:a.error.message).split(` : `);if(t===`FEDERATED_USER_ID_ALREADY_LINKED`)throw We(e,`credential-already-in-use`,a);if(t===`EMAIL_EXISTS`)throw We(e,`email-already-in-use`,a);if(t===`USER_DISABLED`)throw We(e,`user-disabled`,a);let o=r[t]||t.toLowerCase().replace(/[_\s]+/g,`-`);if(n)throw we(e,o,n);P(e,o)}}catch(t){if(t instanceof se)throw t;P(e,`network-request-failed`,{message:String(t)})}}async function Be(e,t,n,r,i={}){let a=await z(e,t,n,r,i);return`mfaPendingCredential`in a&&P(e,`multi-factor-auth-required`,{_serverResponse:a}),a}async function Ve(e,t,n,r){let i=`${t}${n}?${r}`,a=e,o=a.config.emulator?Pe(e.config,i):`${e.config.apiScheme}://${i}`;return Le.includes(n)&&(await a._persistenceManagerAvailable,a._getPersistenceType()===`COOKIE`)?a._getPersistence()._getFinalTarget(o).toString():o}function He(e){switch(e){case`ENFORCE`:return`ENFORCE`;case`AUDIT`:return`AUDIT`;case`OFF`:return`OFF`;default:return`ENFORCEMENT_STATE_UNSPECIFIED`}}var Ue=class{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((e,t)=>{this.timer=setTimeout(()=>t(F(this.auth,`network-request-failed`)),Re.get())})}};function We(e,t,n){let r={appName:e.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);let i=F(e,t,r);return i.customData._tokenResponse=n,i}function Ge(e){return e!==void 0&&e.enterprise!==void 0}var Ke=class{constructor(e){if(this.siteKey=``,this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw Error(`recaptchaKey undefined`);this.siteKey=e.recaptchaKey.split(`/`)[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(let t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return He(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)===`ENFORCE`||this.getProviderEnforcementState(e)===`AUDIT`}isAnyProviderEnabled(){return this.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)||this.isProviderEnabled(`PHONE_PROVIDER`)}};async function qe(e,t){return z(e,`GET`,`/v2/recaptchaConfig`,R(e,t))}async function Je(e,t){return z(e,`POST`,`/v1/accounts:delete`,t)}async function Ye(e,t){return z(e,`POST`,`/v1/accounts:lookup`,t)}function Xe(e){if(e)try{let t=new Date(Number(e));if(!isNaN(t.getTime()))return t.toUTCString()}catch{}}async function Ze(e,t=!1){let n=_(e),r=await n.getIdToken(t),i=$e(r);I(i&&i.exp&&i.auth_time&&i.iat,n.auth,`internal-error`);let a=typeof i.firebase==`object`?i.firebase:void 0,o=a?.sign_in_provider;return{claims:i,token:r,authTime:Xe(Qe(i.auth_time)),issuedAtTime:Xe(Qe(i.iat)),expirationTime:Xe(Qe(i.exp)),signInProvider:o||null,signInSecondFactor:a?.sign_in_second_factor||null}}function Qe(e){return Number(e)*1e3}function $e(e){let[t,n,r]=e.split(`.`);if(t===void 0||n===void 0||r===void 0)return Ce(`JWT malformed, contained fewer than 3 sections`),null;try{let e=f(n);return e?JSON.parse(e):(Ce(`Failed to decode base64 JWT payload`),null)}catch(e){return Ce(`Caught error parsing JWT payload as JSON`,e?.toString()),null}}function et(e){let t=$e(e);return I(t,`internal-error`),I(t.exp!==void 0,`internal-error`),I(t.iat!==void 0,`internal-error`),Number(t.exp)-Number(t.iat)}async function tt(e,t,n=!1){if(n)return t;try{return await t}catch(t){throw t instanceof se&&nt(t)&&e.auth.currentUser===e&&await e.auth.signOut(),t}}function nt({code:e}){return e===`auth/user-disabled`||e===`auth/user-token-expired`}var rt=class{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){let e=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),e}else{this.errorBackoff=3e4;let e=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,e)}}schedule(e=!1){if(!this.isRunning)return;let t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code===`auth/network-request-failed`&&this.schedule(!0);return}this.schedule()}},it=class{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Xe(this.lastLoginAt),this.creationTime=Xe(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}};async function at(e){let t=e.auth,n=await tt(e,Ye(t,{idToken:await e.getIdToken()}));I(n?.users.length,t,`internal-error`);let r=n.users[0];e._notifyReloadListener(r);let i=r.providerUserInfo?.length?ct(r.providerUserInfo):[],a=st(e.providerData,i),o=e.isAnonymous,s=!(e.email&&r.passwordHash)&&!a?.length,c=o?s:!1,l={uid:r.localId,displayName:r.displayName||null,photoURL:r.photoUrl||null,email:r.email||null,emailVerified:r.emailVerified||!1,phoneNumber:r.phoneNumber||null,tenantId:r.tenantId||null,providerData:a,metadata:new it(r.createdAt,r.lastLoginAt),isAnonymous:c};Object.assign(e,l)}async function ot(e){let t=_(e);await at(t),await t.auth._persistUserIfCurrent(t),t.auth._notifyListenersIfCurrent(t)}function st(e,t){return[...e.filter(e=>!t.some(t=>t.providerId===e.providerId)),...t]}function ct(e){return e.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||``,displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}async function lt(e,t){let n=await ze(e,{},async()=>{let n=l({grant_type:`refresh_token`,refresh_token:t}).slice(1),{tokenApiHost:r,apiKey:i}=e.config,a=await Ve(e,r,`/v1/token`,`key=${i}`),o=await e._getAdditionalHeaders();o[`Content-Type`]=`application/x-www-form-urlencoded`;let s={method:`POST`,headers:o,body:n};return e.emulatorConfig&&te(e.emulatorConfig.host)&&(s.credentials=`include`),Fe.fetch()(a,s)});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ut(e,t){return z(e,`POST`,`/v2/accounts:revokeToken`,R(e,t))}var dt=class e{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){I(e.idToken,`internal-error`),I(e.idToken!==void 0,`internal-error`),I(e.refreshToken!==void 0,`internal-error`);let t=`expiresIn`in e&&e.expiresIn!==void 0?Number(e.expiresIn):et(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){I(e.length!==0,`internal-error`);let t=et(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(I(this.refreshToken,e,`user-token-expired`),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){let{accessToken:n,refreshToken:r,expiresIn:i}=await lt(e,t);this.updateTokensAndExpiration(n,r,Number(i))}updateTokensAndExpiration(e,t,n){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+n*1e3}static fromJSON(t,n){let{refreshToken:r,accessToken:i,expirationTime:a}=n,o=new e;return r&&(I(typeof r==`string`,`internal-error`,{appName:t}),o.refreshToken=r),i&&(I(typeof i==`string`,`internal-error`,{appName:t}),o.accessToken=i),a&&(I(typeof a==`number`,`internal-error`,{appName:t}),o.expirationTime=a),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new e,this.toJSON())}_performRefresh(){return L(`not implemented`)}};function ft(e,t){I(typeof e==`string`||e===void 0,`internal-error`,{appName:t})}var pt=class e{constructor({uid:e,auth:t,stsTokenManager:n,...r}){this.providerId=`firebase`,this.proactiveRefresh=new rt(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=n,this.accessToken=n.accessToken,this.displayName=r.displayName||null,this.email=r.email||null,this.emailVerified=r.emailVerified||!1,this.phoneNumber=r.phoneNumber||null,this.photoURL=r.photoURL||null,this.isAnonymous=r.isAnonymous||!1,this.tenantId=r.tenantId||null,this.providerData=r.providerData?[...r.providerData]:[],this.metadata=new it(r.createdAt||void 0,r.lastLoginAt||void 0)}async getIdToken(e){let t=await tt(this,this.stsTokenManager.getToken(this.auth,e));return I(t,this.auth,`internal-error`),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Ze(this,e)}reload(){return ot(this)}_assign(e){this!==e&&(I(this.uid===e.uid,this.auth,`internal-error`),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(e=>({...e})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(t){let n=new e({...this,auth:t,stsTokenManager:this.stsTokenManager._clone()});return n.metadata._copy(this.metadata),n}_onReload(e){I(!this.reloadListener,this.auth,`internal-error`),this.reloadListener=e,this.reloadUserInfo&&=(this._notifyReloadListener(this.reloadUserInfo),null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let n=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),n=!0),t&&await at(this),await this.auth._persistUserIfCurrent(this),n&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(j(this.auth.app))return Promise.reject(Te(this.auth));let e=await this.getIdToken();return await tt(this,Je(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||``}static _fromJSON(t,n){let r=n.displayName??void 0,i=n.email??void 0,a=n.phoneNumber??void 0,o=n.photoURL??void 0,s=n.tenantId??void 0,c=n._redirectEventId??void 0,l=n.createdAt??void 0,u=n.lastLoginAt??void 0,{uid:d,emailVerified:f,isAnonymous:p,providerData:m,stsTokenManager:h}=n;I(d&&h,t,`internal-error`);let g=dt.fromJSON(this.name,h);I(typeof d==`string`,t,`internal-error`),ft(r,t.name),ft(i,t.name),I(typeof f==`boolean`,t,`internal-error`),I(typeof p==`boolean`,t,`internal-error`),ft(a,t.name),ft(o,t.name),ft(s,t.name),ft(c,t.name),ft(l,t.name),ft(u,t.name);let _=new e({uid:d,auth:t,email:i,emailVerified:f,displayName:r,isAnonymous:p,photoURL:o,phoneNumber:a,tenantId:s,stsTokenManager:g,createdAt:l,lastLoginAt:u});return m&&Array.isArray(m)&&(_.providerData=m.map(e=>({...e}))),c&&(_._redirectEventId=c),_}static async _fromIdTokenResponse(t,n,r=!1){let i=new dt;i.updateFromServerResponse(n);let a=new e({uid:n.localId,auth:t,stsTokenManager:i,isAnonymous:r});return await at(a),a}static async _fromGetAccountInfoResponse(t,n,r){let i=n.users[0];I(i.localId!==void 0,`internal-error`);let a=i.providerUserInfo===void 0?[]:ct(i.providerUserInfo),o=!(i.email&&i.passwordHash)&&!a?.length,s=new dt;s.updateFromIdToken(r);let c=new e({uid:i.localId,auth:t,stsTokenManager:s,isAnonymous:o}),l={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:a,metadata:new it(i.createdAt,i.lastLoginAt),isAnonymous:!(i.email&&i.passwordHash)&&!a?.length};return Object.assign(c,l),c}},mt=new Map;function ht(e){De(e instanceof Function,`Expected a class definition`);let t=mt.get(e);return t?(De(t instanceof e,`Instance stored in cache mismatched with class`),t):(t=new e,mt.set(e,t),t)}var gt=class{constructor(){this.type=`NONE`,this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){let t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}};gt.type=`NONE`;var _t=gt;function vt(e,t,n){return`firebase:${e}:${t}:${n}`}var yt=class e{constructor(e,t,n){this.persistence=e,this.auth=t,this.userKey=n;let{config:r,name:i}=this.auth;this.fullUserKey=vt(this.userKey,r.apiKey,i),this.fullPersistenceKey=vt(`persistence`,r.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){let e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e==`string`){let t=await Ye(this.auth,{idToken:e}).catch(()=>void 0);return t?pt._fromGetAccountInfoResponse(this.auth,t,e):null}return pt._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;let t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(t,n,r=`authUser`){if(!n.length)return new e(ht(_t),t,r);let i=(await Promise.all(n.map(async e=>{if(await e._isAvailable())return e}))).filter(e=>e),a=i[0]||ht(_t),o=vt(r,t.config.apiKey,t.name),s=null;for(let e of n)try{let n=await e._get(o);if(n){let r;if(typeof n==`string`){let e=await Ye(t,{idToken:n}).catch(()=>void 0);if(!e)break;r=await pt._fromGetAccountInfoResponse(t,e,n)}else r=pt._fromJSON(t,n);e!==a&&(s=r),a=e;break}}catch{}let c=i.filter(e=>e._shouldAllowMigration);return!a._shouldAllowMigration||!c.length?new e(a,t,r):(a=c[0],s&&await a._set(o,s.toJSON()),await Promise.all(n.map(async e=>{if(e!==a)try{await e._remove(o)}catch{}})),new e(a,t,r))}};function bt(e){let t=e.toLowerCase();if(t.includes(`opera/`)||t.includes(`opr/`)||t.includes(`opios/`))return`Opera`;if(wt(t))return`IEMobile`;if(t.includes(`msie`)||t.includes(`trident/`))return`IE`;if(t.includes(`edge/`))return`Edge`;if(xt(t))return`Firefox`;if(t.includes(`silk/`))return`Silk`;if(Et(t))return`Blackberry`;if(Dt(t))return`Webos`;if(St(t))return`Safari`;if((t.includes(`chrome/`)||Ct(t))&&!t.includes(`edge/`))return`Chrome`;if(Tt(t))return`Android`;{let t=e.match(/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/);if(t?.length===2)return t[1]}return`Other`}function xt(e=M()){return/firefox\//i.test(e)}function St(e=M()){let t=e.toLowerCase();return t.includes(`safari/`)&&!t.includes(`chrome/`)&&!t.includes(`crios/`)&&!t.includes(`android`)}function Ct(e=M()){return/crios\//i.test(e)}function wt(e=M()){return/iemobile/i.test(e)}function Tt(e=M()){return/android/i.test(e)}function Et(e=M()){return/blackberry/i.test(e)}function Dt(e=M()){return/webos/i.test(e)}function Ot(e=M()){return/iphone|ipad|ipod/i.test(e)||/macintosh/i.test(e)&&/mobile/i.test(e)}function kt(e=M()){return Ot(e)&&!!window.navigator?.standalone}function At(){return b()&&document.documentMode===10}function jt(e=M()){return Ot(e)||Tt(e)||Dt(e)||Et(e)||/windows phone/i.test(e)||wt(e)}function Mt(e,t=[]){let n;switch(e){case`Browser`:n=bt(M());break;case`Worker`:n=`${bt(M())}-${e}`;break;default:n=e}let r=t.length?t.join(`,`):`FirebaseCore-web`;return`${n}/JsCore/${_e}/${r}`}var Nt=class{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){let n=t=>new Promise((n,r)=>{try{n(e(t))}catch(e){r(e)}});n.onAbort=t,this.queue.push(n);let r=this.queue.length-1;return()=>{this.queue[r]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;let t=[];try{for(let n of this.queue)await n(e),n.onAbort&&t.push(n.onAbort)}catch(e){t.reverse();for(let e of t)try{e()}catch{}throw this.auth._errorFactory.create(`login-blocked`,{originalMessage:e?.message})}}};async function Pt(e,t={}){return z(e,`GET`,`/v2/passwordPolicy`,R(e,t))}var Ft=6,It=class{constructor(e){let t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??Ft,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState===`ENFORCEMENT_STATE_UNSPECIFIED`&&(this.enforcementState=`OFF`),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join(``)??``,this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){let t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&=t.meetsMinPasswordLength??!0,t.isValid&&=t.meetsMaxPasswordLength??!0,t.isValid&&=t.containsLowercaseLetter??!0,t.isValid&&=t.containsUppercaseLetter??!0,t.isValid&&=t.containsNumericCharacter??!0,t.isValid&&=t.containsNonAlphanumericCharacter??!0,t}validatePasswordLengthOptions(e,t){let n=this.customStrengthOptions.minPasswordLength,r=this.customStrengthOptions.maxPasswordLength;n&&(t.meetsMinPasswordLength=e.length>=n),r&&(t.meetsMaxPasswordLength=e.length<=r)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let n;for(let r=0;r<e.length;r++)n=e.charAt(r),this.updatePasswordCharacterOptionsStatuses(t,n>=`a`&&n<=`z`,n>=`A`&&n<=`Z`,n>=`0`&&n<=`9`,this.allowedNonAlphanumericCharacters.includes(n))}updatePasswordCharacterOptionsStatuses(e,t,n,r,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||=t),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||=n),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||=r),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||=i)}},Lt=class{constructor(e,t,n,r){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=n,this.config=r,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new zt(this),this.idTokenSubscription=new zt(this),this.beforeStateQueue=new Nt(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=be,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=r.sdkClientVersion,this._persistenceManagerAvailable=new Promise(e=>this._resolvePersistenceManagerAvailable=e)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=ht(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await yt.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;let e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{let t=await Ye(this,{idToken:e}),n=await pt._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(n)}catch(e){console.warn(`FirebaseServerApp could not login user with provided authIdToken: `,e),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(j(this.app)){let e=this.app.settings.authIdToken;return e?new Promise(t=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(e).then(t,t))}):this.directlySetCurrentUser(null)}let t=await this.assertedPersistence.getCurrentUser(),n=t,r=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();let t=this.redirectUser?._redirectEventId,i=n?._redirectEventId,a=await this.tryRedirectSignIn(e);(!t||t===i)&&a?.user&&(n=a.user,r=!0)}if(!n)return this.directlySetCurrentUser(null);if(!n._redirectEventId){if(r)try{await this.beforeStateQueue.runMiddleware(n)}catch(e){n=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(e))}return n?this.reloadAndSetCurrentUserOrClear(n):this.directlySetCurrentUser(null)}return I(this._popupRedirectResolver,this,`argument-error`),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===n._redirectEventId?this.directlySetCurrentUser(n):this.reloadAndSetCurrentUserOrClear(n)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await at(e)}catch(e){if(e?.code!==`auth/network-request-failed`)return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Me()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(j(this.app))return Promise.reject(Te(this));let t=e?_(e):null;return t&&I(t.auth.config.apiKey===this.config.apiKey,this,`invalid-user-token`),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&I(this.tenantId===e.tenantId,this,`tenant-id-mismatch`),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return j(this.app)?Promise.reject(Te(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return j(this.app)?Promise.reject(Te(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(ht(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();let t=this._getPasswordPolicyInternal();return t.schemaVersion===this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?t.validatePassword(e):Promise.reject(this._errorFactory.create(`unsupported-password-policy-schema-version`,{}))}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){let e=new It(await Pt(this));this.tenantId===null?this._projectPasswordPolicy=e:this._tenantPasswordPolicies[this.tenantId]=e}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(t){this._errorFactory=new e(`auth`,`Firebase`,t())}onAuthStateChanged(e,t,n){return this.registerStateListener(this.authStateSubscription,e,t,n)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,n){return this.registerStateListener(this.idTokenSubscription,e,t,n)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{let n=this.onAuthStateChanged(()=>{n(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){let t={providerId:`apple.com`,tokenType:`ACCESS_TOKEN`,token:e,idToken:await this.currentUser.getIdToken()};this.tenantId!=null&&(t.tenantId=this.tenantId),await ut(this,t)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){let n=await this.getOrInitRedirectPersistenceManager(t);return e===null?n.removeCurrentUser():n.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){let t=e&&ht(e)||this._popupRedirectResolver;I(t,this,`argument-error`),this.redirectPersistenceManager=await yt.create(this,[ht(t._redirectPersistence)],`redirectUser`),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);let e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,n,r){if(this._deleted)return()=>{};let i=typeof t==`function`?t:t.next.bind(t),a=!1,o=this._isInitialized?Promise.resolve():this._initializationPromise;if(I(o,this,`internal-error`),o.then(()=>{a||i(this.currentUser)}),typeof t==`function`){let i=e.addObserver(t,n,r);return()=>{a=!0,i()}}else{let n=e.addObserver(t);return()=>{a=!0,n()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return I(this.persistenceManager,this,`internal-error`),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Mt(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){let e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e[`X-Firebase-gmpid`]=this.app.options.appId);let t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e[`X-Firebase-Client`]=t);let n=await this._getAppCheckToken();return n&&(e[`X-Firebase-AppCheck`]=n),e}async _getAppCheckToken(){if(j(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;let e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Se(`Error while retrieving App Check token: ${e.error}`),e?.token}};function Rt(e){return _(e)}var zt=class{constructor(e){this.auth=e,this.observer=null,this.addObserver=p(e=>this.observer=e)}get next(){return I(this.observer,this.auth,`internal-error`),this.observer.next.bind(this.observer)}},Bt={async loadJS(){throw Error(`Unable to load external scripts`)},recaptchaV2Script:``,recaptchaEnterpriseScript:``,gapiScript:``};function Vt(e){Bt=e}function Ht(e){return Bt.loadJS(e)}function Ut(){return Bt.recaptchaEnterpriseScript}function Wt(){return Bt.gapiScript}function Gt(e){return`__${e}${Math.floor(Math.random()*1e6)}`}var Kt=class{constructor(){this.enterprise=new qt}ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},qt=class{ready(e){e()}execute(e,t){return Promise.resolve(`token`)}render(e,t){return``}},Jt=`recaptcha-enterprise`,Yt=`NO_RECAPTCHA`,Xt=`onFirebaseAuthREInstanceReady`,Zt=class e{constructor(e){this.type=Jt,this.auth=Rt(e)}async verify(t=`verify`,n=!1){async function r(e){if(!n){if(e.tenantId==null&&e._agentRecaptchaConfig!=null)return e._agentRecaptchaConfig.siteKey;if(e.tenantId!=null&&e._tenantRecaptchaConfigs[e.tenantId]!==void 0)return e._tenantRecaptchaConfigs[e.tenantId].siteKey}return new Promise(async(t,n)=>{qe(e,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}).then(r=>{if(r.recaptchaKey===void 0)n(Error(`recaptcha Enterprise site key undefined`));else{let n=new Ke(r);return e.tenantId==null?e._agentRecaptchaConfig=n:e._tenantRecaptchaConfigs[e.tenantId]=n,t(n.siteKey)}}).catch(e=>{n(e)})})}function i(e,n,r){let i=window.grecaptcha;Ge(i)?i.enterprise.ready(()=>{i.enterprise.execute(e,{action:t}).then(e=>{n(e)}).catch(()=>{n(Yt)})}):r(Error(`No reCAPTCHA enterprise script loaded.`))}return this.auth.settings.appVerificationDisabledForTesting?new Kt().execute(`siteKey`,{action:`verify`}):new Promise((t,a)=>{r(this.auth).then(async r=>{if(!n&&Ge(window.grecaptcha)&&e.scriptInjectionDeferred)await e.scriptInjectionDeferred.promise,i(r,t,a);else{if(typeof window>`u`){a(Error(`RecaptchaVerifier is only supported in browser`));return}let n=Ut();n.length!==0&&(n+=r+`&onload=${Xt}`),e.scriptInjectionDeferred=new ce,window[Xt]=()=>{e.scriptInjectionDeferred?.resolve()},Ht(n).then(()=>e.scriptInjectionDeferred?.promise).then(()=>{i(r,t,a)}).catch(e=>{a(e)})}}).catch(e=>{a(e)})})}};Zt.scriptInjectionDeferred=null;async function Qt(e,t,n,r=!1,i=!1){let a=new Zt(e),o;if(i)o=Yt;else try{o=await a.verify(n)}catch{o=await a.verify(n,!0)}let s={...t};if(n===`mfaSmsEnrollment`||n===`mfaSmsSignIn`){if(`phoneEnrollmentInfo`in s){let e=s.phoneEnrollmentInfo.phoneNumber,t=s.phoneEnrollmentInfo.recaptchaToken;Object.assign(s,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:t,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}else if(`phoneSignInInfo`in s){let e=s.phoneSignInInfo.recaptchaToken;Object.assign(s,{phoneSignInInfo:{recaptchaToken:e,captchaResponse:o,clientType:`CLIENT_TYPE_WEB`,recaptchaVersion:`RECAPTCHA_ENTERPRISE`}})}return s}return r?Object.assign(s,{captchaResp:o}):Object.assign(s,{captchaResponse:o}),Object.assign(s,{clientType:`CLIENT_TYPE_WEB`}),Object.assign(s,{recaptchaVersion:`RECAPTCHA_ENTERPRISE`}),s}async function $t(e,t,n,r,i){return i===`EMAIL_PASSWORD_PROVIDER`?e._getRecaptchaConfig()?.isProviderEnabled(`EMAIL_PASSWORD_PROVIDER`)?r(e,await Qt(e,t,n,n===`getOobCode`)):r(e,t).catch(async i=>i.code===`auth/missing-recaptcha-token`?(console.log(`${n} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`),r(e,await Qt(e,t,n,n===`getOobCode`))):Promise.reject(i)):i===`PHONE_PROVIDER`?e._getRecaptchaConfig()?.isProviderEnabled(`PHONE_PROVIDER`)?r(e,await Qt(e,t,n)).catch(async i=>e._getRecaptchaConfig()?.getProviderEnforcementState(`PHONE_PROVIDER`)===`AUDIT`&&(i.code===`auth/missing-recaptcha-token`||i.code===`auth/invalid-app-credential`)?(console.log(`Failed to verify with reCAPTCHA Enterprise. Automatically triggering the reCAPTCHA v2 flow to complete the ${n} flow.`),r(e,await Qt(e,t,n,!1,!0))):Promise.reject(i)):r(e,await Qt(e,t,n,!1,!0)):Promise.reject(i+` provider is not supported.`)}async function en(e){let t=Rt(e),n=new Ke(await qe(t,{clientType:`CLIENT_TYPE_WEB`,version:`RECAPTCHA_ENTERPRISE`}));t.tenantId==null?t._agentRecaptchaConfig=n:t._tenantRecaptchaConfigs[t.tenantId]=n,n.isAnyProviderEnabled()&&new Zt(t).verify()}function tn(e,t){let n=ne(e,`auth`);if(n.isInitialized()){let e=n.getImmediate();if(h(n.getOptions(),t??{}))return e;P(e,`already-initialized`)}return n.initialize({options:t})}function nn(e,t){let n=t?.persistence||[],r=(Array.isArray(n)?n:[n]).map(ht);t?.errorMap&&e._updateErrorMap(t.errorMap),e._initializeWithPersistence(r,t?.popupRedirectResolver)}function rn(e,t,n){let r=Rt(e);I(/^https?:\/\//.test(t),r,`invalid-emulator-scheme`);let i=!!n?.disableWarnings,a=an(t),{host:o,port:s}=on(t),c=s===null?``:`:${s}`,l={url:`${a}//${o}${c}/`},u=Object.freeze({host:o,port:s,protocol:a.replace(`:`,``),options:Object.freeze({disableWarnings:i})});if(!r._canInitEmulator){I(r.config.emulator&&r.emulatorConfig,r,`emulator-config-failed`),I(h(l,r.config.emulator)&&h(u,r.emulatorConfig),r,`emulator-config-failed`);return}r.config.emulator=l,r.emulatorConfig=u,r.settings.appVerificationDisabledForTesting=!0,te(o)?fe(`${a}//${o}${c}`):i||cn()}function an(e){let t=e.indexOf(`:`);return t<0?``:e.substr(0,t+1)}function on(e){let t=an(e),n=/(\/\/)?([^?#/]+)/.exec(e.substr(t.length));if(!n)return{host:``,port:null};let r=n[2].split(`@`).pop()||``,i=/^(\[[^\]]+\])(:|$)/.exec(r);if(i){let e=i[1];return{host:e,port:sn(r.substr(e.length+1))}}else{let[e,t]=r.split(`:`);return{host:e,port:sn(t)}}}function sn(e){if(!e)return null;let t=Number(e);return isNaN(t)?null:t}function cn(){function e(){let e=document.createElement(`p`),t=e.style;e.innerText=`Running in emulator mode. Do not use with production credentials.`,t.position=`fixed`,t.width=`100%`,t.backgroundColor=`#ffffff`,t.border=`.1em solid #000000`,t.color=`#b50000`,t.bottom=`0px`,t.left=`0px`,t.margin=`0px`,t.zIndex=`10000`,t.textAlign=`center`,e.classList.add(`firebase-emulator-warning`),document.body.appendChild(e)}typeof console<`u`&&typeof console.info==`function`&&console.info(`WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials.`),typeof window<`u`&&typeof document<`u`&&(document.readyState===`loading`?window.addEventListener(`DOMContentLoaded`,e):e())}var ln=class{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return L(`not implemented`)}_getIdTokenResponse(e){return L(`not implemented`)}_linkToIdToken(e,t){return L(`not implemented`)}_getReauthenticationResolver(e){return L(`not implemented`)}};async function un(e,t){return z(e,`POST`,`/v1/accounts:signUp`,t)}async function dn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithPassword`,R(e,t))}async function fn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithEmailLink`,R(e,t))}async function pn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithEmailLink`,R(e,t))}var mn=class e extends ln{constructor(e,t,n,r=null){super(`password`,n),this._email=e,this._password=t,this._tenantId=r}static _fromEmailAndPassword(t,n){return new e(t,n,`password`)}static _fromEmailAndCode(t,n,r=null){return new e(t,n,`emailLink`,r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){let t=typeof e==`string`?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod===`password`)return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod===`emailLink`)return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case`password`:return $t(e,{returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`},`signInWithPassword`,dn,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return fn(e,{email:this._email,oobCode:this._password});default:P(e,`internal-error`)}}async _linkToIdToken(e,t){switch(this.signInMethod){case`password`:return $t(e,{idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:`CLIENT_TYPE_WEB`},`signUpPassword`,un,`EMAIL_PASSWORD_PROVIDER`);case`emailLink`:return pn(e,{idToken:t,email:this._email,oobCode:this._password});default:P(e,`internal-error`)}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}};async function hn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithIdp`,R(e,t))}var gn=`http://localhost`,_n=class e extends ln{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(t){let n=new e(t.providerId,t.signInMethod);return t.idToken||t.accessToken?(t.idToken&&(n.idToken=t.idToken),t.accessToken&&(n.accessToken=t.accessToken),t.nonce&&!t.pendingToken&&(n.nonce=t.nonce),t.pendingToken&&(n.pendingToken=t.pendingToken)):t.oauthToken&&t.oauthTokenSecret?(n.accessToken=t.oauthToken,n.secret=t.oauthTokenSecret):P(`argument-error`),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(t){let{providerId:n,signInMethod:r,...i}=typeof t==`string`?JSON.parse(t):t;if(!n||!r)return null;let a=new e(n,r);return a.idToken=i.idToken||void 0,a.accessToken=i.accessToken||void 0,a.secret=i.secret,a.nonce=i.nonce,a.pendingToken=i.pendingToken||null,a}_getIdTokenResponse(e){return hn(e,this.buildRequest())}_linkToIdToken(e,t){let n=this.buildRequest();return n.idToken=t,hn(e,n)}_getReauthenticationResolver(e){let t=this.buildRequest();return t.autoCreate=!1,hn(e,t)}buildRequest(){let e={requestUri:gn,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{let t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=l(t)}return e}};async function vn(e,t){return z(e,`POST`,`/v1/accounts:sendVerificationCode`,R(e,t))}async function yn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,R(e,t))}async function bn(e,t){let n=await Be(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,R(e,t));if(n.temporaryProof)throw We(e,`account-exists-with-different-credential`,n);return n}var xn={USER_NOT_FOUND:`user-not-found`};async function Sn(e,t){return Be(e,`POST`,`/v1/accounts:signInWithPhoneNumber`,R(e,{...t,operation:`REAUTH`}),xn)}var Cn=class e extends ln{constructor(e){super(`phone`,`phone`),this.params=e}static _fromVerification(t,n){return new e({verificationId:t,verificationCode:n})}static _fromTokenResponse(t,n){return new e({phoneNumber:t,temporaryProof:n})}_getIdTokenResponse(e){return yn(e,this._makeVerificationRequest())}_linkToIdToken(e,t){return bn(e,{idToken:t,...this._makeVerificationRequest()})}_getReauthenticationResolver(e){return Sn(e,this._makeVerificationRequest())}_makeVerificationRequest(){let{temporaryProof:e,phoneNumber:t,verificationId:n,verificationCode:r}=this.params;return e&&t?{temporaryProof:e,phoneNumber:t}:{sessionInfo:n,code:r}}toJSON(){let e={providerId:this.providerId};return this.params.phoneNumber&&(e.phoneNumber=this.params.phoneNumber),this.params.temporaryProof&&(e.temporaryProof=this.params.temporaryProof),this.params.verificationCode&&(e.verificationCode=this.params.verificationCode),this.params.verificationId&&(e.verificationId=this.params.verificationId),e}static fromJSON(t){typeof t==`string`&&(t=JSON.parse(t));let{verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a}=t;return!r&&!n&&!i&&!a?null:new e({verificationId:n,verificationCode:r,phoneNumber:i,temporaryProof:a})}};function wn(e){switch(e){case`recoverEmail`:return`RECOVER_EMAIL`;case`resetPassword`:return`PASSWORD_RESET`;case`signIn`:return`EMAIL_SIGNIN`;case`verifyEmail`:return`VERIFY_EMAIL`;case`verifyAndChangeEmail`:return`VERIFY_AND_CHANGE_EMAIL`;case`revertSecondFactorAddition`:return`REVERT_SECOND_FACTOR_ADDITION`;default:return null}}function Tn(e){let t=S(a(e)).link,n=t?S(a(t)).deep_link_id:null,r=S(a(e)).deep_link_id;return(r?S(a(r)).link:null)||r||n||t||e}var En=class e{constructor(e){let t=S(a(e)),n=t.apiKey??null,r=t.oobCode??null,i=wn(t.mode??null);I(n&&r&&i,`argument-error`),this.apiKey=n,this.operation=i,this.code=r,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(t){let n=Tn(t);try{return new e(n)}catch{return null}}},Dn=class e{constructor(){this.providerId=e.PROVIDER_ID}static credential(e,t){return mn._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){let n=En.parseLink(t);return I(n,`argument-error`),mn._fromEmailAndCode(e,n.code,n.tenantId)}};Dn.PROVIDER_ID=`password`,Dn.EMAIL_PASSWORD_SIGN_IN_METHOD=`password`,Dn.EMAIL_LINK_SIGN_IN_METHOD=`emailLink`;var On=class{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}},kn=class extends On{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}},An=class e extends kn{constructor(){super(`facebook.com`)}static credential(t){return _n._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.FACEBOOK_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};An.FACEBOOK_SIGN_IN_METHOD=`facebook.com`,An.PROVIDER_ID=`facebook.com`;var jn=class e extends kn{constructor(){super(`google.com`),this.addScope(`profile`)}static credential(t,n){return _n._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GOOGLE_SIGN_IN_METHOD,idToken:t,accessToken:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthIdToken:n,oauthAccessToken:r}=t;if(!n&&!r)return null;try{return e.credential(n,r)}catch{return null}}};jn.GOOGLE_SIGN_IN_METHOD=`google.com`,jn.PROVIDER_ID=`google.com`;var Mn=class e extends kn{constructor(){super(`github.com`)}static credential(t){return _n._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.GITHUB_SIGN_IN_METHOD,accessToken:t})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t||!(`oauthAccessToken`in t)||!t.oauthAccessToken)return null;try{return e.credential(t.oauthAccessToken)}catch{return null}}};Mn.GITHUB_SIGN_IN_METHOD=`github.com`,Mn.PROVIDER_ID=`github.com`;var Nn=class e extends kn{constructor(){super(`twitter.com`)}static credential(t,n){return _n._fromParams({providerId:e.PROVIDER_ID,signInMethod:e.TWITTER_SIGN_IN_METHOD,oauthToken:t,oauthTokenSecret:n})}static credentialFromResult(t){return e.credentialFromTaggedObject(t)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:t}){if(!t)return null;let{oauthAccessToken:n,oauthTokenSecret:r}=t;if(!n||!r)return null;try{return e.credential(n,r)}catch{return null}}};Nn.TWITTER_SIGN_IN_METHOD=`twitter.com`,Nn.PROVIDER_ID=`twitter.com`;async function Pn(e,t){return Be(e,`POST`,`/v1/accounts:signUp`,R(e,t))}var Fn=class e{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(t,n,r,i=!1){let a=await pt._fromIdTokenResponse(t,r,i),o=In(r);return new e({user:a,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(t,n,r){await t._updateTokensIfNecessary(r,!0);let i=In(r);return new e({user:t,providerId:i,_tokenResponse:r,operationType:n})}};function In(e){return e.providerId?e.providerId:`phoneNumber`in e?`phone`:null}async function Ln(e){if(j(e.app))return Promise.reject(Te(e));let t=Rt(e);if(await t._initializationPromise,t.currentUser?.isAnonymous)return new Fn({user:t.currentUser,providerId:null,operationType:`signIn`});let n=await Pn(t,{returnSecureToken:!0}),r=await Fn._fromIdTokenResponse(t,`signIn`,n,!0);return await t._updateCurrentUser(r.user),r}var Rn=class e extends se{constructor(t,n,r,i){super(n.code,n.message),this.operationType=r,this.user=i,Object.setPrototypeOf(this,e.prototype),this.customData={appName:t.name,tenantId:t.tenantId??void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(t,n,r,i){return new e(t,n,r,i)}};function zn(e,t,n,r){return(t===`reauthenticate`?n._getReauthenticationResolver(e):n._getIdTokenResponse(e)).catch(n=>{throw n.code===`auth/multi-factor-auth-required`?Rn._fromErrorAndOperation(e,n,t,r):n})}async function Bn(e,t,n=!1){let r=await tt(e,t._linkToIdToken(e.auth,await e.getIdToken()),n);return Fn._forOperation(e,`link`,r)}async function Vn(e,t,n=!1){let{auth:r}=e;if(j(r.app))return Promise.reject(Te(r));let i=`reauthenticate`;try{let a=await tt(e,zn(r,i,t,e),n);I(a.idToken,r,`internal-error`);let o=$e(a.idToken);I(o,r,`internal-error`);let{sub:s}=o;return I(e.uid===s,r,`user-mismatch`),Fn._forOperation(e,i,a)}catch(e){throw e?.code===`auth/user-not-found`&&P(r,`user-mismatch`),e}}async function Hn(e,t,n=!1){if(j(e.app))return Promise.reject(Te(e));let r=`signIn`,i=await zn(e,r,t),a=await Fn._fromIdTokenResponse(e,r,i);return n||await e._updateCurrentUser(a.user),a}function Un(e,t,n,r){return _(e).onIdTokenChanged(t,n,r)}function Wn(e,t,n){return _(e).beforeAuthStateChanged(t,n)}function Gn(e,t,n,r){return _(e).onAuthStateChanged(t,n,r)}function Kn(e,t){return z(e,`POST`,`/v2/accounts/mfaEnrollment:start`,R(e,t))}function qn(e,t){return z(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,R(e,t))}function Jn(e,t){return z(e,`POST`,`/v2/accounts/mfaEnrollment:start`,R(e,t))}function Yn(e,t){return z(e,`POST`,`/v2/accounts/mfaEnrollment:finalize`,R(e,t))}var Xn=`__sak`,Zn=class{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(Xn,`1`),this.storage.removeItem(Xn),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){let t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}},Qn=1e3,$n=10,er=class extends Zn{constructor(){super(()=>window.localStorage,`LOCAL`),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=jt(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(let t of Object.keys(this.listeners)){let n=this.storage.getItem(t),r=this.localCache[t];n!==r&&e(t,r,n)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((e,t,n)=>{this.notifyListeners(e,n)});return}let n=e.key;t?this.detachListener():this.stopPolling();let r=()=>{let e=this.storage.getItem(n);!t&&this.localCache[n]===e||this.notifyListeners(n,e)},i=this.storage.getItem(n);At()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(r,$n):r()}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,n)=>{this.onStorageEvent(new StorageEvent(`storage`,{key:e,oldValue:t,newValue:n}),!0)})},Qn)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}attachListener(){window.addEventListener(`storage`,this.boundEventHandler)}detachListener(){window.removeEventListener(`storage`,this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){let t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}};er.type=`LOCAL`;var tr=er,nr=1e3;function rr(e){let t=e.replace(/[\\^$.*+?()[\]{}|]/g,`\\$&`),n=RegExp(`${t}=([^;]+)`);return document.cookie.match(n)?.[1]??null}function ir(e){return`${window.location.protocol===`http:`?`__dev_`:`__HOST-`}FIREBASE_${e.split(`:`)[3]}`}var ar=class{constructor(){this.type=`COOKIE`,this.listenerUnsubscribes=new Map}_getFinalTarget(e){let t=new URL(`${window.location.origin}/__cookies__`);return t.searchParams.set(`finalTarget`,e),t}async _isAvailable(){return typeof isSecureContext==`boolean`&&!isSecureContext||typeof navigator>`u`||typeof document>`u`?!1:navigator.cookieEnabled??!0}async _set(e,t){}async _get(e){if(!this._isAvailable())return null;let t=ir(e);return window.cookieStore?(await window.cookieStore.get(t))?.value:rr(t)}async _remove(e){if(!this._isAvailable()||!await this._get(e))return;let t=ir(e);document.cookie=`${t}=;Max-Age=34560000;Partitioned;Secure;SameSite=Strict;Path=/;Priority=High`,await fetch(`/__cookies__`,{method:`DELETE`}).catch(()=>void 0)}_addListener(e,t){if(!this._isAvailable())return;let n=ir(e);if(window.cookieStore){let e=(e=>{let r=e.changed.find(e=>e.name===n);r&&t(r.value),e.deleted.find(e=>e.name===n)&&t(null)});return this.listenerUnsubscribes.set(t,()=>window.cookieStore.removeEventListener(`change`,e)),window.cookieStore.addEventListener(`change`,e)}let r=rr(n),i=setInterval(()=>{let e=rr(n);e!==r&&(t(e),r=e)},nr);this.listenerUnsubscribes.set(t,()=>clearInterval(i))}_removeListener(e,t){let n=this.listenerUnsubscribes.get(t);n&&(n(),this.listenerUnsubscribes.delete(t))}};ar.type=`COOKIE`;var or=class extends Zn{constructor(){super(()=>window.sessionStorage,`SESSION`)}_addListener(e,t){}_removeListener(e,t){}};or.type=`SESSION`;var sr=or;function cr(e){return Promise.all(e.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(e){return{fulfilled:!1,reason:e}}}))}var lr=class e{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(t){let n=this.receivers.find(e=>e.isListeningto(t));if(n)return n;let r=new e(t);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){let t=e,{eventId:n,eventType:r,data:i}=t.data,a=this.handlersMap[r];if(!a?.size)return;t.ports[0].postMessage({status:`ack`,eventId:n,eventType:r});let o=await cr(Array.from(a).map(async e=>e(t.origin,i)));t.ports[0].postMessage({status:`done`,eventId:n,eventType:r,response:o})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener(`message`,this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener(`message`,this.boundEventHandler)}};lr.receivers=[];function ur(e=``,t=10){let n=``;for(let e=0;e<t;e++)n+=Math.floor(Math.random()*10);return e+n}var dr=class{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener(`message`,e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,n=50){let r=typeof MessageChannel<`u`?new MessageChannel:null;if(!r)throw Error(`connection_unavailable`);let i,a;return new Promise((o,s)=>{let c=ur(``,20);r.port1.start();let l=setTimeout(()=>{s(Error(`unsupported_event`))},n);a={messageChannel:r,onMessage(e){let t=e;if(t.data.eventId===c)switch(t.data.status){case`ack`:clearTimeout(l),i=setTimeout(()=>{s(Error(`timeout`))},3e3);break;case`done`:clearTimeout(i),o(t.data.response);break;default:clearTimeout(l),clearTimeout(i),s(Error(`invalid_response`));break}}},this.handlers.add(a),r.port1.addEventListener(`message`,a.onMessage),this.target.postMessage({eventType:e,eventId:c,data:t},[r.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}};function B(){return window}function fr(e){B().location.href=e}function pr(){return B().WorkerGlobalScope!==void 0&&typeof B().importScripts==`function`}async function mr(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function hr(){return navigator?.serviceWorker?.controller||null}function gr(){return pr()?self:null}var _r=`firebaseLocalStorageDb`,vr=1,yr=`firebaseLocalStorage`,br=`fbase_key`,xr=class{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener(`success`,()=>{e(this.request.result)}),this.request.addEventListener(`error`,()=>{t(this.request.error)})})}};function Sr(e,t){return e.transaction([yr],t?`readwrite`:`readonly`).objectStore(yr)}function Cr(){return new xr(indexedDB.deleteDatabase(_r)).toPromise()}function wr(){let e=indexedDB.open(_r,vr);return new Promise((t,n)=>{e.addEventListener(`error`,()=>{n(e.error)}),e.addEventListener(`upgradeneeded`,()=>{let t=e.result;try{t.createObjectStore(yr,{keyPath:br})}catch(e){n(e)}}),e.addEventListener(`success`,async()=>{let n=e.result;n.objectStoreNames.contains(yr)?t(n):(n.close(),await Cr(),t(await wr()))})})}async function Tr(e,t,n){return new xr(Sr(e,!0).put({[br]:t,value:n})).toPromise()}async function Er(e,t){let n=await new xr(Sr(e,!1).get(t)).toPromise();return n===void 0?null:n.value}function Dr(e,t){return new xr(Sr(e,!0).delete(t)).toPromise()}var Or=800,kr=3,Ar=class{constructor(){this.type=`LOCAL`,this.dbPromise=null,this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.dbPromise?this.dbPromise:(this.dbPromise=wr(),this.dbPromise.catch(()=>{this.dbPromise=null}),this.dbPromise)}async _withRetries(e){let t=0;for(;;)try{return await e(await this._openDb())}catch(e){if(t++>kr)throw e;this.dbPromise&&=((await this.dbPromise).close(),null)}}async initializeServiceWorkerMessaging(){return pr()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=lr._getInstance(gr()),this.receiver._subscribe(`keyChanged`,async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe(`ping`,async(e,t)=>[`keyChanged`])}async initializeSender(){if(this.activeServiceWorker=await mr(),!this.activeServiceWorker)return;this.sender=new dr(this.activeServiceWorker);let e=await this.sender._send(`ping`,{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes(`keyChanged`)&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||hr()!==this.activeServiceWorker))try{await this.sender._send(`keyChanged`,{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{return indexedDB?(await this._withRetries(async e=>{await Tr(e,Xn,`1`),await Dr(e,Xn)}),!0):!1}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(n=>Tr(n,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){let t=await this._withRetries(t=>Er(t,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Dr(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){let e=await this._withRetries(e=>new xr(Sr(e,!1).getAll()).toPromise());if(!e||this.pendingWrites!==0)return[];let t=[],n=new Set;if(e.length!==0)for(let{fbase_key:r,value:i}of e)n.add(r),JSON.stringify(this.localCache[r])!==JSON.stringify(i)&&(this.notifyListeners(r,i),t.push(r));for(let e of Object.keys(this.localCache))this.localCache[e]&&!n.has(e)&&(this.notifyListeners(e,null),t.push(e));return t}notifyListeners(e,t){this.localCache[e]=t;let n=this.listeners[e];if(n)for(let e of Array.from(n))e(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Or)}stopPolling(){this.pollTimer&&=(clearInterval(this.pollTimer),null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}};Ar.type=`LOCAL`;var jr=Ar;function Mr(e,t){return z(e,`POST`,`/v2/accounts/mfaSignIn:start`,R(e,t))}function Nr(e,t){return z(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,R(e,t))}function Pr(e,t){return z(e,`POST`,`/v2/accounts/mfaSignIn:finalize`,R(e,t))}Gt(`rcb`),new Ne(3e4,6e4);var Fr=`recaptcha`;async function Ir(e,t,n){if(!e._getRecaptchaConfig())try{await en(e)}catch{console.log(`Failed to initialize reCAPTCHA Enterprise config. Triggering the reCAPTCHA v2 verification.`)}try{let r;if(r=typeof t==`string`?{phoneNumber:t}:t,`session`in r){let t=r.session;if(`phoneNumber`in r)return I(t.type===`enroll`,e,`internal-error`),(await $t(e,{idToken:t.credential,phoneEnrollmentInfo:{phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`}},`mfaSmsEnrollment`,async(e,t)=>t.phoneEnrollmentInfo.captchaResponse===Yt?(I(n?.type===Fr,e,`argument-error`),Kn(e,await Lr(e,t,n))):Kn(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneSessionInfo.sessionInfo;{I(t.type===`signin`,e,`internal-error`);let i=r.multiFactorHint?.uid||r.multiFactorUid;return I(i,e,`missing-multi-factor-info`),(await $t(e,{mfaPendingCredential:t.credential,mfaEnrollmentId:i,phoneSignInInfo:{clientType:`CLIENT_TYPE_WEB`}},`mfaSmsSignIn`,async(e,t)=>t.phoneSignInInfo.captchaResponse===Yt?(I(n?.type===Fr,e,`argument-error`),Mr(e,await Lr(e,t,n))):Mr(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).phoneResponseInfo.sessionInfo}}else return(await $t(e,{phoneNumber:r.phoneNumber,clientType:`CLIENT_TYPE_WEB`},`sendVerificationCode`,async(e,t)=>t.captchaResponse===Yt?(I(n?.type===Fr,e,`argument-error`),vn(e,await Lr(e,t,n))):vn(e,t),`PHONE_PROVIDER`).catch(e=>Promise.reject(e))).sessionInfo}finally{n?._reset()}}async function Lr(e,t,n){I(n.type===Fr,e,`argument-error`);let r=await n.verify();I(typeof r==`string`,e,`argument-error`);let i={...t};if(`phoneEnrollmentInfo`in i){let e=i.phoneEnrollmentInfo.phoneNumber,t=i.phoneEnrollmentInfo.captchaResponse,n=i.phoneEnrollmentInfo.clientType,a=i.phoneEnrollmentInfo.recaptchaVersion;return Object.assign(i,{phoneEnrollmentInfo:{phoneNumber:e,recaptchaToken:r,captchaResponse:t,clientType:n,recaptchaVersion:a}}),i}else if(`phoneSignInInfo`in i){let e=i.phoneSignInInfo.captchaResponse,t=i.phoneSignInInfo.clientType,n=i.phoneSignInInfo.recaptchaVersion;return Object.assign(i,{phoneSignInInfo:{recaptchaToken:r,captchaResponse:e,clientType:t,recaptchaVersion:n}}),i}else return Object.assign(i,{recaptchaToken:r}),i}var Rr=class e{constructor(t){this.providerId=e.PROVIDER_ID,this.auth=Rt(t)}verifyPhoneNumber(e,t){return Ir(this.auth,e,_(t))}static credential(e,t){return Cn._fromVerification(e,t)}static credentialFromResult(t){let n=t;return e.credentialFromTaggedObject(n)}static credentialFromError(t){return e.credentialFromTaggedObject(t.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;let{phoneNumber:t,temporaryProof:n}=e;return t&&n?Cn._fromTokenResponse(t,n):null}};Rr.PROVIDER_ID=`phone`,Rr.PHONE_SIGN_IN_METHOD=`phone`;function zr(e,t){return t?ht(t):(I(e._popupRedirectResolver,e,`argument-error`),e._popupRedirectResolver)}var Br=class extends ln{constructor(e){super(`custom`,`custom`),this.params=e}_getIdTokenResponse(e){return hn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return hn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return hn(e,this._buildIdpRequest())}_buildIdpRequest(e){let t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}};function Vr(e){return Hn(e.auth,new Br(e),e.bypassAuthState)}function Hr(e){let{auth:t,user:n}=e;return I(n,t,`internal-error`),Vn(n,new Br(e),e.bypassAuthState)}async function Ur(e){let{auth:t,user:n}=e;return I(n,t,`internal-error`),Bn(n,new Br(e),e.bypassAuthState)}var Wr=class{constructor(e,t,n,r,i=!1){this.auth=e,this.resolver=n,this.user=r,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(e){this.reject(e)}})}async onAuthEvent(e){let{urlResponse:t,sessionId:n,postBody:r,tenantId:i,error:a,type:o}=e;if(a){this.reject(a);return}let s={auth:this.auth,requestUri:t,sessionId:n,tenantId:i||void 0,postBody:r||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(o)(s))}catch(e){this.reject(e)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case`signInViaPopup`:case`signInViaRedirect`:return Vr;case`linkViaPopup`:case`linkViaRedirect`:return Ur;case`reauthViaPopup`:case`reauthViaRedirect`:return Hr;default:P(this.auth,`internal-error`)}}resolve(e){De(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){De(this.pendingPromise,`Pending promise was never set`),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}},Gr=new Ne(2e3,1e4),Kr=class e extends Wr{constructor(t,n,r,i,a){super(t,n,i,a),this.provider=r,this.authWindow=null,this.pollId=null,e.currentPopupAction&&e.currentPopupAction.cancel(),e.currentPopupAction=this}async executeNotNull(){let e=await this.execute();return I(e,this.auth,`internal-error`),e}async onExecution(){De(this.filter.length===1,`Popup operations only handle one event`);let e=ur();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(e=>{this.reject(e)}),this.resolver._isIframeWebStorageSupported(this.auth,e=>{e||this.reject(F(this.auth,`web-storage-unsupported`))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(F(this.auth,`cancelled-popup-request`))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,e.currentPopupAction=null}pollUserCancellation(){let e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(F(this.auth,`popup-closed-by-user`))},8e3);return}this.pollId=window.setTimeout(e,Gr.get())};e()}};Kr.currentPopupAction=null;var qr=`pendingRedirect`,Jr=new Map,Yr=class extends Wr{constructor(e,t,n=!1){super(e,[`signInViaRedirect`,`linkViaRedirect`,`reauthViaRedirect`,`unknown`],t,void 0,n),this.eventId=null}async execute(){let e=Jr.get(this.auth._key());if(!e){try{let t=await Xr(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(t)}catch(t){e=()=>Promise.reject(t)}Jr.set(this.auth._key(),e)}return this.bypassAuthState||Jr.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type===`signInViaRedirect`)return super.onAuthEvent(e);if(e.type===`unknown`){this.resolve(null);return}if(e.eventId){let t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}};async function Xr(e,t){let n=$r(t),r=Qr(e);if(!await r._isAvailable())return!1;let i=await r._get(n)===`true`;return await r._remove(n),i}function Zr(e,t){Jr.set(e._key(),t)}function Qr(e){return ht(e._redirectPersistence)}function $r(e){return vt(qr,e.config.apiKey,e.name)}async function ei(e,t,n=!1){if(j(e.app))return Promise.reject(Te(e));let r=Rt(e),i=await new Yr(r,zr(r,t),n).execute();return i&&!n&&(delete i.user._redirectEventId,await r._persistUserIfCurrent(i.user),await r._setRedirectUser(null,t)),i}var ti=600*1e3,ni=class{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(n=>{this.isEventForConsumer(e,n)&&(t=!0,this.sendToConsumer(e,n),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!ai(e)?t:(this.hasHandledPotentialRedirect=!0,t||=(this.queuedRedirectEvent=e,!0),t)}sendToConsumer(e,t){if(e.error&&!ii(e)){let n=e.error.code?.split(`auth/`)[1]||`internal-error`;t.onError(F(this.auth,n))}else t.onAuthEvent(e)}isEventForConsumer(e,t){let n=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&n}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=ti&&this.cachedEventUids.clear(),this.cachedEventUids.has(ri(e))}saveEventToCache(e){this.cachedEventUids.add(ri(e)),this.lastProcessedEventTime=Date.now()}};function ri(e){return[e.type,e.eventId,e.sessionId,e.tenantId].filter(e=>e).join(`-`)}function ii({type:e,error:t}){return e===`unknown`&&t?.code===`auth/no-auth-event`}function ai(e){switch(e.type){case`signInViaRedirect`:case`linkViaRedirect`:case`reauthViaRedirect`:return!0;case`unknown`:return ii(e);default:return!1}}async function oi(e,t={}){return z(e,`GET`,`/v1/projects`,t)}var si=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,ci=/^https?/;async function li(e){if(e.config.emulator)return;let{authorizedDomains:t}=await oi(e);for(let e of t)try{if(ui(e))return}catch{}P(e,`unauthorized-domain`)}function ui(e){let t=Oe(),{protocol:n,hostname:r}=new URL(t);if(e.startsWith(`chrome-extension://`)){let i=new URL(e);return i.hostname===``&&r===``?n===`chrome-extension:`&&e.replace(`chrome-extension://`,``)===t.replace(`chrome-extension://`,``):n===`chrome-extension:`&&i.hostname===r}if(!ci.test(n))return!1;if(si.test(e))return r===e;let i=e.replace(/\./g,`\\.`);return RegExp(`^(.+\\.`+i+`|`+i+`)$`,`i`).test(r)}var di=new Ne(3e4,6e4);function fi(){let e=B().___jsl;if(e?.H){for(let t of Object.keys(e.H))if(e.H[t].r=e.H[t].r||[],e.H[t].L=e.H[t].L||[],e.H[t].r=[...e.H[t].L],e.CP)for(let t=0;t<e.CP.length;t++)e.CP[t]=null}}function pi(e){return new Promise((t,n)=>{function r(){fi(),gapi.load(`gapi.iframes`,{callback:()=>{t(gapi.iframes.getContext())},ontimeout:()=>{fi(),n(F(e,`network-request-failed`))},timeout:di.get()})}if(B().gapi?.iframes?.Iframe)t(gapi.iframes.getContext());else if(B().gapi?.load)r();else{let t=Gt(`iframefcb`);return B()[t]=()=>{gapi.load?r():n(F(e,`network-request-failed`))},Ht(`${Wt()}?onload=${t}`).catch(e=>n(e))}}).catch(e=>{throw mi=null,e})}var mi=null;function hi(e){return mi||=pi(e),mi}var gi=new Ne(5e3,15e3),_i=`__/auth/iframe`,vi=`emulator/auth/iframe`,yi={style:{position:`absolute`,top:`-100px`,width:`1px`,height:`1px`},"aria-hidden":`true`,tabindex:`-1`},bi=new Map([[`identitytoolkit.googleapis.com`,`p`],[`staging-identitytoolkit.sandbox.googleapis.com`,`s`],[`test-identitytoolkit.sandbox.googleapis.com`,`t`]]);function xi(e){let t=e.config;I(t.authDomain,e,`auth-domain-config-required`);let n=t.emulator?Pe(t,vi):`https://${e.config.authDomain}/${_i}`,r={apiKey:t.apiKey,appName:e.name,v:_e},i=bi.get(e.config.apiHost);i&&(r.eid=i);let a=e._getFrameworks();return a.length&&(r.fw=a.join(`,`)),`${n}?${l(r).slice(1)}`}async function Si(e){let t=await hi(e),n=B().gapi;return I(n,e,`internal-error`),t.open({where:document.body,url:xi(e),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:yi,dontclear:!0},t=>new Promise(async(n,r)=>{await t.restyle({setHideOnLeave:!1});let i=F(e,`network-request-failed`),a=B().setTimeout(()=>{r(i)},gi.get());function o(){B().clearTimeout(a),n(t)}t.ping(o).then(o,()=>{r(i)})}))}var Ci={location:`yes`,resizable:`yes`,statusbar:`yes`,toolbar:`no`},wi=500,Ti=600,Ei=`_blank`,Di=`http://localhost`,Oi=class{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}};function ki(e,t,n,r=wi,i=Ti){let a=Math.max((window.screen.availHeight-i)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString(),s=``,c={...Ci,width:r.toString(),height:i.toString(),top:a,left:o},l=M().toLowerCase();n&&(s=Ct(l)?Ei:n),xt(l)&&(t||=Di,c.scrollbars=`yes`);let u=Object.entries(c).reduce((e,[t,n])=>`${e}${t}=${n},`,``);if(kt(l)&&s!==`_self`)return Ai(t||``,s),new Oi(null);let d=window.open(t||``,s,u);I(d,e,`popup-blocked`);try{d.focus()}catch{}return new Oi(d)}function Ai(e,t){let n=document.createElement(`a`);n.href=e,n.target=t;let r=document.createEvent(`MouseEvent`);r.initMouseEvent(`click`,!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}var ji=`__/auth/handler`,Mi=`emulator/auth/handler`,Ni=`fac`;async function Pi(e,t,n,r,i,a){I(e.config.authDomain,e,`auth-domain-config-required`),I(e.config.apiKey,e,`invalid-api-key`);let o={apiKey:e.config.apiKey,appName:e.name,authType:n,redirectUrl:r,v:_e,eventId:i};if(t instanceof On){t.setDefaultLanguage(e.languageCode),o.providerId=t.providerId||``,ee(t.getCustomParameters())||(o.customParameters=JSON.stringify(t.getCustomParameters()));for(let[e,t]of Object.entries(a||{}))o[e]=t}if(t instanceof kn){let e=t.getScopes().filter(e=>e!==``);e.length>0&&(o.scopes=e.join(`,`))}e.tenantId&&(o.tid=e.tenantId);let s=o;for(let e of Object.keys(s))s[e]===void 0&&delete s[e];let c=await e._getAppCheckToken(),u=c?`#${Ni}=${encodeURIComponent(c)}`:``;return`${Fi(e)}?${l(s).slice(1)}${u}`}function Fi({config:e}){return e.emulator?Pe(e,Mi):`https://${e.authDomain}/${ji}`}var Ii=`webStorageSupport`,Li=class{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=sr,this._completeRedirectFn=ei,this._overrideRedirectResult=Zr}async _openPopup(e,t,n,r){return De(this.eventManagers[e._key()]?.manager,`_initialize() not called before _openPopup()`),ki(e,await Pi(e,t,n,Oe(),r),ur())}async _openRedirect(e,t,n,r){return await this._originValidation(e),fr(await Pi(e,t,n,Oe(),r)),new Promise(()=>{})}_initialize(e){let t=e._key();if(this.eventManagers[t]){let{manager:e,promise:n}=this.eventManagers[t];return e?Promise.resolve(e):(De(n,`If manager is not set, promise should be`),n)}let n=this.initAndGetManager(e);return this.eventManagers[t]={promise:n},n.catch(()=>{delete this.eventManagers[t]}),n}async initAndGetManager(e){let t=await Si(e),n=new ni(e);return t.register(`authEvent`,t=>(I(t?.authEvent,e,`invalid-auth-event`),{status:n.onEvent(t.authEvent)?`ACK`:`ERROR`}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:n},this.iframes[e._key()]=t,n}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ii,{type:Ii},n=>{let r=n?.[0]?.[Ii];r!==void 0&&t(!!r),P(e,`internal-error`)},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){let t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=li(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return jt()||St()||Ot()}},Ri=class{constructor(e){this.factorId=e}_process(e,t,n){switch(t.type){case`enroll`:return this._finalizeEnroll(e,t.credential,n);case`signin`:return this._finalizeSignIn(e,t.credential);default:return L(`unexpected MultiFactorSessionType`)}}},zi=class e extends Ri{constructor(e){super(`phone`),this.credential=e}static _fromCredential(t){return new e(t)}_finalizeEnroll(e,t,n){return qn(e,{idToken:t,displayName:n,phoneVerificationInfo:this.credential._makeVerificationRequest()})}_finalizeSignIn(e,t){return Nr(e,{mfaPendingCredential:t,phoneVerificationInfo:this.credential._makeVerificationRequest()})}},Bi=class{constructor(){}static assertion(e){return zi._fromCredential(e)}};Bi.FACTOR_ID=`phone`;var Vi=class{static assertionForEnrollment(e,t){return Hi._fromSecret(e,t)}static assertionForSignIn(e,t){return Hi._fromEnrollmentId(e,t)}static async generateSecret(e){let t=e;I(t.user?.auth!==void 0,`internal-error`);let n=await Jn(t.user.auth,{idToken:t.credential,totpEnrollmentInfo:{}});return Ui._fromStartTotpMfaEnrollmentResponse(n,t.user.auth)}};Vi.FACTOR_ID=`totp`;var Hi=class e extends Ri{constructor(e,t,n){super(`totp`),this.otp=e,this.enrollmentId=t,this.secret=n}static _fromSecret(t,n){return new e(n,void 0,t)}static _fromEnrollmentId(t,n){return new e(n,t)}async _finalizeEnroll(e,t,n){return I(this.secret!==void 0,e,`argument-error`),Yn(e,{idToken:t,displayName:n,totpVerificationInfo:this.secret._makeTotpVerificationInfo(this.otp)})}async _finalizeSignIn(e,t){I(this.enrollmentId!==void 0&&this.otp!==void 0,e,`argument-error`);let n={verificationCode:this.otp};return Pr(e,{mfaPendingCredential:t,mfaEnrollmentId:this.enrollmentId,totpVerificationInfo:n})}},Ui=class e{constructor(e,t,n,r,i,a,o){this.sessionInfo=a,this.auth=o,this.secretKey=e,this.hashingAlgorithm=t,this.codeLength=n,this.codeIntervalSeconds=r,this.enrollmentCompletionDeadline=i}static _fromStartTotpMfaEnrollmentResponse(t,n){return new e(t.totpSessionInfo.sharedSecretKey,t.totpSessionInfo.hashingAlgorithm,t.totpSessionInfo.verificationCodeLength,t.totpSessionInfo.periodSec,new Date(t.totpSessionInfo.finalizeEnrollmentTime).toUTCString(),t.totpSessionInfo.sessionInfo,n)}_makeTotpVerificationInfo(e){return{sessionInfo:this.sessionInfo,verificationCode:e}}generateQrCodeUrl(e,t){let n=!1;return(Wi(e)||Wi(t))&&(n=!0),n&&(Wi(e)&&(e=this.auth.currentUser?.email||`unknownuser`),Wi(t)&&(t=this.auth.name)),`otpauth://totp/${t}:${e}?secret=${this.secretKey}&issuer=${t}&algorithm=${this.hashingAlgorithm}&digits=${this.codeLength}`}};function Wi(e){return e===void 0||e?.length===0}var Gi=`@firebase/auth`,Ki=`1.13.3`,qi=class{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;let t=this.auth.onIdTokenChanged(t=>{e(t?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();let t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){I(this.auth._initializationPromise,`dependent-sdk-initialized-before-auth`)}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}};function Ji(e){switch(e){case`Node`:return`node`;case`ReactNative`:return`rn`;case`Worker`:return`webworker`;case`Cordova`:return`cordova`;case`WebExtension`:return`web-extension`;default:return}}function Yi(e){v(new m(`auth`,(t,{options:n})=>{let r=t.getProvider(`app`).getImmediate(),i=t.getProvider(`heartbeat`),a=t.getProvider(`app-check-internal`),{apiKey:o,authDomain:s}=r.options;I(o&&!o.includes(`:`),`invalid-api-key`,{appName:r.name});let c=new Lt(r,i,a,{apiKey:o,authDomain:s,clientPlatform:e,apiHost:`identitytoolkit.googleapis.com`,tokenApiHost:`securetoken.googleapis.com`,apiScheme:`https`,sdkClientVersion:Mt(e)});return nn(c,n),c},`PUBLIC`).setInstantiationMode(`EXPLICIT`).setInstanceCreatedCallback((e,t,n)=>{e.getProvider(`auth-internal`).initialize()})),v(new m(`auth-internal`,e=>(e=>new qi(e))(Rt(e.getProvider(`auth`).getImmediate())),`PRIVATE`).setInstantiationMode(`EXPLICIT`)),y(Gi,Ki,Ji(e)),y(Gi,Ki,`esm2020`)}var Xi=d(`authIdTokenMaxAge`)||300,Zi=null,Qi=e=>async t=>{let n=t&&await t.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>Xi)return;let i=n?.token;Zi!==i&&(Zi=i,await fetch(e,{method:i?`POST`:`DELETE`,headers:i?{Authorization:`Bearer ${i}`}:{}}))};function $i(e=n()){let t=ne(e,`auth`);if(t.isInitialized())return t.getImmediate();let r=tn(e,{popupRedirectResolver:Li,persistence:[jr,tr,sr]}),i=d(`authTokenSyncURL`);if(i&&typeof isSecureContext==`boolean`&&isSecureContext){let e=new URL(i,location.origin);if(location.origin===e.origin){let t=Qi(e.toString());Wn(r,t,()=>t(r.currentUser)),Un(r,e=>t(e))}}let a=c(`auth`);return a&&rn(r,`http://${a}`),r}function ea(){return document.getElementsByTagName(`head`)?.[0]??document}Vt({loadJS(e){return new Promise((t,n)=>{let r=document.createElement(`script`);r.setAttribute(`src`,e),r.onload=t,r.onerror=e=>{let t=F(`internal-error`);t.customData=e,n(t)},r.type=`text/javascript`,r.charset=`UTF-8`,ea().appendChild(r)})},gapiScript:`https://apis.google.com/js/api.js`,recaptchaV2Script:`https://www.google.com/recaptcha/api.js`,recaptchaEnterpriseScript:`https://www.google.com/recaptcha/enterprise.js?render=`}),Yi(`Browser`);var ta={apiKey:`AIzaSyCnJTr2FPLcfzzgi9L1ln-5DtZrmN06d44`,authDomain:`pollrequest-bc2c1.firebaseapp.com`,projectId:`pollrequest-bc2c1`,storageBucket:`pollrequest-bc2c1.firebasestorage.app`,messagingSenderId:`730402309554`,appId:`1:730402309554:web:5d546b69515db5cb9150ab`,measurementId:`G-YH15T5QFGY`},na=()=>ta.apiKey!==`YOUR_API_KEY`,ra,V,ia;try{ra=ge(ta),V=w(ra),ia=$i(ra)}catch(e){console.warn(`Firebase initialization skipped — using demo mode.`,e.message)}var aa=[`a`,`b`,`c`,`d`,`e`,`f`],oa=[`A`,`B`,`C`,`D`,`E`,`F`],sa={BASE_POINTS:1e3,MAX_SPEED_BONUS:500,STREAK_BONUS_PER_LEVEL:100,STREAK_BONUS_MIN:3,STREAK_BONUS_MAX:500},ca=[`easy`,`medium`,`hard`],la=[{id:`light`,name:`Clean Light`},{id:`dark`,name:`Vibrant Dark`},{id:`colorful`,name:`Playful Colorful`}],ua={bug:{name:`Bug`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20v-9" />
  <path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" />
  <path d="M14.12 3.88 16 2" />
  <path d="M21 21a4 4 0 0 0-3.81-4" />
  <path d="M21 5a4 4 0 0 1-3.55 3.97" />
  <path d="M22 13h-4" />
  <path d="M3 21a4 4 0 0 1 3.81-4" />
  <path d="M3 5a4 4 0 0 0 3.55 3.97" />
  <path d="M6 13H2" />
  <path d="m8 2 1.88 1.88" />
  <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
</svg>
`},terminal:{name:`Terminal`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 19h8" />
  <path d="m4 17 6-6-6-6" />
</svg>
`},robot:{name:`Robot`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 8V4H8" />
  <rect width="16" height="12" x="4" y="8" rx="2" />
  <path d="M2 14h2" />
  <path d="M20 14h2" />
  <path d="M15 13v2" />
  <path d="M9 13v2" />
</svg>
`},gear:{name:`Gear`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
  <circle cx="12" cy="12" r="3" />
</svg>
`},satellite:{name:`Satellite`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5" />
  <path d="M16.5 7.5 19 5" />
  <path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5" />
  <path d="M9 21a6 6 0 0 0-6-6" />
  <path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z" />
</svg>
`},chip:{name:`Chip`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 20v2" />
  <path d="M12 2v2" />
  <path d="M17 20v2" />
  <path d="M17 2v2" />
  <path d="M2 12h2" />
  <path d="M2 17h2" />
  <path d="M2 7h2" />
  <path d="M20 12h2" />
  <path d="M20 17h2" />
  <path d="M20 7h2" />
  <path d="M7 20v2" />
  <path d="M7 2v2" />
  <rect x="4" y="4" width="16" height="16" rx="2" />
  <rect x="8" y="8" width="8" height="8" rx="1" />
</svg>
`},binary:{name:`Binary`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect x="14" y="14" width="4" height="6" rx="2" />
  <rect x="6" y="4" width="4" height="6" rx="2" />
  <path d="M6 20h4" />
  <path d="M14 10h4" />
  <path d="M6 14h2v6" />
  <path d="M14 4h2v6" />
</svg>
`},code:{name:`Code`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m16 18 6-6-6-6" />
  <path d="m8 6-6 6 6 6" />
</svg>
`},database:{name:`Database`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <ellipse cx="12" cy="5" rx="9" ry="3" />
  <path d="M3 5V19A9 3 0 0 0 21 19V5" />
  <path d="M3 12A9 3 0 0 0 21 12" />
</svg>
`},server:{name:`Server`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
  <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
  <line x1="6" x2="6.01" y1="6" y2="6" />
  <line x1="6" x2="6.01" y1="18" y2="18" />
</svg>
`},cpu:{name:`Microchip`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 12h4" />
  <path d="M10 17h4" />
  <path d="M10 7h4" />
  <path d="M18 12h2" />
  <path d="M18 18h2" />
  <path d="M18 6h2" />
  <path d="M4 12h2" />
  <path d="M4 18h2" />
  <path d="M4 6h2" />
  <rect x="6" y="2" width="12" height="20" rx="2" />
</svg>
`},monitor:{name:`Monitor`,category:`cs`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="20" height="14" x="2" y="3" rx="2" />
  <line x1="8" x2="16" y1="21" y2="21" />
  <line x1="12" x2="12" y1="17" y2="21" />
</svg>
`},fox:{name:`Pig`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11 17h3v2a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a3.16 3.16 0 0 0 2-2h1a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1h-1a5 5 0 0 0-2-4V3a4 4 0 0 0-3.2 1.6l-.3.4H11a6 6 0 0 0-6 6v1a5 5 0 0 0 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1z" />
  <path d="M16 10h.01" />
  <path d="M2 8v1a2 2 0 0 0 2 2h1" />
</svg>
`},owl:{name:`Shell`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M14 11a2 2 0 1 1-4 0 4 4 0 0 1 8 0 6 6 0 0 1-12 0 8 8 0 0 1 16 0 10 10 0 1 1-20 0 11.93 11.93 0 0 1 2.42-7.22 2 2 0 1 1 3.16 2.44" />
</svg>
`},cat:{name:`Cat`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
  <path d="M8 14v.5" />
  <path d="M16 14v.5" />
  <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
</svg>
`},dragon:{name:`Turtle`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m12 10 2 4v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3a8 8 0 1 0-16 0v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3l2-4h4Z" />
  <path d="M4.82 7.9 8 10" />
  <path d="M15.18 7.9 12 10" />
  <path d="M16.93 10H20a2 2 0 0 1 0 4H2" />
</svg>
`},shark:{name:`Fish`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.47-3.44 6-7 6s-7.56-2.53-8.5-6Z" />
  <path d="M18 12v.5" />
  <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
  <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
  <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
  <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
</svg>
`},wolf:{name:`Dog`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.25 16.25h1.5L12 17z" />
  <path d="M16 14v.5" />
  <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
  <path d="M8 14v.5" />
  <path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
</svg>
`},raven:{name:`Bird`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M16 7h.01" />
  <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20" />
  <path d="m20 7 2 .5-2 .5" />
  <path d="M10 18v3" />
  <path d="M14 17.75V21" />
  <path d="M7 18a6 6 0 0 0 3.84-10.61" />
</svg>
`},bear:{name:`Rabbit`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M13 16a3 3 0 0 1 2.24 5" />
  <path d="M18 12h.01" />
  <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
  <path d="M20 8.54V4a2 2 0 1 0-4 0v3" />
  <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
</svg>
`},rat:{name:`Feather`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z" />
  <path d="M16 8 2 22" />
  <path d="M17.5 15H9" />
</svg>
`},snail:{name:`Snail`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" />
  <circle cx="10" cy="13" r="8" />
  <path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" />
  <path d="M18 3 19.1 5.2" />
  <path d="M22 3 20.9 5.2" />
</svg>
`},worm:{name:`Bone`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />
</svg>
`},paw:{name:`Paw`,category:`animal`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="11" cy="4" r="2" />
  <circle cx="18" cy="8" r="2" />
  <circle cx="20" cy="16" r="2" />
  <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
</svg>
`},sword:{name:`Sword`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m11 19-6-6" />
  <path d="m5 21-2-2" />
  <path d="m8 16-4 4" />
  <path d="M9.5 17.5 21 6V3h-3L6.5 14.5" />
</svg>
`},shield:{name:`Shield`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
</svg>
`},crown:{name:`Crown`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
  <path d="M5 21h14" />
</svg>
`},diamond:{name:`Diamond`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10.5 3 8 9l4 13 4-13-2.5-6" />
  <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
  <path d="M2 9h20" />
</svg>
`},trophy:{name:`Trophy`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978" />
  <path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978" />
  <path d="M18 9h1.5a1 1 0 0 0 0-5H18" />
  <path d="M4 22h16" />
  <path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z" />
  <path d="M6 9H4.5a1 1 0 0 1 0-5H6" />
</svg>
`},dice:{name:`Dice`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
  <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
  <path d="M6 18h.01" />
  <path d="M10 14h.01" />
  <path d="M15 6h.01" />
  <path d="M18 9h.01" />
</svg>
`},compass:{name:`Compass`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z" />
</svg>
`},anchor:{name:`Anchor`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 6v16" />
  <path d="m19 13 2-1a9 9 0 0 1-18 0l2 1" />
  <path d="M9 11h6" />
  <circle cx="12" cy="4" r="2" />
</svg>
`},gamepad:{name:`Gamepad`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <line x1="6" x2="10" y1="11" y2="11" />
  <line x1="8" x2="8" y1="9" y2="13" />
  <line x1="15" x2="15.01" y1="12" y2="12" />
  <line x1="18" x2="18.01" y1="10" y2="10" />
  <path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z" />
</svg>
`},target:{name:`Target`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <circle cx="12" cy="12" r="6" />
  <circle cx="12" cy="12" r="2" />
</svg>
`},flag:{name:`Flag`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 22V4a1 1 0 0 1 .4-.8A6 6 0 0 1 8 2c3 0 5 2 7.333 2q2 0 3.067-.8A1 1 0 0 1 20 4v10a1 1 0 0 1-.4.8A6 6 0 0 1 16 16c-3 0-5-2-8-2a6 6 0 0 0-4 1.528" />
</svg>
`},medal:{name:`Medal`,category:`game`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15" />
  <path d="M11 12 5.12 2.2" />
  <path d="m13 12 5.88-9.8" />
  <path d="M8 7h8" />
  <circle cx="12" cy="17" r="5" />
  <path d="M12 18v-2h-.5" />
</svg>
`},rocket:{name:`Rocket`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
  <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
</svg>
`},lightning:{name:`Lightning`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
</svg>
`},star:{name:`Star`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />
</svg>
`},moon:{name:`Moon`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
</svg>
`},flame:{name:`Flame`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4" />
</svg>
`},comet:{name:`Orbit`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
  <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
  <circle cx="12" cy="12" r="3" />
  <circle cx="19" cy="5" r="2" />
  <circle cx="5" cy="19" r="2" />
</svg>
`},mountain:{name:`Mountain`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
</svg>
`},wave:{name:`Wave`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" />
  <path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" />
</svg>
`},cloud:{name:`Cloud`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
</svg>
`},sun:{name:`Sun`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="4" />
  <path d="M12 2v2" />
  <path d="M12 20v2" />
  <path d="m4.93 4.93 1.41 1.41" />
  <path d="m17.66 17.66 1.41 1.41" />
  <path d="M2 12h2" />
  <path d="M20 12h2" />
  <path d="m6.34 17.66-1.41 1.41" />
  <path d="m19.07 4.93-1.41 1.41" />
</svg>
`},telescope:{name:`Telescope`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
  <path d="m13.56 11.747 4.332-.924" />
  <path d="m16 21-3.105-6.21" />
  <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
  <path d="m6.158 8.633 1.114 4.456" />
  <path d="m8 21 3.105-6.21" />
  <circle cx="12" cy="13" r="2" />
</svg>
`},planet:{name:`Planet`,category:`space`,svg:`
<svg
 
  xmlns="http://www.w3.org/2000/svg"
 
 
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <circle cx="12" cy="12" r="10" />
  <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
  <path d="M2 12h20" />
</svg>
`}},da=Object.entries(ua).map(([e,t])=>({id:e,...t})),fa={play:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>`,pause:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`,skip:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 4 15 12 5 20 5 4"/><line x1="19" y1="5" x2="19" y2="19"/></svg>`,stop:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/></svg>`,plus:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,trash:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>`,edit:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,upload:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,download:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,arrowLeft:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>`,check:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,x:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,users:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,barChart:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,settings:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68 1.65 1.65 0 0010 3.17V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,questionMark:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,clock:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,target:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,trendUp:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,fileText:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,logOut:`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`};function H(e,t=24){let n=ua[e];return n?n.svg.replace(/<svg\s+/,`<svg width="${t}" height="${t}" `):``}function U(e,t=24){let n=fa[e];return n?n.replace(/<svg\s+/,`<svg width="${t}" height="${t}" `):``}var pa=C({applyTheme:()=>ha,createThemeSwitcher:()=>ma,loadSavedTheme:()=>ga});function ma(e,t={}){let{onChange:n=()=>{}}=t,r=document.documentElement.getAttribute(`data-theme`)||`light`;e.innerHTML=`
    <div class="theme-switcher">
      <select class="select" id="theme-select" style="min-width:160px;">
        ${la.map(e=>`
          <option value="${e.id}" ${e.id===r?`selected`:``}>
            ${e.name}
          </option>
        `).join(``)}
      </select>
    </div>
  `,e.querySelector(`#theme-select`).addEventListener(`change`,e=>{let t=e.target.value;ha(t),n(t)})}function ha(e){document.documentElement.setAttribute(`data-theme`,e),localStorage.setItem(`pollrequest_theme`,e)}function ga(){let e=localStorage.getItem(`pollrequest_theme`);return e?(ha(e),e):`light`}function _a(){let e=document.getElementById(`app`);e.innerHTML=`
    <div class="landing-screen screen">
      <div class="landing-bg"></div>
      <div class="landing-content">
        <div class="landing-logo">
          <div class="landing-logo__icon">
            ${U(`code`,48)}
          </div>
          <h1 class="landing-logo__text">
            <span class="text-gradient">PollRequest</span>
          </h1>
          <p class="landing-logo__tagline">Interactive CS quizzes for the classroom</p>
        </div>

        <div class="landing-buttons">
          <button class="landing-btn landing-btn--teacher card card--hover" id="btn-teacher">
            <div class="landing-btn__icon" style="background: var(--accent-primary);">
              ${U(`settings`,28)}
            </div>
            <div class="landing-btn__text">
              <span class="landing-btn__title">I'm the Teacher</span>
              <span class="landing-btn__desc">Host a session or manage questions</span>
            </div>
          </button>

          <button class="landing-btn landing-btn--student card card--hover" id="btn-student">
            <div class="landing-btn__icon" style="background: var(--accent-secondary);">
              ${U(`users`,28)}
            </div>
            <div class="landing-btn__text">
              <span class="landing-btn__title">I'm a Student</span>
              <span class="landing-btn__desc">Join a session with a code</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  `,va(),document.getElementById(`btn-teacher`).addEventListener(`click`,()=>{N.navigate(`/host/login`)}),document.getElementById(`btn-student`).addEventListener(`click`,()=>{N.navigate(`/player/join`)})}function va(){if(document.querySelector(`#landing-styles`))return;let e=document.createElement(`style`);e.id=`landing-styles`,e.textContent=`
    .landing-screen {
      height: 100vh;
      height: 100dvh;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
    }
    .landing-bg {
      position: absolute;
      inset: 0;
      background:
        radial-gradient(circle at 20% 20%, var(--accent-primary-soft) 0%, transparent 50%),
        radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.08) 0%, transparent 50%);
      z-index: 0;
    }
    .landing-content {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 3rem;
      padding: 2rem;
      max-width: 500px;
      width: 100%;
    }
    .landing-logo {
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }
    .landing-logo__icon {
      color: var(--accent-primary);
      animation: float 3s ease-in-out infinite;
    }
    .landing-logo__text {
      font-size: clamp(2.5rem, 7vw, 3.5rem);
      font-weight: 900;
      letter-spacing: -0.03em;
    }
    .landing-logo__tagline {
      font-size: 1.125rem;
      color: var(--text-secondary);
    }
    .landing-buttons {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
    }
    .landing-btn {
      display: flex;
      align-items: center;
      gap: 1.25rem;
      padding: 1.5rem;
      text-align: left;
      width: 100%;
      cursor: pointer;
    }
    .landing-btn__icon {
      width: 3.5rem;
      height: 3.5rem;
      border-radius: var(--radius-lg);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      flex-shrink: 0;
    }
    .landing-btn__text {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .landing-btn__title {
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-primary);
    }
    .landing-btn__desc {
      font-size: 0.875rem;
      color: var(--text-secondary);
    }
    .landing-footer {
      padding-top: 1rem;
    }
  `,document.head.appendChild(e)}function ya(e=6){let t=``;for(let n=0;n<e;n++)t+=`ABCDEFGHJKLMNPQRSTUVWXYZ23456789`[Math.floor(Math.random()*32)];return t}function ba(e){return e?(e.toDate?e.toDate():new Date(e)).toLocaleDateString(`en-US`,{month:`short`,day:`numeric`,year:`numeric`}):``}function xa(e){let t=document.createElement(`template`);return t.innerHTML=e.trim(),t.content.firstChild}async function Sa(e){if(window.crypto&&window.crypto.subtle){let t=new TextEncoder().encode(e),n=await crypto.subtle.digest(`SHA-256`,t);return Array.from(new Uint8Array(n)).map(e=>e.toString(16).padStart(2,`0`)).join(``)}else throw Error(`crypto.subtle is not available in insecure contexts`)}function W(e,t=`info`,n=3e3){let r=document.querySelector(`.toast-container`);r||(r=document.createElement(`div`),r.className=`toast-container`,document.body.appendChild(r));let i=xa(`
    <div class="toast toast--${t}">
      ${e}
    </div>
  `);r.appendChild(i),setTimeout(()=>{i.style.animation=`fadeOut 0.3s ease forwards`,setTimeout(()=>i.remove(),300)},n)}function Ca(e,t){if(!e.length)return``;let n=t||Object.keys(e[0]);return[n.join(`,`),...e.map(e=>n.map(t=>{let n=e[t]??``,r=String(n);return r.includes(`,`)||r.includes(`"`)?`"${r.replace(/"/g,`""`)}"`:r}).join(`,`))].join(`
`)}function wa(e,t,n=`text/csv`){let r=new Blob([e],{type:n}),i=URL.createObjectURL(r),a=document.createElement(`a`);a.href=i,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a),URL.revokeObjectURL(i)}var Ta=`config/admin`;async function Ea(){let e=document.getElementById(`app`);e.innerHTML=`
    <div class="join-screen screen">
      <button class="btn btn--ghost" id="btn-back" style="position:absolute;top:1rem;left:1rem;">
        ${U(`arrowLeft`,20)} Back
      </button>

      <div class="landing-logo" style="margin-bottom:2rem;">
        <h2>Teacher Login</h2>
        <p class="text-muted">Enter the admin password</p>
      </div>

      <div class="join-screen__form" id="login-form">
        <input
          type="password"
          class="input input--lg"
          id="admin-password"
          placeholder="Password"
          autocomplete="current-password"
          style="text-align:center;"
        />
        <button class="btn btn--primary btn--lg btn--full" id="btn-login">
          Enter
        </button>
        <div id="login-error" class="text-center" style="color:var(--error);font-size:0.875rem;min-height:1.25rem;"></div>
      </div>

      <div id="setup-section" style="display:none;width:100%;max-width:350px;">
        <div class="card" style="text-align:center;">
          <h3 style="margin-bottom:0.5rem;">First Time Setup</h3>
          <p class="text-muted text-sm" style="margin-bottom:1rem;">Create your admin password</p>
          <input
            type="password"
            class="input input--lg"
            id="new-password"
            placeholder="Create password"
            style="text-align:center;margin-bottom:0.75rem;"
          />
          <input
            type="password"
            class="input input--lg"
            id="confirm-password"
            placeholder="Confirm password"
            style="text-align:center;margin-bottom:1rem;"
          />
          <button class="btn btn--primary btn--full" id="btn-setup">Set Password</button>
        </div>
      </div>
    </div>
  `;let t=document.getElementById(`admin-password`),n=document.getElementById(`login-error`),r=document.getElementById(`login-form`),i=document.getElementById(`setup-section`),a=null;try{let e=await oe(D(V,Ta));e.exists()?a=e.data().passwordHash:(r.style.display=`none`,i.style.display=`block`)}catch(e){console.warn(`Could not check admin config:`,e.message),W(`Firebase not connected. Using dev mode.`,`warning`),setTimeout(()=>{sessionStorage.setItem(`pollrequest_host`,`true`),N.navigate(`/host/dashboard`)},500);return}document.getElementById(`btn-back`).addEventListener(`click`,()=>{N.navigate(`/`)}),document.getElementById(`btn-login`).addEventListener(`click`,async()=>{let e=t.value;if(!e){n.textContent=`Please enter a password`;return}try{await Sa(e)===a?(sessionStorage.setItem(`pollrequest_host`,`true`),N.navigate(`/host/dashboard`)):(n.textContent=`Incorrect password`,t.value=``,t.focus())}catch(e){console.warn(`Login hash failed (likely insecure context):`,e),W(`Insecure context detected. Bypassing login for dev mode.`,`warning`),sessionStorage.setItem(`pollrequest_host`,`true`),N.navigate(`/host/dashboard`)}}),t.addEventListener(`keydown`,e=>{e.key===`Enter`&&document.getElementById(`btn-login`).click()}),document.getElementById(`btn-setup`)?.addEventListener(`click`,async()=>{let e=document.getElementById(`new-password`).value,t=document.getElementById(`confirm-password`).value;if(!e||e.length<4){W(`Password must be at least 4 characters`,`error`);return}if(e!==t){W(`Passwords do not match`,`error`);return}try{let t=await Sa(e);await E(D(V,Ta),{passwordHash:t}),sessionStorage.setItem(`pollrequest_host`,`true`),W(`Admin password created!`,`success`),N.navigate(`/host/dashboard`)}catch(e){console.warn(`Setup hash failed (likely insecure context):`,e),W(`Insecure context detected. Bypassing setup for dev mode.`,`warning`),sessionStorage.setItem(`pollrequest_host`,`true`),N.navigate(`/host/dashboard`)}}),t?.focus()}var Da=`questions`;async function G(e=null){try{let t;return t=e?me(k(V,Da),he(`courseId`,`==`,e)):me(k(V,Da)),(await T(t)).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>{let n=e.createdAt?.toMillis?e.createdAt.toMillis():0;return(t.createdAt?.toMillis?t.createdAt.toMillis():0)-n})}catch(e){return console.error(`Error fetching questions:`,e),[]}}async function Oa(e){if(!e.length)return[];try{let t=[];for(let n=0;n<e.length;n+=30){let r=e.slice(n,n+30);(await T(me(k(V,Da),he(ae(),`in`,r)))).docs.forEach(e=>t.push({id:e.id,...e.data()}))}let n=new Map(t.map(e=>[e.id,e]));return e.map(e=>n.get(e)).filter(Boolean)}catch(e){return console.error(`Error fetching questions by IDs:`,e),[]}}async function ka(e=null){let t=await G(e);return[...new Set(t.map(e=>e.bank||e.category).filter(Boolean))].sort()}async function Aa(e,t=null){try{let n={courseId:t||`General`,bank:e.bank||`Custom Questions`,title:e.title||null,type:e.type||`Predict Output`,tags:Array.isArray(e.tags)?e.tags:[],text:e.text||``,codeSnippet:e.codeSnippet||null,codeSnippetMain:e.codeSnippetMain||null,codeLanguage:e.codeLanguage||null,choices:e.choices||[],multiSelect:e.multiSelect||!1,timeLimit:e.timeLimit||30,explanation:e.explanation||null,difficulty:e.difficulty||`medium`,createdAt:A(),updatedAt:A()};return{id:(await ue(k(V,Da),n)).id,...n}}catch(e){throw console.error(`Error creating question:`,e),e}}async function ja(e,t){try{return await O(D(V,Da,e),{...t,updatedAt:A()}),!0}catch(e){throw console.error(`Error updating question:`,e),e}}async function Ma(e){try{return await pe(D(V,Da,e)),!0}catch(e){throw console.error(`Error deleting question:`,e),e}}async function Na(e,t){try{let n=(await G(e)).filter(e=>(e.bank||e.category||`Custom Questions`)===t),r=re(V);return n.forEach(e=>{let t=D(V,Da,e.id);r.delete(t)}),await r.commit(),!0}catch(e){throw console.error(`Error deleting bank:`,e),e}}async function Pa(e=null){try{let t=await G(e);if(!t.length)return 0;let n=[];for(let e=0;e<t.length;e+=500)n.push(t.slice(e,e+500));for(let e of n){let t=re(V);e.forEach(e=>{t.delete(D(V,Da,e.id))}),await t.commit()}return t.length}catch(e){throw console.error(`Error deleting all questions:`,e),e}}async function Fa(e,t=null){try{let n=re(V),r=[];return e.forEach(e=>{let i=D(k(V,Da));n.set(i,{courseId:e.courseId||t||`General`,bank:e.bank||`Imported Questions`,title:e.title||null,type:e.type||`Predict Output`,tags:Array.isArray(e.tags)?e.tags:[],text:e.text||``,codeSnippet:e.codeSnippet||null,codeSnippetMain:e.codeSnippetMain||null,codeLanguage:e.codeLanguage||null,choices:e.choices||[],multiSelect:e.multiSelect||!1,timeLimit:e.timeLimit||30,explanation:e.explanation||null,difficulty:e.difficulty||`medium`,createdAt:A(),updatedAt:A()}),r.push(i.id)}),await n.commit(),r}catch(e){throw console.error(`Error batch importing questions:`,e),e}}var Ia=C({hostStore:()=>q,sessionStore:()=>Ra,userStore:()=>K});function La(e={}){let t=new Map,n={...e},r=new Proxy(n,{set(e,n,r){let i=e[n];return e[n]=r,t.has(n)&&t.get(n).forEach(e=>e(r,i)),t.has(`*`)&&t.get(`*`).forEach(e=>e(n,r,i)),!0},get(e,t){return e[t]}});return{state:r,subscribe(e,n){return t.has(e)||t.set(e,new Set),t.get(e).add(n),()=>{t.get(e).delete(n),t.get(e).size===0&&t.delete(e)}},update(e){Object.entries(e).forEach(([e,t])=>{r[e]=t})},getState(){return{...n}},reset(){Object.keys(n).forEach(e=>{delete n[e]}),Object.entries(e).forEach(([e,t])=>{r[e]=t})},clearListeners(){t.clear()}}}var K=La({uid:null,name:null,icon:null,isHost:!1,isAuthenticated:!1}),Ra=La({sessionId:null,joinCode:null,status:null,currentQuestionIndex:-1,currentQuestionState:null,questionIds:[],players:{},timerEnd:null,timerPaused:!1,timerRemaining:null,currentQuestion:null,responses:[],theme:`light`});La({currentScreen:null,loading:!1,error:null});var q=La({activeCourseId:localStorage.getItem(`pollrequest_courseId`)||null});q.subscribe(`activeCourseId`,e=>{e?localStorage.setItem(`pollrequest_courseId`,e):localStorage.removeItem(`pollrequest_courseId`)});var za=`modulepreload`,Ba=function(e){return`/PollRequest/`+e},Va={},J=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=Ba(t,n),t=s(t),t in Va)return;Va[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:za,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Ha=C({advanceQuestion:()=>Za,cleanupListeners:()=>ao,createSession:()=>Ga,deleteAllQuestionAnalytics:()=>lo,deleteAllSessions:()=>so,deleteQuestionAnalytics:()=>co,deleteSession:()=>oo,endSession:()=>no,findSessionByCode:()=>Ka,getAllSessions:()=>ro,getSessionResponses:()=>io,joinSession:()=>qa,leaveSession:()=>Ja,listenToResponses:()=>Xa,listenToSession:()=>Ya,pauseTimer:()=>Qa,resumeTimer:()=>$a,showResults:()=>eo,submitAnswer:()=>to}),Y=`sessions`,Ua=null,Wa=null;async function Ga(e,t,n=null){try{let r=ya(),i={courseId:n||`General`,name:e||`Session ${new Date().toLocaleDateString()}`,status:`lobby`,joinCode:r,currentQuestionIndex:-1,currentQuestionState:null,questionIds:t||[],timerEnd:null,timerPaused:!1,timerRemaining:null,players:{},createdAt:A()},a=await ue(k(V,Y),i);return Ra.update({sessionId:a.id,joinCode:r,status:`lobby`,currentQuestionIndex:-1,currentQuestionState:null,questionIds:t||[],players:{}}),{id:a.id,joinCode:r}}catch(e){throw console.error(`Error creating session:`,e),e}}async function Ka(e){try{let t=await T(me(k(V,Y),he(`joinCode`,`==`,e.toUpperCase()),he(`status`,`in`,[`lobby`,`active`,`reviewing`])));if(t.empty)return null;let n=t.docs[0];return{id:n.id,...n.data()}}catch(e){return console.error(`Error finding session:`,e),null}}async function qa(e,t){try{let n=D(V,Y,e),r=await oe(n);if(r.exists()){let e=r.data().players||{};if(Object.entries(e).find(([e,n])=>e!==t.uid&&n.name.toLowerCase()===t.name.toLowerCase()))throw Error(`name_taken`)}return await O(n,{[`players.${t.uid}`]:{name:t.name,icon:t.icon,points:0,joinedAt:A()}}),Ra.update({sessionId:e}),!0}catch(e){throw console.error(`Error joining session:`,e),e}}async function Ja(e,t){try{return await O(D(V,Y,e),{[`players.${t}`]:le()}),!0}catch(e){return console.error(`Error leaving session:`,e),!1}}function Ya(e,t){return Ua&&=(Ua(),null),Ua=de(D(V,Y,e),e=>{if(!e.exists()){t(null);return}let n={id:e.id,...e.data()};Ra.update({sessionId:n.id,joinCode:n.joinCode,status:n.status,currentQuestionIndex:n.currentQuestionIndex,currentQuestionState:n.currentQuestionState,questionIds:n.questionIds,players:n.players||{},timerEnd:n.timerEnd,timerPaused:n.timerPaused,timerRemaining:n.timerRemaining,theme:n.theme||`light`}),t(n)}),Ua}function Xa(e,t){return Wa&&=(Wa(),null),Wa=de(k(V,Y,e,`responses`),e=>{t(e.docs.map(e=>({id:e.id,...e.data()})))}),Wa}async function Za(e,t){try{let n=D(V,Y,e),r=((await oe(n)).data().currentQuestionIndex??-1)+1;return await O(n,{currentQuestionIndex:r,currentQuestionState:`accepting`,timerEnd:ie.fromDate(new Date(Date.now()+t*1e3)),timerPaused:!1,timerRemaining:null}),r}catch(e){throw console.error(`Error advancing question:`,e),e}}async function Qa(e,t){try{await O(D(V,Y,e),{timerPaused:!0,timerRemaining:t,timerEnd:null})}catch(e){console.error(`Error pausing timer:`,e)}}async function $a(e,t){try{let n=ie.fromDate(new Date(Date.now()+t*1e3));await O(D(V,Y,e),{timerPaused:!1,timerRemaining:null,timerEnd:n})}catch(e){console.error(`Error resuming timer:`,e)}}async function eo(e){try{await O(D(V,Y,e),{currentQuestionState:`results`,timerEnd:null,timerPaused:!1})}catch(e){console.error(`Error showing results:`,e)}}async function to(e,t){try{await ue(k(V,Y,e,`responses`),{questionId:t.questionId,questionIndex:t.questionIndex,studentUid:t.studentUid,selectedChoices:t.selectedChoices,correct:t.correct,responseTime:t.responseTime,pointsEarned:t.pointsEarned,questionText:t.questionText||``,questionTitle:t.questionTitle||null,questionType:t.questionType||`Predict Output`,questionTags:t.questionTags||[],questionBank:t.questionBank||`Custom Questions`,questionDifficulty:t.questionDifficulty||`medium`,selectedChoiceTexts:t.selectedChoiceTexts||[],questionChoices:t.questionChoices||[],questionCodeSnippet:t.questionCodeSnippet||null,questionExplanation:t.questionExplanation||null,answeredAt:A()});let n=D(V,Y,e),r=((await oe(n)).data().players||{})[t.studentUid];return r&&await O(n,{[`players.${t.studentUid}.points`]:(r.points||0)+t.pointsEarned}),!0}catch(e){throw console.error(`Error submitting answer:`,e),e}}async function no(e){try{await O(D(V,Y,e),{status:`ended`,currentQuestionState:null,timerEnd:null})}catch(e){console.error(`Error ending session:`,e)}}async function ro(e=null){try{let t;return t=e?me(k(V,Y),he(`courseId`,`==`,e)):me(k(V,Y)),(await T(t)).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error(`Error fetching sessions:`,e),[]}}async function io(e){try{return(await T(k(V,Y,e,`responses`))).docs.map(e=>({id:e.id,...e.data()}))}catch(e){return console.error(`Error fetching responses:`,e),[]}}function ao(){Ua&&=(Ua(),null),Wa&&=(Wa(),null)}async function oo(e){let{deleteDoc:t}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{let n=(await T(k(V,Y,e,`responses`))).docs.map(n=>t(D(V,Y,e,`responses`,n.id)));await Promise.all(n),await t(D(V,Y,e))}catch(e){throw console.error(`Error deleting session:`,e),e}}async function so(){let{deleteDoc:e}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{let t=await T(k(V,Y));for(let n of t.docs){let t=n.id,r=(await T(k(V,Y,t,`responses`))).docs.map(n=>e(D(V,Y,t,`responses`,n.id)));await Promise.all(r),await e(D(V,Y,t))}}catch(e){throw console.error(`Error deleting all sessions:`,e),e}}async function co(e){let{deleteDoc:t}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{let n=await T(k(V,Y));for(let r of n.docs){let n=r.id,i=(await T(me(k(V,Y,n,`responses`),he(`questionId`,`==`,e)))).docs.map(e=>t(D(V,Y,n,`responses`,e.id)));await Promise.all(i)}}catch(e){throw console.error(`Error deleting question analytics:`,e),e}}async function lo(){let{deleteDoc:e}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{let t=await T(k(V,Y));for(let n of t.docs){let t=n.id,r=(await T(k(V,Y,t,`responses`))).docs.map(n=>e(D(V,Y,t,`responses`,n.id)));await Promise.all(r)}}catch(e){throw console.error(`Error deleting all question analytics:`,e),e}}var uo=`students`;async function fo(){return new Promise((e,t)=>{let n=Gn(ia,async r=>{if(n(),r)e(r.uid);else try{e((await Ln(ia)).user.uid)}catch(e){console.error(`Auth error:`,e),t(e)}})})}async function po(){return await ia.signOut(),(await Ln(ia)).user.uid}async function mo(e){try{let t=await oe(D(V,uo,e));return t.exists()?{uid:t.id,...t.data()}:null}catch(e){return console.error(`Error getting profile:`,e),null}}async function ho(e,t){try{let n=await T(me(k(V,uo),he(`name`,`==`,e),he(`icon`,`==`,t)));if(!n.empty){let e=n.docs[0];return{uid:e.id,...e.data()}}return null}catch(e){return console.error(`Error reclaiming profile:`,e),null}}function go(){let e=localStorage.getItem(`pollrequest_uid`),t=localStorage.getItem(`pollrequest_name`),n=localStorage.getItem(`pollrequest_icon`);return e&&t&&n?{uid:e,name:t,icon:n}:null}async function _o(){localStorage.removeItem(`pollrequest_uid`),localStorage.removeItem(`pollrequest_name`),localStorage.removeItem(`pollrequest_icon`);try{await ia.signOut()}catch(e){console.error(`Error signing out:`,e)}}async function vo(e=null){try{let t=(await T(k(V,uo))).docs.map(e=>({uid:e.id,...e.data()}));return e&&(t=t.filter(t=>t.courseStats&&t.courseStats[e])),t}catch(e){return console.error(`Error fetching students:`,e),[]}}async function yo(e,t,n=`General`){try{let r=D(V,uo,e),i=await oe(r),a=i.exists()?i.data():{uid:e,stats:{},courseStats:{}},o=e=>{let n=e||{},r=(n.totalAnswered||0)+t.answered,i=(n.totalCorrect||0)+t.correct,a=(n.totalPoints||0)+t.points,o=(n.sessionsAttended||0)+1,s=(n.averageResponseTime||0)*(n.totalAnswered||0),c=r>0?(s+t.totalResponseTime)/r:0;return{totalAnswered:r,totalCorrect:i,totalPoints:a,averageResponseTime:Math.round(c),sessionsAttended:o,currentStreak:t.finalStreak||0,bestStreak:Math.max(n.bestStreak||0,t.bestStreak||0)}},s=o(a.stats),c=o((a.courseStats||{})[n]);await E(r,{uid:e,name:t.name||a.name||`Unknown`,icon:t.icon||a.icon||`ghost`,stats:s,courseStats:{[n]:c},lastSeen:A()},{merge:!0})}catch(e){console.error(`Error updating student stats:`,e)}}async function bo(e){let{deleteDoc:t}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{await t(D(V,uo,e))}catch(e){throw console.error(`Error deleting student:`,e),e}}async function xo(){let{deleteDoc:e}=await J(async()=>{let{deleteDoc:e}=await import(`./index.esm-ClPCguc7.js`).then(e=>e.t);return{deleteDoc:e}},[]);try{let t=(await T(k(V,uo))).docs.map(t=>e(D(V,uo,t.id)));await Promise.all(t)}catch(e){throw console.error(`Error deleting all students:`,e),e}}var So=C({createCourse:()=>Eo,deleteCourse:()=>Oo,ensureDefaultCourse:()=>ko,getAllCourses:()=>To,getCourseById:()=>wo,updateCourse:()=>Do}),Co=`courses`;async function wo(e){try{let t=await oe(D(V,Co,e));return t.exists()?{id:t.id,...t.data()}:null}catch(e){return console.error(`Error fetching course:`,e),null}}async function To(){try{return(await T(k(V,Co))).docs.map(e=>({id:e.id,...e.data()})).sort((e,t)=>{let n=e.createdAt?.toMillis?e.createdAt.toMillis():e.createdAt||0;return(t.createdAt?.toMillis?t.createdAt.toMillis():t.createdAt||0)-n})}catch(e){return console.error(`Error fetching courses:`,e),[]}}async function Eo(e){try{return(await ue(k(V,Co),{...e,createdAt:A()})).id}catch(e){throw console.error(`Error creating course:`,e),e}}async function Do(e,t){try{await O(D(V,Co,e),t)}catch(e){throw console.error(`Error updating course:`,e),e}}async function Oo(e){try{await pe(D(V,Co,e))}catch(e){throw console.error(`Error deleting course:`,e),e}}async function ko(){try{let e=await To();return e.length===0?{id:await Eo({name:`General`,description:`Default fallback course`}),name:`General`}:e[e.length-1]}catch(e){return console.error(`Failed to ensure default course:`,e),{id:`default`,name:`General`}}}function X(e={}){let{title:t=``,content:n=``,confirmText:r=`Confirm`,cancelText:i=`Cancel`,onConfirm:a=()=>{},onCancel:o=()=>{},showCancel:s=!0,danger:c=!1,size:l=`normal`}=e,u=l===`large`?`modal__content--large`:l===`small`?`modal__content--small`:``,d=document.createElement(`div`);d.className=`modal-overlay`,d.innerHTML=`
    <div class="modal__content ${u}" role="dialog" aria-modal="true">
      ${t?`<div class="modal__header">
        <h3 class="modal__title">${t}</h3>
        <button class="btn btn--icon modal__close" id="modal-close-btn" aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>`:``}
      <div class="modal__body">
        ${typeof n==`string`?n:``}
      </div>
      <div class="modal__footer">
        ${s?`<button class="btn btn--secondary" id="modal-cancel-btn">${i}</button>`:``}
        <button class="btn ${c?`btn--danger`:`btn--primary`}" id="modal-confirm-btn">${r}</button>
      </div>
    </div>
  `,typeof n!=`string`&&d.querySelector(`.modal__body`).appendChild(n),document.body.appendChild(d),requestAnimationFrame(()=>{d.classList.add(`modal-overlay--visible`)});function f(){d.classList.remove(`modal-overlay--visible`),document.body.style.userSelect=m,document.body.style.webkitUserSelect=h,setTimeout(()=>d.remove(),200)}d.querySelector(`#modal-confirm-btn`)?.addEventListener(`click`,async()=>{try{await a()!==!1&&f()}catch(e){console.error(`Modal onConfirm error:`,e)}}),d.querySelector(`#modal-cancel-btn`)?.addEventListener(`click`,()=>{o(),f()}),d.querySelector(`#modal-close-btn`)?.addEventListener(`click`,()=>{o(),f()}),d.addEventListener(`mousedown`,e=>{e.target===d&&(o(),f())});let p=e=>{e.key===`Escape`&&(o(),f(),document.removeEventListener(`keydown`,p))};if(document.addEventListener(`keydown`,p),!document.querySelector(`#modal-styles`)){let e=document.createElement(`style`);e.id=`modal-styles`,e.textContent=`
      .modal-overlay {
        position: fixed;
        inset: 0;
        background: var(--bg-overlay);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.2s ease;
        padding: 1rem;
        user-select: none;
        -webkit-user-select: none;
      }
      .modal-overlay--visible {
        opacity: 1;
      }
      .modal-overlay--visible .modal__content {
        transform: scale(1) translateY(0);
      }
      .modal__content {
        background: var(--bg-secondary);
        border: 1px solid var(--border-color);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        width: 100%;
        max-width: 480px;
        max-height: 90vh;
        overflow-y: auto;
        transform: scale(0.95) translateY(10px);
        transition: transform 0.25s ease;
        user-select: none;
        -webkit-user-select: none;
      }
      .modal__content input,
      .modal__content textarea,
      .modal__content .live-editor-container {
        user-select: text;
        -webkit-user-select: text;
      }
      .modal__content--large { 
        max-width: 800px;
        min-width: 480px;
      }
      .modal__content--small { max-width: 360px; }
      .modal__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1.25rem 1.5rem;
        border-bottom: 1px solid var(--border-color);
      }
      .modal__title {
        font-size: 1.125rem;
        font-weight: 700;
      }
      .modal__body {
        padding: 1.5rem;
      }
      .modal__footer {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--border-color);
      }
    `,document.head.appendChild(e)}let m=document.body.style.userSelect,h=document.body.style.webkitUserSelect;return document.body.style.userSelect=`none`,document.body.style.webkitUserSelect=`none`,{close:f,element:d}}async function Ao(e=null){await ko();let t=await To(),n=q.state.activeCourseId;(!n||!t.find(e=>e.id===n))&&(n=t[0]?.id,q.update({activeCourseId:n}));let r=t.map(e=>`
    <option value="${e.id}" ${e.id===n?`selected`:``}>
      ${e.name}
    </option>
  `).join(``),i=`
    <header class="host-header">
      <div class="host-header__brand" style="cursor:pointer;" id="hh-brand">
        ${U(`code`,28)}
        <span class="text-gradient">PollRequest</span>
      </div>
      
      <div class="host-header__center" style="display: flex; gap: 0.5rem; align-items: center;">
        <select id="hh-course-select" class="input" style="width: 200px; padding: 0.5rem; background: var(--bg-elevated); border: 1px solid var(--border-color); color: var(--text-primary); border-radius: var(--radius-md);">
          ${t.length===0?`<option value="" disabled selected>No courses found</option>`:``}
          ${r}
        </select>
        <button class="btn btn--icon btn--ghost" id="hh-new-course" title="Add Course" style="padding: 0.5rem;">
          ${U(`plus`,20)}
        </button>
        <button class="btn btn--icon btn--ghost" id="hh-manage-courses" title="Manage Course" style="padding: 0.5rem;">
          ${U(`settings`,20)}
        </button>
      </div>

      <div class="host-header__actions">
        <button class="btn btn--secondary" id="hh-logout">
          ${U(`logOut`,20)}
          Logout
        </button>
      </div>
    </header>
  `;if(e){let t=document.getElementById(e);t&&(t.innerHTML=i)}return i}document.addEventListener(`click`,async e=>{if(e.target&&((e.target.id===`hh-brand`||e.target.closest(`#hh-brand`))&&N.navigate(`/host/dashboard`),(e.target.id===`hh-logout`||e.target.closest(`#hh-logout`))&&(sessionStorage.removeItem(`pollrequest_host`),N.navigate(`/host/login`)),(e.target.id===`hh-new-course`||e.target.closest(`#hh-new-course`))&&(X({title:`Create New Course`,content:`
          <div style="margin-bottom: 1rem;">
            <label class="label">Course Name</label>
            <input type="text" id="new-course-name" class="input" placeholder="e.g. CSCD 210" autocomplete="off" />
          </div>
        `,confirmText:`Create`,onConfirm:async()=>{let e=document.getElementById(`new-course-name`),t=e?e.value.trim():``;if(t)try{let e=await Eo({name:t});q.update({activeCourseId:e}),window.location.reload()}catch{alert(`Failed to create course. Check your Firestore permissions.`)}}}),setTimeout(()=>document.getElementById(`new-course-name`)?.focus(),100)),e.target.id===`hh-manage-courses`||e.target.closest(`#hh-manage-courses`))){if(!q.state.activeCourseId){X({title:`Error`,content:`No active course to manage.`,showCancel:!1});return}let e=(await To()).find(e=>e.id===q.state.activeCourseId);e&&(X({title:`Manage Course`,content:`
            <div style="margin-bottom: 1rem;">
              <label class="label">Rename Course</label>
              <div style="display:flex; gap:0.5rem;">
                <input type="text" id="rename-course-input" class="input" value="${e.name}" autocomplete="off" />
                <button class="btn btn--primary" id="btn-rename-course">Save</button>
              </div>
            </div>
            <hr style="border-color: var(--border-color); margin: 1.5rem 0;" />
            <div style="margin-bottom: 1rem;">
              <label class="label" style="color: var(--error);">Danger Zone</label>
              <p style="font-size: 0.875rem; color: var(--text-secondary); margin-bottom: 0.5rem;">
                Deleting a course will not delete the questions, but they will be orphaned.
              </p>
              <button class="btn btn--danger" id="btn-delete-course">Delete Course</button>
            </div>
          `,showCancel:!1,confirmText:`Done`,onConfirm:()=>{}}),setTimeout(()=>{document.getElementById(`btn-rename-course`)?.addEventListener(`click`,async()=>{let t=document.getElementById(`rename-course-input`)?.value.trim();if(t&&t!==e.name)try{let{updateCourse:n}=await J(async()=>{let{updateCourse:e}=await Promise.resolve().then(()=>So);return{updateCourse:e}},void 0);await n(e.id,{name:t}),window.location.reload()}catch{alert(`Failed to rename course.`)}}),document.getElementById(`btn-delete-course`)?.addEventListener(`click`,()=>{let t=document.querySelector(`.modal-overlay--visible #modal-confirm-btn`);t&&t.click(),setTimeout(()=>{X({title:`Delete Course?`,content:`Are you SURE you want to delete "${e.name}"?`,danger:!0,confirmText:`Yes, Delete`,onConfirm:async()=>{try{let{deleteCourse:t}=await J(async()=>{let{deleteCourse:e}=await Promise.resolve().then(()=>So);return{deleteCourse:e}},void 0);await t(e.id),q.update({activeCourseId:null}),window.location.reload()}catch{alert(`Failed to delete course.`)}}})},300)})},100))}}),document.addEventListener(`change`,async e=>{if(e.target&&e.target.id===`hh-course-select`){let t=e.target.value;t&&(q.update({activeCourseId:t}),window.location.reload())}});async function jo(){let e=document.getElementById(`app`),t=await Ao(),n=0,r=0,i=0;try{let e=q.state.activeCourseId,[t,a,o]=await Promise.all([G(e),ro(e),vo(e)]);n=t.length,r=a.filter(e=>e.status===`ended`).length,i=o.length}catch(e){console.warn(`Could not load dashboard stats:`,e.message)}e.innerHTML=`
    <div class="host-layout screen">
      ${t}

      <main class="host-content">
        <div class="container">
          <div style="margin-bottom:2rem;">
            <h2>Dashboard</h2>
            <p class="text-muted">Welcome back. What would you like to do?</p>
          </div>

          <div class="dashboard-grid">
            <div class="card card--hover dashboard-card" id="card-new-session">
              <div class="dashboard-card__icon" style="background:var(--accent-primary);">
                ${U(`play`,24)}
              </div>
              <div>
                <div class="dashboard-card__title">New Session</div>
                <div class="dashboard-card__desc">Start a live quiz session for your class</div>
              </div>
            </div>

            <div class="card card--hover dashboard-card" id="card-questions">
              <div class="dashboard-card__icon" style="background:var(--accent-secondary);">
                ${U(`fileText`,24)}
              </div>
              <div>
                <div class="dashboard-card__title">Manage Questions</div>
                <div class="dashboard-card__desc">${n} question${n===1?``:`s`} in the bank</div>
              </div>
            </div>

            <div class="card card--hover dashboard-card" id="card-analytics">
              <div class="dashboard-card__icon" style="background:var(--success);">
                ${U(`barChart`,24)}
              </div>
              <div>
                <div class="dashboard-card__title">Analytics</div>
                <div class="dashboard-card__desc">${i} student${i===1?``:`s`} tracked across ${r} session${r===1?``:`s`}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`card-new-session`).addEventListener(`click`,()=>{N.navigate(`/host/session-setup`)}),document.getElementById(`card-questions`).addEventListener(`click`,()=>{N.navigate(`/host/questions`)}),document.getElementById(`card-analytics`).addEventListener(`click`,()=>{N.navigate(`/host/analytics`)})}async function Mo(){let e=document.getElementById(`app`),t=[],n=``,r=new Set;try{n=await Ao();let e=q.state.activeCourseId;t=await G(e)}catch(e){console.warn(`Could not load questions:`,e)}let i=new Set;function a(){let a={};t.forEach(e=>{let t=e.bank||e.category||`Custom Questions`;a[t]||(a[t]=[]),a[t].push(e)});let s=Object.keys(a).sort();e.innerHTML=`
      <div class="host-layout screen">
        ${n}
        <div class="screen-subheader" style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
          <button class="btn btn--ghost btn--sm" id="btn-back">
            ${U(`arrowLeft`,18)} Dashboard
          </button>
          <h3 style="margin: 0;">New Session</h3>
          <button class="btn btn--primary btn--sm" id="btn-start" ${i.size===0?`disabled`:``}>
            ${U(`play`,16)} Start Session
          </button>
        </div>

        <main class="host-content">
          <div class="session-setup container">
            <div class="input-group" style="margin-bottom:1.5rem;">
              <label for="session-name">Session Name</label>
              <input class="input" id="session-name" placeholder="e.g., Week 3 - Loops" value="Session ${new Date().toLocaleDateString()}" />
            </div>

            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
              <h4>Select Questions <span class="badge badge--primary" id="selected-count">${i.size} selected</span></h4>
              <div style="display:flex;gap:0.5rem;">
                <button class="btn btn--ghost btn--sm" id="btn-select-all">Select All</button>
                <button class="btn btn--ghost btn--sm" id="btn-select-none">Clear All</button>
              </div>
            </div>

            ${t.length===0?`
              <div class="empty-state">
                <div class="empty-state__icon">${U(`fileText`,48)}</div>
                <div class="empty-state__title">No questions yet</div>
                <div class="empty-state__text">Add questions from the Question Manager first.</div>
                <button class="btn btn--primary" id="btn-go-questions" style="margin-top:1rem;">
                  Go to Question Manager
                </button>
              </div>
            `:`
              <div class="session-setup__question-list" id="question-list">
                ${s.map((e,t)=>{let n=r.has(e),o=`bank-setup-${t}`,s={};a[e].forEach(e=>{let t=e.type||`Uncategorized`;s[t]||(s[t]=[]),s[t].push(e)});let c=Object.keys(s).sort();return`
                  <div class="setup-bank-group" style="margin-bottom: 1.5rem;">
                    <div class="bank-header" data-bank="${Z(e)}" data-target="${o}" style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.5rem; padding-bottom:0.5rem; border-bottom:1px solid var(--border-color); cursor:pointer; user-select:none;">
                      <div style="display:flex; align-items:center; gap:0.5rem;">
                        <span class="bank-chevron" style="display:inline-flex; align-items:center; justify-content:center; width:20px; height:20px; transition:transform 0.2s; transform:${n?`rotate(-90deg)`:`rotate(0)`}; color:var(--text-secondary);">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </span>
                        <h5 style="margin:0;">${Z(e)} <span class="text-muted text-sm" style="font-weight:normal; margin-left:0.5rem;">(${a[e].length})</span></h5>
                      </div>
                      <div style="display:flex; gap:0.5rem;">
                        <button class="btn btn--ghost btn--sm btn-select-bank" data-bank="${Z(e)}" onclick="event.stopPropagation()">Select Bank</button>
                        <button class="btn btn--ghost btn--sm btn-clear-bank-sel" data-bank="${Z(e)}" onclick="event.stopPropagation()">Clear Bank</button>
                      </div>
                    </div>
                    <div id="${o}" style="display:${n?`none`:`flex`};flex-direction:column;gap:0.5rem;padding-left:1.5rem;">
                      ${c.map(t=>`
                        <div style="margin-top: 1.5rem; margin-bottom: 0.5rem; font-weight: 700; font-size: 0.85rem; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">
                          ${Z(t)}
                        </div>
                        ${s[t].map(t=>`
                          <label class="session-question-item" data-id="${t.id}" style="gap: 1rem; padding: 0.75rem 1rem;">
                            <input type="checkbox" class="question-checkbox custom-checkbox" data-bank="${Z(e)}" value="${t.id}" ${i.has(t.id)?`checked`:``} />
                            <div style="flex:1;display:flex;flex-direction:column;gap:0.25rem;">
                              ${t.title?`<span style="font-weight:700;font-size:1rem;color:var(--text-primary);">${Z(t.title)}</span>`:``}
                              <span class="session-question-item__text" style="font-weight:${t.title?`400`:`500`};font-size:0.95rem;color:var(--text-primary);">
                                ${Z(t.text.length>80?t.text.substring(0,80)+`...`:t.text)}
                              </span>
                              <div style="display:flex;gap:0.35rem;flex-wrap:wrap;margin-top:0.25rem;">
                                ${(t.tags||[]).map(e=>`<span class="badge badge--neutral" style="font-size:0.7rem;">${Z(e)}</span>`).join(``)}
                                ${t.codeSnippet?`<span class="badge badge--neutral" style="font-size:0.7rem;">&lt;/&gt; Code</span>`:``}
                              </div>
                            </div>
                            <div class="session-question-item__meta">
                              <span class="badge ${t.difficulty===`easy`?`badge--success`:t.difficulty===`hard`?`badge--error`:`badge--warning`}">${t.difficulty||`medium`}</span>
                              <span class="text-muted text-sm">${t.timeLimit||30}s</span>
                            </div>
                          </label>
                        `).join(``)}
                      `).join(``)}
                    </div>
                  </div>
                  `}).join(``)}
              </div>
            `}
          </div>
        </main>
      </div>
    `,o()}function o(){let e=document.getElementById(`btn-start`),t=document.getElementById(`selected-count`);function n(){t.textContent=`${i.size} selected`,e.disabled=i.size===0}document.querySelectorAll(`.question-checkbox`).forEach(e=>{e.addEventListener(`change`,()=>{e.checked?i.add(e.value):i.delete(e.value),n()})}),document.getElementById(`btn-select-all`)?.addEventListener(`click`,()=>{document.querySelectorAll(`.question-checkbox`).forEach(e=>{e.checked=!0,i.add(e.value)}),n()}),document.getElementById(`btn-select-none`)?.addEventListener(`click`,()=>{document.querySelectorAll(`.question-checkbox`).forEach(e=>{e.checked=!1}),i.clear(),n()}),document.querySelectorAll(`.bank-header`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bank,n=e.dataset.target,i=document.getElementById(n),a=e.querySelector(`.bank-chevron`);r.has(t)?(r.delete(t),i.style.display=`flex`,e.style.borderBottom=`1px solid var(--border-color)`,a&&(a.style.transform=`rotate(0)`)):(r.add(t),i.style.display=`none`,e.style.borderBottom=`none`,a&&(a.style.transform=`rotate(-90deg)`))})}),document.querySelectorAll(`.btn-select-bank`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bank;document.querySelectorAll(`.question-checkbox[data-bank="${Z(t)}"]`).forEach(e=>{e.checked=!0,i.add(e.value)}),n()})}),document.querySelectorAll(`.btn-clear-bank-sel`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bank;document.querySelectorAll(`.question-checkbox[data-bank="${Z(t)}"]`).forEach(e=>{e.checked=!1,i.delete(e.value)}),n()})}),e.addEventListener(`click`,async()=>{let t=document.getElementById(`session-name`).value.trim();if(i.size===0){W(`Select at least one question`,`warning`);return}e.disabled=!0,e.innerHTML=`<div class="spinner spinner--sm"></div> Creating...`;try{let{id:e,joinCode:n}=await Ga(t,[...i],q.state.activeCourseId);N.navigate(`/host/lobby/${e}`)}catch(t){W(`Failed to create session: `+t.message,`error`),e.disabled=!1,e.innerHTML=`${U(`play`,18)} Start Session`}}),document.getElementById(`btn-back`).addEventListener(`click`,()=>{N.navigate(`/host/dashboard`)}),document.getElementById(`btn-go-questions`)?.addEventListener(`click`,()=>{N.navigate(`/host/questions`)})}a()}function Z(e){let t=document.createElement(`span`);return t.textContent=e,t.innerHTML}async function No(e){let t=document.getElementById(`app`),n=e.id;if(!n){N.navigate(`/host/dashboard`);return}t.innerHTML=`
    <div class="lobby-screen screen">
      <div style="position:absolute;top:1.5rem;right:1.5rem;">
        <button class="btn btn--ghost btn--sm" id="btn-end-lobby">
          ${U(`x`,18)} End
        </button>
      </div>

      <h2 style="color:var(--text-secondary);font-size:1.25rem;font-weight:600;">Join at</h2>
      <div class="lobby-url" id="lobby-url">Loading...</div>

      <div style="color:var(--text-secondary);font-size:1.25rem;">Enter code</div>
      <div class="lobby-code" id="lobby-code">------</div>

      <div class="lobby-player-count" id="player-count">
        Waiting for students to join...
      </div>

      <div class="lobby-players" id="player-list"></div>

      <button class="btn btn--primary btn--xl" id="btn-start-game" style="margin-top:2rem;" disabled>
        ${U(`play`,22)} Start Game
      </button>
    </div>
  `;let r=document.getElementById(`lobby-code`),i=document.getElementById(`lobby-url`),a=document.getElementById(`player-count`),o=document.getElementById(`player-list`),s=document.getElementById(`btn-start-game`),c=[];i.textContent=window.location.origin+window.location.pathname;let l=Ya(n,async e=>{if(!e)return;r.textContent=e.joinCode||`------`;let t=e.players||{},n=Object.keys(t).length;if(a.textContent=`${n} student${n===1?``:`s`} joined`,s.disabled=n===0,o.innerHTML=Object.entries(t).map(([e,t])=>`
      <div class="lobby-player">
        <span class="lobby-player__icon">${H(t.icon,20)}</span>
        <span>${Po(t.name)}</span>
      </div>
    `).join(``),e.questionIds&&c.length===0)try{c=await Oa(e.questionIds)}catch(e){console.warn(`Could not preload questions:`,e)}});return s.addEventListener(`click`,async()=>{if(c.length===0&&Ra.state.questionIds?.length>0&&(c=await Oa(Ra.state.questionIds)),c.length!==0)try{await Za(n,c[0]?.timeLimit||30),N.navigate(`/host/game/${n}`)}catch(e){console.error(`Failed to start game:`,e)}}),document.getElementById(`btn-end-lobby`).addEventListener(`click`,()=>{l(),N.navigate(`/host/dashboard`)}),()=>l()}function Po(e){let t=document.createElement(`span`);return t.textContent=e,t.innerHTML}function Fo({correct:e,responseTimeMs:t,timeLimitMs:n,currentStreak:r=0,multiSelect:i=!1,correctPicks:a=0,totalCorrect:o=1}){if(!e&&!i)return{points:0,breakdown:{base:0,speed:0,streak:0,total:0},newStreak:0};let s=sa.BASE_POINTS;if(i){if(a===0)return{points:0,breakdown:{base:0,speed:0,streak:0,total:0},newStreak:0};s=Math.round(a/o*sa.BASE_POINTS)}let c=1-Math.min(t/n,1),l=Math.round(sa.MAX_SPEED_BONUS*c),u=i&&a<o?0:r+1,d=0;if(u>=sa.STREAK_BONUS_MIN){let e=u-sa.STREAK_BONUS_MIN+1;d=Math.min(e*sa.STREAK_BONUS_PER_LEVEL,sa.STREAK_BONUS_MAX)}let f=s+l+d;return{points:f,breakdown:{base:s,speed:l,streak:d,total:f},newStreak:u}}function Io(e,t,n=!1){let r=t.map((e,t)=>e.isCorrect?t:-1).filter(e=>e!==-1);if(n){let t=e.filter(e=>r.includes(e)).length,n=e.filter(e=>!r.includes(e)).length,i=Math.max(0,t-n);return{correct:i===r.length&&n===0,correctPicks:i,totalCorrect:r.length}}let i=e.length===1&&r.includes(e[0]);return{correct:i,correctPicks:+!!i,totalCorrect:1}}function Lo(e){return Object.entries(e).map(([e,t])=>({uid:e,name:t.name,icon:t.icon,points:t.points||0})).sort((e,t)=>t.points-e.points)}var Ro=g(x(((e,t)=>{var n=function(e){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,r={},i={manual:e.Prism&&e.Prism.manual,disableWorkerMessageHandler:e.Prism&&e.Prism.disableWorkerMessageHandler,util:{encode:function e(t){return t instanceof a?new a(t.type,e(t.content),t.alias):Array.isArray(t)?t.map(e):t.replace(/&/g,`&amp;`).replace(/</g,`&lt;`).replace(/\u00a0/g,` `)},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function e(t,n){n||={};var r,a;switch(i.util.type(t)){case`Object`:if(a=i.util.objId(t),n[a])return n[a];for(var o in r={},n[a]=r,t)t.hasOwnProperty(o)&&(r[o]=e(t[o],n));return r;case`Array`:return a=i.util.objId(t),n[a]?n[a]:(r=[],n[a]=r,t.forEach(function(t,i){r[i]=e(t,n)}),r);default:return t}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return`none`},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,`gi`),``),e.classList.add(`language-`+n)},currentScript:function(){if(typeof document>`u`)return null;if(document.currentScript&&document.currentScript.tagName===`SCRIPT`)return document.currentScript;try{throw Error()}catch(r){var e=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(r.stack)||[])[1];if(e){var t=document.getElementsByTagName(`script`);for(var n in t)if(t[n].src==e)return t[n]}return null}},isActive:function(e,t,n){for(var r=`no-`+t;e;){var i=e.classList;if(i.contains(t))return!0;if(i.contains(r))return!1;e=e.parentElement}return!!n}},languages:{plain:r,plaintext:r,text:r,txt:r,extend:function(e,t){var n=i.util.clone(i.languages[e]);for(var r in t)n[r]=t[r];return n},insertBefore:function(e,t,n,r){r||=i.languages;var a=r[e],o={};for(var s in a)if(a.hasOwnProperty(s)){if(s==t)for(var c in n)n.hasOwnProperty(c)&&(o[c]=n[c]);n.hasOwnProperty(s)||(o[s]=a[s])}var l=r[e];return r[e]=o,i.languages.DFS(i.languages,function(t,n){n===l&&t!=e&&(this[t]=o)}),o},DFS:function e(t,n,r,a){a||={};var o=i.util.objId;for(var s in t)if(t.hasOwnProperty(s)){n.call(t,s,t[s],r||s);var c=t[s],l=i.util.type(c);l===`Object`&&!a[o(c)]?(a[o(c)]=!0,e(c,n,null,a)):l===`Array`&&!a[o(c)]&&(a[o(c)]=!0,e(c,n,s,a))}}},plugins:{},highlightAll:function(e,t){i.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var r={callback:n,container:e,selector:`code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code`};i.hooks.run(`before-highlightall`,r),r.elements=Array.prototype.slice.apply(r.container.querySelectorAll(r.selector)),i.hooks.run(`before-all-elements-highlight`,r);for(var a=0,o;o=r.elements[a++];)i.highlightElement(o,t===!0,r.callback)},highlightElement:function(t,n,r){var a=i.util.getLanguage(t),o=i.languages[a];i.util.setLanguage(t,a);var s=t.parentElement;s&&s.nodeName.toLowerCase()===`pre`&&i.util.setLanguage(s,a);var c={element:t,language:a,grammar:o,code:t.textContent};function l(e){c.highlightedCode=e,i.hooks.run(`before-insert`,c),c.element.innerHTML=c.highlightedCode,i.hooks.run(`after-highlight`,c),i.hooks.run(`complete`,c),r&&r.call(c.element)}if(i.hooks.run(`before-sanity-check`,c),s=c.element.parentElement,s&&s.nodeName.toLowerCase()===`pre`&&!s.hasAttribute(`tabindex`)&&s.setAttribute(`tabindex`,`0`),!c.code){i.hooks.run(`complete`,c),r&&r.call(c.element);return}if(i.hooks.run(`before-highlight`,c),!c.grammar){l(i.util.encode(c.code));return}if(n&&e.Worker){var u=new Worker(i.filename);u.onmessage=function(e){l(e.data)},u.postMessage(JSON.stringify({language:c.language,code:c.code,immediateClose:!0}))}else l(i.highlight(c.code,c.grammar,c.language))},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};if(i.hooks.run(`before-tokenize`,r),!r.grammar)throw Error(`The language "`+r.language+`" has no grammar.`);return r.tokens=i.tokenize(r.code,r.grammar),i.hooks.run(`after-tokenize`,r),a.stringify(i.util.encode(r.tokens),r.language)},tokenize:function(e,t){var n=t.rest;if(n){for(var r in n)t[r]=n[r];delete t.rest}var i=new c;return l(i,i.head,e),s(e,i,t,i.head,0),d(i)},hooks:{all:{},add:function(e,t){var n=i.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=i.hooks.all[e];if(!(!n||!n.length))for(var r=0,a;a=n[r++];)a(t)}},Token:a};e.Prism=i;function a(e,t,n,r){this.type=e,this.content=t,this.alias=n,this.length=(r||``).length|0}a.stringify=function e(t,n){if(typeof t==`string`)return t;if(Array.isArray(t)){var r=``;return t.forEach(function(t){r+=e(t,n)}),r}var a={type:t.type,content:e(t.content,n),tag:`span`,classes:[`token`,t.type],attributes:{},language:n},o=t.alias;o&&(Array.isArray(o)?Array.prototype.push.apply(a.classes,o):a.classes.push(o)),i.hooks.run(`wrap`,a);var s=``;for(var c in a.attributes)s+=` `+c+`="`+(a.attributes[c]||``).replace(/"/g,`&quot;`)+`"`;return`<`+a.tag+` class="`+a.classes.join(` `)+`"`+s+`>`+a.content+`</`+a.tag+`>`};function o(e,t,n,r){e.lastIndex=t;var i=e.exec(n);if(i&&r&&i[1]){var a=i[1].length;i.index+=a,i[0]=i[0].slice(a)}return i}function s(e,t,n,r,c,d){for(var f in n)if(!(!n.hasOwnProperty(f)||!n[f])){var p=n[f];p=Array.isArray(p)?p:[p];for(var m=0;m<p.length;++m){if(d&&d.cause==f+`,`+m)return;var h=p[m],g=h.inside,_=!!h.lookbehind,v=!!h.greedy,y=h.alias;if(v&&!h.pattern.global){var ee=h.pattern.toString().match(/[imsuy]*$/)[0];h.pattern=RegExp(h.pattern.source,ee+`g`)}for(var te=h.pattern||h,b=r.next,x=c;b!==t.tail&&!(d&&x>=d.reach);x+=b.value.length,b=b.next){var S=b.value;if(t.length>e.length)return;if(!(S instanceof a)){var C=1,w;if(v){if(w=o(te,x,e,_),!w||w.index>=e.length)break;var T=w.index,ne=w.index+w[0].length,E=x;for(E+=b.value.length;T>=E;)b=b.next,E+=b.value.length;if(E-=b.value.length,x=E,b.value instanceof a)continue;for(var re=b;re!==t.tail&&(E<ne||typeof re.value==`string`);re=re.next)C++,E+=re.value.length;C--,S=e.slice(x,E),w.index-=x}else if(w=o(te,0,S,_),!w)continue;var T=w.index,ie=w[0],ae=S.slice(0,T),D=S.slice(T+ie.length),oe=x+S.length;d&&oe>d.reach&&(d.reach=oe);var se=b.prev;ae&&(se=l(t,se,ae),x+=ae.length),u(t,se,C);var ce=new a(f,g?i.tokenize(ie,g):ie,y,ie);if(b=l(t,se,ce),D&&l(t,b,D),C>1){var O={cause:f+`,`+m,reach:oe};s(e,t,n,b.prev,x,O),d&&O.reach>d.reach&&(d.reach=O.reach)}}}}}}function c(){var e={value:null,prev:null,next:null},t={value:null,prev:e,next:null};e.next=t,this.head=e,this.tail=t,this.length=0}function l(e,t,n){var r=t.next,i={value:n,prev:t,next:r};return t.next=i,r.prev=i,e.length++,i}function u(e,t,n){for(var r=t.next,i=0;i<n&&r!==e.tail;i++)r=r.next;t.next=r,r.prev=t,e.length-=i}function d(e){for(var t=[],n=e.head.next;n!==e.tail;)t.push(n.value),n=n.next;return t}if(!e.document)return e.addEventListener&&(i.disableWorkerMessageHandler||e.addEventListener(`message`,function(t){var n=JSON.parse(t.data),r=n.language,a=n.code,o=n.immediateClose;e.postMessage(i.highlight(a,i.languages[r],r)),o&&e.close()},!1)),i;var f=i.util.currentScript();f&&(i.filename=f.src,f.hasAttribute(`data-manual`)&&(i.manual=!0));function p(){i.manual||i.highlightAll()}if(!i.manual){var m=document.readyState;m===`loading`||m===`interactive`&&f&&f.defer?document.addEventListener(`DOMContentLoaded`,p):window.requestAnimationFrame?window.requestAnimationFrame(p):window.setTimeout(p,16)}return i}(typeof window<`u`?window:typeof WorkerGlobalScope<`u`&&self instanceof WorkerGlobalScope?self:{});t!==void 0&&t.exports&&(t.exports=n),typeof global<`u`&&(global.Prism=n),n.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:`attr-equals`},{pattern:/^(\s*)["']|["']$/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:`named-entity`},/&#x?[\da-f]{1,8};/i]},n.languages.markup.tag.inside[`attr-value`].inside.entity=n.languages.markup.entity,n.languages.markup.doctype.inside[`internal-subset`].inside=n.languages.markup,n.hooks.add(`wrap`,function(e){e.type===`entity`&&(e.attributes.title=e.content.replace(/&amp;/,`&`))}),Object.defineProperty(n.languages.markup.tag,"addInlined",{value:function(e,t){var r={};r[`language-`+t]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:n.languages[t]},r.cdata=/^<!\[CDATA\[|\]\]>$/i;var i={"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:r}};i[`language-`+t]={pattern:/[\s\S]+/,inside:n.languages[t]};var a={};a[e]={pattern:RegExp(`(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[\\s\\S])*?(?=<\\/__>)`.replace(/__/g,function(){return e}),`i`),lookbehind:!0,greedy:!0,inside:i},n.languages.insertBefore(`markup`,`cdata`,a)}}),Object.defineProperty(n.languages.markup.tag,"addAttribute",{value:function(e,t){n.languages.markup.tag.inside[`special-attr`].push({pattern:RegExp(`(^|["'\\s])(?:`+e+`)\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s'">=]+(?=[\\s>]))`,`i`),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[t,`language-`+t],inside:n.languages[t]},punctuation:[{pattern:/^=/,alias:`attr-equals`},/"|'/]}}}})}}),n.languages.html=n.languages.markup,n.languages.mathml=n.languages.markup,n.languages.svg=n.languages.markup,n.languages.xml=n.languages.extend(`markup`,{}),n.languages.ssml=n.languages.xml,n.languages.atom=n.languages.xml,n.languages.rss=n.languages.xml,(function(e){var t=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:RegExp(`@[\\w-](?:[^;{\\s"']|\\s+(?!\\s)|`+t.source+`)*?(?:;|(?=\\s*\\{))`),inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:`selector`},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp(`\\burl\\((?:`+t.source+`|(?:[^\\\\\\r\\n()"']|\\\\[\\s\\S])*)\\)`,`i`),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp(`^`+t.source+`$`),alias:`url`}}},selector:{pattern:RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|`+t.source+`)*(?=\\s*\\{)`),lookbehind:!0},string:{pattern:t,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css;var n=e.languages.markup;n&&(n.tag.addInlined(`style`,`css`),n.tag.addAttribute(`style`,`css`))})(n),n.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},n.languages.javascript=n.languages.extend(`clike`,{"class-name":[n.languages.clike[`class-name`],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(`(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])`),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),n.languages.javascript[`class-name`][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,n.languages.insertBefore(`javascript`,`keyword`,{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:`language-regex`,inside:n.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:`function`},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:n.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:n.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:n.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:n.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),n.languages.insertBefore(`javascript`,`string`,{hashbang:{pattern:/^#!.*/,greedy:!0,alias:`comment`},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:`string`},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:`punctuation`},rest:n.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:`property`}}),n.languages.insertBefore(`javascript`,`operator`,{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:`property`}}),n.languages.markup&&(n.languages.markup.tag.addInlined(`script`,`javascript`),n.languages.markup.tag.addAttribute(`on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)`,`javascript`)),n.languages.js=n.languages.javascript,(function(){if(n===void 0||typeof document>`u`)return;Element.prototype.matches||(Element.prototype.matches=Element.prototype.msMatchesSelector||Element.prototype.webkitMatchesSelector);var e=`Loading…`,t=function(e,t){return`✖ Error `+e+` while fetching file: `+t},r=`✖ Error: File does not exist or is empty`,i={js:`javascript`,py:`python`,rb:`ruby`,ps1:`powershell`,psm1:`powershell`,sh:`bash`,bat:`batch`,h:`c`,tex:`latex`},a=`data-src-status`,o=`loading`,s=`loaded`,c=`failed`,l=`pre[data-src]:not([`+a+`="`+s+`"]):not([`+a+`="`+o+`"])`;function u(e,n,i){var a=new XMLHttpRequest;a.open(`GET`,e,!0),a.onreadystatechange=function(){a.readyState==4&&(a.status<400&&a.responseText?n(a.responseText):a.status>=400?i(t(a.status,a.statusText)):i(r))},a.send(null)}function d(e){var t=/^\s*(\d+)\s*(?:(,)\s*(?:(\d+)\s*)?)?$/.exec(e||``);if(t){var n=Number(t[1]),r=t[2],i=t[3];return r?i?[n,Number(i)]:[n,void 0]:[n,n]}}n.hooks.add(`before-highlightall`,function(e){e.selector+=`, `+l}),n.hooks.add(`before-sanity-check`,function(t){var r=t.element;if(r.matches(l)){t.code=``,r.setAttribute(a,o);var f=r.appendChild(document.createElement(`CODE`));f.textContent=e;var p=r.getAttribute(`data-src`),m=t.language;if(m===`none`){var h=(/\.(\w+)$/.exec(p)||[,`none`])[1];m=i[h]||h}n.util.setLanguage(f,m),n.util.setLanguage(r,m);var g=n.plugins.autoloader;g&&g.loadLanguages(m),u(p,function(e){r.setAttribute(a,s);var t=d(r.getAttribute(`data-range`));if(t){var i=e.split(/\r\n?|\n/g),o=t[0],c=t[1]==null?i.length:t[1];o<0&&(o+=i.length),o=Math.max(0,Math.min(o-1,i.length)),c<0&&(c+=i.length),c=Math.max(0,Math.min(c,i.length)),e=i.slice(o,c).join(`
`),r.hasAttribute(`data-start`)||r.setAttribute(`data-start`,String(o+1))}f.textContent=e,n.highlightElement(f)},function(e){r.setAttribute(a,c),f.textContent=e})}}),n.plugins.fileHighlight={highlight:function(e){for(var t=(e||document).querySelectorAll(l),r=0,i;i=t[r++];)n.highlightElement(i)}};var f=!1;n.fileHighlight=function(){f||=(console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead."),!0),n.plugins.fileHighlight.highlight.apply(this,arguments)}})()}))(),1);(function(e){var t=/\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|exports|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|module|native|new|non-sealed|null|open|opens|package|permits|private|protected|provides|public|record(?!\s*[(){}[\]<>=%~.:,;?+\-*/&|^])|requires|return|sealed|short|static|strictfp|super|switch|synchronized|this|throw|throws|to|transient|transitive|try|uses|var|void|volatile|while|with|yield)\b/,n=`(?:[a-z]\\w*\\s*\\.\\s*)*(?:[A-Z]\\w*\\s*\\.\\s*)*`,r={pattern:RegExp(`(^|[^\\w.])`+n+`[A-Z](?:[\\d_A-Z]*[a-z]\\w*)?\\b`),lookbehind:!0,inside:{namespace:{pattern:/^[a-z]\w*(?:\s*\.\s*[a-z]\w*)*(?:\s*\.)?/,inside:{punctuation:/\./}},punctuation:/\./}};e.languages.java=e.languages.extend(`clike`,{string:{pattern:/(^|[^\\])"(?:\\.|[^"\\\r\n])*"/,lookbehind:!0,greedy:!0},"class-name":[r,{pattern:RegExp(`(^|[^\\w.])`+n+`[A-Z]\\w*(?=\\s+\\w+\\s*[;,=()]|\\s*(?:\\[[\\s,]*\\]\\s*)?::\\s*new\\b)`),lookbehind:!0,inside:r.inside},{pattern:RegExp(`(\\b(?:class|enum|extends|implements|instanceof|interface|new|record|throws)\\s+)`+n+`[A-Z]\\w*\\b`),lookbehind:!0,inside:r.inside}],keyword:t,function:[e.languages.clike.function,{pattern:/(::\s*)[a-z_]\w*/,lookbehind:!0}],number:/\b0b[01][01_]*L?\b|\b0x(?:\.[\da-f_p+-]+|[\da-f_]+(?:\.[\da-f_p+-]+)?)\b|(?:\b\d[\d_]*(?:\.[\d_]*)?|\B\.\d[\d_]*)(?:e[+-]?\d[\d_]*)?[dfl]?/i,operator:{pattern:/(^|[^.])(?:<<=?|>>>?=?|->|--|\+\+|&&|\|\||::|[?:~]|[-+*/%&|^!=<>]=?)/m,lookbehind:!0},constant:/\b[A-Z][A-Z_\d]+\b/}),e.languages.insertBefore(`java`,`string`,{"triple-quoted-string":{pattern:/"""[ \t]*[\r\n](?:(?:"|"")?(?:\\.|[^"\\]))*"""/,greedy:!0,alias:`string`},char:{pattern:/'(?:\\.|[^'\\\r\n]){1,6}'/,greedy:!0}}),e.languages.insertBefore(`java`,`class-name`,{annotation:{pattern:/(^|[^.])@\w+(?:\s*\.\s*\w+)*/,lookbehind:!0,alias:`punctuation`},generics:{pattern:/<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&)|<(?:[\w\s,.?]|&(?!&))*>)*>)*>)*>/,inside:{"class-name":r,keyword:t,punctuation:/[<>(),.:]/,operator:/[?&|]/}},import:[{pattern:RegExp(`(\\bimport\\s+)`+n+`(?:[A-Z]\\w*|\\*)(?=\\s*;)`),lookbehind:!0,inside:{namespace:r.inside.namespace,punctuation:/\./,operator:/\*/,"class-name":/\w+/}},{pattern:RegExp(`(\\bimport\\s+static\\s+)`+n+`(?:\\w+|\\*)(?=\\s*;)`),lookbehind:!0,alias:`static`,inside:{namespace:r.inside.namespace,static:/\b\w+$/,punctuation:/\./,operator:/\*/,"class-name":/\w+/}}],namespace:{pattern:RegExp(`(\\b(?:exports|import(?:\\s+static)?|module|open|opens|package|provides|requires|to|transitive|uses|with)\\s+)(?!<keyword>)[a-z]\\w*(?:\\.[a-z]\\w*)*\\.?`.replace(/<keyword>/g,function(){return t.source})),lookbehind:!0,inside:{punctuation:/\./}}})})(Prism),Prism.languages.python={comment:{pattern:/(^|[^\\])#.*/,lookbehind:!0,greedy:!0},"string-interpolation":{pattern:/(?:f|fr|rf)(?:("""|''')[\s\S]*?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,greedy:!0,inside:{interpolation:{pattern:/((?:^|[^{])(?:\{\{)*)\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}]|\{(?!\{)(?:[^{}])+\})+\})+\}/,lookbehind:!0,inside:{"format-spec":{pattern:/(:)[^:(){}]+(?=\}$)/,lookbehind:!0},"conversion-option":{pattern:/![sra](?=[:}]$)/,alias:`punctuation`},rest:null}},string:/[\s\S]+/}},"triple-quoted-string":{pattern:/(?:[rub]|br|rb)?("""|''')[\s\S]*?\1/i,greedy:!0,alias:`string`},string:{pattern:/(?:[rub]|br|rb)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,greedy:!0},function:{pattern:/((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,lookbehind:!0},"class-name":{pattern:/(\bclass\s+)\w+/i,lookbehind:!0},decorator:{pattern:/(^[\t ]*)@\w+(?:\.\w+)*/m,lookbehind:!0,alias:[`annotation`,`punctuation`],inside:{punctuation:/\./}},keyword:/\b(?:_(?=\s*:)|and|as|assert|async|await|break|case|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|match|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,builtin:/\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,boolean:/\b(?:False|None|True)\b/,number:/\b0(?:b(?:_?[01])+|o(?:_?[0-7])+|x(?:_?[a-f0-9])+)\b|(?:\b\d+(?:_\d+)*(?:\.(?:\d+(?:_\d+)*)?)?|\B\.\d+(?:_\d+)*)(?:e[+-]?\d+(?:_\d+)*)?j?(?!\w)/i,operator:/[-+%=]=?|!=|:=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,punctuation:/[{}[\];(),.:]/},Prism.languages.python[`string-interpolation`].inside.interpolation.inside.rest=Prism.languages.python,Prism.languages.py=Prism.languages.python,Prism.languages.javascript=Prism.languages.extend(`clike`,{"class-name":[Prism.languages.clike[`class-name`],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp(`(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])`),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript[`class-name`][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore(`javascript`,`keyword`,{regex:{pattern:RegExp(`((?:^|[^$\\w\\xA0-\\uFFFF."'\\])\\s]|\\b(?:return|yield))\\s*)\\/(?:(?:\\[(?:[^\\]\\\\\\r\\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.|\\[(?:[^[\\]\\\\\\r\\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\\r\\n])+\\/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/)*(?:$|[\\r\\n,.;:})\\]]|\\/\\/))`),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:`language-regex`,inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:`function`},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore(`javascript`,`string`,{hashbang:{pattern:/^#!.*/,greedy:!0,alias:`comment`},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:`string`},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:`punctuation`},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:`property`}}),Prism.languages.insertBefore(`javascript`,`operator`,{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:`property`}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined(`script`,`javascript`),Prism.languages.markup.tag.addAttribute(`on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)`,`javascript`)),Prism.languages.js=Prism.languages.javascript,Prism.languages.c=Prism.languages.extend(`clike`,{comment:{pattern:/\/\/(?:[^\r\n\\]|\\(?:\r\n?|\n|(?![\r\n])))*|\/\*[\s\S]*?(?:\*\/|$)/,greedy:!0},string:{pattern:/"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"/,greedy:!0},"class-name":{pattern:/(\b(?:enum|struct)\s+(?:__attribute__\s*\(\([\s\S]*?\)\)\s*)?)\w+|\b[a-z]\w*_t\b/,lookbehind:!0},keyword:/\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|__attribute__|asm|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|inline|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|typeof|union|unsigned|void|volatile|while)\b/,function:/\b[a-z_]\w*(?=\s*\()/i,number:/(?:\b0x(?:[\da-f]+(?:\.[\da-f]*)?|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?)[ful]{0,4}/i,operator:/>>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/}),Prism.languages.insertBefore(`c`,`string`,{char:{pattern:/'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n]){0,32}'/,greedy:!0}}),Prism.languages.insertBefore(`c`,`string`,{macro:{pattern:/(^[\t ]*)#\s*[a-z](?:[^\r\n\\/]|\/(?!\*)|\/\*(?:[^*]|\*(?!\/))*\*\/|\\(?:\r\n|[\s\S]))*/im,lookbehind:!0,greedy:!0,alias:`property`,inside:{string:[{pattern:/^(#\s*include\s*)<[^>]+>/,lookbehind:!0},Prism.languages.c.string],char:Prism.languages.c.char,comment:Prism.languages.c.comment,"macro-name":[{pattern:/(^#\s*define\s+)\w+\b(?!\()/i,lookbehind:!0},{pattern:/(^#\s*define\s+)\w+\b(?=\()/i,lookbehind:!0,alias:`function`}],directive:{pattern:/^(#\s*)[a-z]+/,lookbehind:!0,alias:`keyword`},"directive-hash":/^#/,punctuation:/##|\\(?=[\r\n])/,expression:{pattern:/\S[\s\S]*/,inside:Prism.languages.c}}}}),Prism.languages.insertBefore(`c`,`function`,{constant:/\b(?:EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|__DATE__|__FILE__|__LINE__|__TIMESTAMP__|__TIME__|__func__|stderr|stdin|stdout)\b/}),delete Prism.languages.c.boolean,(function(e){var t=/\b(?:alignas|alignof|asm|auto|bool|break|case|catch|char|char16_t|char32_t|char8_t|class|co_await|co_return|co_yield|compl|concept|const|const_cast|consteval|constexpr|constinit|continue|decltype|default|delete|do|double|dynamic_cast|else|enum|explicit|export|extern|final|float|for|friend|goto|if|import|inline|int|int16_t|int32_t|int64_t|int8_t|long|module|mutable|namespace|new|noexcept|nullptr|operator|override|private|protected|public|register|reinterpret_cast|requires|return|short|signed|sizeof|static|static_assert|static_cast|struct|switch|template|this|thread_local|throw|try|typedef|typeid|typename|uint16_t|uint32_t|uint64_t|uint8_t|union|unsigned|using|virtual|void|volatile|wchar_t|while)\b/,n=`\\b(?!<keyword>)\\w+(?:\\s*\\.\\s*\\w+)*\\b`.replace(/<keyword>/g,function(){return t.source});e.languages.cpp=e.languages.extend(`c`,{"class-name":[{pattern:RegExp(`(\\b(?:class|concept|enum|struct|typename)\\s+)(?!<keyword>)\\w+`.replace(/<keyword>/g,function(){return t.source})),lookbehind:!0},/\b[A-Z]\w*(?=\s*::\s*\w+\s*\()/,/\b[A-Z_]\w*(?=\s*::\s*~\w+\s*\()/i,/\b\w+(?=\s*<(?:[^<>]|<(?:[^<>]|<[^<>]*>)*>)*>\s*::\s*\w+\s*\()/],keyword:t,number:{pattern:/(?:\b0b[01']+|\b0x(?:[\da-f']+(?:\.[\da-f']*)?|\.[\da-f']+)(?:p[+-]?[\d']+)?|(?:\b[\d']+(?:\.[\d']*)?|\B\.[\d']+)(?:e[+-]?[\d']+)?)[ful]{0,4}/i,greedy:!0},operator:/>>=?|<<=?|->|--|\+\+|&&|\|\||[?:~]|<=>|[-+*/%&|^!=<>]=?|\b(?:and|and_eq|bitand|bitor|not|not_eq|or|or_eq|xor|xor_eq)\b/,boolean:/\b(?:false|true)\b/}),e.languages.insertBefore(`cpp`,`string`,{module:{pattern:RegExp(`(\\b(?:import|module)\\s+)(?:"(?:\\\\(?:\\r\\n|[\\s\\S])|[^"\\\\\\r\\n])*"|<[^<>\\r\\n]*>|`+`<mod-name>(?:\\s*:\\s*<mod-name>)?|:\\s*<mod-name>`.replace(/<mod-name>/g,function(){return n})+`)`),lookbehind:!0,greedy:!0,inside:{string:/^[<"][\s\S]+/,operator:/:/,punctuation:/\./}},"raw-string":{pattern:/R"([^()\\ ]{0,16})\([\s\S]*?\)\1"/,alias:`string`,greedy:!0}}),e.languages.insertBefore(`cpp`,`keyword`,{"generic-function":{pattern:/\b(?!operator\b)[a-z_]\w*\s*<(?:[^<>]|<[^<>]*>)*>(?=\s*\()/i,inside:{function:/^\w+/,generic:{pattern:/<[\s\S]+/,alias:`class-name`,inside:e.languages.cpp}}}}),e.languages.insertBefore(`cpp`,`operator`,{"double-colon":{pattern:/::/,alias:`punctuation`}}),e.languages.insertBefore(`cpp`,`class-name`,{"base-clause":{pattern:/(\b(?:class|struct)\s+\w+\s*:\s*)[^;{}"'\s]+(?:\s+[^;{}"'\s]+)*(?=\s*[;{])/,lookbehind:!0,greedy:!0,inside:e.languages.extend(`cpp`,{})}}),e.languages.insertBefore(`inside`,`double-colon`,{"class-name":/\b[a-z_]\w*\b(?!\s*::)/i},e.languages.cpp[`base-clause`])})(Prism),(function(e){function t(e,t){return e.replace(/<<(\d+)>>/g,function(e,n){return`(?:`+t[+n]+`)`})}function n(e,n,r){return RegExp(t(e,n),r||``)}function r(e,t){for(var n=0;n<t;n++)e=e.replace(/<<self>>/g,function(){return`(?:`+e+`)`});return e.replace(/<<self>>/g,`[^\\s\\S]`)}var i={type:`bool byte char decimal double dynamic float int long object sbyte short string uint ulong ushort var void`,typeDeclaration:`class enum interface record struct`,contextual:`add alias and ascending async await by descending from(?=\\s*(?:\\w|$)) get global group into init(?=\\s*;) join let nameof not notnull on or orderby partial remove select set unmanaged value when where with(?=\\s*{)`,other:`abstract as base break case catch checked const continue default delegate do else event explicit extern finally fixed for foreach goto if implicit in internal is lock namespace new null operator out override params private protected public readonly ref return sealed sizeof stackalloc static switch this throw try typeof unchecked unsafe using virtual volatile while yield`};function a(e){return`\\b(?:`+e.trim().replace(/ /g,`|`)+`)\\b`}var o=a(i.typeDeclaration),s=RegExp(a(i.type+` `+i.typeDeclaration+` `+i.contextual+` `+i.other)),c=a(i.typeDeclaration+` `+i.contextual+` `+i.other),l=a(i.type+` `+i.typeDeclaration+` `+i.other),u=r(`<(?:[^<>;=+\\-*/%&|^]|<<self>>)*>`,2),d=r(`\\((?:[^()]|<<self>>)*\\)`,2),f=`@?\\b[A-Za-z_]\\w*\\b`,p=t(`<<0>>(?:\\s*<<1>>)?`,[f,u]),m=t(`(?!<<0>>)<<1>>(?:\\s*\\.\\s*<<1>>)*`,[c,p]),h=`\\[\\s*(?:,\\s*)*\\]`,g=t(`<<0>>(?:\\s*(?:\\?\\s*)?<<1>>)*(?:\\s*\\?)?`,[m,h]),_=t(`(?:<<0>>|<<1>>)(?:\\s*(?:\\?\\s*)?<<2>>)*(?:\\s*\\?)?`,[t(`\\(<<0>>+(?:,<<0>>+)+\\)`,[t(`[^,()<>[\\];=+\\-*/%&|^]|<<0>>|<<1>>|<<2>>`,[u,d,h])]),m,h]),v={keyword:s,punctuation:/[<>()?,.:[\]]/},y=`'(?:[^\\r\\n'\\\\]|\\\\.|\\\\[Uux][\\da-fA-F]{1,8})'`,ee=`"(?:\\\\.|[^\\\\"\\r\\n])*"`,te=`@"(?:""|\\\\[\\s\\S]|[^\\\\"])*"(?!")`;e.languages.csharp=e.languages.extend(`clike`,{string:[{pattern:n(`(^|[^$\\\\])<<0>>`,[te]),lookbehind:!0,greedy:!0},{pattern:n(`(^|[^@$\\\\])<<0>>`,[ee]),lookbehind:!0,greedy:!0}],"class-name":[{pattern:n(`(\\busing\\s+static\\s+)<<0>>(?=\\s*;)`,[m]),lookbehind:!0,inside:v},{pattern:n(`(\\busing\\s+<<0>>\\s*=\\s*)<<1>>(?=\\s*;)`,[f,_]),lookbehind:!0,inside:v},{pattern:n(`(\\busing\\s+)<<0>>(?=\\s*=)`,[f]),lookbehind:!0},{pattern:n(`(\\b<<0>>\\s+)<<1>>`,[o,p]),lookbehind:!0,inside:v},{pattern:n(`(\\bcatch\\s*\\(\\s*)<<0>>`,[m]),lookbehind:!0,inside:v},{pattern:n(`(\\bwhere\\s+)<<0>>`,[f]),lookbehind:!0},{pattern:n(`(\\b(?:is(?:\\s+not)?|as)\\s+)<<0>>`,[g]),lookbehind:!0,inside:v},{pattern:n(`\\b<<0>>(?=\\s+(?!<<1>>|with\\s*\\{)<<2>>(?:\\s*[=,;:{)\\]]|\\s+(?:in|when)\\b))`,[_,l,f]),inside:v}],keyword:s,number:/(?:\b0(?:x[\da-f_]*[\da-f]|b[01_]*[01])|(?:\B\.\d+(?:_+\d+)*|\b\d+(?:_+\d+)*(?:\.\d+(?:_+\d+)*)?)(?:e[-+]?\d+(?:_+\d+)*)?)(?:[dflmu]|lu|ul)?\b/i,operator:/>>=?|<<=?|[-=]>|([-+&|])\1|~|\?\?=?|[-+*/%&|^!=<>]=?/,punctuation:/\?\.?|::|[{}[\];(),.:]/}),e.languages.insertBefore(`csharp`,`number`,{range:{pattern:/\.\./,alias:`operator`}}),e.languages.insertBefore(`csharp`,`punctuation`,{"named-parameter":{pattern:n(`([(,]\\s*)<<0>>(?=\\s*:)`,[f]),lookbehind:!0,alias:`punctuation`}}),e.languages.insertBefore(`csharp`,`class-name`,{namespace:{pattern:n(`(\\b(?:namespace|using)\\s+)<<0>>(?:\\s*\\.\\s*<<0>>)*(?=\\s*[;{])`,[f]),lookbehind:!0,inside:{punctuation:/\./}},"type-expression":{pattern:n(`(\\b(?:default|sizeof|typeof)\\s*\\(\\s*(?!\\s))(?:[^()\\s]|\\s(?!\\s)|<<0>>)*(?=\\s*\\))`,[d]),lookbehind:!0,alias:`class-name`,inside:v},"return-type":{pattern:n(`<<0>>(?=\\s+(?:<<1>>\\s*(?:=>|[({]|\\.\\s*this\\s*\\[)|this\\s*\\[))`,[_,m]),inside:v,alias:`class-name`},"constructor-invocation":{pattern:n(`(\\bnew\\s+)<<0>>(?=\\s*[[({])`,[_]),lookbehind:!0,inside:v,alias:`class-name`},"generic-method":{pattern:n(`<<0>>\\s*<<1>>(?=\\s*\\()`,[f,u]),inside:{function:n(`^<<0>>`,[f]),generic:{pattern:RegExp(u),alias:`class-name`,inside:v}}},"type-list":{pattern:n(`\\b((?:<<0>>\\s+<<1>>|record\\s+<<1>>\\s*<<5>>|where\\s+<<2>>)\\s*:\\s*)(?:<<3>>|<<4>>|<<1>>\\s*<<5>>|<<6>>)(?:\\s*,\\s*(?:<<3>>|<<4>>|<<6>>))*(?=\\s*(?:where|[{;]|=>|$))`,[o,p,f,_,s.source,d,`\\bnew\\s*\\(\\s*\\)`]),lookbehind:!0,inside:{"record-arguments":{pattern:n(`(^(?!new\\s*\\()<<0>>\\s*)<<1>>`,[p,d]),lookbehind:!0,greedy:!0,inside:e.languages.csharp},keyword:s,"class-name":{pattern:RegExp(_),greedy:!0,inside:v},punctuation:/[,()]/}},preprocessor:{pattern:/(^[\t ]*)#.*/m,lookbehind:!0,alias:`property`,inside:{directive:{pattern:/(#)\b(?:define|elif|else|endif|endregion|error|if|line|nullable|pragma|region|undef|warning)\b/,lookbehind:!0,alias:`keyword`}}}});var b=ee+`|`+y,x=t(`\\/(?![*/])|\\/\\/[^\\r\\n]*[\\r\\n]|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|<<0>>`,[b]),S=r(t(`[^"'/()]|<<0>>|\\(<<self>>*\\)`,[x]),2),C=`\\b(?:assembly|event|field|method|module|param|property|return|type)\\b`,w=t(`<<0>>(?:\\s*\\(<<1>>*\\))?`,[m,S]);e.languages.insertBefore(`csharp`,`class-name`,{attribute:{pattern:n(`((?:^|[^\\s\\w>)?])\\s*\\[\\s*)(?:<<0>>\\s*:\\s*)?<<1>>(?:\\s*,\\s*<<1>>)*(?=\\s*\\])`,[C,w]),lookbehind:!0,greedy:!0,inside:{target:{pattern:n(`^<<0>>(?=\\s*:)`,[C]),alias:`keyword`},"attribute-arguments":{pattern:n(`\\(<<0>>*\\)`,[S]),inside:e.languages.csharp},"class-name":{pattern:RegExp(m),inside:{punctuation:/\./}},punctuation:/[:,]/}}});var T=`:[^}\\r\\n]+`,ne=r(t(`[^"'/()]|<<0>>|\\(<<self>>*\\)`,[x]),2),E=t(`\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}`,[ne,T]),re=r(t(`[^"'/()]|\\/(?!\\*)|\\/\\*(?:[^*]|\\*(?!\\/))*\\*\\/|<<0>>|\\(<<self>>*\\)`,[b]),2),ie=t(`\\{(?!\\{)(?:(?![}:])<<0>>)*<<1>>?\\}`,[re,T]);function ae(t,r){return{interpolation:{pattern:n(`((?:^|[^{])(?:\\{\\{)*)<<0>>`,[t]),lookbehind:!0,inside:{"format-string":{pattern:n(`(^\\{(?:(?![}:])<<0>>)*)<<1>>(?=\\}$)`,[r,T]),lookbehind:!0,inside:{punctuation:/^:/}},punctuation:/^\{|\}$/,expression:{pattern:/[\s\S]+/,alias:`language-csharp`,inside:e.languages.csharp}}},string:/[\s\S]+/}}e.languages.insertBefore(`csharp`,`string`,{"interpolation-string":[{pattern:n(`(^|[^\\\\])(?:\\$@|@\\$)"(?:""|\\\\[\\s\\S]|\\{\\{|<<0>>|[^\\\\{"])*"`,[E]),lookbehind:!0,greedy:!0,inside:ae(E,ne)},{pattern:n(`(^|[^@\\\\])\\$"(?:\\\\.|\\{\\{|<<0>>|[^\\\\"{])*"`,[ie]),lookbehind:!0,greedy:!0,inside:ae(ie,re)}],char:{pattern:RegExp(y),greedy:!0}}),e.languages.dotnet=e.languages.cs=e.languages.csharp})(Prism);function zo(e,t=`java`){if(!e)return``;let n={java:`java`,python:`python`,py:`python`,javascript:`javascript`,js:`javascript`,c:`c`,cpp:`cpp`,"c++":`cpp`,csharp:`csharp`,"c#":`csharp`}[t?.toLowerCase()]||`java`,r;try{let t=Ro.default.languages[n];r=t?Ro.default.highlight(e,t,n):Bo(e)}catch{r=Bo(e)}return`
    <div class="code-block-wrap">
      <div class="code-block-header">
        <span class="code-block-lang">${t||`code`}</span>
      </div>
      <pre class="language-${n}"><code class="language-${n}">${r}</code></pre>
    </div>
  `}function Bo(e){let t=document.createElement(`div`);return t.textContent=e,t.innerHTML}function Vo(e,t={}){let{totalSeconds:n=30,onTick:r=()=>{},onComplete:i=()=>{},warningThreshold:a=10,dangerThreshold:o=5,size:s=`normal`}=t,c={small:{width:60,stroke:4,fontSize:`1.25rem`},normal:{width:100,stroke:6,fontSize:`2rem`},large:{width:160,stroke:8,fontSize:`3rem`}},l=c[s]||c.normal,u=(l.width-l.stroke*2)/2,d=2*Math.PI*u,f=n,p=null,m=!1,h=null,g=null;e.innerHTML=`
    <div class="timer" id="timer-component" style="width:${l.width}px;height:${l.width}px;position:relative;">
      <svg width="${l.width}" height="${l.width}" style="transform:rotate(-90deg)">
        <circle
          cx="${l.width/2}" cy="${l.width/2}" r="${u}"
          fill="none"
          stroke="var(--timer-track)"
          stroke-width="${l.stroke}"
        />
        <circle
          id="timer-ring"
          cx="${l.width/2}" cy="${l.width/2}" r="${u}"
          fill="none"
          stroke="var(--timer-ring)"
          stroke-width="${l.stroke}"
          stroke-linecap="round"
          stroke-dasharray="${d}"
          stroke-dashoffset="0"
          style="transition: stroke-dashoffset 0.25s linear, stroke 0.3s ease"
        />
      </svg>
      <div id="timer-text" style="
        position:absolute;
        inset:0;
        display:flex;
        align-items:center;
        justify-content:center;
        font-family:'JetBrains Mono',monospace;
        font-weight:800;
        font-size:${l.fontSize};
      ">${n}</div>
    </div>
  `;let _=e.querySelector(`#timer-ring`),v=e.querySelector(`#timer-text`),y=e.querySelector(`#timer-component`);function ee(){let e=f/n,t=d*(1-e);_.style.strokeDashoffset=t,v.textContent=Math.ceil(f),f<=o?(_.style.stroke=`var(--timer-danger)`,v.style.color=`var(--timer-danger)`,y.style.animation=`timerPulse 0.5s ease infinite`):f<=a?(_.style.stroke=`var(--timer-warning)`,v.style.color=`var(--timer-warning)`,y.style.animation=`none`):(_.style.stroke=`var(--timer-ring)`,v.style.color=`inherit`,y.style.animation=`none`),r(Math.ceil(f))}function te(){if(m)return;let e=(Date.now()-h)/1e3;f=Math.max(0,n-e),ee(),f<=0&&(w(),i())}function b(){h=Date.now(),f=n,m=!1,ee(),p=setInterval(te,100)}function x(e){h=Date.now()-(n-e)*1e3,f=e,m=!1,ee(),p&&clearInterval(p),p=setInterval(te,100)}function S(){m=!0,g=f,p&&=(clearInterval(p),null),y.style.animation=`none`,y.style.opacity=`0.6`}function C(){m&&(m=!1,h=Date.now()-(n-g)*1e3,y.style.opacity=`1`,p=setInterval(te,100))}function w(){p&&=(clearInterval(p),null),m=!1}function T(e){f=e,ee()}function ne(){return Math.ceil(f)}function E(){w(),e.innerHTML=``}return{start:b,startFromRemaining:x,pause:S,resume:C,stop:w,setRemaining:T,getRemaining:ne,destroy:E}}function Ho(e,t={}){let{data:n=[],maxValue:r=null,direction:i=`horizontal`,animate:a=!0,showValues:o=!0,showPercent:s=!1,total:c=null}=t,l=r||Math.max(...n.map(e=>e.value),1),u=c||n.reduce((e,t)=>e+t.value,0);i===`horizontal`?e.innerHTML=`
      <div class="bar-chart-h">
        ${n.map((e,t)=>{let n=l>0?e.value/l*100:0,r=u>0?Math.round(e.value/u*100):0;return`
            <div class="results-bar stagger-${t+1}" style="animation-delay:${t*.1}s">
              <div class="results-bar__label" style="background:var(--answer-${e.color||`a`})">
                ${e.label||``}
              </div>
              <div class="results-bar__track">
                <div class="results-bar__fill" style="
                  width:${a?0:n}%;
                  background:var(--answer-${e.color||`a`});
                  ${a?`animation: barGrow 0.8s ease ${t*.1}s forwards; width:${n}%;`:``}
                ">
                  ${e.isCorrect?`
                    <span style="margin-left:auto;display:flex;align-items:center;color:white;filter:drop-shadow(0 1px 2px rgba(0,0,0,0.5));">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </span>`:``}
                </div>
              </div>
              <div class="results-bar__count">
                ${s?`${r}%`:e.value}
              </div>
            </div>
          `}).join(``)}
      </div>
    `:e.innerHTML=`
      <div class="bar-chart-v" style="display:flex;align-items:flex-end;justify-content:center;gap:1rem;height:200px;">
        ${n.map((e,t)=>{let n=l>0?e.value/l*100:0;return`
            <div style="display:flex;flex-direction:column;align-items:center;gap:0.5rem;flex:1;max-width:80px;">
              ${o?`<span style="font-weight:700;font-size:0.875rem;">${e.value}</span>`:``}
              <div style="
                width:100%;
                height:${n}%;
                min-height:4px;
                background:var(--answer-${e.color||`a`});
                border-radius:var(--radius-sm) var(--radius-sm) 0 0;
                ${a?`animation:barGrowVertical 0.8s ease ${t*.1}s forwards;transform-origin:bottom;`:``}
              "></div>
              <span style="font-weight:600;font-size:0.875rem;color:var(--text-secondary);">${e.label}</span>
            </div>
          `}).join(``)}
      </div>
    `}function Uo(e={}){let{duration:t=3e3,particleCount:n=80,colors:r=[`#2563eb`,`#7c3aed`,`#22c55e`,`#f59e0b`,`#ef4444`,`#06b6d4`],spread:i=70,startY:a=.6}=e,o=document.createElement(`canvas`);o.style.cssText=`
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 99999;
  `,o.width=window.innerWidth,o.height=window.innerHeight,document.body.appendChild(o);let s=o.getContext(`2d`),c=[];for(let e=0;e<n;e++)c.push({x:o.width/2+(Math.random()-.5)*200,y:o.height*a,vx:(Math.random()-.5)*i*.3,vy:-(Math.random()*15+8),color:r[Math.floor(Math.random()*r.length)],size:Math.random()*8+4,rotation:Math.random()*360,rotationSpeed:(Math.random()-.5)*10,gravity:.15+Math.random()*.1,friction:.99,opacity:1,shape:Math.random()>.5?`rect`:`circle`});let l=Date.now();function u(){let e=Date.now()-l;if(e>t){o.remove();return}s.clearRect(0,0,o.width,o.height);let n=Math.max(0,(e-t*.7)/(t*.3));c.forEach(e=>{e.vy+=e.gravity,e.vx*=e.friction,e.x+=e.vx,e.y+=e.vy,e.rotation+=e.rotationSpeed,e.opacity=1-n,s.save(),s.translate(e.x,e.y),s.rotate(e.rotation*Math.PI/180),s.globalAlpha=e.opacity,s.fillStyle=e.color,e.shape===`rect`?s.fillRect(-e.size/2,-e.size/2,e.size,e.size*.6):(s.beginPath(),s.arc(0,0,e.size/2,0,Math.PI*2),s.fill()),s.restore()}),requestAnimationFrame(u)}u()}async function Wo(e){let t=document.getElementById(`app`),n=e.id;if(!n){N.navigate(`/host/dashboard`);return}let r=[],i=[],a=null,o=null;t.innerHTML=`<div class="flex-center" style="min-height:100vh;"><div class="spinner spinner--lg"></div></div>`;let s=Xa(n,e=>{i=e,d()}),c=Ya(n,async e=>{if(!e)return;if(r.length===0&&e.questionIds)try{r=await Oa(e.questionIds)}catch(e){console.warn(`Could not load questions:`,e)}let t=e.currentQuestionIndex??0,n=e.currentQuestionState;n===`accepting`||n===`paused`?(o!==`question`&&(o=`question`,l(e,t)),n===`paused`&&a&&a.pause()):n===`results`&&o!==`results`&&(o=`results`,f(e,t))});function l(e,i){let o=r[i];if(!o)return;let s=r.length,c=o.multiSelect;if(t.innerHTML=`
      <div class="question-screen screen">
        <div class="question-screen__header">
          <div class="question-screen__progress" style="display:flex;align-items:center;gap:0.75rem;">
            Question ${i+1} of ${s}
            ${o.category?`<span class="badge badge--primary question-screen__category">${o.category}</span>`:``}
          </div>

          <div style="display:flex;gap:0.75rem;align-items:center;">
            <button class="btn btn--secondary btn--sm" id="btn-pause" style="padding:0.5rem 0.75rem;font-size:0.875rem;">
              ${U(`pause`,16)} Pause
            </button>
            <button class="btn btn--primary btn--sm" id="btn-show-results" style="padding:0.5rem 0.75rem;font-size:0.875rem;">
              Skip to Results
            </button>
          </div>

          <div style="display:flex;align-items:center;gap:1rem;">
            <span class="text-muted text-sm" id="response-count">0 / 0 answered</span>
            <div id="timer-container"></div>
          </div>
        </div>

        <div class="question-screen__body">
          <div class="question-text">${Go(o.text)}</div>

          ${o.codeSnippetMain?`
            <div class="dual-snippets dual-snippets--projector">
              <div>
                <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Class Definition</div>
                <div class="question-code-wrap" style="height:100%;">
                  ${zo(o.codeSnippet,o.codeLanguage)}
                </div>
              </div>
              <div>
                <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Main Method</div>
                <div class="question-code-wrap" style="height:100%;">
                  ${zo(o.codeSnippetMain,o.codeLanguage)}
                </div>
              </div>
            </div>
          `:o.codeSnippet?`
            <div class="question-code-wrap">
              ${zo(o.codeSnippet,o.codeLanguage)}
            </div>
          `:``}

          ${c?`<div class="text-center text-muted text-sm" style="margin-bottom:0.5rem;">Select all that apply</div>`:``}

          <div class="question-answers-grid">
            ${o.choices.map((e,t)=>`
              <div class="answer-btn answer-btn--${aa[t]} answer-btn--projector answer-btn--disabled">
                <span class="answer-btn__label">${oa[t]}</span>
                <span class="answer-btn__text">${Go(e.text)}</span>
              </div>
            `).join(``)}
          </div>
        </div>

        </div>
      </div>
    `,a=Vo(document.getElementById(`timer-container`),{totalSeconds:o.timeLimit||30,size:`normal`,onComplete:()=>{eo(n)}}),e.timerPaused)a.startFromRemaining(e.timerRemaining||o.timeLimit),a.pause(),u(!0);else if(e.timerEnd){let t=Math.max(0,(e.timerEnd.toDate().getTime()-Date.now())/1e3);t>0?a.startFromRemaining(t):eo(n)}else a.start();let l=e.timerPaused||!1;document.getElementById(`btn-pause`).addEventListener(`click`,async()=>{if(l){let e=a.getRemaining();await $a(n,e),a.resume(),l=!1}else{let e=a.getRemaining();await Qa(n,e),a.pause(),l=!0}u(l)}),document.getElementById(`btn-show-results`).addEventListener(`click`,()=>{a&&a.stop(),eo(n)}),d()}function u(e){let t=document.getElementById(`btn-pause`);t&&(t.innerHTML=e?`${U(`play`,18)} Resume`:`${U(`pause`,18)} Pause`)}function d(){let e=document.getElementById(`response-count`);if(!e)return;let t=Ra.state.currentQuestionIndex??0;if(!r[t])return;let n=i.filter(e=>e.questionIndex===t),a=Object.keys(Ra.state.players||{}).length;e.textContent=`${n.length} / ${a} answered`}function f(e,o){let s=r[o];if(!s)return;a&&a.stop();let c=o>=r.length-1,l=i.filter(e=>e.questionIndex===o),u=s.choices.map((e,t)=>{let n=l.filter(e=>e.selectedChoices?.includes(t)).length;return{label:oa[t],value:n,color:aa[t],isCorrect:e.isCorrect}}),d=l.filter(e=>e.correct).length,f=l.length,p=f>0?Math.round(d/f*100):0,m=Lo(e.players||{});t.innerHTML=`
      <div class="results-screen screen">
        <div style="width:100%;max-width:1100px;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <div style="display:flex;align-items:center;gap:1rem;">
              <h2>Results - Question ${o+1}</h2>
              <span class="badge ${p>=70?`badge--success`:p>=40?`badge--warning`:`badge--error`}">
                ${p}% correct
              </span>
            </div>

            <div style="display:flex;align-items:center;gap:0.75rem;">
              ${c?`
                <button class="btn btn--primary btn--sm" id="btn-final-podium" style="padding:0.5rem 0.75rem;font-size:0.875rem;">
                  ${U(`trophy`,16)} Show Final Results
                </button>
              `:`
                <button class="btn btn--primary btn--sm" id="btn-next-question" style="padding:0.5rem 0.75rem;font-size:0.875rem;">
                  Next Question ${U(`skip`,16)}
                </button>
              `}
            </div>
          </div>

          <div class="question-text" style="font-size:1.25rem;margin-bottom:1rem;text-align:left;">
            ${Go(s.text)}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:start;">
            <div>
              <h4 style="margin-bottom:1rem;">Answer Distribution</h4>
              <div id="results-chart"></div>
              
              <div class="correct-answer-callout" style="margin-top:1.5rem;padding:1rem;background:var(--success-soft);color:var(--success);border-radius:var(--radius-md);border:1px solid var(--success);">
                <strong style="font-size:1rem;display:flex;align-items:center;gap:0.5rem;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Correct Answer:
                </strong>
                <div style="margin-top:0.5rem;font-size:1.1rem;font-weight:700;">
                  ${s.choices.filter(e=>e.isCorrect).map(e=>Go(e.text)).join(` <span style="opacity:0.5;margin:0 0.5rem;">and</span> `)}
                </div>
              </div>
            </div>

            <div>
              <h4 style="margin-bottom:1rem;">Leaderboard</h4>
              <div class="leaderboard-list" id="results-leaderboard">
                ${m.slice(0,5).map((e,t)=>`
                  <div class="leaderboard-row" style="animation-delay:${t*.1}s">
                    <div class="leaderboard-row__rank ${t<3?`leaderboard-row__rank--`+(t+1):``}">${t+1}</div>
                    <div class="leaderboard-row__player">
                      <span class="leaderboard-row__icon">${H(e.icon,24)}</span>
                      <span class="leaderboard-row__name">${Go(e.name)}</span>
                    </div>
                    <span class="leaderboard-row__points">${e.points.toLocaleString()}</span>
                  </div>
                `).join(``)}
                ${m.length===0?`<div class="text-muted text-center" style="padding:1rem;">No responses yet</div>`:``}
              </div>
            </div>
          </div>

          ${s.explanation?`
            <div class="results-explanation" style="margin-top:1rem;">
              <strong>Explanation:</strong> ${Go(s.explanation)}
            </div>
          `:``}
        </div>
      </div>
    `,Ho(document.getElementById(`results-chart`),{data:u}),document.getElementById(`btn-next-question`)?.addEventListener(`click`,async()=>{let e=r[o+1];e&&await Za(n,e.timeLimit||30)}),document.getElementById(`btn-final-podium`)?.addEventListener(`click`,()=>{N.navigate(`/host/podium/${n}`)})}return()=>{c(),s(),a&&a.destroy()}}function Go(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}async function Ko(e){let t=document.getElementById(`app`),n=e.id;if(!n){N.navigate(`/host/dashboard`);return}t.innerHTML=`<div class="flex-center" style="min-height:100vh;"><div class="spinner spinner--lg"></div></div>`;let r=null,i=Ya(n,e=>{!r&&e&&(r=e,i(),a(e))});async function a(e){let r=Lo(e.players||{}),i=r.slice(0,3);try{let t=await io(n);for(let n of Object.keys(e.players||{})){let r=t.filter(e=>e.studentUid===n).sort((e,t)=>e.questionIndex-t.questionIndex),i=0,a=0,o=0;for(let e of r)e.correct?(i++,a=Math.max(a,i)):i=0,o+=e.responseTime||0;await yo(n,{name:e.players[n]?.name,icon:e.players[n]?.icon,answered:r.length,correct:r.filter(e=>e.correct).length,points:e.players[n]?.score||0,totalResponseTime:o,finalStreak:i,bestStreak:a},e.courseId||`General`)}}catch(e){console.warn(`Could not update student stats:`,e)}try{await no(n)}catch(e){console.warn(`Could not end session:`,e)}t.innerHTML=`
      <div class="podium-screen screen">
        <h1 class="podium-title text-gradient">Final Results</h1>

        ${i.length>0?`
          <div class="podium-container">
            ${i.map((e,t)=>{let n=t+1;return`
                <div class="podium-place podium-place--${n}">
                  <div class="podium-place__avatar">
                    ${H(e.icon,n===1?40:32)}
                  </div>
                  <div class="podium-place__name">${qo(e.name)}</div>
                  <div class="podium-place__points">${e.points.toLocaleString()} pts</div>
                  <div class="podium-place__pedestal">${n}</div>
                </div>
              `}).join(``)}
          </div>

          ${r.length>3?`
            <div style="margin-top:2.5rem;width:100%;max-width:500px;">
              <h4 style="margin-bottom:0.75rem;text-align:center;color:var(--text-secondary);">Everyone Else</h4>
              <div class="leaderboard-list">
                ${r.slice(3,10).map((e,t)=>`
                  <div class="leaderboard-row" style="animation-delay:${(t+3)*.1}s">
                    <div class="leaderboard-row__rank">${t+4}</div>
                    <div class="leaderboard-row__player">
                      <span class="leaderboard-row__icon">${H(e.icon,20)}</span>
                      <span class="leaderboard-row__name">${qo(e.name)}</span>
                    </div>
                    <span class="leaderboard-row__points">${e.points.toLocaleString()}</span>
                  </div>
                `).join(``)}
              </div>
            </div>
          `:``}
        `:`
          <div class="empty-state">
            <div class="empty-state__title">No players participated</div>
          </div>
        `}

        <button class="btn btn--primary btn--lg" id="btn-back-dashboard" style="margin-top:3rem;">
          Back to Dashboard
        </button>
      </div>
    `,i.length>0&&setTimeout(()=>Uo(),800),document.getElementById(`btn-back-dashboard`).addEventListener(`click`,()=>{ao(),N.navigate(`/host/dashboard`)})}return()=>{ao()}}function qo(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}function Jo(e){let t=[],n=e.split(/^## Question/gm).filter(e=>e.trim());for(let e of n)try{let n=Yo(e);n&&n.text&&n.choices.length>=2&&t.push(n)}catch(e){console.warn(`Skipping malformed question section:`,e.message)}return t}function Yo(e){let t=e.split(`
`),n={title:null,type:`Predict Output`,tags:[],text:``,codeSnippet:null,codeLanguage:null,choices:[],multiSelect:!1,timeLimit:30,explanation:null,category:`general`,difficulty:`medium`},r=`meta`,i=[],a=[],o=[];for(let e=0;e<t.length;e++){let s=t[e],c=s.trim();if(r===`meta`){let e=c.match(/^(\w+)\s*:\s*(.+)$/);if(e){let[,t,r]=e;switch(t.toLowerCase()){case`title`:n.title=r.trim();break;case`type`:n.type=r.trim();break;case`tags`:n.tags=r.split(`,`).map(e=>e.trim()).filter(Boolean);break;case`category`:n.category=r.trim();break;case`difficulty`:n.difficulty=r.trim().toLowerCase();break;case`timelimit`:n.timeLimit=parseInt(r)||30;break;case`multiselect`:n.multiSelect=r.trim().toLowerCase()===`true`;break}continue}if(c)r=`text`;else continue}if(c.startsWith("```")&&r!==`code`){r=`code`;let e=c.slice(3).trim();e&&(n.codeLanguage=e),i=[];continue}if(c.startsWith("```")&&r===`code`){n.codeSnippet=i.join(`
`),r=`text`;continue}if(r===`code`){i.push(s);continue}let l=c.match(/^- \[([ xX])\]\s+(.+)$/);if(l){r=`choices`;let e=l[1].toLowerCase()===`x`;n.choices.push({text:l[2].trim(),isCorrect:e});continue}if(c.startsWith(`> Explanation:`)||c.startsWith(`>Explanation:`)){r=`explanation`,o.push(c.replace(/^>\s*Explanation:\s*/,``));continue}if(r===`explanation`&&c.startsWith(`>`)){o.push(c.replace(/^>\s*/,``));continue}if(r===`explanation`&&!c.startsWith(`>`)&&(r=`text`),c===`---`)break;r===`text`&&c&&a.push(c)}return n.text=a.join(` `).trim(),o.length>0&&(n.explanation=o.join(` `).trim()),n.choices.filter(e=>e.isCorrect).length>1&&(n.multiSelect=!0),n}function Xo(e){let t=[];return(!e.text||e.text.trim().length===0)&&t.push(`Question text is required`),(!e.choices||e.choices.length<2)&&t.push(`At least 2 choices are required`),e.choices&&e.choices.length>6&&t.push(`Maximum 6 choices allowed`),(e.choices?.filter(e=>e.isCorrect).length||0)===0&&t.push(`At least one correct answer is required`),e.timeLimit&&(e.timeLimit<5||e.timeLimit>120)&&t.push(`Time limit must be between 5 and 120 seconds`),{valid:t.length===0,errors:t}}async function Zo(e,t=null){let n=await e.text(),r=e.name.split(`.`).pop().toLowerCase(),i=[];if(r===`md`||r===`markdown`)i=Jo(n);else if(r===`json`)i=Qo(n);else throw Error(`Unsupported file type: .${r}. Use .md or .json`);let a=[],o=[],s=0;if(i.forEach((n,r)=>{let i=Xo(n);i.valid?(t&&(n.courseId=t),n.bank=e.name,a.push(n)):(s++,o.push(`Question ${r+1}: ${i.errors.join(`, `)}`))}),a.length>0&&(await Fa(a,t),t&&t!=="default"))try{let{getCourseById:e,updateCourse:n}=await J(async()=>{let{getCourseById:e,updateCourse:t}=await Promise.resolve().then(()=>So);return{getCourseById:e,updateCourse:t}},void 0),r=await e(t);if(r){let e=r.questionTypes||[`Predict Output`,`Select All That Apply`,`True / False`,`Conceptual`],i=!1;a.forEach(t=>{t.type&&!e.includes(t.type)&&(e.push(t.type),i=!0)}),i&&(e.sort(),await n(t,{questionTypes:e}))}}catch(e){console.warn(`Failed to update course types during import`,e)}return{imported:a.length,skipped:s,errors:o}}function Qo(e){try{let t=JSON.parse(e);return(Array.isArray(t)?t:[t]).map(e=>({title:e.title||null,type:e.type||`Predict Output`,tags:e.tags||[],text:e.text||``,codeSnippet:e.codeSnippet||null,codeSnippetMain:e.codeSnippetMain||null,codeLanguage:e.codeLanguage||null,choices:(e.choices||[]).map(e=>({text:e.text||``,isCorrect:e.isCorrect||!1})),multiSelect:e.multiSelect||!1,timeLimit:e.timeLimit||30,explanation:e.explanation||null,category:e.category||`general`,difficulty:e.difficulty||`medium`}))}catch(e){throw Error(`Invalid JSON format: `+e.message)}}async function $o(){let e=document.getElementById(`app`),t=[],n=[`Predict Output`,`Select All That Apply`,`True / False`,`Conceptual`],r=`createdAt`,i=!1,a=new Set,o=``;try{o=await Ao();let e=q.state.activeCourseId;if(t=await G(e),e!=="default"&&e){let t=await wo(e);t&&t.questionTypes?n=t.questionTypes:t&&await Do(e,{questionTypes:n})}}catch(e){console.warn(`Could not load questions:`,e)}c();function s(){t.sort((e,t)=>{let n=e[r],a=t[r];return r===`choices`&&(n=e.choices?.length||0,a=t.choices?.length||0),(r===`text`||r===`type`)&&(n=(n||``).toLowerCase(),a=(a||``).toLowerCase()),n<a?i?-1:1:n>a?i?1:-1:0})}function c(){s();let n={};t.forEach(e=>{let t=e.bank||e.category||`Custom Questions`;n[t]||(n[t]=[]),n[t].push(e)});let u=Object.keys(n).sort();e.innerHTML=`
      <div class="host-layout screen">
        ${o}

        <div class="screen-subheader" style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
          <button class="btn btn--ghost btn--sm" id="btn-back">
            ${U(`arrowLeft`,18)} Dashboard
          </button>
          <h3 style="margin: 0;">Question Manager</h3>
          <div style="display:flex;gap:0.5rem;">
            <button class="btn btn--danger btn--sm" id="btn-clear-bank">
              ${U(`trash`,16)} Clear Bank
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-manage-types">
              ${U(`settings`,16)} Manage Types
            </button>
            <button class="btn btn--secondary btn--sm" id="btn-import">
              ${U(`upload`,16)} Import
            </button>
            <button class="btn btn--primary btn--sm" id="btn-add">
              ${U(`plus`,16)} Add Question
            </button>
          </div>
        </div>

        <main class="host-content">
          <div class="question-manager container">
            ${t.length===0?`
              <div class="empty-state" style="padding:4rem 1rem;">
                <div class="empty-state__icon">${U(`fileText`,64)}</div>
                <div class="empty-state__title">No questions yet</div>
                <div class="empty-state__text">Add questions manually or import from a Markdown / JSON file.</div>
              </div>
            `:`
              <div class="question-manager__toolbar" style="display:flex; justify-content:space-between; align-items:center;">
                <span class="text-muted text-sm">${t.length} question${t.length===1?``:`s`} across ${u.length} sub-bank${u.length===1?``:`s`}</span>
                <button class="btn btn--secondary btn--sm" id="btn-move-bulk" disabled>
                  ${U(`folder`,14)} Move Selected (<span id="bulk-count">0</span>)
                </button>
              </div>

              ${u.map((e,t)=>{let o=a.has(e),s=`bank-${t}`,c={};n[e].forEach(e=>{let t=e.type||`Uncategorized`;c[t]||(c[t]=[]),c[t].push(e)});let l=Object.keys(c).sort();return`
                <div class="card" style="margin-top: 2rem; padding: 0; overflow: hidden; border: 1px solid var(--border-color);">
                  <div class="bank-header" data-bank="${Q(e)}" data-target="${s}" style="padding: 1rem 1.5rem; background: var(--bg-tertiary); display: flex; justify-content: space-between; align-items: center; border-bottom: ${o?`none`:`1px solid var(--border-color)`}; cursor: pointer; user-select: none;">
                    <div style="display:flex; align-items:center; gap:1rem;">
                      <span class="bank-chevron" style="display:inline-flex; align-items:center; justify-content:center; width:24px; height:24px; transition:transform 0.2s; transform:${o?`rotate(-90deg)`:`rotate(0)`}; color:var(--text-secondary);">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                      </span>
                      <input type="checkbox" class="bank-select-all custom-checkbox" data-bank="${Q(e)}" title="Select all in ${Q(e)}" onclick="event.stopPropagation()" />
                      <h3 style="margin:0;font-size:1.15rem;font-weight:600;">${Q(e)}</h3>
                      <span class="badge badge--neutral">${n[e].length}</span>
                    </div>
                    <button class="btn btn--ghost btn--icon btn-delete-bank" data-bank="${Q(e)}" title="Delete Sub-Bank" style="color:var(--error);" onclick="event.stopPropagation()">
                      ${U(`trash`,16)}
                    </button>
                  </div>
                  <div class="table-wrap" id="${s}" style="display: ${o?`none`:`block`}; padding: 0.5rem 1rem 1rem 1rem;">
                    <table class="table" style="margin:0;">
                      <thead>
                        <tr>
                          <th style="width: 48px; padding-left: 0.5rem;"></th>
                          <th class="sortable" data-sort="text" style="width:50%;cursor:pointer;">Question ${r===`text`?i?`↑`:`↓`:``}</th>
                          <th class="sortable" data-sort="difficulty" style="cursor:pointer;">Difficulty ${r===`difficulty`?i?`↑`:`↓`:``}</th>
                          <th class="sortable" data-sort="timeLimit" style="cursor:pointer;">Time ${r===`timeLimit`?i?`↑`:`↓`:``}</th>
                          <th style="width:80px; text-align:right; padding-right:1rem;">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${l.map(t=>`
                          <tr>
                            <td colspan="5" style="padding: 2rem 1rem 0.75rem 0.5rem; border-bottom: none;">
                              <h4 style="margin: 0; font-size: 0.85rem; font-weight: 700; color: var(--primary); text-transform: uppercase; letter-spacing: 1px;">
                                ${Q(t)}
                              </h4>
                            </td>
                          </tr>
                          ${c[t].map(t=>`
                            <tr data-id="${t.id}">
                              <td style="padding-left: 0.5rem;">
                                <input type="checkbox" class="q-select-cb custom-checkbox" data-id="${t.id}" data-bank="${Q(e)}" />
                              </td>
                              <td>
                                ${t.title?`<div style="font-weight:700;font-size:1rem;color:var(--text-primary);margin-bottom:0.25rem;">${Q(t.title)}</div>`:``}
                                <div style="font-weight:${t.title?`400`:`500`};font-size:0.95rem;color:var(--text-primary);">${Q(t.text.length>70?t.text.substring(0,70)+`...`:t.text)}</div>
                                <div style="display:flex;gap:0.35rem;margin-top:0.5rem;flex-wrap:wrap;">
                                  ${(t.tags||[]).map(e=>`<span class="badge badge--neutral" style="font-size:0.7rem;">${Q(e)}</span>`).join(``)}
                                  ${t.codeSnippet?`<span class="badge badge--neutral" style="font-size:0.7rem;">&lt;/&gt; Code</span>`:``}
                                </div>
                              </td>
                              <td><span class="badge ${t.difficulty===`easy`?`badge--success`:t.difficulty===`hard`?`badge--error`:`badge--warning`}">${t.difficulty||`medium`}</span></td>
                              <td>${t.timeLimit||30}s</td>
                              <td style="text-align:right; padding-right:1rem;">
                                <div style="display:flex;gap:0.25rem;justify-content:flex-end;">
                                  <button class="btn btn--ghost btn--icon btn-edit" data-id="${t.id}" title="Edit">
                                    ${U(`edit`,16)}
                                  </button>
                                  <button class="btn btn--ghost btn--icon btn-delete" data-id="${t.id}" title="Delete" style="color:var(--error);">
                                    ${U(`trash`,16)}
                                  </button>
                                </div>
                              </td>
                            </tr>
                          `).join(``)}
                        `).join(``)}
                      </tbody>
                    </table>
                  </div>
                </div>
              `}).join(``)}
            `}
          </div>
        </main>
      </div>
    `,document.getElementById(`btn-back`)?.addEventListener(`click`,()=>N.navigate(`/host/dashboard`)),document.getElementById(`btn-add`)?.addEventListener(`click`,()=>l()),document.getElementById(`btn-manage-types`)?.addEventListener(`click`,()=>g()),document.getElementById(`btn-import`)?.addEventListener(`click`,()=>m()),document.getElementById(`btn-clear-bank`)?.addEventListener(`click`,()=>p());let d=document.querySelectorAll(`.q-select-cb`),h=document.querySelectorAll(`.bank-select-all`),_=document.getElementById(`btn-move-bulk`),v=document.getElementById(`bulk-count`);function y(){let e=document.querySelectorAll(`.q-select-cb:checked`).length;v.textContent=e,_.disabled=e===0}d.forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.bank,n=document.querySelector(`.bank-select-all[data-bank="${Q(t)}"]`),r=document.querySelectorAll(`.q-select-cb[data-bank="${Q(t)}"]`);n.checked=Array.from(r).every(e=>e.checked),y()})}),h.forEach(e=>{e.addEventListener(`change`,()=>{let t=e.dataset.bank;document.querySelectorAll(`.q-select-cb[data-bank="${Q(t)}"]`).forEach(t=>t.checked=e.checked),y()})}),_?.addEventListener(`click`,async()=>{let n=Array.from(document.querySelectorAll(`.q-select-cb:checked`)).map(e=>e.dataset.id);n.length!==0&&X({title:`Move Questions to Sub-Bank`,content:`
          <div class="input-group">
            <label>Select an existing Sub-Bank</label>
            <select class="select" id="bulk-move-existing">
              <option value="">-- Choose existing --</option>
              ${(await ka(q.state.activeCourseId)).map(e=>`<option value="${Q(e)}">${Q(e)}</option>`).join(``)}
            </select>
          </div>
          <div style="text-align:center;margin:0.5rem 0;">OR</div>
          <div class="input-group">
            <label>Create a new Sub-Bank</label>
            <input class="input" id="bulk-move-new" placeholder="e.g., Week 2 Quiz" />
          </div>
        `,confirmText:`Move Questions`,onConfirm:async()=>{let r=document.getElementById(`bulk-move-existing`).value,i=document.getElementById(`bulk-move-new`).value.trim()||r;if(!i)return W(`Please select or type a Sub-Bank name`,`error`),!1;e.innerHTML=`<div class="flex-center screen"><div class="spinner"></div></div>`;for(let e of n)await ja(e,{bank:i});W(`Moved ${n.length} questions to ${i}`,`success`),t=await G(q.state.activeCourseId),c()}})}),document.querySelectorAll(`.btn-delete-bank`).forEach(e=>{e.addEventListener(`click`,()=>{let n=e.dataset.bank;X({title:`Delete Sub-Bank`,content:`<p>Are you sure you want to delete the Sub-Bank <strong>${Q(n)}</strong>?</p><p class="text-muted" style="margin-top:0.5rem;">This will permanently delete all questions within this bank.</p>`,danger:!0,confirmText:`Delete Everything`,onConfirm:async()=>{await Na(q.state.activeCourseId,n),W(`Deleted Sub-Bank ${n}`,`success`),t=await G(q.state.activeCourseId),c()}})})}),document.querySelectorAll(`.bank-header`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.bank,n=e.dataset.target,r=document.getElementById(n),i=e.querySelector(`.bank-chevron`);a.has(t)?(a.delete(t),r.style.display=`block`,e.style.borderBottom=`1px solid var(--border-color)`,i&&(i.style.transform=`rotate(0)`)):(a.add(t),r.style.display=`none`,e.style.borderBottom=`none`,i&&(i.style.transform=`rotate(-90deg)`))})}),document.querySelectorAll(`.sortable`).forEach(e=>{e.addEventListener(`click`,()=>{let t=e.dataset.sort;r===t?i=!i:(r=t,i=!0),c()})}),document.querySelectorAll(`.btn-edit`).forEach(e=>{e.addEventListener(`click`,()=>{let n=t.find(t=>t.id===e.dataset.id);n&&l(n)})}),document.querySelectorAll(`.btn-delete`).forEach(e=>{e.addEventListener(`click`,()=>f(e.dataset.id))})}function l(e=null){let r=!!e,i=!!e?.codeSnippetMain,a=document.createElement(`div`);a.innerHTML=`
      <div style="display:flex;flex-direction:column;gap:1rem;">
        <div class="input-group">
          <label>Question Title (optional)</label>
          <input class="input" id="qf-title" placeholder="e.g., Loop Basics" value="${e?.title||``}" />
        </div>
        <div class="input-group">
          <label>Question Text</label>
          <textarea class="textarea" id="qf-text" rows="2" placeholder="What will this code output?">${e?.text||``}</textarea>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="input-group">
            <label>Sub-Bank</label>
            <input class="input" id="qf-bank" placeholder="e.g., Custom Questions" value="${e?.bank||e?.category||`Custom Questions`}" />
          </div>
          <div class="input-group">
            <label>Question Type</label>
            <div style="display:flex; gap:0.5rem;">
              <select class="select" id="qf-type-select" style="flex:1;">
                ${n.map(t=>`<option value="${Q(t)}" ${e?.type===t?`selected`:``}>${Q(t)}</option>`).join(``)}
                <option value="__custom__" ${e?.type&&!n.includes(e.type)?`selected`:``}>Custom...</option>
              </select>
              <input class="input" id="qf-type-custom" placeholder="New Type..." value="${e?.type&&!n.includes(e.type)?Q(e.type):``}" style="display: ${e?.type&&!n.includes(e.type)?`block`:`none`}; flex:1;" />
            </div>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:2fr 1fr;gap:1rem;">
          <div class="input-group">
            <label>Tags (comma-separated)</label>
            <input class="input" id="qf-tags" placeholder="e.g., loops, arrays" value="${(e?.tags||[]).join(`, `)}" />
          </div>
          <div class="input-group">
            <label>Difficulty</label>
            <select class="select" id="qf-difficulty">
              ${ca.map(t=>`<option value="${t}" ${e?.difficulty===t?`selected`:``}>${t}</option>`).join(``)}
            </select>
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:0.5rem;margin-top:0.5rem;">
          <input type="checkbox" id="qf-split-code" ${i?`checked`:``} style="width:1rem;height:1rem;" />
          <label for="qf-split-code" style="font-weight:600;">Split into Class & Main snippets</label>
        </div>

        <div id="qf-code-section" class="${i?`dual-snippets`:``}" style="margin: 0;">
          <div class="input-group" id="qf-code-class-container" style="margin: 0; width: 100%;">
            <label id="lbl-qf-code">${i?`Class Definition (optional)`:`Code Snippet (optional)`}</label>
            <div class="live-editor-container">
              <textarea class="live-editor-textarea" id="qf-code" spellcheck="false" placeholder="e.g., class MyClass { ... }">${e?.codeSnippet||``}</textarea>
              <pre class="live-editor-pre" aria-hidden="true"><code class="language-java" id="qf-code-highlight"></code></pre>
            </div>
          </div>
          
          <div class="input-group" id="qf-code-main-container" style="margin: 0; width: 100%; display: ${i?`flex`:`none`};">
            <label>Main Method (optional)</label>
            <div class="live-editor-container">
              <textarea class="live-editor-textarea" id="qf-code-main" spellcheck="false" placeholder="e.g., public static void main(String[] args) { ... }">${e?.codeSnippetMain||`public static void main(String[] args) {
    
}`}</textarea>
              <pre class="live-editor-pre" aria-hidden="true"><code class="language-java" id="qf-code-main-highlight"></code></pre>
            </div>
          </div>
        </div>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-top:0.5rem;">
          <div class="input-group">
            <label>Code Language</label>
            <input class="input" id="qf-lang" placeholder="java" value="${e?.codeLanguage||`java`}" />
          </div>
          <div class="input-group">
            <label>Time Limit (seconds)</label>
            <input class="input" id="qf-time" type="number" min="5" max="120" value="${e?.timeLimit||30}" />
          </div>
        </div>
        <div class="input-group">
          <label>Choices (check the correct answer${e?.multiSelect?`s`:``})</label>
          <div id="qf-choices" style="display:flex;flex-direction:column;gap:0.5rem;">
            ${(e?.choices||[{text:``,isCorrect:!1},{text:``,isCorrect:!1},{text:``,isCorrect:!1},{text:``,isCorrect:!1}]).map((e,t)=>u(t,e.text,e.isCorrect)).join(``)}
          </div>
          <button class="btn btn--ghost btn--sm" id="qf-add-choice" type="button" style="margin-top:0.5rem;">
            ${U(`plus`,14)} Add Choice
          </button>
        </div>
        <div class="input-group">
          <label>Explanation (optional)</label>
          <textarea class="textarea" id="qf-explanation" rows="2" placeholder="The answer is B because...">${e?.explanation||``}</textarea>
        </div>
      </div>
    `;let o=X({title:r?`Edit Question`:`New Question`,content:a,confirmText:r?`Save Changes`:`Create Question`,size:`large`,onConfirm:async()=>{let i=d();if(!i)return!1;try{if(!n.includes(i.type)){n.push(i.type),n.sort();let e=q.state.activeCourseId;e&&e!=="default"&&await Do(e,{questionTypes:n})}return r?(await ja(e.id,i),W(`Question updated`,`success`)):(await Aa(i,q.state.activeCourseId),W(`Question created`,`success`)),t=await G(q.state.activeCourseId),c(),!0}catch(e){return W(`Error: `+e.message,`error`),!1}}}),s=o.element.querySelector(`#qf-type-select`),l=o.element.querySelector(`#qf-type-custom`);s.addEventListener(`change`,()=>{s.value===`__custom__`?(l.style.display=`block`,l.focus()):l.style.display=`none`}),o.element.querySelector(`#qf-add-choice`).addEventListener(`click`,()=>{let e=o.element.querySelector(`#qf-choices`),t=e.children.length;if(t>=6){W(`Maximum 6 choices`,`warning`);return}e.insertAdjacentHTML(`beforeend`,u(t,``,!1))});let f=o.element.querySelector(`#qf-split-code`),p=o.element.querySelector(`#qf-code-section`),m=o.element.querySelector(`#qf-code-main-container`),h=o.element.querySelector(`#lbl-qf-code`);f.addEventListener(`change`,e=>{e.target.checked?(p.classList.add(`dual-snippets`),m.style.display=`flex`,h.textContent=`Class Definition (optional)`):(p.classList.remove(`dual-snippets`),m.style.display=`none`,h.textContent=`Code Snippet (optional)`)});function g(e,t){let n=o.element.querySelector(`#`+e),r=o.element.querySelector(`#`+t),i=r.parentElement;function a(){let e=n.value;e[e.length-1]===`
`&&(e+=` `),r.textContent=e,window.Prism&&window.Prism.highlightElement(r)}n.addEventListener(`input`,a),n.addEventListener(`scroll`,()=>{i.scrollTop=n.scrollTop,i.scrollLeft=n.scrollLeft}),a()}g(`qf-code`,`qf-code-highlight`),g(`qf-code-main`,`qf-code-main-highlight`)}function u(e,t,n){return`
      <div style="display:flex;gap:0.5rem;align-items:center;">
        <input type="checkbox" class="qf-correct" ${n?`checked`:``} style="width:1.25rem;height:1.25rem;accent-color:var(--success);" />
        <input class="input qf-choice-text" placeholder="Choice ${e+1}" value="${Q(t)}" style="flex:1;" />
        ${e>=2?`<button class="btn btn--ghost btn--icon qf-remove-choice" type="button">${U(`x`,14)}</button>`:``}
      </div>
    `}function d(){let e=document.getElementById(`qf-text`)?.value.trim();if(!e)return W(`Question text is required`,`warning`),null;let t=document.querySelectorAll(`.qf-choice-text`),n=document.querySelectorAll(`.qf-correct`),r=[];if(t.forEach((e,t)=>{let i=e.value.trim();i&&r.push({text:i,isCorrect:n[t]?.checked||!1})}),r.length<2)return W(`At least 2 choices required`,`warning`),null;if(!r.some(e=>e.isCorrect))return W(`At least one correct answer required`,`warning`),null;let i=document.getElementById(`qf-code`)?.value||null,a=document.getElementById(`qf-split-code`)?.checked&&document.getElementById(`qf-code-main`)?.value||null,o=r.filter(e=>e.isCorrect).length>1,s=document.getElementById(`qf-tags`)?.value.trim()||``,c=s?s.split(`,`).map(e=>e.trim()).filter(Boolean):[],l=document.getElementById(`qf-type-select`)?.value;return l===`__custom__`&&(l=document.getElementById(`qf-type-custom`)?.value.trim()),l||=`Predict Output`,{title:document.getElementById(`qf-title`)?.value.trim()||null,type:l,tags:c,text:e,codeSnippet:i,codeSnippetMain:a,codeLanguage:document.getElementById(`qf-lang`)?.value.trim()||null,choices:r,multiSelect:o,timeLimit:parseInt(document.getElementById(`qf-time`)?.value)||30,explanation:document.getElementById(`qf-explanation`)?.value.trim()||null,bank:document.getElementById(`qf-bank`)?.value.trim()||`Custom Questions`,difficulty:document.getElementById(`qf-difficulty`)?.value||`medium`}}function f(e){X({title:`Delete Question`,content:`<p>Are you sure you want to delete this question? This cannot be undone.</p>`,confirmText:`Delete`,danger:!0,onConfirm:async()=>{try{return await Ma(e),t=t.filter(t=>t.id!==e),W(`Question deleted`,`success`),c(),!0}catch(e){return W(`Error: `+e.message,`error`),!1}}})}function p(){if(t.length===0){W(`Question bank is already empty`,`info`);return}X({title:`Clear Question Bank`,content:`<p>Are you sure you want to delete ALL questions in the bank? This action is permanent and cannot be undone.</p>`,confirmText:`Clear Bank`,danger:!0,onConfirm:async()=>{try{return await Pa(q.state.activeCourseId),t=[],W(`Question bank cleared`,`success`),c(),!0}catch(e){return W(`Error: `+e.message,`error`),!1}}})}function m(){let e=document.createElement(`input`);e.type=`file`,e.accept=`.md,.markdown,.json`,e.addEventListener(`change`,async()=>{let n=e.files[0];n&&(t.length>0?X({title:`Import Questions`,content:`<p>You already have questions in the bank. Do you want to clear the existing questions before importing, or append the new questions?</p>`,confirmText:`Clear & Import`,cancelText:`Append`,danger:!0,onConfirm:async()=>(await h(n,!0),!0),onCancel:async()=>(await h(n,!1),!0)}):await h(n,!1))}),e.click()}async function h(e,n){try{let r=q.state.activeCourseId;n&&await Pa(r);let i=await Zo(e,r);W(`Imported ${i.imported} question${i.imported===1?``:`s`}${i.skipped?`, ${i.skipped} skipped`:``}`,`success`),t=await G(r),c()}catch(e){W(`Import error: `+e.message,`error`)}}function g(){let e=[...n];function t(){return e.map((e,t)=>`
        <div style="display:flex; justify-content:space-between; align-items:center; padding: 0.5rem; border: 1px solid var(--border-color); border-radius: 4px; margin-bottom: 0.5rem;">
          <span>${Q(e)}</span>
          <button class="btn btn--ghost btn--icon btn-del-type" data-idx="${t}" style="color:var(--error);" title="Remove Type">
            ${U(`trash`,14)}
          </button>
        </div>
      `).join(``)}let r=document.createElement(`div`);r.innerHTML=`
      <div style="margin-bottom: 1rem;">
        <p class="text-muted" style="margin-bottom: 1rem;">Manage the types available in the Question Type dropdown. Questions currently using deleted types will retain their type until updated.</p>
        <div id="types-list" style="max-height: 200px; overflow-y: auto; margin-bottom: 1rem;">
          ${t()}
        </div>
        <div style="display:flex; gap: 0.5rem;">
          <input type="text" id="new-type-input" class="input" placeholder="New type name..." style="flex:1;" />
          <button class="btn btn--secondary" id="btn-add-type">Add Type</button>
        </div>
      </div>
    `,X({title:`Manage Question Types`,content:r.innerHTML,confirmText:`Save Changes`,onOpen:n=>{let r=n.querySelector(`#types-list`),i=n.querySelector(`#new-type-input`),a=n.querySelector(`#btn-add-type`),o=()=>{n.querySelectorAll(`.btn-del-type`).forEach(n=>{n.addEventListener(`click`,n=>{let i=parseInt(n.currentTarget.dataset.idx,10);e.splice(i,1),r.innerHTML=t(),o()})})};o(),a.addEventListener(`click`,()=>{let n=i.value.trim();n&&!e.includes(n)&&(e.push(n),e.sort(),i.value=``,r.innerHTML=t(),o())})},onConfirm:async()=>{try{let t=q.state.activeCourseId;t&&t!=="default"&&await Do(t,{questionTypes:e}),n=e,W(`Question types updated`,`success`),c()}catch(e){W(`Failed to update types: `+e.message,`error`)}}})}}function Q(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}async function es(e=`all`){return(await vo()).map(t=>{let n=e===`all`?t.stats:t.courseStats?.[e]||{};return{uid:t.uid,name:t.name,icon:t.icon,accuracy:n.totalAnswered>0?Math.round(n.totalCorrect/n.totalAnswered*100):0,totalAnswered:n.totalAnswered||0,totalCorrect:n.totalCorrect||0,totalPoints:n.totalPoints||0,avgResponseTime:n.averageResponseTime||0,sessionsAttended:n.sessionsAttended||0,currentStreak:n.currentStreak||0,bestStreak:n.bestStreak||0,lastSeen:t.lastSeen}}).filter(e=>e.totalAnswered>0).sort((e,t)=>t.totalPoints-e.totalPoints)}async function ts(e=`all`){let t=await ro(e===`all`?null:e),n=[];for(let e of t)if(e.status===`ended`){let t=await io(e.id);n.push(...t)}let r=new Map;return n.forEach(e=>{let t=r.get(e.questionId);(!t||e.questionChoices&&e.questionChoices.length>0&&(!t.choices||t.choices.length===0))&&r.set(e.questionId,{id:e.questionId,text:e.questionText||`Unknown Question`,title:e.questionTitle||null,type:e.questionType||`Predict Output`,tags:e.questionTags||[],bank:e.questionBank||`Custom Questions`,difficulty:e.questionDifficulty||`medium`,choices:e.questionChoices||[],codeSnippet:e.questionCodeSnippet||null,explanation:e.questionExplanation||null})}),Array.from(r.values()).map(e=>{let t=n.filter(t=>t.questionId===e.id),r=t.length,i=t.filter(e=>e.correct).length,a=r>0?Math.round(t.reduce((e,t)=>e+(t.responseTime||0),0)/r):0,o=t.filter(e=>!e.correct).map(e=>e.selectedChoices?.join(`,`)),s={};o.forEach(e=>{e!==void 0&&(s[e]=(s[e]||0)+1)});let c=Object.entries(s).sort(([,e],[,t])=>t-e)[0],l=t.filter(e=>!e.correct).map(e=>e.selectedChoiceTexts?.join(` & `)),u={};l.forEach(e=>{e&&(u[e]=(u[e]||0)+1)});let d=Object.entries(u).sort(([,e],[,t])=>t-e)[0],f={};return e.choices&&e.choices.forEach(e=>f[e.text]=0),t.forEach(t=>{t.selectedChoiceTexts&&t.selectedChoiceTexts.length>0?t.selectedChoiceTexts.forEach(e=>{f[e]=(f[e]||0)+1}):t.selectedChoices&&e.choices&&e.choices.length>0&&t.selectedChoices.forEach(t=>{let n=e.choices[t]?.text;n&&(f[n]=(f[n]||0)+1)})}),{id:e.id,text:e.text,title:e.title,type:e.type,tags:e.tags,bank:e.bank,difficulty:e.difficulty,codeSnippet:e.codeSnippet,explanation:e.explanation,choices:e.choices,choiceDistribution:f,totalAttempts:r,correctRate:r>0?Math.round(i/r*100):0,avgResponseTime:a,mostCommonWrongAnswer:c?c[0]:null,mostCommonWrongAnswerText:d?d[0]:null}}).sort((e,t)=>e.correctRate-t.correctRate)}async function ns(e=`all`){let t=await ro(e===`all`?null:e),n=[];for(let e of t){let t=Object.keys(e.players||{}).length,r=await io(e.id),i=r.filter(e=>e.correct).length,a=r.length;n.push({id:e.id,name:e.name,status:e.status,date:e.createdAt,playerCount:t,questionCount:e.questionIds?.length||0,totalResponses:a,classAccuracy:a>0?Math.round(i/a*100):0,avgScore:t>0?Math.round(Object.values(e.players||{}).reduce((e,t)=>e+(t.points||0),0)/t):0})}return n.sort((e,t)=>{let n=e.date?.toDate?.()||new Date(e.date||0);return(t.date?.toDate?.()||new Date(t.date||0))-n})}async function rs(){wa(Ca(await es(),[`name`,`accuracy`,`totalAnswered`,`totalCorrect`,`totalPoints`,`avgResponseTime`,`sessionsAttended`,`bestStreak`]),`pollrequest-students-${Date.now()}.csv`)}async function is(){wa(Ca(await ts(),[`title`,`text`,`type`,`bank`,`tags`,`difficulty`,`totalAttempts`,`correctRate`,`avgResponseTime`]),`pollrequest-questions-${Date.now()}.csv`)}async function as(){wa(Ca(await ns(),[`name`,`status`,`playerCount`,`questionCount`,`totalResponses`,`classAccuracy`,`avgScore`]),`pollrequest-sessions-${Date.now()}.csv`)}async function os(){let[e,t,n]=await Promise.all([es(),ts(),ns()]),r={students:e,questions:t,sessions:n,exportedAt:new Date().toISOString()};wa(JSON.stringify(r,null,2),`pollrequest-data-${Date.now()}.json`,`application/json`)}async function ss(){let e=document.getElementById(`app`),t=`students`,n=await Ao(),r=await To(),i=q.state.activeCourseId||`all`,a=r.map(e=>`
    <option value="${e.id}" ${e.id===i?`selected`:``}>${e.name}</option>
  `).join(``);e.innerHTML=`
    <div class="host-layout screen">
      ${n}
      <div class="screen-subheader" style="padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color); background: var(--bg-secondary);">
        <button class="btn btn--ghost btn--sm" id="btn-back">
          ${U(`arrowLeft`,18)} Dashboard
        </button>
        <div style="display:flex;align-items:center;gap:1rem;">
          <h3 style="margin: 0;">Analytics</h3>
          <select id="analytics-course-filter" class="input" style="padding: 0.25rem 0.5rem; height: auto;">
            <option value="all" ${i===`all`?`selected`:``}>All Courses</option>
            ${a}
          </select>
        </div>
        <div style="display:flex;gap:0.5rem;">
          <button class="btn btn--danger btn--sm" id="btn-wipe-database">
            ${U(`trash`,16)} Wipe Data
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-export-csv">
            ${U(`download`,16)} Export CSV
          </button>
          <button class="btn btn--secondary btn--sm" id="btn-export-json">
            ${U(`download`,16)} Export All
          </button>
        </div>
      </div>

      <main class="host-content">
        <div class="analytics-layout container">
          <div class="tabs" style="margin-bottom:1.5rem;">
            <button class="tab tab--active" data-tab="students">Students</button>
            <button class="tab" data-tab="questions">Questions</button>
            <button class="tab" data-tab="sessions">Sessions</button>
          </div>
          <div id="analytics-content">
            <div class="flex-center" style="padding:3rem;"><div class="spinner"></div></div>
          </div>
        </div>
      </main>
    </div>
  `,document.getElementById(`btn-back`).addEventListener(`click`,()=>N.navigate(`/host/dashboard`)),document.getElementById(`analytics-course-filter`).addEventListener(`change`,e=>{i=e.target.value,c(t)}),document.querySelectorAll(`.tab`).forEach(e=>{e.addEventListener(`click`,()=>{document.querySelectorAll(`.tab`).forEach(e=>e.classList.remove(`tab--active`)),e.classList.add(`tab--active`),t=e.dataset.tab,c(t)})}),document.getElementById(`btn-wipe-database`).addEventListener(`click`,()=>{X({title:`Wipe Entire Database?`,content:`<p>Are you absolutely sure? This will delete ALL students, sessions, and questions from the database. This action cannot be undone.</p><p style="margin-top:1rem;color:var(--error);"><strong>We highly recommend exporting all data to JSON first.</strong></p>`,confirmText:`Wipe Everything`,danger:!0,onConfirm:async()=>{try{e.innerHTML=`<div class="flex-center screen"><div class="spinner"></div></div>`,await xo(),await so(),await lo(),W(`Database wiped`,`success`),N.navigate(`/host/dashboard`)}catch(e){W(`Failed to wipe data: `+e.message,`error`),N.navigate(`/host/analytics`)}}})}),document.getElementById(`btn-export-csv`).addEventListener(`click`,async()=>{try{t===`students`?await rs():t===`questions`?await is():await as(),W(`CSV exported`,`success`)}catch(e){W(`Export failed: `+e.message,`error`)}}),document.getElementById(`btn-export-json`).addEventListener(`click`,async()=>{try{await os(),W(`Full data exported as JSON`,`success`)}catch(e){W(`Export failed: `+e.message,`error`)}});let o=[],s={col:null,asc:!0};c(`students`);async function c(e){let t=document.getElementById(`analytics-content`);t.innerHTML=`<div class="flex-center" style="padding:3rem;"><div class="spinner"></div></div>`,s={col:null,asc:!0};try{e===`students`?(o=await es(i),u(t)):e===`questions`?(o=await ts(i),f(t)):(o=await ns(i),g(t))}catch(e){t.innerHTML=`<div class="empty-state"><div class="empty-state__title">Could not load data</div><div class="empty-state__text">${e.message}</div></div>`}}function l(e,t,n){e.querySelectorAll(`th[data-sort]`).forEach(r=>{r.style.cursor=`pointer`,r.addEventListener(`click`,()=>{let i=r.dataset.sort;s.col===i?s.asc=!s.asc:(s.col=i,s.asc=!0),o.sort((e,t)=>{let n=e[i],r=t[i];return typeof n==`string`&&(n=n.toLowerCase()),typeof r==`string`&&(r=r.toLowerCase()),n<r?s.asc?-1:1:n>r?s.asc?1:-1:0}),e.querySelectorAll(`th[data-sort]`).forEach(e=>{e.textContent=e.textContent.replace(` ↑`,``).replace(` ↓`,``).replace(` ↕`,``)+(e===r?s.asc?` ↑`:` ↓`:` ↕`)}),document.getElementById(n).innerHTML=t(o),n===`sessions-tbody`&&v()})})}function u(e){if(o.length===0){e.innerHTML=`<div class="empty-state"><div class="empty-state__title">No student data yet</div><div class="empty-state__text">Run a session first to start collecting data.</div></div>`;return}e.innerHTML=`
      <div class="analytics-stats-row">
        <div class="card stat-card"><div class="stat-card__value">${o.length}</div><div class="stat-card__label">Total Students</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(o.reduce((e,t)=>e+t.accuracy,0)/o.length)}%</div><div class="stat-card__label">Avg Accuracy</div></div>
        <div class="card stat-card"><div class="stat-card__value">${Math.round(o.reduce((e,t)=>e+t.avgResponseTime,0)/o.length/1e3)}s</div><div class="stat-card__label">Avg Response Time</div></div>
      </div>
      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-students">${U(`trash`,16)} Clear All Students</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table">
          <thead>
            <tr>
              <th data-sort="name">Student ↕</th>
              <th data-sort="accuracy">Accuracy ↕</th>
              <th data-sort="totalAnswered">Answered ↕</th>
              <th data-sort="totalPoints">Points ↕</th>
              <th data-sort="avgResponseTime">Avg Time ↕</th>
              <th data-sort="sessionsAttended">Sessions ↕</th>
              <th data-sort="bestStreak">Best Streak ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="students-tbody">
            ${d(o)}
          </tbody>
        </table>
      </div>
    `,l(e.querySelector(`.sortable-table`),d,`students-tbody`),document.getElementById(`btn-clear-students`).addEventListener(`click`,()=>{X({title:`Clear All Students?`,content:`Are you sure you want to delete all student profiles? This will not delete past sessions.`,confirmText:`Clear Students`,danger:!0,onConfirm:async()=>{await xo(),W(`Students cleared`,`success`),c(`students`)}})}),y(`students-tbody`,async e=>{await bo(e),W(`Student deleted`,`success`),c(`students`)})}function d(e){return e.map(e=>`
      <tr>
        <td>
          <div style="display:flex;align-items:center;gap:0.75rem;">
            <span style="color:var(--accent-primary);">${H(e.icon,32)}</span>
            <strong>${$(e.name)}</strong>
          </div>
        </td>
        <td>
          <div class="progress" style="width:80px;display:inline-block;vertical-align:middle;margin-right:0.5rem;">
            <div class="progress__fill" style="width:${e.accuracy}%;background:${e.accuracy>=70?`var(--success)`:e.accuracy>=40?`var(--warning)`:`var(--error)`}"></div>
          </div>
          ${e.accuracy}%
        </td>
        <td>${e.totalCorrect} / ${e.totalAnswered}</td>
        <td>${e.totalPoints.toLocaleString()}</td>
        <td>${(e.avgResponseTime/1e3).toFixed(1)}s</td>
        <td>${e.sessionsAttended}</td>
        <td>${e.bestStreak}</td>
        <td>
          <button class="btn btn--icon btn--ghost btn-delete-row" data-id="${e.uid}" title="Delete Student">
            <span style="color:var(--error);">${U(`trash`,16)}</span>
          </button>
        </td>
      </tr>
    `).join(``)}function f(e){if(o.length===0){e.innerHTML=`<div class="empty-state"><div class="empty-state__title">No question data yet</div></div>`;return}e.innerHTML=`
      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-questions">${U(`trash`,16)} Clear All Questions</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table">
          <thead>
            <tr>
              <th data-sort="text" style="width:40%;">Question ↕</th>
              <th data-sort="type">Type ↕</th>
              <th data-sort="bank">Sub-Bank ↕</th>
              <th data-sort="difficulty">Difficulty ↕</th>
              <th data-sort="totalAttempts">Attempts ↕</th>
              <th data-sort="correctRate">Correct Rate ↕</th>
              <th data-sort="avgResponseTime">Avg Time ↕</th>
              <th data-sort="mostCommonWrongAnswer">Most Common Distractor ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="questions-tbody">
            ${h(o)}
          </tbody>
        </table>
      </div>
    `,l(e.querySelector(`.sortable-table`),h,`questions-tbody`),document.getElementById(`btn-clear-questions`).addEventListener(`click`,()=>{X({title:`Clear All Questions?`,content:`Are you sure you want to clear historical analytics for all questions? This will wipe the report but leave your active Question Bank intact.`,confirmText:`Clear Analytics`,danger:!0,onConfirm:async()=>{await lo(),W(`Question analytics cleared`,`success`),c(`questions`)}})}),y(`questions-tbody`,async e=>{await co(e),W(`Question analytics deleted`,`success`),c(`questions`)}),p()}function p(){document.querySelectorAll(`.question-row`).forEach(e=>{e.addEventListener(`click`,t=>{if(t.target.closest(`.btn-delete-row`))return;let n=e.dataset.id,r=o.find(e=>e.id===n);r&&m(r)})})}function m(e){let t=`<div class="text-muted text-center" style="padding:2rem;">No distribution data available</div>`;if(e.choiceDistribution&&Object.keys(e.choiceDistribution).length>0){let n=Math.max(...Object.values(e.choiceDistribution));t=`<div style="display:flex;flex-direction:column;gap:0.75rem;">`+Object.entries(e.choiceDistribution).sort(([,e],[,t])=>t-e).map(([t,r])=>{let i=e.totalAttempts>0?Math.round(r/e.totalAttempts*100):0,a=n>0?r/n*100:0,o=e.choices?e.choices.some(e=>e.text===t&&e.isCorrect):!1;return`
            <div style="display:flex;flex-direction:column;gap:0.25rem;">
              <div style="display:flex;justify-content:space-between;align-items:flex-end;font-size:0.85rem;">
                <div style="font-weight:600;display:flex;align-items:center;gap:0.35rem;">
                  ${o?`<span style="color:var(--success);">`+U(`check`,14)+`</span>`:``}
                  ${$(t)}
                </div>
                <div class="text-muted">${r} picks (${i}%)</div>
              </div>
              <div style="width:100%;height:8px;background:var(--border-color);border-radius:4px;overflow:hidden;">
                <div style="height:100%;width:${a}%;background:${o?`var(--success)`:`var(--error)`};border-radius:4px;transition:width 0.5s ease-out;"></div>
              </div>
            </div>
          `}).join(``)+`</div>`}X({title:`Item Analysis`,content:`
      <div style="display:flex;flex-direction:column;gap:1.5rem;">
        
        <div style="padding:1rem;background:var(--bg-tertiary);border-radius:8px;border:1px solid var(--border-color);">
          ${e.title?`<h4 style="margin:0 0 0.5rem 0;font-size:1.1rem;">${$(e.title)}</h4>`:``}
          <div style="font-size:1rem;font-weight:500;">${$(e.text)}</div>
          ${e.codeSnippet?`
            <pre style="margin-top:1rem;background:var(--bg-primary);padding:1rem;border-radius:6px;overflow-x:auto;font-size:0.85rem;"><code class="language-java">${$(e.codeSnippet)}</code></pre>
          `:``}
        </div>

        <div>
          <h4 style="margin:0 0 1rem 0;font-size:0.9rem;text-transform:uppercase;color:var(--text-secondary);letter-spacing:0.5px;">Response Distribution</h4>
          ${t}
        </div>

        ${e.explanation?`
          <div>
            <h4 style="margin:0 0 0.5rem 0;font-size:0.9rem;text-transform:uppercase;color:var(--text-secondary);letter-spacing:0.5px;">Explanation / Key</h4>
            <div style="padding:1rem;background:rgba(59, 130, 246, 0.1);border-left:4px solid var(--primary);border-radius:4px;font-size:0.9rem;color:var(--text-primary);line-height:1.5;">
              ${$(e.explanation)}
            </div>
          </div>
        `:``}
        
      </div>
    `,confirmText:`Close`,onConfirm:()=>{}}),window.Prism&&setTimeout(()=>{document.querySelectorAll(`.modal-overlay pre code`).forEach(e=>{window.Prism.highlightElement(e)})},50)}function h(e){return e.map(e=>{let t=`-`;return e.mostCommonWrongAnswerText?t=$(e.mostCommonWrongAnswerText.length>30?e.mostCommonWrongAnswerText.substring(0,30)+`...`:e.mostCommonWrongAnswerText):e.mostCommonWrongAnswer&&(t=e.mostCommonWrongAnswer.split(`,`).map(e=>oa[parseInt(e)]).join(` & `)),`
        <tr class="question-row" data-id="${e.id}" style="cursor:pointer;" title="Click for Detailed Item Analysis">
          <td>
            ${e.title?`<div style="font-weight:700;font-size:1rem;margin-bottom:0.25rem;">${$(e.title)}</div>`:``}
            <div style="font-weight:${e.title?`400`:`500`};font-size:0.95rem;">${$(e.text.length>50?e.text.substring(0,50)+`...`:e.text)}</div>
            ${e.tags?.length>0?`<div style="margin-top:0.35rem;display:flex;gap:0.25rem;flex-wrap:wrap;">${e.tags.map(e=>`<span class="badge badge--neutral" style="font-size:0.7rem;">${$(e)}</span>`).join(``)}</div>`:``}
          </td>
          <td><span class="badge badge--primary" style="background:var(--primary-alpha);color:var(--primary);">${$(e.type||`Predict Output`)}</span></td>
          <td><span class="badge badge--neutral">${$(e.bank||`Custom Questions`)}</span></td>
          <td><span class="badge ${e.difficulty===`easy`?`badge--success`:e.difficulty===`hard`?`badge--error`:`badge--warning`}">${e.difficulty}</span></td>
          <td>${e.totalAttempts}</td>
          <td>
            <span class="${e.correctRate>=70?``:e.correctRate>=40?`text-bold`:``}" style="color:${e.correctRate>=70?`var(--success)`:e.correctRate>=40?`var(--warning)`:`var(--error)`}">
              ${e.correctRate}%
            </span>
          </td>
          <td>${(e.avgResponseTime/1e3).toFixed(1)}s</td>
          <td><span style="font-weight:700;color:var(--error);">${t}</span></td>
          <td>
            <button class="btn btn--icon btn--ghost btn-delete-row" data-id="${e.id}" title="Clear Historical Analytics for this Question">
              <span style="color:var(--error);">${U(`trash`,16)}</span>
            </button>
          </td>
        </tr>
      `}).join(``)}function g(e){if(o.length===0){e.innerHTML=`<div class="empty-state"><div class="empty-state__title">No sessions yet</div></div>`;return}e.innerHTML=`
      <div style="display:flex;justify-content:flex-end;margin-bottom:1rem;">
        <button class="btn btn--danger btn--sm" id="btn-clear-sessions">${U(`trash`,16)} Clear All Sessions</button>
      </div>
      <div class="table-wrap">
        <table class="table sortable-table" style="width:100%;">
          <thead>
            <tr>
              <th data-sort="name">Session ↕</th>
              <th data-sort="status">Status ↕</th>
              <th data-sort="date">Date ↕</th>
              <th data-sort="playerCount">Players ↕</th>
              <th data-sort="questionCount">Questions ↕</th>
              <th data-sort="classAccuracy">Accuracy ↕</th>
              <th data-sort="avgScore">Avg Score ↕</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="sessions-tbody">
            ${_(o)}
          </tbody>
        </table>
      </div>
    `,l(e.querySelector(`.sortable-table`),_,`sessions-tbody`),v(),document.getElementById(`btn-clear-sessions`).addEventListener(`click`,()=>{X({title:`Clear All Sessions?`,content:`Are you sure you want to delete all past sessions? Their data will be lost.`,confirmText:`Clear Sessions`,danger:!0,onConfirm:async()=>{await so(),W(`Sessions cleared`,`success`),c(`sessions`)}})}),y(`sessions-tbody`,async e=>{await oo(e),W(`Session deleted`,`success`),c(`sessions`)},`.btn-delete-row-session`)}function _(e){return e.map(e=>`
      <tr class="session-row" data-id="${e.id}" style="cursor:pointer;" title="Click to expand question details">
        <td class="session-expand-cell">
          <div style="font-weight:600;display:flex;align-items:center;gap:0.5rem;">
            <svg class="expand-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="transition:transform 0.2s;"><polyline points="9 18 15 12 9 6"></polyline></svg>
            ${$(e.name)}
          </div>
        </td>
        <td><span class="badge ${e.status===`ended`?`badge--success`:`badge--warning`}">${e.status}</span></td>
        <td>${ba(e.date)}</td>
        <td>${e.playerCount}</td>
        <td>${e.questionCount}</td>
        <td>${e.classAccuracy}%</td>
        <td>${e.avgScore.toLocaleString()}</td>
        <td>
          <button class="btn btn--icon btn--ghost btn-delete-row-session" data-id="${e.id}" title="Delete Session" style="position:relative;z-index:2;">
            <span style="color:var(--error);">${U(`trash`,16)}</span>
          </button>
        </td>
      </tr>
      <tr class="session-details-row" id="details-${e.id}" style="display:none;background:var(--bg-tertiary);">
        <td colspan="8" style="padding:1.5rem;">
          <div class="flex-center spinner-container"><div class="spinner spinner--sm"></div></div>
          <div class="details-content" style="display:none;"></div>
        </td>
      </tr>
    `).join(``)}function v(){document.querySelectorAll(`.session-row`).forEach(e=>{e.addEventListener(`click`,async t=>{if(t.target.closest(`.btn-delete-row-session`))return;let n=e.dataset.id,r=document.getElementById(`details-${n}`),i=e.querySelector(`.expand-icon`);if(r.style.display===`none`){r.style.display=`table-row`,i.style.transform=`rotate(90deg)`;let e=r.querySelector(`.details-content`),t=r.querySelector(`.spinner-container`);if(e.innerHTML===``)try{let r=await io(n),i=await G(),a=new Map(i.map(e=>[e.id,e])),o={};r.forEach(e=>{o[e.questionId]||(o[e.questionId]={q:a.get(e.questionId),attempts:0,correct:0}),o[e.questionId].attempts++,e.correct&&o[e.questionId].correct++}),e.innerHTML=Object.values(o).map(({q:e,attempts:t,correct:n})=>{let r=t>0?Math.round(n/t*100):0;return`
                  <div style="display:flex;justify-content:space-between;padding:0.5rem 0;border-bottom:1px solid var(--border-color);">
                    <div style="flex:1;">${$(e?e.text:`Unknown Question`)}</div>
                    <div style="width:100px;text-align:right;">
                      <span style="color:${r>=70?`var(--success)`:r>=40?`var(--warning)`:`var(--error)`};font-weight:600;">${r}%</span>
                    </div>
                  </div>
                `}).join(``)||`<div class="text-muted">No questions answered in this session.</div>`,t.style.display=`none`,e.style.display=`block`}catch{t.style.display=`none`,e.innerHTML=`<div class="text-error">Failed to load details</div>`,e.style.display=`block`}}else r.style.display=`none`,i.style.transform=`rotate(0deg)`})})}function y(e,t,n=`.btn-delete-row`){document.getElementById(e)?.addEventListener(`click`,e=>{let r=e.target.closest(n);if(r){e.stopPropagation();let n=r.dataset.id;X({title:`Confirm Delete`,content:`Are you sure you want to delete this row?`,confirmText:`Delete`,danger:!0,onConfirm:async()=>{await t(n)}})}})}}function $(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}async function cs(){let e=document.getElementById(`app`),t=go();e.innerHTML=`
    <div class="join-screen screen">
      <button class="btn btn--ghost" id="btn-back" style="position:absolute;top:1rem;left:1rem;">
        ${U(`arrowLeft`,20)} Back
      </button>

      <div class="join-screen__logo text-gradient">PollRequest</div>
      <div class="join-screen__subtitle">Enter the session code from the screen</div>

      <div class="join-screen__form">
        <input
          type="text"
          class="join-code-input"
          id="join-code"
          placeholder="CODE"
          maxlength="6"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="characters"
          spellcheck="false"
        />
        ${t?`
          <button class="btn btn--primary btn--lg btn--full" id="btn-join-saved" style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
            <span>Continue as ${ls(t.name)}</span>
            ${H(t.icon,20)}
          </button>
          <button class="btn btn--secondary btn--lg btn--full" id="btn-join-new" style="margin-top:0.75rem;">
            Join as someone else
          </button>
        `:`
          <button class="btn btn--primary btn--lg btn--full" id="btn-join">
            Join Session
          </button>
        `}
        <div id="join-error" class="text-center" style="color:var(--error);font-size:0.875rem;min-height:1.25rem;margin-top:0.5rem;"></div>
      </div>
    </div>
  `;let n=document.getElementById(`join-code`),r=document.getElementById(`join-error`);n.addEventListener(`input`,e=>{e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,``),r.textContent=``});async function i(e=`default`){let t=n.value.trim().toUpperCase();if(!t||t.length<4){r.textContent=`Please enter a valid code`;return}document.querySelectorAll(`.join-screen__form .btn`).forEach(e=>{e.disabled=!0,e.classList.contains(`btn--primary`)&&(e.innerHTML=`<div class="spinner spinner--sm"></div> Joining...`)}),r.textContent=``;try{let n=await Ka(t);if(!n){r.textContent=`Session not found. Check the code and try again.`,a();return}sessionStorage.setItem(`pollrequest_session`,n.id),sessionStorage.setItem(`pollrequest_join_code`,t),e===`saved`?N.navigate(`/player/waiting/${n.id}`):(e===`new`&&await _o(),N.navigate(`/player/profile/${n.id}`))}catch{r.textContent=`Connection error. Please try again.`,a()}}function a(){if(t){let e=document.getElementById(`btn-join-saved`);e&&(e.disabled=!1,e.textContent=`Continue as ${t.name}`);let n=document.getElementById(`btn-join-new`);n&&(n.disabled=!1)}else{let e=document.getElementById(`btn-join`);e&&(e.disabled=!1,e.textContent=`Join Session`)}}t?(document.getElementById(`btn-join-saved`).addEventListener(`click`,()=>i(`saved`)),document.getElementById(`btn-join-new`).addEventListener(`click`,()=>i(`new`))):document.getElementById(`btn-join`).addEventListener(`click`,()=>i(`default`)),n.addEventListener(`keydown`,e=>{e.key===`Enter`&&i(t?`saved`:`default`)}),document.getElementById(`btn-back`).addEventListener(`click`,()=>N.navigate(`/`)),n.focus()}function ls(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}function us(e,t={}){let{onSelect:n=()=>{},selected:r=null,columns:i=6}=t,a=r;function o(){let t=[`cs`,`animal`,`game`,`space`],r={cs:`Tech`,animal:`Animals`,game:`Objects`,space:`Space & Nature`},o=`<div class="icon-picker">`;t.forEach(e=>{let t=da.filter(t=>t.category===e);t.length!==0&&(o+=`
        <div class="icon-picker__category">
          <div class="icon-picker__category-label">${r[e]}</div>
          <div class="icon-picker__grid" style="grid-template-columns: repeat(${i}, 1fr);">
      `,t.forEach(e=>{let t=e.id===a;o+=`
          <button
            class="icon-picker__item ${t?`icon-picker__item--selected`:``}"
            data-icon-id="${e.id}"
            title="${e.name}"
            type="button"
          >
            ${H(e.id,28)}
          </button>
        `}),o+=`</div></div>`)}),o+=`</div>`,e.innerHTML=o,e.querySelectorAll(`.icon-picker__item`).forEach(t=>{t.addEventListener(`click`,()=>{a=t.dataset.iconId,e.querySelectorAll(`.icon-picker__item`).forEach(e=>e.classList.remove(`icon-picker__item--selected`)),t.classList.add(`icon-picker__item--selected`),n(a)})})}if(o(),!document.querySelector(`#icon-picker-styles`)){let e=document.createElement(`style`);e.id=`icon-picker-styles`,e.textContent=`
      .icon-picker {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 100%;
        max-width: 400px;
      }
      .icon-picker__category-label {
        font-size: 0.75rem;
        font-weight: 600;
        color: var(--text-tertiary);
        text-transform: uppercase;
        letter-spacing: 0.05em;
        margin-bottom: 0.375rem;
      }
      .icon-picker__grid {
        display: grid;
        gap: 0.375rem;
      }
      .icon-picker__item {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        aspect-ratio: 1;
        border: 2px solid var(--border-color);
        border-radius: var(--radius-md);
        background: var(--bg-secondary);
        color: var(--text-secondary);
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0.375rem;
      }
      .icon-picker__item:hover {
        border-color: var(--accent-primary);
        color: var(--accent-primary);
        background: var(--accent-primary-soft);
        transform: scale(1.08);
      }
      .icon-picker__item--selected {
        border-color: var(--accent-primary);
        background: var(--accent-primary-soft);
        color: var(--accent-primary);
        box-shadow: 0 0 0 3px var(--accent-primary-soft);
      }
      .icon-picker__item svg {
        width: 100%;
        height: 100%;
        max-width: 28px;
        max-height: 28px;
      }
    `,document.head.appendChild(e)}return{getSelected:()=>a,setSelected:e=>{a=e,o()},destroy:()=>{e.innerHTML=``}}}async function ds(e){let t=document.getElementById(`app`),n=e.id||``,r=n.split(`?`)[0],i=n.includes(`?`)?new URLSearchParams(n.split(`?`)[1]):new URLSearchParams;if(!r){N.navigate(`/player/join`);return}let a=null;t.innerHTML=`
    <div class="profile-setup screen">
      <h2 class="profile-setup__title">Create Your Profile</h2>
      <p class="profile-setup__subtitle">Pick a name and an icon to represent you</p>

      <input
        type="text"
        class="profile-name-input"
        id="player-name"
        placeholder="Your name"
        maxlength="20"
        autocomplete="name"
      />

      <div class="profile-icon-label">Choose your icon</div>
      <div id="icon-picker-container"></div>

      <div id="preview-container" style="display:none;">
        <div class="profile-preview">
          <span class="profile-preview__icon" id="preview-icon"></span>
          <span id="preview-name">You</span>
        </div>
      </div>

      <button class="btn btn--primary btn--lg btn--full" id="btn-join" disabled style="margin-top:1rem;max-width:350px;">
        Join Session
      </button>
    </div>
  `,us(document.getElementById(`icon-picker-container`),{columns:6,onSelect:e=>{a=e,d(),f()}});let o=document.getElementById(`player-name`),s=document.getElementById(`btn-join`),c=document.getElementById(`preview-container`),l=document.getElementById(`preview-icon`),u=document.getElementById(`preview-name`);o.addEventListener(`input`,()=>{d(),f()});function d(){let e=o.value.trim();e&&a?(c.style.display=`block`,l.innerHTML=H(a,24),u.textContent=e):c.style.display=`none`}function f(){let e=o.value.trim();s.disabled=!e||!a}i.get(`error`)===`name_taken`&&W(`Your name is already taken. Please pick another.`,`warning`),J(async()=>{let{userStore:e}=await Promise.resolve().then(()=>Ia);return{userStore:e}},void 0).then(({userStore:e})=>{if(e.state.name&&i.get(`error`)!==`name_taken`&&(o.value=e.state.name),e.state.icon){let t=document.querySelector(`.icon-btn[data-id="${e.state.icon}"]`);t&&t.click()}d(),f()}),s.addEventListener(`click`,async()=>{let e=o.value.trim();if(!(!e||!a)){s.disabled=!0,s.innerHTML=`<div class="spinner spinner--sm"></div> Joining...`;try{let t=await fo(),n=t,i=await ho(e,a);i?n=i.uid:K.state.name&&(K.state.name!==e||K.state.icon!==a)&&(n=await po());let o=K.state.uid||t;n!==o&&await Ja(r,o),await qa(r,{uid:n,name:e,icon:a}),K.update({uid:n,name:e,icon:a,isAuthenticated:!0}),localStorage.setItem(`pollrequest_uid`,n),localStorage.setItem(`pollrequest_name`,e),localStorage.setItem(`pollrequest_icon`,a),N.navigate(`/player/waiting/${r}`)}catch(e){e.message===`name_taken`?W(`This name is already taken in the current session.`,`error`):W(`Failed to join: `+e.message,`error`),s.disabled=!1,s.textContent=`Join Session`}}}),o.focus()}async function fs(e,t,n){if(document.getElementById(`student-stats-modal`))return;let r=document.createElement(`div`);r.id=`student-stats-modal`,r.style.cssText=`
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  `;let i=document.createElement(`div`);i.className=`screen`,i.style.cssText=`
    background: var(--bg-primary);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    position: relative;
    transform: translateY(20px);
    transition: transform 0.2s ease;
    border: 1px solid var(--border-color);
  `,i.innerHTML=`
    <button id="btn-close-stats" style="
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: none;
      border: none;
      color: var(--text-tertiary);
      cursor: pointer;
      padding: 0.5rem;
    ">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
    <div style="text-align:center;margin-bottom:2rem;">
      <div style="color:var(--accent-primary);margin-bottom:1rem; display:flex; justify-content:center;">
        ${H(n,40)}
      </div>
      <h2 style="margin:0;color:var(--text-primary);font-size:1.5rem;">${ps(t)}</h2>
      <div style="color:var(--text-tertiary);font-size:0.875rem;margin-top:0.25rem;">Student Statistics</div>
    </div>
    <div id="stats-body" style="min-height: 200px; display: flex; align-items: center; justify-content: center;">
      <div class="spinner"></div>
    </div>
  `,r.appendChild(i),document.body.appendChild(r),requestAnimationFrame(()=>{r.style.opacity=`1`,i.style.transform=`translateY(0)`});function a(){r.style.opacity=`0`,i.style.transform=`translateY(20px)`,setTimeout(()=>{r.parentNode&&r.parentNode.removeChild(r)},200)}document.getElementById(`btn-close-stats`).addEventListener(`click`,a),r.addEventListener(`click`,e=>{e.target===r&&a()});try{let t=(await mo(e))?.stats||{},n=t.totalAnswered>0?Math.round(t.totalCorrect/t.totalAnswered*100):0,r=document.getElementById(`stats-body`);if(!r)return;r.style.display=`block`,r.style.minHeight=`auto`,r.innerHTML=`
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <div style="font-size: 1.75rem; font-weight: 800; color: var(--accent-primary); font-family: 'JetBrains Mono', monospace;">
            ${(t.totalPoints||0).toLocaleString()}
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem; font-weight: 600;">Total Points</div>
        </div>
        
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
          <div style="font-size: 1.75rem; font-weight: 800; color: ${n>=70?`var(--success)`:n>=40?`var(--warning)`:`var(--error)`}; font-family: 'JetBrains Mono', monospace;">
            ${n}%
          </div>
          <div style="font-size: 0.75rem; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.05em; margin-top: 0.25rem; font-weight: 600;">Accuracy</div>
        </div>
      </div>

      <div style="background: var(--bg-elevated); border: 1px solid var(--border-color); border-radius: var(--radius-md); overflow: hidden;">
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Questions Answered</span>
          <span style="font-weight: 600; color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">${t.totalAnswered||0}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Correct Answers</span>
          <span style="font-weight: 600; color: var(--success); font-family: 'JetBrains Mono', monospace;">${t.totalCorrect||0}</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem; border-bottom: 1px solid var(--border-color);">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Best Streak</span>
          <span style="font-weight: 600; color: var(--warning); font-family: 'JetBrains Mono', monospace;">${t.bestStreak||0} 🔥</span>
        </div>
        <div style="display: flex; justify-content: space-between; padding: 0.75rem 1rem;">
          <span style="color: var(--text-secondary); font-size: 0.875rem;">Sessions Joined</span>
          <span style="font-weight: 600; color: var(--text-primary); font-family: 'JetBrains Mono', monospace;">${t.sessionsAttended||0}</span>
        </div>
      </div>
    `}catch(e){console.error(`Failed to load stats:`,e);let t=document.getElementById(`stats-body`);t&&(t.innerHTML=`
        <div style="color: var(--error); text-align: center;">
          Failed to load statistics. Please try again.
        </div>
      `)}}function ps(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}async function ms(e){let t=document.getElementById(`app`),n=e.id;if(!n){N.navigate(`/player/join`);return}let r=null;if(K.state.name&&K.state.icon){r={uid:K.state.uid,name:K.state.name,icon:K.state.icon};try{await qa(n,r)}catch(e){if(console.warn(`Could not join session:`,e),e.message===`name_taken`){N.navigate(`/player/profile/${n}?error=name_taken`);return}}}else if(r=go(),r)try{let e=await fo();r.uid=e,await qa(n,{uid:e,name:r.name,icon:r.icon}),K.update({uid:e,name:r.name,icon:r.icon,isAuthenticated:!0})}catch(e){if(console.warn(`Could not rejoin session:`,e),e.message===`name_taken`){N.navigate(`/player/profile/${n}?error=name_taken`);return}}if(!r){N.navigate(`/player/profile/${n}`);return}t.innerHTML=`
    <div class="waiting-screen screen">
      <div class="waiting-screen__icon">
        ${H(r.icon,80)}
      </div>
      <div class="waiting-screen__name">
        ${hs(r.name)}
      </div>
      <div class="waiting-screen__message">
        You're in! Waiting for the host to start
        <span class="waiting-dots"><span></span><span></span><span></span></span>
      </div>

      <div class="waiting-screen__actions" style="display:flex; gap:1rem; margin-top:2.5rem; justify-content:center; width: 100%; max-width: 400px; margin-inline: auto; animation: slideUp 0.5s ease-out 0.2s both;">
        <button class="btn btn--secondary" id="btn-edit-profile" style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; box-shadow: var(--shadow-sm); padding: 0.75rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          Edit Profile
        </button>
        <button class="btn btn--secondary" id="btn-view-stats" style="flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; box-shadow: var(--shadow-sm); padding: 0.75rem;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"></path><path d="M12 20V4"></path><path d="M6 20v-6"></path></svg>
          View Stats
        </button>
      </div>

      <div class="text-muted text-sm" style="margin-top:2rem; animation: slideUp 0.5s ease-out 0.4s both;" id="player-count-msg">
        Looking for session...
      </div>
    </div>
  `,document.getElementById(`btn-edit-profile`)?.addEventListener(`click`,()=>{N.navigate(`/player/profile/${n}`)}),document.getElementById(`btn-view-stats`)?.addEventListener(`click`,()=>{fs(r.uid,r.name,r.icon)});let i=Ya(n,e=>{if(!e){W(`Session not found`,`error`),N.navigate(`/player/join`),i();return}let t=Object.keys(e.players||{}).length,r=document.getElementById(`player-count-msg`);r&&(r.textContent=`${t} player${t===1?``:`s`} connected`),(e.currentQuestionState===`accepting`||e.currentQuestionState===`paused`)&&(i(),N.navigate(`/player/game/${n}`)),e.status===`ended`&&(i(),W(`Session ended by host`,`info`),N.navigate(`/`))});return()=>i()}function hs(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}async function gs(e){let t=document.getElementById(`app`),n=e.id;if(!n){N.navigate(`/player/join`);return}let r=K.state.uid?{uid:K.state.uid,name:K.state.name,icon:K.state.icon}:go();if(!r){N.navigate(`/player/join`);return}let i=[],a=-1,o=null,s=new Set,c=null,l=0,u=!1,d=null;t.innerHTML=`<div class="flex-center" style="min-height:100vh;"><div class="spinner"></div></div>`;let f=Ya(n,async e=>{if(!e)return;if(i.length===0&&e.questionIds)try{i=await Oa(e.questionIds)}catch(e){console.warn(`Could not load questions:`,e)}let t=e.currentQuestionIndex??0,n=e.currentQuestionState;n===`accepting`&&t!==a&&(a=t,u=!1,s.clear(),c=Date.now(),o=`answering`,p(e,t)),o===`answering`&&(e.timerPaused?(y(),v(`PAUSED`,`warning`)):e.timerEnd&&_(e,e.timeLimit||30)),n===`results`&&o!==`result`&&(o=`result`,h(e,t)),e.status===`ended`&&(f(),y(),g(e))});function p(e,n){let r=i[n];if(!r)return;let a=i.length,o=r.multiSelect;t.innerHTML=`
      <div class="answer-screen screen">
        <div class="answer-screen__header">
          <span class="answer-screen__question-num">Q${n+1}/${a}</span>
          <span class="answer-screen__timer-badge" id="player-timer">${r.timeLimit||30}</span>
        </div>

        <div class="answer-screen__question">${_s(r.text)}</div>
        ${r.codeSnippetMain?`
          <div class="dual-snippets" style="font-size: 0.85rem; margin-top: 0.5rem; margin-bottom: 1rem;">
            <div>
              <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Class Definition</div>
              <div class="question-code-wrap" style="height:100%;">
                ${zo(r.codeSnippet,r.codeLanguage)}
              </div>
            </div>
            <div>
              <div class="text-sm text-muted" style="margin-bottom:0.25rem;">// Main Method</div>
              <div class="question-code-wrap" style="height:100%;">
                ${zo(r.codeSnippetMain,r.codeLanguage)}
              </div>
            </div>
          </div>
        `:r.codeSnippet?`
          <div class="question-code-wrap" style="font-size: 0.85rem; margin-top: 0.5rem; margin-bottom: 1rem;">
            ${zo(r.codeSnippet,r.codeLanguage)}
          </div>
        `:``}
        ${o?`<div class="text-muted text-sm" style="margin-bottom:0.25rem;">Tap all correct answers</div>`:``}

        <div class="answer-screen__buttons" id="answer-buttons">
          ${r.choices.map((e,t)=>`
            <button class="answer-btn answer-btn--${aa[t]}" data-idx="${t}" id="answer-${t}">
              <span class="answer-btn__label">${oa[t]}</span>
              <span class="answer-btn__text">${_s(e.text)}</span>
            </button>
          `).join(``)}
        </div>

        ${o?`
          <div class="answer-screen__submit-info">
            <button class="btn btn--primary btn--full" id="btn-submit-multi" disabled>
              Submit Answer
            </button>
          </div>
        `:``}
      </div>
    `,_(e,r.timeLimit||30),document.querySelectorAll(`#answer-buttons .answer-btn`).forEach(e=>{e.addEventListener(`click`,()=>{if(u)return;let t=parseInt(e.dataset.idx);if(o){s.has(t)?(s.delete(t),e.classList.remove(`answer-btn--selected`)):(s.add(t),e.classList.add(`answer-btn--selected`));let n=document.getElementById(`btn-submit-multi`);n&&(n.disabled=s.size===0)}else s.add(t),e.classList.add(`answer-btn--selected`),m(r,n)})}),document.getElementById(`btn-submit-multi`)?.addEventListener(`click`,()=>{!u&&s.size>0&&m(r,n)})}async function m(e,i){if(u)return;u=!0,y();let a=Date.now()-c,d=[...s],f=(e.timeLimit||30)*1e3,p=Io(d,e.choices,e.multiSelect),m=Fo({correct:p.correct,responseTimeMs:a,timeLimitMs:f,currentStreak:l,multiSelect:e.multiSelect,correctPicks:p.correctPicks,totalCorrect:p.totalCorrect});l=m.newStreak,document.querySelectorAll(`#answer-buttons .answer-btn`).forEach(e=>{e.classList.add(`answer-btn--disabled`)});try{await to(n,{questionId:e.id||`q${i}`,questionIndex:i,studentUid:r.uid,selectedChoices:d,correct:p.correct,responseTime:a,pointsEarned:m.points,questionText:e.text||``,questionTitle:e.title||null,questionType:e.type||`Predict Output`,questionTags:e.tags||[],questionBank:e.bank||`Custom Questions`,questionDifficulty:e.difficulty||`medium`,selectedChoiceTexts:d.map(t=>e.choices[t]?.text||``),questionChoices:e.choices||[],questionCodeSnippet:e.codeSnippet||null,questionExplanation:e.explanation||null})}catch(e){console.error(`Failed to submit answer:`,e)}o=`submitted`,t.innerHTML=`
      <div class="player-result screen">
        <div class="player-result__icon ${p.correct?`player-result__icon--correct`:`player-result__icon--incorrect`}">
          ${p.correct?U(`check`,64):U(`x`,64)}
        </div>
        <h2 class="player-result__title ${p.correct?`player-result__title--correct`:`player-result__title--incorrect`}">
          ${p.correct?`Correct!`:`Incorrect`}
        </h2>
        <div class="player-result__points">${m.points>0?`+`:``}${m.points.toLocaleString()}</div>
        <div class="player-result__points-label">points</div>

        ${m.breakdown.speed>0?`<div class="text-sm text-muted">Speed bonus: +${m.breakdown.speed}</div>`:``}
        ${m.breakdown.streak>0?`
          <div class="player-result__streak">Streak: ${l} in a row! +${m.breakdown.streak}</div>
        `:``}

        <div class="text-muted" style="margin-top:1.5rem;">Waiting for results...</div>
      </div>
    `}function h(e,n){y();let r=(i[n]?.choices||[]).filter(e=>e.isCorrect).map(e=>e.text).join(` and `),a=r?`
      <div style="margin: 1.5rem 0 0 0; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-md); border-left: 4px solid var(--success); text-align: left;">
        <div class="text-sm text-muted" style="margin-bottom: 0.25rem;">Correct Answer</div>
        <div style="font-weight: 700; color: var(--text-primary); font-size: 1.1rem;">${_s(r)}</div>
      </div>
    `:``,s=n===i.length-1?`Waiting for final results...`:`Next question coming up...`;if(o===`result`&&document.querySelector(`.player-result`)){let e=document.querySelector(`.player-result`).querySelectorAll(`.text-muted`),t=e[e.length-1];t&&!document.getElementById(`injected-correct`)&&(t.textContent=s,t.insertAdjacentHTML(`beforebegin`,`<div id="injected-correct" style="width: 100%; max-width: 400px; margin: 0 auto;">${a}</div>`));return}t.innerHTML=`
      <div class="player-result screen">
        <div class="player-result__icon player-result__icon--incorrect">
          ${U(`clock`,64)}
        </div>
        <h2 class="player-result__title player-result__title--incorrect">Time's Up!</h2>
        <div class="player-result__points">+0</div>
        <div class="player-result__points-label">points</div>
        
        <div style="width: 100%; max-width: 400px; margin: 0 auto;">${a}</div>
        
        <div class="text-muted" style="margin-top:1.5rem;">${s}</div>
      </div>
    `,l=0}function g(e){let n=e.players||{},i=n[r.uid]?.points||0,a=Object.entries(n).map(([e,t])=>({uid:e,points:t.points||0})).sort((e,t)=>t.points-e.points),o=a.findIndex(e=>e.uid===r.uid)+1;t.innerHTML=`
      <div class="player-result screen">
        <div class="player-result__icon" style="color:var(--accent-primary);">
          ${H(r.icon,64)}
        </div>
        <h2 class="player-result__title" style="color:var(--text-primary);">Game Over!</h2>
        <div class="player-result__points" style="color:var(--accent-primary);">${i.toLocaleString()}</div>
        <div class="player-result__points-label">total points</div>
        <div class="player-result__rank" style="margin-top:1rem;">
          You placed <strong>#${o}</strong> out of ${a.length}
        </div>
        <button class="btn btn--primary btn--lg" id="btn-done" style="margin-top:2rem;">
          Done
        </button>
      </div>
    `,document.getElementById(`btn-done`).addEventListener(`click`,()=>{N.navigate(`/`)})}function _(e,t){y();let n=document.getElementById(`player-timer`);if(!n)return;function r(){if(!e.timerEnd||e.timerPaused)return;let t=e.timerEnd.toDate?e.timerEnd.toDate().getTime():e.timerEnd,r=Math.max(0,Math.ceil((t-Date.now())/1e3));n.textContent=r,r<=5?n.className=`answer-screen__timer-badge answer-screen__timer-badge--danger`:r<=10?n.className=`answer-screen__timer-badge answer-screen__timer-badge--warning`:n.className=`answer-screen__timer-badge`,r<=0&&y()}r(),d=setInterval(r,250)}function v(e,t){let n=document.getElementById(`player-timer`);n&&(n.textContent=e,t===`warning`&&(n.className=`answer-screen__timer-badge answer-screen__timer-badge--warning`))}function y(){d&&=(clearInterval(d),null)}return()=>{f(),y()}}function _s(e){let t=document.createElement(`span`);return t.textContent=e||``,t.innerHTML}function vs(){ga(),ys(),na()||bs(),N.addRoute(`/`,()=>_a()),N.addRoute(`/host/login`,()=>Ea()),N.addRoute(`/host/dashboard`,()=>jo()),N.addRoute(`/host/session-setup`,()=>Mo()),N.addRoute(`/host/lobby/:id`,e=>No(e)),N.addRoute(`/host/game/:id`,e=>Wo(e)),N.addRoute(`/host/podium/:id`,e=>Ko(e)),N.addRoute(`/host/questions`,()=>$o()),N.addRoute(`/host/analytics`,()=>ss()),N.addRoute(`/player/join`,()=>cs()),N.addRoute(`/player/profile/:id`,e=>ds(e)),N.addRoute(`/player/waiting/:id`,e=>ms(e)),N.addRoute(`/player/game/:id`,e=>gs(e)),N.beforeEach((e,t)=>{if(t&&(t.startsWith(`/player/waiting`)||t.startsWith(`/player/game`))&&!e.startsWith(`/player/waiting`)&&!e.startsWith(`/player/game`)){let e=t.split(`/`)[3];J(async()=>{let{userStore:e}=await Promise.resolve().then(()=>Ia);return{userStore:e}},void 0).then(({userStore:t})=>{let n=t.state.uid;n&&e&&J(async()=>{let{leaveSession:e}=await Promise.resolve().then(()=>Ha);return{leaveSession:e}},void 0).then(({leaveSession:t})=>{t(e,n)})})}if(t&&(t.startsWith(`/host/lobby`)||t.startsWith(`/host/game`))&&!e.startsWith(`/host/lobby`)&&!e.startsWith(`/host/game`)&&!e.startsWith(`/host/podium`)){let e=t.split(`/`)[3];e&&J(async()=>{let{endSession:e}=await Promise.resolve().then(()=>Ha);return{endSession:e}},void 0).then(({endSession:t})=>{t(e).catch(e=>console.warn(`Cleanup endSession failed`,e))})}return e.startsWith(`/host/`)&&e!==`/host/login`&&sessionStorage.getItem(`pollrequest_host`)!==`true`?(N.navigate(`/host/login`),!1):!0}),window.addEventListener(`beforeunload`,()=>{let e=N.getCurrentPath();if(e.startsWith(`player/waiting`)||e.startsWith(`player/game`)){let t=e.split(`/`)[2],n=localStorage.getItem(`pollrequest_uid`);n&&t&&J(async()=>{let{leaveSession:e}=await Promise.resolve().then(()=>Ha);return{leaveSession:e}},void 0).then(({leaveSession:e})=>{e(t,n)})}if(e.startsWith(`host/lobby`)||e.startsWith(`host/game`)){let t=e.split(`/`)[2];t&&J(async()=>{let{endSession:e}=await Promise.resolve().then(()=>Ha);return{endSession:e}},void 0).then(({endSession:e})=>{e(t)})}}),N.start()}function ys(){let e=document.createElement(`div`);e.id=`global-theme-switcher`,e.style.cssText=`
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    z-index: 99999;
    box-shadow: var(--shadow-lg);
    border-radius: var(--radius-md);
    background: var(--bg-secondary);
    opacity: 0.3;
    transition: opacity 0.2s ease;
  `,e.addEventListener(`mouseenter`,()=>e.style.opacity=`1`),e.addEventListener(`mouseleave`,()=>e.style.opacity=`0.3`),document.body.appendChild(e),J(async()=>{let{createThemeSwitcher:e}=await Promise.resolve().then(()=>pa);return{createThemeSwitcher:e}},void 0).then(({createThemeSwitcher:t})=>{t(e)});let t=document.createElement(`style`);t.textContent=`
    body:has(.question-screen, .results-screen, .podium-screen, .player-result, .answer-screen, .wait-screen, .profile-setup) #global-theme-switcher {
      display: none !important;
    }
  `,document.head.appendChild(t)}function bs(){let e=document.createElement(`div`);e.id=`firebase-warning`,e.style.cssText=`
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fef3c7;
    color: #92400e;
    padding: 0.75rem 1.5rem;
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    z-index: 99999;
    border-top: 2px solid #f59e0b;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  `,e.innerHTML=`
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
    <span>Firebase not configured. See <strong>SETUP.md</strong> for instructions. The app will not function until Firebase is connected.</span>
    <button onclick="this.parentElement.remove()" style="background:none;border:none;color:inherit;cursor:pointer;font-size:1.25rem;margin-left:1rem;">&times;</button>
  `,document.body.appendChild(e)}document.addEventListener(`DOMContentLoaded`,vs),document.readyState!==`loading`&&vs();