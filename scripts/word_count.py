"""Count word frequencies in a text file."""

import argparse
import re
from collections import Counter


def count_words(text: str) -> Counter:
    return Counter(re.findall(r"[a-z0-9']+", text.lower()))


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("path")
    parser.add_argument("-n", "--top", type=int, default=10)
    args = parser.parse_args()

    with open(args.path, encoding="utf-8") as f:
        counts = count_words(f.read())

    for word, count in counts.most_common(args.top):
        print(f"{count:>7}  {word}")


if __name__ == "__main__":
    main()
