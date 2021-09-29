import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import LinkIcon from "@icons/Link";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  Label,
  BoxExternalReference,
  ExternalReference,
  NoExternalReference,
} from "./styles";
import { EntitlementDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_ENTITLEMENT } from "@portal/Search/queries";
import { iconByType } from "@utils/index";
import { useTheme, themes } from "@theme/index";

export default function EntitlementDetails() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading, error, data, refetch } = useQuery<{
    getDirectoryEntitlement: EntitlementDirectory;
  }>(GET_DIRECTORY_ENTITLEMENT, {
    variables: {
      id: Number(id),
    },
  });

  const entitlement = data?.getDirectoryEntitlement;

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            {entitlement?.name || " - "}
          </BoxHeaderName>
          <BoxHeaderTitle>
            {iconByType('', 21)[`ENTITLEMENT`]}
            <FormattedMessage id="entitlement" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>          
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {entitlement?.description || " - "}
            </BoxDescription>
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="resource" />
            </Label>
            <TextField value={entitlement?.resource?.name || " - "} variant="outlined" />
            <BoxExternalReference>
              <Label>
                <FormattedMessage id="externalReference" />
              </Label>
              {!entitlement?.externalReference && <NoExternalReference>
                <FormattedMessage id="search.detail.no.external.reference" />
              </NoExternalReference>}
              {entitlement?.externalReference && <ExternalReference 
                href={entitlement?.externalReference}
                target="__blank"
                color={currentTheme.palette.primary.main}>
                {entitlement?.externalReference} <LinkIcon color={currentTheme.palette.primary.main}/>
              </ExternalReference>}
            </BoxExternalReference>
          </FormControl>
        </BoxContent>
      </Box>      
    </>
  );
}
