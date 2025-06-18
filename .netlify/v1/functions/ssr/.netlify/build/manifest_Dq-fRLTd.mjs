import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_HEADER, n as decodeKey } from './chunks/astro/server_Bujt4dGV.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from IANA HTTP Status Code Registry
  // https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  CONTENT_TOO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  MISDIRECTED_REQUEST: 421,
  UNPROCESSABLE_CONTENT: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  TOO_EARLY: 425,
  UPGRADE_REQUIRED: 426,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  LOOP_DETECTED: 508,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/nate/Documents/code/personal-site/","cacheDir":"file:///Users/nate/Documents/code/personal-site/node_modules/.astro/","outDir":"file:///Users/nate/Documents/code/personal-site/dist/","srcDir":"file:///Users/nate/Documents/code/personal-site/src/","publicDir":"file:///Users/nate/Documents/code/personal-site/public/","buildClientDir":"file:///Users/nate/Documents/code/personal-site/dist/","buildServerDir":"file:///Users/nate/Documents/code/personal-site/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":false,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"code/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/code","isIndex":false,"type":"page","pattern":"^\\/code\\/?$","segments":[[{"content":"code","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/code.astro","pathname":"/code","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"music/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/music","isIndex":false,"type":"page","pattern":"^\\/music\\/?$","segments":[[{"content":"music","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/music.astro","pathname":"/music","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"photography/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/photography","isIndex":false,"type":"page","pattern":"^\\/photography\\/?$","segments":[[{"content":"photography","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photography.astro","pathname":"/photography","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":":where([data-astro-image]){object-fit:var(--fit);object-position:var(--pos);height:auto}:where([data-astro-image=full-width]){width:100%}:where([data-astro-image=constrained]){max-width:100%}\n"}],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_og","pattern":"^\\/_og\\/?$","segments":[[{"content":"_og","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro-opengraph-image/src/route.ts","pathname":"/_og","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"external","_meta":{"trailingSlash":"ignore"}}}],"site":"https://natestgeorge.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/nate/Documents/code/personal-site/src/pages/code/[id].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/code/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/music/[id].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/music/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/blog.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/blog/[id].astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[id]@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/code.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/code@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/music.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/music@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/components/common/Header.astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/layouts/BaseLayout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/layouts/Layout.astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/index.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/nate/Documents/code/personal-site/src/pages/photography.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/photography@_@astro",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:node_modules/astro-opengraph-image/src/route@_@ts":"pages/_og.astro.mjs","\u0000@astro-page:src/pages/blog/[id]@_@astro":"pages/blog/_id_.astro.mjs","\u0000@astro-page:src/pages/blog@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/code/[id]@_@astro":"pages/code/_id_.astro.mjs","\u0000@astro-page:src/pages/code@_@astro":"pages/code.astro.mjs","\u0000@astro-page:src/pages/music/[id]@_@astro":"pages/music/_id_.astro.mjs","\u0000@astro-page:src/pages/music@_@astro":"pages/music.astro.mjs","\u0000@astro-page:src/pages/photography@_@astro":"pages/photography.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_Dq-fRLTd.mjs","/Users/nate/Documents/code/personal-site/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/nate/Documents/code/personal-site/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_Bvduxu3Z.mjs","/Users/nate/Documents/code/personal-site/.astro/content-assets.mjs":"chunks/content-assets_DplylMOL.mjs","/Users/nate/Documents/code/personal-site/.astro/content-modules.mjs":"chunks/content-modules_Dz-S_Wwv.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_C-PpusAu.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/2024 BSU Football Image.jpg":"chunks/2024 BSU Football Image_CcSy-zOX.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/BSU Football 2024 by Nate St George.jpg":"chunks/BSU Football 2024 by Nate St George_BZTZGB1a.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder 2024 (3).jpg":"chunks/Blue Thunder 2024 (3)_B7jXNjH6.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder 2024 (4).jpg":"chunks/Blue Thunder 2024 (4)_BO6HF856.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder 2024 (5).jpg":"chunks/Blue Thunder 2024 (5)_BU_EN1gY.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder 2024 (6).jpg":"chunks/Blue Thunder 2024 (6)_DvdVE5KU.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder 2024 by Nate St George.jpg":"chunks/Blue Thunder 2024 by Nate St George_DfNOFznG.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder DSC01710.jpg":"chunks/Blue Thunder DSC01710_DjaqypoU.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder DSC01732.jpg":"chunks/Blue Thunder DSC01732_BxvGZxPD.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder Game Photo.jpg":"chunks/Blue Thunder Game Photo_eDGzazS1.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder vs Oregon State.jpg":"chunks/Blue Thunder vs Oregon State_sxW9S5k-.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder vs Utah State (1).jpg":"chunks/Blue Thunder vs Utah State (1)_B8r38_KK.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder vs Utah State (2).jpg":"chunks/Blue Thunder vs Utah State (2)_tBvvHNXe.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Blue Thunder vs Utah State (3).jpg":"chunks/Blue Thunder vs Utah State (3)_B5Wx2FJU.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Photo IMG 2108.JPG":"chunks/Photo IMG 2108_CqjZlndv.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Photo from Google Photos (1).JPG":"chunks/Photo from Google Photos (1)_BpdTXeqi.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Photo from Google Photos (2).JPG":"chunks/Photo from Google Photos (2)_qIgphvrT.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/Photo from Google Photos.JPG":"chunks/Photo from Google Photos_SampNKDD.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/photography/nevergiveup.jpg":"chunks/nevergiveup_B0i5ktmm.mjs","/Users/nate/Documents/code/personal-site/src/assets/images/headers/photography.jpg":"chunks/photography_CnoZxUK2.mjs","/Users/nate/Documents/code/personal-site/src/pages/blog/[id].astro?astro&type=script&index=0&lang.ts":"_astro/_id_.astro_astro_type_script_index_0_lang.DCchx2iz.js","/Users/nate/Documents/code/personal-site/src/pages/photography.astro?astro&type=script&index=0&lang.ts":"_astro/photography.astro_astro_type_script_index_0_lang.Dr1kTGQA.js","/Users/nate/Documents/code/personal-site/src/components/common/ProjectOverlay.astro?astro&type=script&index=0&lang.ts":"_astro/ProjectOverlay.astro_astro_type_script_index_0_lang.CIUudpy9.js","/Users/nate/Documents/code/personal-site/src/components/MyWork.astro?astro&type=script&index=0&lang.ts":"_astro/MyWork.astro_astro_type_script_index_0_lang.-y-G2ODh.js","/Users/nate/Documents/code/personal-site/src/components/common/HoverButton.astro?astro&type=script&index=0&lang.ts":"_astro/HoverButton.astro_astro_type_script_index_0_lang.Cntyvw72.js","/Users/nate/Documents/code/personal-site/src/components/common/ParallaxImage.astro?astro&type=script&index=0&lang.ts":"_astro/ParallaxImage.astro_astro_type_script_index_0_lang.BxF1PizN.js","/Users/nate/Documents/code/personal-site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts":"_astro/BaseLayout.astro_astro_type_script_index_0_lang.CSFlpb_W.js","/Users/nate/Documents/code/personal-site/node_modules/astro-masonry/src/components/Masonry.astro?astro&type=script&index=0&lang.ts":"_astro/Masonry.astro_astro_type_script_index_0_lang.B0-k5t3e.js","/Users/nate/Documents/code/personal-site/src/components/common/Header.astro?astro&type=script&index=0&lang.ts":"_astro/Header.astro_astro_type_script_index_0_lang.DJMnXNyQ.js","/Users/nate/Documents/code/personal-site/src/components/ThemeSelector.astro?astro&type=script&index=0&lang.ts":"_astro/ThemeSelector.astro_astro_type_script_index_0_lang.CUaXux9L.js","/Users/nate/Documents/code/personal-site/node_modules/astro/components/ClientRouter.astro?astro&type=script&index=0&lang.ts":"_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/Users/nate/Documents/code/personal-site/src/components/common/Typewriter.astro?astro&type=script&index=0&lang.ts":"_astro/Typewriter.astro_astro_type_script_index_0_lang.DMsjEC8Q.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/nate/Documents/code/personal-site/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts","document.documentElement.classList.toggle(\"dark\",localStorage.theme===\"dark\"||!(\"theme\"in localStorage)&&window.matchMedia(\"(prefers-color-scheme: dark)\").matches);"],["/Users/nate/Documents/code/personal-site/node_modules/astro-masonry/src/components/Masonry.astro?astro&type=script&index=0&lang.ts","class d{container;originalItems;defaultCols=2;sortByHeight;breakpointCols;columnCount;resizeHandler;debug;constructor(e){this.container=e,this.originalItems=Array.from(e.children),this.defaultCols=2,this.sortByHeight=e.dataset.sortByHeight===\"true\",this.debug=e.dataset.debug===\"true\";const n=e.dataset.breakpointCols;try{const t=JSON.parse(n);this.breakpointCols=typeof t==\"object\"?t:{default:parseInt(t,10)}}catch{console.error(\"Invalid `breakpointCols` format:\",n),this.breakpointCols={default:this.defaultCols}}this.debug&&console.log(\"Parsed breakpointCols:\",this.breakpointCols),this.columnCount=this.calculateColumnCount(),this.resizeHandler=c(this.handleResize.bind(this),200),window.addEventListener(\"resize\",this.resizeHandler),requestAnimationFrame(()=>this.createLayout())}createLayout(){this.container.classList.remove(\"initialized\");const e=Array.from(this.container.querySelectorAll(\"[data-masonry-column]\"));let n;e.length===this.columnCount?(n=e,n.forEach(t=>t.innerHTML=\"\")):(this.container.innerHTML=\"\",n=Array.from({length:this.columnCount},()=>{const t=document.createElement(\"div\");return t.className=this.container.dataset.columnClass,t.style.width=`${100/this.columnCount}%`,t.setAttribute(\"data-masonry-column\",\"\"),this.container.appendChild(t),t})),this.sortByHeight?this.originalItems.forEach(t=>{n.reduce((s,r)=>r.offsetHeight<s.offsetHeight?r:s,n[0]).appendChild(t)}):this.originalItems.forEach((t,o)=>{const s=o%this.columnCount;n[s].appendChild(t)}),this.container.classList.add(\"initialized\")}calculateColumnCount(){const e=window.innerWidth;if(typeof this.breakpointCols==\"object\"){const n=Object.keys(this.breakpointCols).filter(o=>o!==\"default\").map(Number).sort((o,s)=>o-s);let t=this.breakpointCols.default;for(const o of n)if(e<=o){t=this.breakpointCols[o],this.debug&&console.log(`Matched breakpoint: ${o}px -> ${t} columns`);break}return t}return this.breakpointCols.default||this.defaultCols}handleResize(){const e=this.calculateColumnCount();e!==this.columnCount&&(this.debug&&console.log(\"Resizing: Changing column count from\",this.columnCount,\"to\",e),this.columnCount=e,this.createLayout())}}function l(){document.querySelectorAll(\"[data-masonry-container]\").forEach(i=>{i instanceof HTMLElement&&i.children.length>0&&new d(i)})}function c(i,e){let n,t;return(...o)=>{const s=Date.now();t?(clearTimeout(n),n=setTimeout(()=>{s-t>=e&&(i.apply(this,o),t=s)},e-(s-t))):(i.apply(this,o),t=s)}}let u=!1;const a=()=>{if(console.log(\"Initializing masonry.\"),!document.querySelector(\"[data-masonry-container]\")){console.warn(\"Masonry container not found.\");return}u?c(l,200)():(l(),u=!0)},h=()=>{if(typeof document>\"u\")return!1;const i=document.querySelector('meta[name=\"astro-view-transitions-enabled\"]');return i&&i.getAttribute(\"content\")===\"true\"};h()?document.addEventListener(\"astro:page-load\",a):document.readyState===\"loading\"?document.addEventListener(\"DOMContentLoaded\",a):a();"]],"assets":["/_astro/Blue Thunder vs Utah State (3).LkFiEvTb.jpg","/_astro/Photo from Google Photos (2).CnC1y2FD.JPG","/_astro/Blue Thunder Game Photo.C_U_HiVh.jpg","/_astro/Blue Thunder 2024 (5).tubmD_wC.jpg","/_astro/nevergiveup.LdqyCsJ1.jpg","/_astro/Blue Thunder 2024 (6).CAGpiZy6.jpg","/_astro/Blue Thunder 2024 by Nate St George.Dvcn6W--.jpg","/_astro/Blue Thunder vs Utah State (1).C-Tju0hH.jpg","/_astro/Blue Thunder vs Utah State (2).PaMpCOTw.jpg","/_astro/Photo from Google Photos (1).ayG4w5sN.JPG","/_astro/Blue Thunder 2024 (3).lWOE-vf4.jpg","/_astro/Blue Thunder vs Oregon State.DsxMwUOr.jpg","/_astro/Photo IMG 2108.BlENP5cZ.JPG","/_astro/Photo from Google Photos.CVUkEftr.JPG","/_astro/2024 BSU Football Image.Be1zZ2eY.jpg","/_astro/photography.D4DQCTAW.jpg","/_astro/BSU Football 2024 by Nate St George.CZe95OP1.jpg","/_astro/head.NSJOxLeZ.jpg","/_astro/main.culwRCDx.jpg","/_astro/Blue Thunder DSC01710.DikUaBUr.jpg","/_astro/Blue Thunder DSC01732.wb09nBvT.jpg","/_astro/header.ltadaj1h.jpg","/_astro/compubot-1.CmFl3kJ7.png","/_astro/requiem.C6d6NTld.jpg","/_astro/compubot-3.yExqyyzU.png","/_astro/compubot.BAzjTAEZ.png","/_astro/compubot-4.Cgdg2dc4.gif","/_astro/colossus.BDWyracR.jpg","/_astro/journey.QQFZEdec.jpg","/_astro/vekta.mmj_X2cx.png","/_astro/Blue Thunder 2024 (4).BuQpT-ms.jpg","/_astro/compubot-2.DIs22XEw.png","/_astro/blog.C589a4qw.css","/favicon.svg","/_astro/ClientRouter.astro_astro_type_script_index_0_lang.CtSceO8m.js","/_astro/Header.astro_astro_type_script_index_0_lang.DJMnXNyQ.js","/_astro/HoverButton.astro_astro_type_script_index_0_lang.Cntyvw72.js","/_astro/MyWork.astro_astro_type_script_index_0_lang.-y-G2ODh.js","/_astro/ParallaxImage.astro_astro_type_script_index_0_lang.BxF1PizN.js","/_astro/ProjectOverlay.astro_astro_type_script_index_0_lang.CIUudpy9.js","/_astro/ThemeSelector.astro_astro_type_script_index_0_lang.CUaXux9L.js","/_astro/Typewriter.astro_astro_type_script_index_0_lang.DMsjEC8Q.js","/_astro/_id_.astro_astro_type_script_index_0_lang.DCchx2iz.js","/_astro/hover.DCFiZyzg.js","/_astro/index.BJ-NWKrH.js","/_astro/index.Cgm360_R.js","/_astro/index.aog6rX6x.js","/_astro/photography.astro_astro_type_script_index_0_lang.Dr1kTGQA.js","/_astro/stagger.Bekob0EW.js","/img/grain.png","/img/grain.svg","/fonts/amelie-fierce/AmelieFierce-Regular.woff","/fonts/amelie-fierce/AmelieFierce-Regular.woff2","/fonts/inter/Inter-Italic-VariableFont_opsz,wght.ttf","/fonts/inter/Inter-VariableFont_opsz,wght.ttf","/fonts/departure-mono/DepartureMono-Regular.woff","/fonts/departure-mono/DepartureMono-Regular.woff2","/fonts/silver-editorial/sltfthesilvereditorial-bold-webfont.woff","/fonts/silver-editorial/sltfthesilvereditorial-bold-webfont.woff2","/fonts/silver-editorial/sltfthesilvereditorial-medium-webfont.woff","/fonts/silver-editorial/sltfthesilvereditorial-medium-webfont.woff2","/fonts/silver-editorial/sltfthesilvereditorial-mediumitalic-webfont.woff","/fonts/silver-editorial/sltfthesilvereditorial-mediumitalic-webfont.woff2","/fonts/silver-editorial/sltfthesilvereditorial-semibold-webfont.woff","/fonts/silver-editorial/sltfthesilvereditorial-semibold-webfont.woff2","/blog/index.html","/code/index.html","/music/index.html","/photography/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"OUmstvR7sC8oJ6GK/PJzbD5iDfe6GewuHxiD+MIGnzY=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/nate/Documents/code/personal-site/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
