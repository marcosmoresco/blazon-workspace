import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useUser() {
  const { data, mutate } = useSWR("/api/user", fetcher);
  // if data is not defined, the query has not completed
  const loading = !data;
  const user = data;
  const thumbUrl = data?.links?.find((link: any) => link.rel === "thumb")?.href;
  let thumb = !thumbUrl ? "" : `/api/images?url=${thumbUrl}`;
  return [user, thumb, { mutate, loading }];
}
