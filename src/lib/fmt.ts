export const fmtCurrency = (
  value: number,
  currency: string = "USD",
  locale = "en-US"
) =>
  new Intl.NumberFormat(locale, { style: "currency", currency }).format(value);

export const fmtDate = (iso: string | number | Date, locale = "en-GB") =>
  new Intl.DateTimeFormat(locale, { dateStyle: "medium" }).format(
    new Date(iso)
  );
