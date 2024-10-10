export function titleCaptialize(title) {
  if (title) {
    let result = title
      .split("")
      .map((char, index) => (index === 0 ? char.toUpperCase() : char))
      .join("");
    return result;
  }
}

export function formatDate(time) {
  const updateDate = Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(time));
  return updateDate;
}

export function trimWords(description, count) {
  const wordsCount = count || 15;
  // console.log("count", wordsCount);

  const result =
    description.split(" ").length > wordsCount
      ? description.split(" ").slice(0, wordsCount).join(" ") + " ..."
      : description;
  return result;
}
