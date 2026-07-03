const LZ_URI_SAFE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
const LZ_BASE_CACHE: Record<string, Record<string, number>> = {};

function getBaseValue(alphabet: string, character: string): number {
  let baseMap = LZ_BASE_CACHE[alphabet];
  if (!baseMap) {
    baseMap = {};
    for (let i = 0; i < alphabet.length; i += 1) {
      baseMap[alphabet.charAt(i)] = i;
    }
    LZ_BASE_CACHE[alphabet] = baseMap;
  }

  return baseMap[character];
}

export function compressToEncodedURIComponent(input: string): string {
  if (input == null) return "";
  return _compress(input, 6, (a) => LZ_URI_SAFE.charAt(a));
}

export function decompressFromEncodedURIComponent(input: string): string | null {
  if (input == null) return "";
  if (input === "") return "";
  const safeInput = input.replace(/ /g, "+");
  return _decompress(safeInput.length, 32, (index) =>
    getBaseValue(LZ_URI_SAFE, safeInput.charAt(index))
  );
}

function _compress(
  uncompressed: string,
  bitsPerChar: number,
  getCharFromInt: (value: number) => string
): string {
  if (uncompressed == null) return "";

  const dictionary: Record<string, number> = {};
  const dictionaryToCreate: Record<string, boolean> = {};
  let c = "";
  let wc = "";
  let w = "";
  let result = "";
  let enlargeIn = 2;
  let dictSize = 3;
  let numBits = 2;
  let dataVal = 0;
  let dataPosition = 0;

  const writeBits = (value: number, bits: number) => {
    let val = value;
    for (let i = 0; i < bits; i += 1) {
      dataVal = (dataVal << 1) | (val & 1);
      if (dataPosition === bitsPerChar - 1) {
        dataPosition = 0;
        result += getCharFromInt(dataVal);
        dataVal = 0;
      } else {
        dataPosition += 1;
      }
      val >>= 1;
    }
  };

  const writePendingDictionaryEntry = (entry: string) => {
    if (entry.charCodeAt(0) < 256) {
      writeBits(0, numBits);
      writeBits(entry.charCodeAt(0), 8);
    } else {
      writeBits(1, numBits);
      writeBits(entry.charCodeAt(0), 16);
    }
    enlargeIn -= 1;
    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }
    delete dictionaryToCreate[entry];
  };

  for (let i = 0; i < uncompressed.length; i += 1) {
    c = uncompressed.charAt(i);
    if (!Object.prototype.hasOwnProperty.call(dictionary, c)) {
      dictionary[c] = dictSize++;
      dictionaryToCreate[c] = true;
    }

    wc = w + c;
    if (Object.prototype.hasOwnProperty.call(dictionary, wc)) {
      w = wc;
    } else {
      if (Object.prototype.hasOwnProperty.call(dictionaryToCreate, w)) {
        writePendingDictionaryEntry(w);
      } else {
        writeBits(dictionary[w], numBits);
      }

      enlargeIn -= 1;
      if (enlargeIn === 0) {
        enlargeIn = 2 ** numBits;
        numBits += 1;
      }
      dictionary[wc] = dictSize++;
      w = String(c);
    }
  }

  if (w !== "") {
    if (Object.prototype.hasOwnProperty.call(dictionaryToCreate, w)) {
      writePendingDictionaryEntry(w);
    } else {
      writeBits(dictionary[w], numBits);
    }

    enlargeIn -= 1;
    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }
  }

  writeBits(2, numBits);

  while (true) {
    dataVal <<= 1;
    if (dataPosition === bitsPerChar - 1) {
      result += getCharFromInt(dataVal);
      break;
    } else {
      dataPosition += 1;
    }
  }

  return result;
}

function _decompress(
  length: number,
  resetValue: number,
  getNextValue: (index: number) => number
): string | null {
  const dictionary: string[] = ["0", "1", "2"];
  let enlargeIn = 4;
  let dictSize = 4;
  let numBits = 3;
  let entry = "";
  let result = "";
  let w = "";
  let bits = 0;
  let c = "";
  let dataVal = getNextValue(0);
  let dataPosition = resetValue;
  let dataIndex = 1;

  const readBits = (bitsToRead: number) => {
    let bitsResult = 0;
    let maxPower = 2 ** bitsToRead;
    let currentPower = 1;

    while (currentPower !== maxPower) {
      const resb = dataVal & dataPosition;
      dataPosition >>= 1;
      if (dataPosition === 0) {
        dataPosition = resetValue;
        dataVal = getNextValue(dataIndex++);
      }
      bitsResult |= (resb > 0 ? 1 : 0) * currentPower;
      currentPower <<= 1;
    }
    return bitsResult;
  };

  const nextBits = readBits(2);

  switch (nextBits) {
    case 0:
      c = String.fromCharCode(readBits(8));
      break;
    case 1:
      c = String.fromCharCode(readBits(16));
      break;
    case 2:
      return "";
    default:
      c = "";
  }

  dictionary[3] = c;
  w = c;
  result = c;

  while (true) {
    if (dataIndex > length) {
      return "";
    }

    bits = readBits(numBits);

    switch (bits) {
      case 0:
        c = String.fromCharCode(readBits(8));
        dictionary[dictSize++] = c;
        bits = dictSize - 1;
        enlargeIn -= 1;
        break;
      case 1:
        c = String.fromCharCode(readBits(16));
        dictionary[dictSize++] = c;
        bits = dictSize - 1;
        enlargeIn -= 1;
        break;
      case 2:
        return result;
      default:
        break;
    }

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }

    if (dictionary[bits]) {
      entry = dictionary[bits];
    } else if (bits === dictSize) {
      entry = w + w.charAt(0);
    } else {
      return null;
    }
    result += entry;

    dictionary[dictSize++] = w + entry.charAt(0);
    enlargeIn -= 1;
    w = entry;

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits += 1;
    }
  }
}
