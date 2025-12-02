import DOMPurify from 'dompurify';

 export const sanitizeInputs = (inputs) => {
  const sanitized = {};
  for (const key in inputs) {
    if (Object.hasOwnProperty.call(inputs, key)) {
      sanitized[key] = DOMPurify.sanitize(inputs[key]);
    }
  }
  return sanitized;
};

export const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input);
};
