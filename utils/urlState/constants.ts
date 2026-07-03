export const LAYOUT_QUERY_KEY = "layout";
export const FRAMEWORK_QUERY_KEY = "framework";
export const LAYOUTIT_IMAGE_RE = /^https?:\/\/(?:www\.)?layoutit\.com\/img\/([^?#]+)(?:[?#].*)?$/i;
export const LOCAL_IMAGE_FILENAMES = new Set([
  "sports-q-c-64-64-8.jpg",
  "sports-q-c-64-64-2.jpg",
  "sports-q-c-140-140-3.jpg",
  "sports-q-c-1600-500-1.jpg",
  "people-q-c-600-200-1.jpg",
  "city-q-c-600-200-1.jpg",
  "sports-q-c-600-200-1.jpg",
]);
export const MAX_ENCODED_LAYOUT_LENGTH = 50000;
export const MAX_JSON_LAYOUT_LENGTH = 250000;
export const MAX_BLOCKS = 500;
export const MAX_TREE_DEPTH = 12;
export const MAX_CHILDREN_PER_BLOCK = 80;
export const MAX_TEXT_LENGTH = 10000;
export const MAX_NAME_LENGTH = 120;
export const MAX_CLASS_LENGTH = 500;
export const MAX_ATTRIBUTE_LENGTH = 1000;
export const SAFE_CLASS_RE = /^[A-Za-z0-9_:\-\s]+$/;
export const SAFE_SIZE_RE = /^[0-9\s]+$/;
export const SAFE_TAGS = new Set([
  "a",
  "abbr",
  "address",
  "article",
  "aside",
  "b",
  "blockquote",
  "br",
  "button",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "dd",
  "div",
  "dl",
  "dt",
  "em",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "img",
  "input",
  "label",
  "li",
  "main",
  "nav",
  "ol",
  "option",
  "p",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "u",
  "ul",
]);
export const SAFE_ATTRIBUTES = new Set([
  "alt",
  "aria-controls",
  "aria-expanded",
  "aria-hidden",
  "aria-label",
  "aria-labelledby",
  "autoComplete",
  "autocomplete",
  "checked",
  "colSpan",
  "colspan",
  "disabled",
  "for",
  "height",
  "href",
  "htmlFor",
  "id",
  "name",
  "placeholder",
  "readOnly",
  "readonly",
  "rel",
  "role",
  "rowSpan",
  "rowspan",
  "scope",
  "selected",
  "src",
  "target",
  "title",
  "type",
  "value",
  "width",
]);
export const SAFE_URL_PROTOCOLS = new Set(["http:", "https:", "mailto:", "tel:"]);
export const DEFAULT_LAYOUT_STATE =
  "lz:N4IgdghgtgpiBcIDCB7MAXCBLMMBOIANCAMZqY74Lp4CuMxJANhAM6sKnna4HEAmeFAAdhEAEZM48GvWItxMKf2p0GIKDwBCTFCQDWquVwwwMCANqhIsTgCUUAdyImKvI+uZsOiIc+J4MFAoAG4SUh7yEkowKjJqAngQAObJ4dKy6po4qKbm8cZkeeiW1tDSyChMtFBgLkVuVAWeLOycZEwAtAAcLoIiYpIZCSAKMXGZxKxYAF4VvYzkZiXwVuDlnAAqWOgRixg8TQBmEEys6pjJnAAWAMz1rT4gdy4QYVgKUgAKQsL46FgYD41jYKkFhNc2FgOMR0ABPP6cJjQkrEYS-f6AnygfgwE60JgrEAuKC0dCxTjkgAe6E6pPJKjReCwmjwcMpMBpnXRLIgbJc5yK-D57MQ1NpgrQwv5U1oJBIQKe4s6rDlCraxBwRxQHK5Wp1xEcfLAOCuYs5tKNeBNYCuAggtqaIGVwsdBAAvu7CGVbIhTlhknVYQiKsjWKiQOiRJigQgcXiIASiS4pEcicrw3yIwrTARzVyc+S+CBmclrumLZ0zCpPQBdAJBULpSIgWI7ZvNRIpNJDFsNZY3W4AOgABAAZFCBKAjrDCVXT-hVScj6boEfldBDkBen0VL58lJJCH1biUPMnM4XFKcYSvd6fGA-aN4AGx1a7zjgyHTGHOkNIlEXCjP4XyxOMQFxfFCU4EkyQpfNaXpCkmV5fkEO5ZlWXZKYYCFEVdQlXCpXw2V5UVAiVTVcjNTAbUKP1FwrRtM1nUrJjTT6B1kidF0uKoT1vXWX0QH9QMXHhRFEDDCNgJjbEIITJMYPkPEKy5TMX3qZYeMrQsqACANywo6ttx3ITQxgCBGT-SSQHEFAqksoNIwxUC31AKQrKRSya3desS0bMJe07Vt+HbYLJggpJUg7SL+3yEAJynGc5xqEdF10PAVx2ddYHQQgRyKQVyXQWgsqs2doRIU0RyUHZRwAQWRABHWhoFq7i11YCBhEBMAVx6vrRyQMqJB2MqZ36vLaFYEcysgUcAEl+shEgR0hcR23YGAR2EFhyQgdKsBIUqoHDUcvm-JRqlmmBaBXIIBt6swCvOfgRxCIEAXEAk0s+5FNxHAA5drhDKmaRxNcRrgKlhqpNQ6wDQEd8Wqn7bvy3bIUCGhDpwdKlzwUcAGVYhnCASAJaFdpQVV8B2sL2rJQqytVVhRwAWUnTbCpQKBgkXFcUGFKRZpNaYZ3e1hhdOIELqEfGitwkqyoK8WsEl3n+eFlAZygECwpgTHprF2gwDWpXWogNcpBOmaCqwd7NsUMB+DSxnp3+nKjfS2gsHllB8c0dhDs0QMIAKkICTBzByUh3CR2d6s0twEgCuEWn6ECeO1rhmbGpatrpygDX8Gtgr-Stz2lBHao7du2h0+xo2khHVrqbqwGgYJFhar91gBbmwlmXVEdg+6gqfaOO7kiwa2UvnXmwHOK21zurczNBLZm32Ro80it5sAfJ8QNfYEP0QcM4T2GzQ0AplnzP8DIMTaDEAFGhZ3g510hVT+-msvZPAuJAhxB-kMToQCQEUgEhfZ4oR9K304PZRyDogKuSfvAUA1wEF5nAVIToODPoek3hsRAQozBvXEv+RAKDPLOVkm5eSA9ThMEpL-Aepl-JTibBFEYV9lBIGuB8CYIxBDdliiMTkGcXwdgvOcXeA53zmW3r2Xehx94jEuOwtRpBHg6JvuImKfDChLHyCCMhIBNjpHWj5RBDQNEtm0WKa4PkTzFFKCoxA1ihgjj8O4veTjrximLPFFYFjhI+KkLYqy+BCrXQCY4+A8irwsXQNcV46BP4-XJMwsgtkOjbmIG2TAJjPBmKJFEnarjYlZQAAxFLgVUmJID4lMDYeos8CAUmwmCc6DJxBrbZLgnk6M7QqhFNCuFCIIUwmqOiTU1pABGRpXirE2MWXEhU7TEldOSacBRP80kDJElk5kOT3IgFYPkiohSvRTNKTMuKFT5nVLsVlAATKsre3iNnvLaR01wSSelHMpCcoZ5yRngWuWM8hEz7klMkaYjxvzfGbKyvcPyWLBI-PWb4+y-BsJAr2ZFZxzoCVErmco3FzT-GdPcCFMlNAAlKIiRUZpwpMAAt2QykFTLrKIrKYohKABRKk0A9o7QaaQyJNjOWHW2YChxey+V9PQAKsKjzhjIvJKK8V+tokrJleyuV1sFUJPpccA5qTKQaumdq8pKKQBioldEr5xrXnpTNdyy155rW9LSXarVfYXmIBdQanamLawetRdEulxKGWkrVaE0NbLPXyp9Qmq1l4A22pcIKp5IwqXOv1ZKkc0qcWWI5d6xVPLs2HP5fmzVSLHW6qJOGstRrK2yt8Rm2tvrun+tBWKINLbhXttLW675VbTVcv7Vmv1Obh3OlHUK1wSiS2usjduaN3aTW+PjcqxNWjk0svMU02d5qdkDv2UuxtxTm1ruLR26JFaL29prRahdg671qtXYWnVG6X07S7e+6Jfav1HvrTakdTb7UhqdcBkc7q93ps-de79t6G1-rg8G2ZobN0RpHFGmNeK41ODrZo4wTKU0orTbGhm6GlWnl5UO+9Dyx3rr1Vu8t06e2vqY5Rn92HA24c48+ydIG+P7oE3OyDLHoO5tgw++D+HEOSeQ9JtDcmMNQcXSJvNKm8PPPUzxkj0aLPYrgagaotQhOzP0XCroAAWPovxBgAfUGMZQLZphzE4K58dnjcWLTDnAG9B97zpBPnJYLliBHhaQVJe+LlH5gSwQpKCyYAgoDNriMBQg8vIVIFgPAzAKiFddrETo1Uys33STUcQkAPicBZMkToDWoBNaPlwhswQgqeamPCQRwimCiOMEYnsg3WxUhkXhkFVL6MgFC3aTDqqWJtYeN4VrUB2tHGqI7TJwzcnQrK5wAA9KwObrBOjNRq50JZzm6kPae50YcAArYQq3ThEi0FgfQcB7kkFG-wUWPgTNtpglZtZDV+CCGophpNLErLw41AFfrnHJvidTXA2HqOxYbBvetzg4YhC2jPUSBqJBYAjlQHgYQG9UOIDHJQROgQICGCJ2xvp4hQkg7BwhyH79SN48COwWulB7PE8vmIZyxalkfNuM5kcHM+QA7XMTTGxM-ZxwAJx1LfWslnuA2eWU52t7nLFef1H5+RNTQviQi7h2L2ayJcBS8tyT2XFPODEwdCOAAYkkc2VUUAFSQA1EcuvnNLLqZipniVWe87Nx739Vu+ciIF-bjdWnECi8VFjNAO1vOp4M36cQ1vBlnKwBc+SAJdh7hwe7oHBGviICd-jwv7uudp692goLiARwAAoFe3AAJQjmcwAVgAGydAAOzdH1zurFlmgA";
