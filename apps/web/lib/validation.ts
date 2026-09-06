export type Validator = (value: string) => string | null;

export const required =
  (label: string): Validator =>
  (v) =>
    v.trim() ? null : `${label} is required`;

export const email: Validator = (v) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? null : "Enter a valid email";

export const phoneIN: Validator = (v) =>
  /^[6-9]\d{9}$/.test(v.replace(/\s+/g, "")) ? null : "Enter a 10-digit mobile number";

export const pincodeIN: Validator = (v) =>
  /^\d{6}$/.test(v.trim()) ? null : "Enter a 6-digit pincode";

export const cardNumber: Validator = (v) =>
  /^\d{16}$/.test(v.replace(/\s+/g, ""))
    ? null
    : "Enter 16 digits (try 4242 4242 4242 4242)";

export const cardExpiry: Validator = (v) => {
  const m = /^(\d{2})\/(\d{2})$/.exec(v.trim());
  if (!m) return "Use MM/YY";
  const month = Number(m[1]);
  if (month < 1 || month > 12) return "Month must be 01–12";
  return null;
};

export const cardCvc: Validator = (v) =>
  /^\d{3,4}$/.test(v.trim()) ? null : "3 or 4 digits";

export function compose(...validators: Validator[]): Validator {
  return (v) => {
    for (const validate of validators) {
      const err = validate(v);
      if (err) return err;
    }
    return null;
  };
}

export function validateAll<T extends object>(
  values: T,
  schema: { [K in keyof T]?: Validator },
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};
  for (const key of Object.keys(schema) as (keyof T)[]) {
    const validate = schema[key];
    if (!validate) continue;
    const raw = values[key];
    const err = validate(typeof raw === "string" ? raw : "");
    if (err) errors[key] = err;
  }
  return errors;
}

/** "4242424242424242" -> "4242 4242 4242 4242" */
export function formatCardNumber(raw: string): string {
  return raw
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ");
}

/** "1229" -> "12/29" */
export function formatExpiry(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 4);
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
}
