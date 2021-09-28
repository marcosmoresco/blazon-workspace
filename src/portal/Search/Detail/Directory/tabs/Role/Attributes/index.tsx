import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
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
import { RoleDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_ROLE } from "@portal/Search/queries";
import { iconByType } from "@utils/index";
import { useTheme, themes } from "@theme/index";

export default function RoleAttributes() {
  const router = useRouter();
  const { id } = router.query;
  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const { loading, error, data, refetch } = useQuery<{
    getDirectoryRole: RoleDirectory;
  }>(GET_DIRECTORY_ROLE, {
    variables: {
      id: Number(id),
    },
  });

  const role = data?.getDirectoryRole;

  return (
    <>
      <Box>
        <BoxHeader>
          <BoxHeaderName>
            {role?.name || " - "}
          </BoxHeaderName>
          <BoxHeaderTitle>
            {iconByType('', 21)[`ROLE`]}
            <FormattedMessage id="role" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>         
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {role?.description || " - "}
            </BoxDescription>
            <BoxExternalReference>
              <Label>
                <FormattedMessage id="externalReference" />
              </Label>
              {!role?.externalReference && <NoExternalReference>
                <FormattedMessage id="search.detail.no.external.reference" />
              </NoExternalReference>}
              {role?.externalReference && <ExternalReference 
                href={role?.externalReference}
                target="__blank"
                color={currentTheme.palette.primary.main}>
                {role?.externalReference} <LinkIcon color={currentTheme.palette.primary.main}/>
              </ExternalReference>}
            </BoxExternalReference> 
          </FormControl>
        </BoxContent>
      </Box>      
    </>
  );
}
