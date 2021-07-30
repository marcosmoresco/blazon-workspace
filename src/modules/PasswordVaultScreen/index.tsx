import React, { FC, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { injectIntl, IntlShape } from "react-intl";
import useStyles from "./styles";
import NewPassword from "./NewPassword";
import Divider from "@components/Divider";
import Button from "@components/Button";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { useQuery } from "@apollo/client";
import Loading from "@components/Loading";
import PasswordVaultItem from "@modules/PasswordVaultItem";
import { Grid } from "@material-ui/core";
import PasswordVault from "@modules/PasswordVaultItem/components";
import Plus from "@icons/Plus";
import { chunk } from "lodash";
import EmptyState from "@components/EmptyState";
import EmptyStateSearchIcon from "@icons/EmptyStateSearch";
import RequestStatusDialog from "@components/RequestStatusDialog";
import SharedDialog from "./ShareDialog";

const StyledPasswordVaultItem = withStyles(() => ({
  valtItem: {
    paddingBottom: 24,
    paddingRight: 24,
  },
}))(PasswordVaultItem);

type PasswordVaultScreenProps = {
  intl: IntlShape;
  classes: any;
};
const PasswordVaultScreen: FC<PasswordVaultScreenProps> = ({
  classes,
  intl,
}) => {
  const [newPasswordModalOpen, setNewPasswordModalOpen] =
    useState<boolean>(false);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  const [savePasswordStatus, setSavePasswordStatus] =
    useState<boolean | undefined>(undefined);
  const [showSavePasswordStatusModal, setShowSavePasswordStatusModal] =
    useState<boolean>(false);

  const [showShareDialogModal, setShowShareDialogModal] =
    useState<boolean>(false);

  const { loading, error: errorEntries, data } = useQuery(GET_ENTRIES);

  if (loading) {
    return <Loading container={true} />;
  }

  const loadMore = () => {
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  const dataToRender = chunk(
    data?.getPasswordVaultEntries || [],
    pageSize * currentPage
  )[0];

  return (
    <>
      <div className={classes.passwordVault}>
        <RequestStatusDialog
          open={showSavePasswordStatusModal}
          success={savePasswordStatus === true}
          onClose={() => setShowSavePasswordStatusModal(false)}
          message={
            savePasswordStatus
              ? "passwordVault.sucessSave"
              : "passwordVault.errorSave"
          }
        />       

        <NewPassword
          open={newPasswordModalOpen}
          onClose={() => {
            setNewPasswordModalOpen(false);
          }}
          onSave={(success: boolean) => {
            setShowSavePasswordStatusModal(true);
            setSavePasswordStatus(success);
          }}
        />            

        <div className="title">
          {intl.formatMessage({ id: "passwordVault.title" })}
        </div>
        <div className="subtitle">
          {intl.formatMessage(
            { id: "passwordVault.itens" },
            { amount: data?.getPasswordVaultEntries?.length }
          )}
        </div>
        <div className="pt32">
          <Divider />
        </div>
        <div className="pt24">
          <Button
            className="newPasswordButton"
            onClick={() => setNewPasswordModalOpen(true)}
          >
            <Plus width={26} height={26} />
            <div>{intl.formatMessage({ id: "passwordVault.newPassword" })}</div>
          </Button>
        </div>
        <Grid container className="pt24" spacing={3}>
          {(dataToRender || []).map((item, i) => (
            <Grid item key={i} xs={3}>
              <StyledPasswordVaultItem
                r={item}               
              />
            </Grid>
          ))}
        </Grid>
        {pageSize * currentPage >= data?.getPasswordVaultEntries.length ? (
          <EmptyState
            icon={<EmptyStateSearchIcon />}
            title="passwordVault.emptyState.title"
            text="passwordVault.emptyState.description"
          />
        ) : (
          <div style={{ textAlign: "center" }}>
            <Button className="newPasswordButton" onClick={loadMore}>
              {intl.formatMessage({ id: "loadMore" })}
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default withStyles(useStyles)(injectIntl(PasswordVaultScreen));
