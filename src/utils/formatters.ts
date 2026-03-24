/**
 * Formats a job description text into paragraphs for better display
 * @param text - The raw job description text
 * @returns Array of paragraphs, each containing lines
 */
export const formatJobDescription = (text: string) => {
  return text
    .split("\n\n") // Split by double line breaks for paragraphs
    .filter((paragraph) => paragraph.trim()) // Remove empty paragraphs
    .map((paragraph, idx) => ({
      id: idx,
      lines: paragraph.split("\n").filter((line) => line.trim()), // Split by single line breaks
    }));
};
