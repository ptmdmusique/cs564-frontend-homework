function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }

    return `rgb(var(${variableName}))`;
  };
}

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,sass,scss}"],
  theme: {
    extend: {
      screens: {
        "2xl-max": { max: "1535px" }, // => @media (max-width: 1535px) { ... }
        "xl-max": { max: "1279px" }, // => @media (max-width: 1279px) { ... }
        "lg-max": { max: "1023px" }, // => @media (max-width: 1023px) { ... }
        "md-max": { max: "767px" }, // => @media (max-width: 767px) { ... }
        "sm-max": { max: "639px" }, // => @media (max-width: 639px) { ... }
      },

      colors: {
        skin: {
          fill: withOpacity("--fill"),
          danger: withOpacity("--danger"),
          success: withOpacity("--success"),
          warning: withOpacity("--warning"),
          info: withOpacity("--info"),
          default: withOpacity("--default"),
          exquisite: withOpacity("--exquisite"),
          disabled: withOpacity("--disabled"),
          primary: withOpacity("--text-primary"),
          secondary: withOpacity("--text-secondary"),
          base: withOpacity("--text-base"),
          inverted: withOpacity("--text-inverted"),

          // Routes
          home: withOpacity("--home"),
          resume: withOpacity("--resume"),
          projects: withOpacity("--projects"),
          contact: withOpacity("--contact"),
        },
      },
      backgroundColor: {
        skin: {
          default: withOpacity("--background"),
          top: withOpacity("--background-top"),
          "overflow-menu": withOpacity("--background-overflow-menu"),
          active: withOpacity("--background-active"),
        },
      },

      padding: {
        "mobile-content": `var(--mobile-content-padding)`,
        "desktop-content": `var(--desktop-content-padding)`,
      },

      maxWidth: {
        content: `var(--content-max-width)`,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
