import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Theme } from "@material-ui/core/styles";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import SquaresFourIcon from "@icons/SquaresFour";
import CheckCircleIcon from "@icons/CheckCircle";
import SecurityUserIcon from "@icons/SecurityUser";
import PeopleIcon from "@icons/People";
import UserIcon from "@icons/User";
import CaretRightIcon from "@icons/CaretRight";
import EmptyState from "@components/EmptyState";
import EmptyStateTypeahead from "@images/EmptyStateTypeahead.svg";

export const BoxAutocomplete = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  &:hover {
    .Autocomplete-cart {
      background:  ${props => props.color};
      & svg {
        filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(276deg)
          brightness(103%) contrast(101%);
      }
    }
  }
`;

export const BoxAutocompleteContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const BoxAutocompleteContentInfo = styled.div`
  margin-left: 15px;
  width: 100%;
`;

export const BoxAutocompleteContentCart = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #F4F4F5;
  border-radius: 5.53846px;
  width: 36px;
  height: 36px;
`;

export const BoxAutocompleteTitle = styled.div`
  font-weight: 700;
  color: #292f33;
  font-size: 14px;
  display: inline-block;
`;

export const BoxAutocompleteTitleParent = styled.span`
  font-size: 12px;
  opacity: 0.4;
`;

export const BoxAutocompleteText = styled.div`
  font-size: 12px !important;
  line-height: 18px;
  color: #292f33;
  box-sizing: border-box;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 470px;
`;

const HeaderSearchIn = styled.div`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  color: #777779;
  margin-left: 20px;
  padding-top: 20px;
`;

const HeaderResults = styled.div`
  font-size: 15px;
  line-height: 24px;
  letter-spacing: 0.0015em;
  color: #777779;
  margin-bottom: 20px;
  margin-left: 20px;
`;

const HeaderTags = styled.div`
  display: flex;
  margin-left: 20px;
  margin-bottom: 15px;
`;

const HeaderTag = styled.div`
  margin-right: 5px;
  left: 379px;
  background: #ddddec;
  border-radius: 4px;
  font-size: 12px;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  &.Active {
    background: ${props => props.color};
    color: #FFFFFF;
  }
`;

const FooterSeeAll = styled.div`
  padding: 10px 10px 10px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: #777779;
  letter-spacing: 0.0015em;
  &:hover {
    background-color: rgba(0, 0, 0, 0.04);
  }
`;

export const Autocomplete = styled(Paper)({
  backgroundColor: "#FFFFFF !important",
  border: "1px solid #BEBECB",
  boxSizing: "border-box",
  boxShadow: "0px 24px 71px 5px rgb(0 0 0 / 25%)",
  borderRadius: 8,
  marginTop: 15,
  "& .MuiAutocomplete-option::hover": {
    backgroundColor: "#3174f6 !important",
    "& .Autocomplete-cart": {
      backgroundColor: "#3174f6",
      "& svg": {
        filter: "invert(100%) sepia(0%) saturate(0%) hue-rotate(276deg) brightness(103%) contrast(101%)"
      }
    }
  },
  "& .MuiAutocomplete-option[data-focus=\"true\"]": {
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.04) !important",
    }
  },
});

export const AutocompletePaper = ({
  children,
  refetch,
  filter,
  open,
  setOpen,
  setFilter,
  goToSearch,
  list,
  theme
}: {
  children: any;
  refetch: any;
  filter: any;
  open: boolean;
  setOpen: any;
  setFilter: any;
  goToSearch: any;
  list: any;
  theme: Theme
}) => {
  const [active, setActive] = useState("");

  if (open) {
    document.onclick = (e: any) => {
      const filtered = e.path?.filter(
        (f: any) =>
          f.className === "MuiAutocomplete-popper" ||
          f.id === "blazon-workspace-header-search"
      );
      if (!filtered.length) {
        setOpen(false);
        setActive("");        
        document.onclick = null;
      }
    };

    document.onkeyup = (e: any) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.onkeyup = null;
      }
    };
  }

  return (
    <Autocomplete>
      <HeaderSearchIn>
        <FormattedMessage id="searchIn" />
      </HeaderSearchIn>
      <HeaderTags>
        <HeaderTag
          onClick={() => {
            const variables = {
              size: 5,
              q: filter || "",
              type: "",
            };

            if (active !== "RESOURCES") {
              setActive("RESOURCES");
              variables.type = "RESOURCE";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          color={theme.palette.primary.main}
          className={`${active === "RESOURCES" && "Active"}`}
        >
          <SquaresFourIcon
            width={17}
            height={17}
            color={(active === "RESOURCES" && "#FFFFFF") || "black"}
          />
          <FormattedMessage id="resources" />
        </HeaderTag>
        <HeaderTag
          onClick={() => {
            const variables = {
              size: 5,
              q: filter || "",
              type: "",
            };

            if (active !== "ENTITLEMENTS") {
              setActive("ENTITLEMENTS");
              variables.type = "ENTITLEMENT";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          color={theme.palette.primary.main}
          className={`${active === "ENTITLEMENTS" && "Active"}`}
        >
          <CheckCircleIcon
            width={17}
            height={17}
            color={(active === "ENTITLEMENTS" && "#FFFFFF") || "black"}
          />
          <FormattedMessage id="entitlements" />
        </HeaderTag>
        <HeaderTag
          onClick={() => {
            const variables = {
              size: 5,
              q: filter || "",
              type: "",
            };

            if (active !== "ROLES") {
              setActive("ROLES");
              variables.type = "ROLE";
            } else {
              setActive("");
            }

            refetch(variables);
          }}          
          color={theme.palette.primary.main}
          className={`${active === "ROLES" && "Active"}`}
        >
          <PeopleIcon
            width={17}
            height={17}
            color={(active === "ROLES" && "#FFFFFF") || "black"}
          />
          <FormattedMessage id="roles" />
        </HeaderTag>     
        <HeaderTag
          onClick={() => {
            const variables = {
              size: 5,
              q: filter || "",
              type: "",
            };

            if (active !== "USERS") {
              setActive("USERS");
              variables.type = "USER";
            } else {
              setActive("");
            }

            refetch(variables);
          }}          
          color={theme.palette.primary.main}
          className={`${active === "USERS" && "Active"}`}
        >
          <UserIcon
            width={17}
            height={17}
            color={(active === "USERS" && "#FFFFFF") || "black"}
          />
          <FormattedMessage id="users" />
        </HeaderTag>         
        <HeaderTag
          onClick={() => {
            const variables = {
              size: 5,
              q: filter || "",
              type: "",
            };
            if (active !== "ADMIN_PASSWORD") {
              setActive("ADMIN_PASSWORD");
              variables.type = "ADMIN_PASSWORD";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          color={theme.palette.primary.main}
          className={`${active === "ADMIN_PASSWORD" && "Active"}`}
        >
          <SecurityUserIcon
            width={17}
            height={17}
            color={(active === "ADMIN_PASSWORD" && "#FFFFFF") || "black"}
          />
          <FormattedMessage id="adminAccounts" />
        </HeaderTag>        
      </HeaderTags>
      {!!list.length && (<HeaderResults>
        <FormattedMessage id="results" />
      </HeaderResults>)}
      {!list.length && (
        <EmptyState image={EmptyStateTypeahead} title="no.result" text="search.no.result" height={150} bgColor="transparent"/>
      )}
      {children}
      {filter && (
      <FooterSeeAll onClick={(e: any) => {
        e.stopPropagation();
        goToSearch();
      }}>
        <span>
          <FormattedMessage id="viewAll.results.for" />
          {` "${filter}"`}          
        </span>
        <CaretRightIcon width={21} />
      </FooterSeeAll>)}
    </Autocomplete>
  );
};
