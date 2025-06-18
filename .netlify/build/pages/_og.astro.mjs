import { parse } from 'devalue';
import { renderAsync } from '@resvg/resvg-js';
import { decodeHTML } from 'entities';
import lz from 'lz-string';
import satori from 'satori';
import { html } from 'satori-html';
export { renderers } from '../renderers.mjs';

function decodeEntities(node) {
  if (typeof node.props.children === "string") {
    node.props.children = decodeHTML(node.props.children);
  } else if (Array.isArray(node.props.children)) {
    node.props.children.forEach(decodeEntities);
  } else if (node.props.children) {
    decodeEntities(node.props.children);
  }
}
async function convert(url, options) {
  const data = url.searchParams.get("html");
  if (data === null) {
    console.warn("Missing html search param");
    return null;
  }
  const markup = lz.decompressFromEncodedURIComponent(data);
  const root = html(markup);
  decodeEntities(root);
  const svg = await satori(root, {
    width: options.width / options.scale,
    height: options.height / options.scale,
    fonts: options.fonts
  });
  const image = await renderAsync(svg, {
    fitTo: { mode: "zoom", value: options.scale },
    font: { loadSystemFonts: false },
    background: options.background
  });
  return image.asPng();
}

const options_ = "-1";

const options = parse(options_);
async function GET(context) {
  const png = await convert(context.url, options);
  if (!png) return new Response(null, { status: 400 });
  return new Response(png, {
    headers: {
      "Content-Type": "image/png"
    }
  });
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
