import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import Progress from "@components/Progress";
import LinkIcon from "@icons/Link";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  Label,
  BoxLoading,
  BoxExternalReference,
  ExternalReference,
  NoExternalReference,
} from "./styles";
import { ResourceDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_RESOURCE } from "@portal/Search/queries";
import { iconByType } from "@utils/index";
import { useTheme, themes } from "@theme/index";

export default function ResourceDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading, error, data, refetch } = useQuery<{
    getDirectoryResource: ResourceDirectory;
  }>(GET_DIRECTORY_RESOURCE, {
    variables: {
      id: Number(id),
    },
  });

  const resource = data?.getDirectoryResource;

  return (
    <>
      {loading && (
        <BoxLoading>
          <Progress />
        </BoxLoading>
      )}
      {!loading && (
        <>
          <Box>
            <BoxHeader>
              <BoxHeaderName>{resource?.name || " - "}</BoxHeaderName>
              <BoxHeaderTitle>
                {iconByType('', 21)[`RESOURCE`]}
                <FormattedMessage id="resource" />
              </BoxHeaderTitle>
            </BoxHeader>
            <BoxContent>
              <FormControl fullWidth={true} margin="normal">
                <Label>
                  <FormattedMessage id="description" />
                </Label>
                <BoxDescription>
                  {resource?.description || " - "}
                </BoxDescription>
                <BoxExternalReference>
                  <Label>
                    <FormattedMessage id="externalReference" />
                  </Label>
                  {!resource?.externalReference && <NoExternalReference>
                    <FormattedMessage id="search.detail.no.external.reference" />
                  </NoExternalReference>}
                  {resource?.externalReference && <ExternalReference 
                    href={resource?.externalReference}
                    target="__blank"
                    color={currentTheme.palette.primary.main}>
                    {resource?.externalReference} <LinkIcon color={currentTheme.palette.primary.main}/>
                  </ExternalReference>}
                </BoxExternalReference> 
              </FormControl>
            </BoxContent>
          </Box>          
        </>
      )}
    </>
  );
}
