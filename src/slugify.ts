import * as React from "react";
import { charsMatch } from "./charMap";

var slugifyCharMap: any = charsMatch;

interface MakeOptions {
  delimiter?: string;
  remove?: any;
  lower?: boolean;
}

function makeSlugify(
  string?: String,
  options: MakeOptions = {
    lower: false,
    remove: "",
    delimiter: "-",
  }
) {
  if (string) {
    var slug = string
      .normalize()
      .split("")
      .reduce(function (result, ch) {
        var appendChar = slugifyCharMap[ch] || ch;
        if (appendChar === options.delimiter) {
          appendChar = " ";
        }
        return (
          result +
          appendChar
            // remove not allowed characters
            .replace(options.remove || /[^\w\s$*_+~.()'"!\-:@]+/g, "")
          //
        );
      }, "")
      .trim()
      .replace(/[-/\s]+/g, options.delimiter || "-");
    return slug.toLowerCase();
  } else {
    return "";
  }
}
makeSlugify.extend = function (customMap: any) {
  for (var key in customMap) {
    slugifyCharMap[key] = customMap[key];
  }
};

function generateSlug(
  inputText?: string,
  replacement?: string,
  removeStopWords?: boolean,
  removeNumbers?: boolean
) {
  var charactersToRemove = /[#*|><_`%,;?+~=.()\[\]\\\/'^"!:@]/g;
  /* /[&\/\\#,+()$@:~%.'":*?<>{}.^]|\w_/g   */

  if (removeNumbers) {
    charactersToRemove = /[#*|><_`%,;?+~=.()\[\]\'^\"!:@0-9]/g;
  }
  var options = {
    lower: true,
    remove: charactersToRemove,
    delimiter: replacement,
  };
  var stopWords = [
    "a",
    "about",
    "above",
    "after",
    "again",
    "against",
    "all",
    "am",
    "an",
    "and",
    "any",
    "are",
    "as",
    "at",
    "be",
    "because",
    "been",
    "before",
    "being",
    "below",
    "between",
    "both",
    "but",
    "by",
    "could",
    "did",
    "do",
    "does",
    "doing",
    "down",
    "during",
    "each",
    "few",
    "for",
    "from",
    "further",
    "had",
    "has",
    "have",
    "having",
    "he",
    "he'd",
    "he'll",
    "he's",
    "her",
    "here",
    "here's",
    "hers",
    "herself",
    "him",
    "himself",
    "his",
    "how",
    "how's",
    "i",
    "i'd",
    "i'll",
    "i'm",
    "i've",
    "if",
    "in",
    "into",
    "is",
    "it",
    "it's",
    "its",
    "itself",
    "let's",
    "me",
    "more",
    "most",
    "my",
    "myself",
    "nor",
    "of",
    "on",
    "once",
    "only",
    "or",
    "other",
    "ought",
    "our",
    "ours",
    "ourselves",
    "out",
    "over",
    "own",
    "same",
    "she",
    "she'd",
    "she'll",
    "she's",
    "should",
    "so",
    "some",
    "such",
    "than",
    "that",
    "that's",
    "the",
    "their",
    "theirs",
    "them",
    "themselves",
    "then",
    "there",
    "there's",
    "these",
    "they",
    "they'd",
    "they'll",
    "they're",
    "they've",
    "this",
    "those",
    "through",
    "to",
    "too",
    "under",
    "until",
    "up",
    "very",
    "was",
    "we",
    "we'd",
    "we'll",
    "we're",
    "we've",
    "were",
    "what",
    "what's",
    "when",
    "when's",
    "where",
    "where's",
    "which",
    "while",
    "who",
    "who's",
    "whom",
    "why",
    "why's",
    "with",
    "would",
    "you",
    "you'd",
    "you'll",
    "you're",
    "you've",
    "your",
    "yours",
    "yourself",
    "yourselves",
  ];
  var slug = makeSlugify(inputText, options);
  if (removeStopWords) {
    var slugParts = slug.split(`${replacement}`);
    var filteredSlugParts = slugParts.filter(function (slugPart) {
      return !stopWords.includes(slugPart);
    });
    slug = filteredSlugParts.join(`${replacement}`);
  }
  return slug;
}

interface SlugifyOptions {
  delimiter?: string;
  prefix?: string;
  keyword?: boolean;
  number?: boolean;
}

/**
 * Slugify a React node
 */
const slugify = (
  node: React.ReactNode,
  options: SlugifyOptions = {
    delimiter: "-",
    prefix: "",
    keyword: false,
    number: false,
  }
): string => {
  if (!options.delimiter) options.delimiter = "-";
  if (!options.prefix) options.prefix = "";

  if (!node || typeof node === "boolean") {
    return "";
  }

  const { delimiter, prefix, keyword, number } = options;

  // string, number
  if (typeof node === "string" || typeof node === "number") {
    // const harmonizedPrefix = generateSlug(prefix, delimiter, true, false);
    const harmonizedNode = generateSlug(
      String(node),
      delimiter,
      keyword,
      number
    );

    if (prefix) {
      let px = `${prefix}${delimiter}${harmonizedNode}`;
      return px.toLowerCase();
    }

    return harmonizedNode;
  }

  // empty object
  if (typeof node === "object" && Object.keys(node).length === 0) {
    return "";
  }

  // ReactPortal
  if ("children" in node) {
    return slugify(node.children);
  }

  // ReactNodeArray
  if (node instanceof Array) {
    return slugify(
      node.map((subNode) => slugify(subNode, { delimiter })).join(delimiter),
      options
    );
  }

  // ReactElement
  if ("type" in node) return slugify(node.props.children, options);

  // unhandled case
  return "";
};

export default slugify;
