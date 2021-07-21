import { useState } from "react";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import CaretRightIcon from "@icons/CaretRight";

export const BoxAutocomplete = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const BoxAutocompleteContent = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const BoxAutocompleteContentInfo = styled.div`
  margin-left: 15px;
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
    background: rgba(90, 151, 250, 0.2);
    color: #006ac6;
  }
`;

const FooterSeeAll = styled.div`
  margin: 20px 10px 25px 20px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  color: #777779;
  letter-spacing: 0.0015em;
`;

export const Autocomplete = styled(Paper)({
  backgroundColor: "#FFFFFF !important",
  border: "1px solid #BEBECB",
  boxSizing: "border-box",
  boxShadow: "0px 24px 71px 5px rgb(0 0 0 / 25%)",
  borderRadius: 8,
  marginTop: 15,
});

export const AutocompletePaper = ({
  children,
  refetch,
  filter,
  open,
  setOpen,
  setFilter,
}: {
  children: any;
  refetch: any;
  filter: any;
  open: boolean;
  setOpen: any;
  setFilter: any;
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

            if (active !== "ROLES") {
              setActive("ROLES");
              variables.type = "ROLE";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          className={`${active === "ROLES" && "Active"}`}
        >
          <NewspaperClippingIcon
            width={17}
            height={17}
            color={(active === "ROLES" && "#006AC6") || "black"}
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

            if (active !== "ENTITLEMENTS") {
              setActive("ENTITLEMENTS");
              variables.type = "ENTITLEMENT";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          className={`${active === "ENTITLEMENTS" && "Active"}`}
        >
          <ArticleIcon
            width={17}
            height={17}
            color={(active === "ENTITLEMENTS" && "#006AC6") || "black"}
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
            if (active !== "ADMIN_PASSWORD") {
              setActive("ADMIN_PASSWORD");
              variables.type = "ADMIN_PASSWORD";
            } else {
              setActive("");
            }

            refetch(variables);
          }}
          className={`${active === "ADMIN_PASSWORD" && "Active"}`}
        >
          <UserGearIcon
            width={17}
            height={17}
            color={(active === "ADMIN_PASSWORD" && "#006AC6") || "black"}
          />
          <FormattedMessage id="adminAccounts" />
        </HeaderTag>
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
          className={`${active === "RESOURCES" && "Active"}`}
        >
          <PuzzlePieceIcon
            width={17}
            height={17}
            color={(active === "RESOURCES" && "#006AC6") || "black"}
          />
          <FormattedMessage id="resources" />
        </HeaderTag>
      </HeaderTags>
      <HeaderResults>
        <FormattedMessage id="results" />
      </HeaderResults>
      {children}
      {filter && (
      <FooterSeeAll>
        <span>
          <FormattedMessage id="viewAll.results.for" />
          {` "${filter}"`}          
        </span>
        <CaretRightIcon width={21} />
      </FooterSeeAll>)}
    </Autocomplete>
  );
};
