import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { injectIntl, IntlShape, FormattedMessage } from "react-intl";
import useStyles from "./styles";
import NewPassword from "./NewPassword";
import Divider from "@components/Divider";
import Button from "@components/Button";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { useQuery } from "@apollo/client";
import Loading from "@components/Loading";
import PasswordVaultItem from "@modules/PasswordVaultItem";
import { Grid } from "@material-ui/core";
import Plus from "@icons/Plus";
import { chunk } from "lodash";
import EmptyState from "@components/EmptyState";
import CaretRightIcon from "@icons/CaretRight";
import HouseSimpleIcon from "@icons/HouseSimple";
import RequestStatusDialog from "@components/RequestStatusDialog";
import Link from "@components/BreadcrumbLink";
import { useTheme, themes } from "@theme/index";

//images
import EmptyStateImage from "@images/EmptyStatePasswordVault.svg";

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

  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const [newPasswordModalOpen, setNewPasswordModalOpen] =
    useState<boolean>(false);

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(9);

  const [savePasswordStatus, setSavePasswordStatus] =
    useState<boolean | undefined>(undefined);
  const [showSavePasswordStatusModal, setShowSavePasswordStatusModal] =
    useState<boolean>(false);

  const [showShareDialogModal, setShowShareDialogModal] =
    useState<boolean>(false);

  const { loading, error: errorEntries, data } = useQuery(GET_ENTRIES, {
    fetchPolicy: "network-only"
  });

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
        <Breadcrumbs separator={<CaretRightIcon width={18} height={18} stroke={2} color="#7D7A8C"/>} aria-label="breadcrumb">
          <Link color="primary" href="/" onClick={() => router.push("/")}>
            <HouseSimpleIcon width={23} height={23} color={currentTheme.palette.primary.main || "#3174F6"}/>
            <FormattedMessage id="home" />
          </Link>          
          <Typography>
            <FormattedMessage id="passwordVault" />
          </Typography>
        </Breadcrumbs>
      
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
        {(data?.getPasswordVaultEntries || []).length === 0 && (
          <EmptyState
            image={EmptyStateImage}
            title="passwordVault.emptyState.title"
            text="passwordVault.emptyState.description.text"
          />
        )}
        {(data?.getPasswordVaultEntries || []).length > 0 && (
          <>
            <Grid container className="pt24" spacing={3}>
              {(dataToRender || []).map((item, i) => (
                <Grid item key={i} xs={3}>
                  <StyledPasswordVaultItem
                    r={item}               
                  />
                </Grid>
              ))}
            </Grid>
            {pageSize * currentPage < data?.getPasswordVaultEntries.length && (
               <div style={{ textAlign: "center" }}>
               <Button color="primary" variant="contained" onClick={loadMore}>
                 {intl.formatMessage({ id: "loadMore" })}
               </Button>
             </div>
            ) || null}
          </>
        )}        
      </div>
    </>
  );
};

export default withStyles(useStyles)(injectIntl(PasswordVaultScreen));
