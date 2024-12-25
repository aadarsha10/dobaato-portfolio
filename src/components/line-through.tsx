import { cn } from "../utils";
import styles from "./index.module.css";
/**
 * Renders a line-through text component.
 *
 * @param {string} text - The text to be displayed with line-through styling.
 * @return {JSX.Element} The line-through text component.
 */
export default function LineThrough({
  text,
  className,
}: {
  text: string;
  className?: string;
}): JSX.Element {
  return (
    <div className={styles.text}>
      <span
        className={cn(
          "px-[16px] py-0 font-500 leading-14 text-14 capitalize font-nunito",
          className
        )}
      >
        {text}
      </span>
    </div>
  );
}
