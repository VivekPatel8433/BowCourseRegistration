import DOMPurify from 'dompurify';

export  function sanitizeInputs(data) {
  const sanitized = {};
  for (const key in data) {
    const value = data[key];
    sanitized[key] = typeof value === "string" ? value.trim() : value;
  }
  return sanitized;
}


export const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};
