import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import ArticleIcon from "@icons/Article";
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
import { EntitlementDirectory } from "@portal/Search/types";
import { GET_DIRECTORY_ENTITLEMENT } from "@portal/Search/queries";

export default function EntitlementDetails() {
  const router = useRouter();
  const { id } = router.query;

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
            <ArticleIcon width={21} height={21} />
            <FormattedMessage id="entitlement" />
          </BoxHeaderTitle>
        </BoxHeader>
        <BoxContent>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="resource" />
            </Label>
            <TextField value={entitlement?.resource?.name || " - "} variant="outlined" />
          </FormControl>
          <FormControl fullWidth={true} margin="normal">
            <Label>
              <FormattedMessage id="description" />
            </Label>
            <BoxDescription>
              {entitlement?.description || " - "}
            </BoxDescription>
          </FormControl>
        </BoxContent>
      </Box>
      <BoxCart>
        <ShoppingCartSimpleIcon width={21} height={21} />
        <FormattedMessage id="cart.add" />
      </BoxCart>
    </>
  );
}
