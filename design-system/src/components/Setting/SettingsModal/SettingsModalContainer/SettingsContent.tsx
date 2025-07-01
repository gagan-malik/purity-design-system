import React from "react";

/**
 * SettingsContent component for displaying the content of selected settings section
 * @param {ISettingsContentProps} props - Component props
 * @returns {React.ReactElement} SettingsContent component
 */
export interface ISettingsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional children to render in the content area */
  children?: React.ReactNode;
}

const styles = {
  container: 'w-full flex flex-col px-0 bg-bg-primary dark:bg-[#18181B]', // remove all horizontal padding and add dark mode background
  title: 'text-xl font-semibold mb-4 text-[#232326] dark:text-white',
  content: 'flex flex-col gap-6 w-full',
};

const SettingsContent: React.FC<ISettingsContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`${styles.container} ${className || ''}`} {...props}>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
};

export default SettingsContent;
