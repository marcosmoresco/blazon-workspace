import KeyIcon from "@icons/Key";
import DotsThreeVerticalIcon from "@icons/DotsThreeVertical";
import CaretRightIcon from "@icons/CaretRight";
import Tooltip from "@components/Tooltip";
import RequestStatusDialog from "@components/RequestStatusDialog";
import React, { FC, useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import {
  RecentPasswordCard,
  RecentPasswordCardContent,
  RecentPasswordCardContentHeader,
  RecentPasswordCardContentHeaderImage,
  RecentPasswordCardContentHeaderTitle,
  RecentPasswordCardContentHeaderUsername,
  RecentPasswordCardContentHeaderText,
  RecentPasswordCardContentHeaderBox,
  RecentPasswordCardActions,
  StyledMenu,
} from "./../../portal/Home/styles";
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { confirm } from "@components/Dialog/actions";
import { useTheme, themes } from "@theme/index";
import SharedDialog from "./ShareDialog";
import PasswordVault from "./components";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { 
  DELETE_PASSWORD_VAULT_ENTRY,
  UPDATE_PASSWORD_VAULT
} from "@modules/PasswordVaultScreen/mutations";
import { getLink } from "@utils/index";

type PasswordVaultItemProps = {
  classes: any;  
  r: any;
};

const PasswordVaultItem: FC<PasswordVaultItemProps> = ({
  classes,
  r,
}) => {  

  const dispatch = useDispatch();
  const intl = useIntl();
  const [anchorEl, setAnchorEl] = useState(null);
  const [sharedModalOpen, setSharedModalOpen] = useState<boolean>(false);
  const [openPasswordVault, setOpenPasswordVault] = useState<boolean>(false);
  const [passwordVault, setPasswordVault] = useState(null);
  const [showSavePasswordStatusModal, setShowSavePasswordStatusModal] = useState<boolean>(false);
  const [savePasswordStatus, setSavePasswordStatus] = useState<boolean>(false);

  const { theme } = useTheme();
  const currentTheme = { ...themes[theme] };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(!passwordVault || JSON.stringify(r) !== JSON.stringify(passwordVault)) {
      setPasswordVault(r);
    }
  }, [passwordVault, setPasswordVault, r]);

  const [deletePasswordVaultEntry, {}] = useMutation(DELETE_PASSWORD_VAULT_ENTRY, {
    refetchQueries: [
      {
        query: GET_ENTRIES       
      },
    ],
    onCompleted: ({deletePasswordVaultEntry}) => {   
      if(deletePasswordVaultEntry) {
        dispatch(
          addMessage(
            intl.formatMessage({id: "passwordVault.remove.success"})
          )
        );
        handleClose();      
      }        
    },
  });

  const [updatePasswordVault, {}] = useMutation(UPDATE_PASSWORD_VAULT, {
    refetchQueries: [
      {
        query: GET_ENTRIES       
      },
    ],
    onCompleted: ({updatePasswordVault}) => {   
      if(updatePasswordVault) {        
        handleClose();  
        setOpenPasswordVault(false); 
        setShowSavePasswordStatusModal(true);
        setSavePasswordStatus(true);   
      }        
    },
  });

  return (
    <div>
      <RecentPasswordCard>
        <RecentPasswordCardContent>
          <RecentPasswordCardContentHeader>
            <RecentPasswordCardContentHeaderImage>
              <KeyIcon width={30} height={30} color={currentTheme.palette.primary.main || "#3174F6"} stroke={2}/>
            </RecentPasswordCardContentHeaderImage>
            <RecentPasswordCardContentHeaderBox>
              <Tooltip title={r.name} placement="bottom">
                <RecentPasswordCardContentHeaderTitle>                
                  {r.name}               
                </RecentPasswordCardContentHeaderTitle>
              </Tooltip>
              <Tooltip title={r.username} placement="bottom">
                <RecentPasswordCardContentHeaderUsername>
                  {r.username}
                </RecentPasswordCardContentHeaderUsername>
              </Tooltip>             
            </RecentPasswordCardContentHeaderBox>
          </RecentPasswordCardContentHeader>
          <Tooltip title={r.description || " - "} placement="bottom">
            <RecentPasswordCardContentHeaderText>           
              {r.description || " - "}                        
            </RecentPasswordCardContentHeaderText>
          </Tooltip>
        </RecentPasswordCardContent>
        <RecentPasswordCardActions onClick={handleClick}>
          <DotsThreeVerticalIcon stroke={3}/>
        </RecentPasswordCardActions>        
      </RecentPasswordCard>
      <StyledMenu
        id={`password-vault-menu-item-menu-${r.identifier}`}
        anchorEl={anchorEl}
        keepMounted
        disableAutoFocusItem
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setOpenPasswordVault(true);
          setPasswordVault(r);
          handleClose();
        }}>
          <FormattedMessage id="details"/>
          <CaretRightIcon width={23} height={23} stroke={1.2}/>
        </MenuItem>
        {getLink("remove", r?.links || []) && (
        <MenuItem onClick={async () => {
          const result = await confirm(intl.formatMessage({
            id: "passwordVault.remove.confirm"
          }), intl.formatMessage({
            id: "passwordVault.remove.confirm.text"
          }),
          null,
          null,
          currentTheme);
          if(result) {
            deletePasswordVaultEntry({
              variables: {
                id: r.identifier
              }
            });
          }          
        }}>
          <FormattedMessage id="remove"/>
          <CaretRightIcon width={23} height={23} stroke={1.2}/>
        </MenuItem>)}
        {getLink("share", r?.links || []) && (
        <MenuItem onClick={() => {
          setSharedModalOpen(true);
          setPasswordVault(r);
          handleClose();
        }}>
          <FormattedMessage id="share"/>
          <CaretRightIcon width={23} height={23} stroke={1.2}/>
        </MenuItem>)}
      </StyledMenu>
      {r && (
        <SharedDialog
          modalOpen={sharedModalOpen}
          setModalOpen={setSharedModalOpen}
          currentSelected={r}
          setCurrPasswordVault={setPasswordVault}
          classes={classes}
        /> 
        )} 
      {r && (
        <PasswordVault
          onClose={() => setOpenPasswordVault(false)}
          open={openPasswordVault || false}
          passwordVault={r}            
          onSave={(values: any) => {
            if(values) {
              updatePasswordVault({
                variables: {
                  id: r.identifier,
                  payload: JSON.stringify(values)
                }
              })
            } else {
              setOpenPasswordVault(false);
            }                        
          }}
        />
      )}  
      <RequestStatusDialog
        open={showSavePasswordStatusModal}
        success={savePasswordStatus === true}
        onClose={() => setShowSavePasswordStatusModal(false)}
        message={
          savePasswordStatus
            ? "passwordVault.sucessUpdate"
            : "passwordVault.errorUpdate"
        }
      /> 
    </div>
  );
};

export default PasswordVaultItem;
