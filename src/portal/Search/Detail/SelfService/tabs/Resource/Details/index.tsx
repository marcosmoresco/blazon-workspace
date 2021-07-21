import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import FormControl from "@material-ui/core/FormControl";
import Progress from "@components/Progress";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import {
  Box,
  BoxHeader,
  BoxHeaderName,
  BoxHeaderTitle,
  BoxContent,
  BoxDescription,
  BoxCart,
  Label,
  BoxLoading,
} from "./styles";
import { SelfService } from "@portal/Search/types";
import { GET_SELF_SERVICE_ITEM } from "@portal/Search/queries";

export default function ResourceDetails() {
  const router = useRouter();
  const { id } = router.query;

  const { loading, error, data, refetch } = useQuery<{
    getSelfServiceItem: SelfService;
  }>(GET_SELF_SERVICE_ITEM, {
    variables: {
      id: id,
    },
  });

  const resource = data?.getSelfServiceItem;

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
                <PuzzlePieceIcon width={21} height={21} />
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
              </FormControl>
            </BoxContent>
          </Box>
          <BoxCart>
            <ShoppingCartSimpleIcon width={21} height={21} />
            <FormattedMessage id="cart.add" />
          </BoxCart>
        </>
      )}
    </>
  );
}
