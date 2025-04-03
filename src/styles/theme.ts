export type ThemeName = "light" | "dark";

export type ColorKey = "primary" | "background" | "border" | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonColor = "primary" | "normal";

interface Theme {
  name: ThemeName
  color: Record<ColorKey, string>
  heading: {
    [key in HeadingSize]: {
      fontSize: string
    }
  }
  button: {
    [key in ButtonSize]: {
      fontSize: string
      width: string
      height: string
    }
  }
  buttonColor: {
    [key in ButtonColor]: {
      color: string
      backgroundColor: string
      borderColor: string
    }
  }
  borderRadius: {
    default: string
  },
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: "#6EA1FF",
    background: "#FBFBFB",
    border: "#F5F5F5",
    text: "#333333"
  },
  heading: {
    large: {
      fontSize: "30px"
    },
    medium: {
      fontSize: "16px"
    },
    small: {
      fontSize: "14px"
    }
  },
  button: {
    large: {
      fontSize: "18px",
      width: "333px",
      height: "55px"
    },
    medium: {
      fontSize: "16px",
      width: "122px",
      height: "60px"
    },
    small: {
      fontSize: "16px",
      width: "100px",
      height: "60px"
    },
  },
  buttonColor: {
    primary: {
      color: "#FFFFFF",
      backgroundColor: "#6EA1FF",
      borderColor: "#6EA1FF"
    },
    normal: {
      color: "#D4DCEA",
      backgroundColor: "#FFFFFF",
      borderColor: "#D4DCEA"
    }
  },
  borderRadius: {
    default: "5px"
  },
}