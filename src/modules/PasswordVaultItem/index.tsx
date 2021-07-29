import KeyIcon from "@icons/Key";
import Tooltip from "@components/Tooltip";
import React, { FC } from "react";
import {
  RecentPasswordCard,
  RecentPasswordCardContent,
  RecentPasswordCardContentHeader,
  RecentPasswordCardContentHeaderImage,
  RecentPasswordCardContentHeaderTitle,
  RecentPasswordCardContentHeaderUsername,
  RecentPasswordCardContentHeaderText,
  RecentPasswordCardContentHeaderBox,
} from "./../../portal/Home/styles";

type PasswordVaultItemProps = {
  classes: any;
  setOpen(open: boolean): void;
  setPasswordVault(item: any): void;
  r: any;
};

const PasswordVaultItem: FC<PasswordVaultItemProps> = ({
  classes,
  setOpen,
  setPasswordVault,
  r,
}) => {  
  return (
    <div
      onClick={() => {
        setOpen(true);
        setPasswordVault(r);
      }}
    >
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
      </RecentPasswordCard>
    </div>
  );
};

export default PasswordVaultItem;
