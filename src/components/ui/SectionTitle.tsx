interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export default function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <div className="text-center">
      <h2 className="text-[42px] font-domine  text-gray-800 dark:text-white">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-manrope text-xl text-gray-500 dark:text-gray-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}
