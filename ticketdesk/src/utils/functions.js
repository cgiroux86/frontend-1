export function getPriority(priority) {
  switch (priority) {
    case "high":
      return "high_priority";
    case "medium":
      return "medium_priority";
    case "low":
      return "low_priority";
    default:
      return "no_priority";
  }
}
