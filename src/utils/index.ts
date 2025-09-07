// get the first word and the first letter of the second word
// e.g. "Robertoso Silva" -> "Robertoso S"
export const getInitials = (s: string): string => {
    const parts = s.trim().split(/\s+/);
    return parts[0] + (parts[1] ? " " + parts[1][0] : "");
  };