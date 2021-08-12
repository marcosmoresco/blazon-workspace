import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  BoxCart,
  Label,
} from "./styles";
import { RoleDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_ROLE } from "@portal/Search/queries";
import { iconByType } from "@utils/index";

export default function RoleAttributes() {
  const router = useRouter();
  const { id } = router.query;

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
          </FormControl>
        </BoxContent>
      </Box>      
    </>
  );
}
