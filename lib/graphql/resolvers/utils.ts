export const config = (context: any) => ({
  headers: {
    Accept: "application/json; charset=utf-8",
    "Content-Type": "application/json; charset=utf-8",
    Authorization: `Bearer ${context.req?.session?.passport?.AccessToken}`,
  },
});
