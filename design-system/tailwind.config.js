/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    screens: {
      df: "0px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      borderWidth: {
        1: "var(--border-1)",
      },
      boxShadow: {
        xs: "var(--shadow-xs)",
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "2xl": "var(--shadow-2xl)",
        "3xl": "var(--shadow-3xl)",
        modal: "var(--shadow-modal)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        xxs: "var(--radius-xxs)",
        xs: "var(--radius-xs)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
        "3xl": "var(--radius-3xl)",
        "4xl": "var(--radius-4xl)",
        full: "var(--radius-full)",
      },
      colors: {
        border: "hex(var(--border))",
        input: "hex(var(--input))",
        ring: "hex(var(--ring))",
        background: "hex(var(--background))",
        foreground: "hex(var(--foreground))",
        primary: {
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          950: "var(--primary-950)",
        },
        secondary: {
          700: "var(--secondary-700)",
        },
        blue: {
          25: "var(--blue-25)",
          50: "var(--blue-50)",
          100: "var(--blue-100)",
          200: "var(--blue-200)",
          300: "var(--blue-300)",
          400: "var(--blue-400)",
          500: "var(--blue-500)",
          600: "var(--blue-600)",
          700: "var(--blue-700)",
          800: "var(--blue-800)",
          900: "var(--blue-900)",
          950: "var(--blue-950)",
        },
        gray: {
          25: "var(--gray-25)",
          50: "var(--gray-50)",
          100: "var(--gray-100)",
          200: "var(--gray-200)",
          300: "var(--gray-300)",
          400: "var(--gray-400)",
          500: "var(--gray-500)",
          600: "var(--gray-600)",
          700: "var(--gray-700)",
          800: "var(--gray-800)",
          900: "var(--gray-900)",
          950: "var(--gray-950)",
          secondary: "var(--gray-secondary)",
        },
        brand: {
          25: "var(--brand-25)",
          50: "var(--brand-50)",
          100: "var(--brand-100)",
          200: "var(--brand-200)",
          300: "var(--brand-300)",
          400: "var(--brand-400)",
          500: "var(--brand-500)",
          600: "var(--brand-600)",
          700: "var(--brand-700)",
          800: "var(--brand-800)",
          900: "var(--brand-900)",
          950: "var(--brand-950)",
        },

        border: {
          primary: "var(--border-primary)",

          secondary: "var(--border-secondary)",

          tertiary: "var(--border-tertiary)",

          disabled: "var(--border-disabled)",
          disabled_subtle: "var(--border-disabled_subtle)",

          brand: "var(--border-brand)",
          brand_solid: "var(--border-brand_solid)",
          brand_solid_alt: "var(--border-brand_solid_alt)",

          error: "var(--border-error)",
          error_solid: "var(--border-error_solid)",
        },

        fg: {
          primary: "var(--fg-primary)",

          secondary: "var(--fg-secondary)",
          secondary_hover: "var(--fg-secondary_hover)",

          tertiary: "var(--fg-tertiary)",
          tertiary_hover: "var(--fg-tertiary_hover)",

          quaternary: "var(--fg-quaternary)",
          quaternary_hover: "var(--fg-quaternary_hover)",

          quinary: "var(--fg-quinary)",
          quinary_hover: "var(--fg-quinary_hover)",

          senary: "var(--fg-senary)",

          white: "var(--fg-white)",

          disabled: "var(--fg-disabled)",
          disabled_subtle: "var(--fg-disabled_subtle)",

          brand: {
            primary: "var(--fg-brand-primary)",
            primary_alt: "var(--fg-brand-primary_alt)",

            secondary: "var(--fg-brand-secondary)",
          },

          error: {
            primary: "var(--fg-error-primary)",
            secondary: "var(--fg-error-secondary)",
          },

          warning: {
            primary: "var(--fg-warning-primary)",
            secondary: "var(--fg-warning-secondary)",
          },

          success: {
            primary: "var(--fg-success-primary)",
            secondary: "var(--fg-success-secondary)",
          },
        },

        text: {
          primary: "var(--text-primary)",
          primary_on_brand: "var(--text-primary_on_brand)",

          secondary: "var(--text-secondary)",
          secondary_hover: "var(--text-secondary_hover)",
          secondary_on_brand: "var(--text-secondary_on_brand)",

          tertiary: "var(--text-tertiary)",
          tertiary_hover: "var(--text-tertiary_hover)",
          tertiary_on_brand: "var(--text-tertiary_on_brand)",

          quaternary: "var(--text-quaternary)",
          quaternary_on_brand: "var(--text-quaternary_on_brand)",

          white: "var(--text-white)",

          disabled: "var(--text-disabled)",

          placeholder: "var(--text-placeholder)",
          placeholder_subtle: "var(--text-placeholder_subtle)",

          brand: {
            primary: "var(--text-brand-primary)",
            secondary: "var(--text-brand-secondary)",
            tertiary: "var(--text-brand-tertiary)",
            tertiary_alt: "var(--text-brand-tertiary_alt)",
          },

          error: {
            primary: "var(--text-error-primary)",
          },

          warning: {
            primary: "var(--text-warning-primary)",
          },

          success: {
            primary: "var(--text-success-primary)",
          },
        },

        bg: {
          primary: "var(--bg-primary)",
          primary_alt: "var(--bg-primary_alt)",
          primary_hover: "var(--bg-primary_hover)",
          primary_solid: "var(--bg-primary_solid)",

          secondary: "var(--bg-secondary)",
          secondary_alt: "var(--bg-secondary_alt)",
          secondary_hover: "var(--bg-secondary_hover)",
          secondary_subtle: "var(--bg-secondary_subtle)",
          secondary_solid: "var(--bg-secondary_solid)",

          tertiary: "var(--bg-tertiary)",

          quaternary: "var(--bg-quaternary)",

          active: "var(--bg-active)",

          disabled: "var(--bg-disabled)",
          disabled_subtle: "var(--bg-disabled_subtle)",

          overlay: "var(--bg-overlay)",

          brand: {
            primary: "var(--bg-brand-primary)",
            primary_alt: "var(--bg-brand-primary_alt)",

            secondary: "var(--bg-brand-secondary)",

            solid: "var(--bg-brand-solid)",
            solid_hover: "var(--bg-brand-solid_hover)",

            section: "var(--bg-brand-section)",
            section_subtle: "var(--bg-brand-section_subtle)",
          },

          error: {
            primary: "var(--bg-error-primary)",
            secondary: "var(--bg-error-secondary)",
            solid: "var(--bg-error-solid)",
          },

          warning: {
            primary: "var(--bg-warning-primary)",
            secondary: "var(--bg-warning-secondary)",
            solid: "var(--bg-warning-solid)",
          },

          success: {
            primary: "var(--bg-success-primary)",
            secondary: "var(--bg-success-secondary)",
            solid: "var(--bg-success-solid)",
          },
          avatar : "var(--bg-avatar)",
        },

        error: {
          25: "var(--error-25)",
          50: "var(--error-50)",
          100: "var(--error-100)",
          200: "var(--error-200)",
          300: "var(--error-300)",
          400: "var(--error-400)",
          500: "var(--error-500)",
          600: "var(--error-600)",
          700: "var(--error-700)",
          800: "var(--error-800)",
          900: "var(--error-900)",
          950: "var(--error-950)",
        },

        warning: {
          25: "var(--warning-25)",
          50: "var(--warning-50)",
          100: "var(--warning-100)",
          200: "var(--warning-200)",
          300: "var(--warning-300)",
          400: "var(--warning-400)",
          500: "var(--warning-500)",
          600: "var(--warning-600)",
          700: "var(--warning-700)",
          800: "var(--warning-800)",
          900: "var(--warning-900)",
          950: "var(--warning-950)",
        },

        success: {
          25: "var(--success-25)",
          50: "var(--success-50)",
          100: "var(--success-100)",
          200: "var(--success-200)",
          300: "var(--success-300)",
          400: "var(--success-400)",
          500: "var(--success-500)",
          600: "var(--success-600)",
          700: "var(--success-700)",
          800: "var(--success-800)",
          900: "var(--success-900)",
          950: "var(--success-950)",
        },

        yellow: {
          25: "var(--yellow-25)",
          50: "var(--yellow-50)",
          100: "var(--yellow-100)",
          200: "var(--yellow-200)",
          300: "var(--yellow-300)",
          400: "var(--yellow-400)",
          500: "var(--yellow-500)",
          600: "var(--yellow-600)",
          700: "var(--yellow-700)",
          800: "var(--yellow-800)",
          900: "var(--yellow-900)",
          950: "var(--yellow-950)",
        },

        orange: {
          25: "var(--orange-25)",
          50: "var(--orange-50)",
          100: "var(--orange-100)",
          200: "var(--orange-200)",
          300: "var(--orange-300)",
          400: "var(--orange-400)",
          500: "var(--orange-500)",
          600: "var(--orange-600)",
          700: "var(--orange-700)",
          800: "var(--orange-800)",
          900: "var(--orange-900)",
          950: "var(--orange-950)",
        },

        rose: {
          25: "var(--rose-25)",
          50: "var(--rose-50)",
          100: "var(--rose-100)",
          200: "var(--rose-200)",
          300: "var(--rose-300)",
          400: "var(--rose-400)",
          500: "var(--rose-500)",
          600: "var(--rose-600)",
          700: "var(--rose-700)",
          800: "var(--rose-800)",
          900: "var(--rose-900)",
          950: "var(--rose-950)",
        },

        pink: {
          25: "var(--pink-25)",
          50: "var(--pink-50)",
          100: "var(--pink-100)",
          200: "var(--pink-200)",
          300: "var(--pink-300)",
          400: "var(--pink-400)",
          500: "var(--pink-500)",
          600: "var(--pink-600)",
          700: "var(--pink-700)",
          800: "var(--pink-800)",
          900: "var(--pink-900)",
          950: "var(--pink-950)",
        },

        fuchsia: {
          25: "var(--fuchsia-25)",
          50: "var(--fuchsia-50)",
          100: "var(--fuchsia-100)",
          200: "var(--fuchsia-200)",
          300: "var(--fuchsia-300)",
          400: "var(--fuchsia-400)",
          500: "var(--fuchsia-500)",
          600: "var(--fuchsia-600)",
          700: "var(--fuchsia-700)",
          800: "var(--fuchsia-800)",
          900: "var(--fuchsia-900)",
          950: "var(--fuchsia-950)",
        },

        purple: {
          25: "var(--purple-25)",
          50: "var(--purple-50)",
          100: "var(--purple-100)",
          200: "var(--purple-200)",
          300: "var(--purple-300)",
          400: "var(--purple-400)",
          500: "var(--purple-500)",
          600: "var(--purple-600)",
          700: "var(--purple-700)",
          800: "var(--purple-800)",
          900: "var(--purple-900)",
          950: "var(--purple-950)",
        },

        violet: {
          25: "var(--violet-25)",
          50: "var(--violet-50)",
          100: "var(--violet-100)",
          200: "var(--violet-200)",
          300: "var(--violet-300)",
          400: "var(--violet-400)",
          500: "var(--violet-500)",
          600: "var(--violet-600)",
          700: "var(--violet-700)",
          800: "var(--violet-800)",
          900: "var(--violet-900)",
          950: "var(--violet-950)",
        },

        indigo: {
          25: "var(--indigo-25)",
          50: "var(--indigo-50)",
          100: "var(--indigo-100)",
          200: "var(--indigo-200)",
          300: "var(--indigo-300)",
          400: "var(--indigo-400)",
          500: "var(--indigo-500)",
          600: "var(--indigo-600)",
          700: "var(--indigo-700)",
          800: "var(--indigo-800)",
          900: "var(--indigo-900)",
          950: "var(--indigo-950)",
        },

        blueLight: {
          25: "var(--blue-light-25)",
          50: "var(--blue-light-50)",
          100: "var(--blue-light-100)",
          200: "var(--blue-light-200)",
          300: "var(--blue-light-300)",
          400: "var(--blue-light-400)",
          500: "var(--blue-light-500)",
          600: "var(--blue-light-600)",
          700: "var(--blue-light-700)",
          800: "var(--blue-light-800)",
          900: "var(--blue-light-900)",
          950: "var(--blue-light-950)",
        },

        cyan: {
          25: "var(--cyan-25)",
          50: "var(--cyan-50)",
          100: "var(--cyan-100)",
          200: "var(--cyan-200)",
          300: "var(--cyan-300)",
          400: "var(--cyan-400)",
          500: "var(--cyan-500)",
          600: "var(--cyan-600)",
          700: "var(--cyan-700)",
          800: "var(--cyan-800)",
          900: "var(--cyan-900)",
          950: "var(--cyan-950)",
        },

        teal: {
          25: "var(--teal-25)",
          50: "var(--teal-50)",
          100: "var(--teal-100)",
          200: "var(--teal-200)",
          300: "var(--teal-300)",
          400: "var(--teal-400)",
          500: "var(--teal-500)",
          600: "var(--teal-600)",
          700: "var(--teal-700)",
          800: "var(--teal-800)",
          900: "var(--teal-900)",
          950: "var(--teal-950)",
        },

        green: {
          25: "var(--green-25)",
          50: "var(--green-50)",
          100: "var(--green-100)",
          200: "var(--green-200)",
          300: "var(--green-300)",
          400: "var(--green-400)",
          500: "var(--green-500)",
          600: "var(--green-600)",
          700: "var(--green-700)",
          800: "var(--green-800)",
          900: "var(--green-900)",
          950: "var(--green-950)",
        },

        greenLight: {
          25: "var(--green-light-25)",
          50: "var(--green-light-50)",
          100: "var(--green-light-100)",
          200: "var(--green-light-200)",
          300: "var(--green-light-300)",
          400: "var(--green-light-400)",
          500: "var(--green-light-500)",
          600: "var(--green-light-600)",
          700: "var(--green-light-700)",
          800: "var(--green-light-800)",
          900: "var(--green-light-900)",
          950: "var(--green-light-950)",
        },

        moss: {
          25: "var(--moss-25)",
          50: "var(--moss-50)",
          100: "var(--moss-100)",
          200: "var(--moss-200)",
          300: "var(--moss-300)",
          400: "var(--moss-400)",
          500: "var(--moss-500)",
          600: "var(--moss-600)",
          700: "var(--moss-700)",
          800: "var(--moss-800)",
          900: "var(--moss-900)",
          950: "var(--moss-950)",
        },

        grayWarm: {
          25: "var(--gray-warm-25)",
          50: "var(--gray-warm-50)",
          100: "var(--gray-warm-100)",
          200: "var(--gray-warm-200)",
          300: "var(--gray-warm-300)",
          400: "var(--gray-warm-400)",
          500: "var(--gray-warm-500)",
          600: "var(--gray-warm-600)",
          700: "var(--gray-warm-700)",
          800: "var(--gray-warm-800)",
          900: "var(--gray-warm-900)",
          950: "var(--gray-warm-950)",
        },

        grayTrue: {
          25: "var(--gray-true-25)",
          50: "var(--gray-true-50)",
          100: "var(--gray-true-100)",
          200: "var(--gray-true-200)",
          300: "var(--gray-true-300)",
          400: "var(--gray-true-400)",
          500: "var(--gray-true-500)",
          600: "var(--gray-true-600)",
          700: "var(--gray-true-700)",
          800: "var(--gray-true-800)",
          900: "var(--gray-true-900)",
          950: "var(--gray-true-950)",
        },

        grayIron: {
          25: "var(--gray-iron-25)",
          50: "var(--gray-iron-50)",
          100: "var(--gray-iron-100)",
          200: "var(--gray-iron-200)",
          300: "var(--gray-iron-300)",
          400: "var(--gray-iron-400)",
          500: "var(--gray-iron-500)",
          600: "var(--gray-iron-600)",
          700: "var(--gray-iron-700)",
          800: "var(--gray-iron-800)",
          900: "var(--gray-iron-900)",
          950: "var(--gray-iron-950)",
        },

        grayNeutral: {
          25: "var(--gray-neutral-25)",
          50: "var(--gray-neutral-50)",
          100: "var(--gray-neutral-100)",
          200: "var(--gray-neutral-200)",
          300: "var(--gray-neutral-300)",
          400: "var(--gray-neutral-400)",
          500: "var(--gray-neutral-500)",
          600: "var(--gray-neutral-600)",
          700: "var(--gray-neutral-700)",
          800: "var(--gray-neutral-800)",
          900: "var(--gray-neutral-900)",
          950: "var(--gray-neutral-950)",
        },

        grayModern: {
          25: "var(--gray-modern-25)",
          50: "var(--gray-modern-50)",
          100: "var(--gray-modern-100)",
          200: "var(--gray-modern-200)",
          300: "var(--gray-modern-300)",
          400: "var(--gray-modern-400)",
          500: "var(--gray-modern-500)",
          600: "var(--gray-modern-600)",
          700: "var(--gray-modern-700)",
          800: "var(--gray-modern-800)",
          900: "var(--gray-modern-900)",
          950: "var(--gray-modern-950)",
        },

        grayCool: {
          25: "var(--gray-cool-25)",
          50: "var(--gray-cool-50)",
          100: "var(--gray-cool-100)",
          200: "var(--gray-cool-200)",
          300: "var(--gray-cool-300)",
          400: "var(--gray-cool-400)",
          500: "var(--gray-cool-500)",
          600: "var(--gray-cool-600)",
          700: "var(--gray-cool-700)",
          800: "var(--gray-cool-800)",
          900: "var(--gray-cool-900)",
          950: "var(--gray-cool-950)",
        },

        grayBlue: {
          25: "var(--gray-blue-25)",
          50: "var(--gray-blue-50)",
          100: "var(--gray-blue-100)",
          200: "var(--gray-blue-200)",
          300: "var(--gray-blue-300)",
          400: "var(--gray-blue-400)",
          500: "var(--gray-blue-500)",
          600: "var(--gray-blue-600)",
          700: "var(--gray-blue-700)",
          800: "var(--gray-blue-800)",
          900: "var(--gray-blue-900)",
          950: "var(--gray-blue-950)",
        },

        utility: {
          brand: {
            50: "var(--utility-brand-50)",
            alt_50: "var(--utility-brand-50_alt)",
            100: "var(--utility-brand-100)",
            alt_100: "var(--utility-brand-100_alt)",
            200: "var(--utility-brand-200)",
            alt_200: "var(--utility-brand-200_alt)",
            300: "var(--utility-brand-300)",
            alt_300: "var(--utility-brand-300_alt)",
            400: "var(--utility-brand-400)",
            alt_400: "var(--utility-brand-400_alt)",
            500: "var(--utility-brand-500)",
            alt_500: "var(--utility-brand-500_alt)",
            600: "var(--utility-brand-600)",
            alt_600: "var(--utility-brand-600_alt)",
            700: "var(--utility-brand-700)",
            alt_700: "var(--utility-brand-700_alt)",
            800: "var(--utility-brand-800)",
            alt_800: "var(--utility-brand-800_alt)",
            900: "var(--utility-brand-900)",
            alt_900: "var(--utility-brand-900_alt)",
          },
          gray: {
            50: "var(--utility-gray-50)",
            100: "var(--utility-gray-100)",
            200: "var(--utility-gray-200)",
            300: "var(--utility-gray-300)",
            400: "var(--utility-gray-400",
            500: "var(--utility-gray-500)",
            600: "var(--utility-gray-600)",
            700: "var(--utility-gray-700)",
            800: "var(--utility-gray-800)",
            900: "var(--utility-gray-900)",
          },
          success: {
            50: "var(--utility-success-50)",
            100: "var(--utility-success-100)",
            200: "var(--utility-success-200)",
            300: "var(--utility-success-300)",
            400: "var(--utility-success-400",
            500: "var(--utility-success-500)",
            600: "var(--utility-success-600)",
            700: "var(--utility-success-700)",
          },
          warning: {
            50: "var(--utility-warning-50)",
            100: "var(--utility-warning-100)",
            200: "var(--utility-warning-200)",
            300: "var(--utility-warning-300)",
            400: "var(--utility-warning-400",
            500: "var(--utility-warning-500)",
            600: "var(--utility-warning-600)",
            700: "var(--utility-warning-700)",
          },
          error: {
            50: "var(--utility-error-50)",
            100: "var(--utility-error-100)",
            200: "var(--utility-error-200)",
            300: "var(--utility-error-300)",
            400: "var(--utility-error-400",
            500: "var(--utility-error-500)",
            600: "var(--utility-error-600)",
            700: "var(--utility-error-700)",
          },
        },

        greenDark: "var(--green-dark)",

        neutral: {
          0: "var(--neutral-0)",
          40: "var(--neutral-40)",
          1000: "var(--neutral-100)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          800: "var(--neutral-800)",
        },
        N: {
          0: "var(--N-0)",
          50: "var(--N-50)",
        },

        base: {
          black: "#000000",
          white: "#ffffff",
          transparent: "rgba(255, 255, 255, 0)",
        },

        surface: {
          white: "var(--surface-fg-white)",
        },

        subtlest: "var(--text-subtlest)",

        tert: {
          600: "var(--tertiary-600)",
        },

        // cardbg: "#F5F5F7",
        cardbg: "var(--card-bg)",
        darkRed: "var(--red-dark)",
        borderPrimary: "var(--border-primary)",
        tertiary: "var(--tertiary)",
        baseBlack: "var(--base-black)",
        borderAvatar: "var(--border-avatar)",
        borderAvatarFocused: "var(--border-avatar-focused)",
        blackTransparent: "var(--black-transparent)",

        nuetralLight: "#FAFBFC",
        nuetralLightN20A: "#091E420A",
        buttonPrimary: "#1570EF",
        secondaryText: "#6B778C",
        greyDark: "#344563",
      },
      spacing: {
        none: "var(--spacing-none)",
        xxs: "var(--spacing-xxs)",
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
        "6xl": "var(--spacing-6xl)",
        "7xl": "var(--spacing-7xl)",
        "8xl": "var(--spacing-8xl)",
        "9xl": "var(--spacing-9xl)",
        "10xl": "var(--spacing-10xl)",
        "11xl": "var(--spacing-11xl)",
      },
      width: {
        xxs: "var(--width-xxs)",
        xs: "var(--width-xs)",
        sm: "var(--width-sm)",
        md: "var(--width-md)",
        lg: "var(--width-lg)",
        xl: "var(--width-xl)",
        "2xl": "var(--width-2xl)",
        "3xl": "var(--width-3xl)",
        "4xl": "var(--width-4xl)",
        "5xl": "var(--width-5xl)",
        "6xl": "var(--width-6xl)",
      },
      Blue: {
        B400: "#0052CC",
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
    fontFamily: {
      body: ["Inter"],
    },
    fontSize: {
      ...defaultTheme.fontSize,
      xxs: 10,
    },
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
    minHeight: {
      ...defaultTheme.height,
    },

    minWidth: {
      ...defaultTheme.width,
    },
    boxShadow: {
      ...colors.boxShadow,
      boxShadowFilter: "rgb(204, 204, 204) 1px 1px 1px 1px",
      boxShadowOnWhiteBg:
        "0 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
      boxShadowBlack:
        "0px 0 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    },
    backgroundImage: {
      headerBottom:
        "linear-gradient(180deg, rgba(9, 30, 66, 0.13) 0%, rgba(9, 30, 66, 0.13) 25%, rgba(9, 30, 66, 0.08) 25.01%, rgba(9, 30, 66, 0.00) 100%)",
        gradient: "linear-gradient(30deg, #AD00FE, #00E0EE)",

    },
    borderImage: {
      gradient: "linear-gradient(30deg, #AD00FE, #00E0EE)",
    },
  },
  important: true,
  plugins: [
    // ...
    require("@tailwindcss/forms"),
    require('tailwind-scrollbar'),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
};
