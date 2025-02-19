export const validateEmail = (email) => {
  const checks = {
    format: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    length: email.length <= 254,
    domain: email.split('@')[1]?.includes('.'),
    specialChars: !/[(),:;<>[\]\\]/.test(email)
  };

  return {
    isValid: Object.values(checks).every(Boolean),
    score: Object.values(checks).filter(Boolean).length,
    checks
  };
};