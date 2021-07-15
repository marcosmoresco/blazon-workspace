export const config = (context: any) => ({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${context.req?.session?.passport?.AccessToken}`,
  },
});
