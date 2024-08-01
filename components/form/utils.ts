export const sanitizeTextField = (value: string) => {
  // Strip out any dangerous HTML tags or attributes
  return value.replace(/<script.*?>.*?<\/script>/gi, "").trim();
};

export const validateTextField = (value: string) => {
  // Basic validation, e.g., length check
  return value.length >= 1 && value.length <= 500;
};

export const cleanString = (str: string) =>
  str.replace(/[\u200B-\u200D\uFEFF]/g, "");
