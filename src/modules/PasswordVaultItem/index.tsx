import KeyIcon from "@icons/Key";
import DotsThreeOutlineVerticalIcon from "@icons/DotsThreeOutlineVertical";
import Tooltip from "@components/Tooltip";
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
} from "./../../portal/Home/styles";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { FormattedMessage, useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { addMessage } from "@actions/index";
import { confirm } from "@components/Dialog/actions";
import SharedDialog from "./ShareDialog";
import PasswordVault from "./components";
import { GET_ENTRIES } from "@modules/PasswordVaultItem/queries";
import { 
  DELETE_PASSWORD_VAULT_ENTRY,
} from "@modules/PasswordVaultScreen/mutations";

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

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if(!passwordVault) {
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

  return (
    <div>
      <RecentPasswordCard>
        <RecentPasswordCardContent>
          <RecentPasswordCardContentHeader>
            <RecentPasswordCardContentHeaderImage>
              <KeyIcon width={30} height={30} color="#3174F6" />
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
          <Tooltip title={r.description} placement="bottom">
            <RecentPasswordCardContentHeaderText>           
              {r.description}                        
            </RecentPasswordCardContentHeaderText>
          </Tooltip>
        </RecentPasswordCardContent>
        <RecentPasswordCardActions onClick={handleClick}>
          <DotsThreeOutlineVerticalIcon />
        </RecentPasswordCardActions>        
      </RecentPasswordCard>
      <Menu
        id={`password-vault-menu-item-menu-${r.identifier}`}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => {
          setOpenPasswordVault(true);
          setPasswordVault(r);
          handleClose();
        }}>
          <FormattedMessage id="details"/>
        </MenuItem>
        <MenuItem onClick={async () => {
          const result = await confirm(intl.formatMessage({
            id: "passwordVault.remove.confirm"
          }), intl.formatMessage({
            id: "passwordVault.remove.confirm.text"
          }));
          if(result) {
            deletePasswordVaultEntry({
              variables: {
                id: r.identifier
              }
            });
          }          
        }}>
          <FormattedMessage id="remove"/>
        </MenuItem>
        <MenuItem onClick={() => {
          setSharedModalOpen(true);
          setPasswordVault(r);
          handleClose();
        }}>
          <FormattedMessage id="share"/>
        </MenuItem>
      </Menu>
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
          onSave={() => {
            setOpenPasswordVault(false);              
          }}
        />
      )}  
    </div>
  );
};

export default PasswordVaultItem;
