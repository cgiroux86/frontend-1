export function getPriority(priority) {
  switch (priority) {
    case "HIGH":
      return "high_priority";
    case "MEDIUM":
      return "medium_priority";
    case "LOW":
      return "low_priority";
    default:
      return "no_priority";
  }
}
