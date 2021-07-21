import React, { FC, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { withStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import { injectIntl } from "react-intl";
import apolloClient from "@utils/apollo-client";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import Grid from "@material-ui/core/Grid";
import Button from "@components/Button";
import Section from "@components/Section";
import Tooltip from "@components/Tooltip";
import TableIcon from "@icons/Table";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import ShoppingCartIcon from "@icons/ShoppingCart";
import SearchIcon from "@icons/Search";
import SquaresFourIcon from "@icons/SquaresFour";
import ListBulletsIcon from "@icons/ListBullets";
import Filters from "./components/Filters";
import { paginate } from "@utils/index";
import type { SearchProps, SelfService } from "./types";
import {
  useStyles,
  DividerSearch,
  OptionListFiltersContent,
  OptionListContent,
  OptionList,
  InputSearchBox,
  OutlinedInputSearch,
  TotalFiltersBox,
  ListItemBox,
  ListItemContent,
  ListItemIconContent,
  ListItemText,
  LoadMoreContent
} from "./styles";
import { GET_SELF_SERVICE, GET_SELF_SERVICE_ADVANCED } from "./queries";

const Search: FC<SearchProps> = ({ intl, classes }) => {
  const router = useRouter();
  const [active, setActive] = useState("ALL");
  const [filter, setFilter] = useState(router.query.q || "");
  const [filtered, setFiltered] = useState("[]");
  const [type, setType] = useState("LIST");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(10);
  const [filteredTotal, setTotalFiltered] = useState(0);
  const [listAdvanced, setListAdvanced] = useState(null);

  const { loading, error, data, refetch } = useQuery<{
    getSelfService: SelfService[];
  }>(GET_SELF_SERVICE, {
    variables: {
      q: router.query.q || "",
    },
  });

  const list = data?.getSelfService || [];

  const save = (filteredMapReference: any, total: number) => {
    setTotalFiltered(total);
    const _filters: any[] = [];
    Object.keys(filteredMapReference).forEach((f: any) => {
      _filters.push(filteredMapReference[f]);
    });

    apolloClient
      .query({
        query: GET_SELF_SERVICE_ADVANCED,
        variables: {
          q: filter,
          type: active,
          filters: JSON.stringify(_filters),
        },
      })
      .then(({ data }) => {
        setFiltered(JSON.stringify(_filters));
        setListAdvanced(data?.getSelfServiceAdvanced);
      });
  };

  const iconByType: { [key: string]: any } = {
    RESOURCE: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
    ENTITLEMENT: <ArticleIcon width={24} height={24} color="#3174F6" />,
    ROLE: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    ADMIN_ACCOUNT: <UserGearIcon width={24} height={24} color="#3174F6" />,
  };

  const sections = [
    {
      icon: <TableIcon />,
      name: "all",
      value: "ALL",
    },
    {
      icon: <PuzzlePieceIcon />,
      name: "resources",
      value: "RESOURCE",
    },
    {
      icon: <ArticleIcon />,
      name: "entitlements",
      value: "ENTITLEMENT",
    },
    {
      icon: <UserGearIcon />,
      name: "adminAccounts",
      value: "ADMIN_ACCOUNT",
    },
    {
      icon: <NewspaperClippingIcon />,
      name: "roles",
      value: "ROLE",
    },
  ];

  return (
    <div className="Default-content">
      <div className={classes.root}>
        <InputSearchBox>
          <OutlinedInputSearch
            value={filter}
            onChange={(e: any) => {
              setFilter(e?.target?.value);
              setPage(0);
              setTotal(10);
              apolloClient
                .query({
                  query: GET_SELF_SERVICE_ADVANCED,
                  variables: {
                    q: e?.target?.value || "",
                    type: active,
                    filters: filtered,
                  },
                })
                .then(({ data }) => {
                  setListAdvanced(data?.getSelfServiceAdvanced);
                });
            }}
            placeholder={intl.formatMessage({
              id: "search",
            })}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={0}
          />
        </InputSearchBox>
        <Section
          list={sections}
          defaultValue="ALL"
          onSelect={(section) => {
            setActive(section.value);
            setPage(0);
            setTotal(10);
            apolloClient
              .query({
                query: GET_SELF_SERVICE_ADVANCED,
                variables: {
                  q: filter,
                  type: section.value,
                  filters: filtered,
                },
              })
              .then(({ data }) => {
                setListAdvanced(data?.getSelfServiceAdvanced);
              });
          }}
        />
        <DividerSearch />
        <TotalFiltersBox>
          <div className={classes.totalItens}>
            {(listAdvanced || list)?.length || 0} Itens found
          </div>
          <OptionListFiltersContent>
            <OptionListContent>
              <OptionList
                onClick={() => setType("GRID")}
                className={`${(type === "GRID" && "Active") || ""}`}
              >
                <SquaresFourIcon width={21} />
              </OptionList>
              <OptionList
                onClick={() => setType("LIST")}
                className={`${(type === "LIST" && "Active") || ""}`}
              >
                <ListBulletsIcon width={21} />
              </OptionList>
            </OptionListContent>
            <Badge
              badgeContent={filteredTotal}
              color="primary"
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Filters onSave={save} activeType={active} />
            </Badge>
          </OptionListFiltersContent>
        </TotalFiltersBox>
        {type === "GRID" && (
          <div>
            <Grid container spacing={3}>
              {(listAdvanced || list).map((item, index) => (
                <Grid item xs={3} key={`search-card-item-${index}`}>
                  <div
                    className={classes.searchCard}
                    onClick={() =>
                      router.push(
                        `/search/${item.type
                          .replaceAll("_", "")
                          .toLocaleLowerCase()}/${
                          item.referenceTo.referenceToIdentifier
                        }`
                      )
                    }
                  >
                    <div className={classes.searchCardContent}>
                      <div className={classes.searchCardContentHeader}>
                        <div className={classes.searchCardContentHeaderImage}>
                          {iconByType[item.type]}
                        </div>
                      </div>
                      <Tooltip title={item.name} placement="bottom">
                        <div className={classes.searchCardContentHeaderTitle}>
                          {item.name}
                        </div>
                      </Tooltip>
                      <Divider />
                      <div className={classes.searchCartContent}>
                        <div>
                          <div className="Icon-content">
                            <ShoppingCartIcon width={25} height={25} />
                          </div>
                          Add cart
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        )}
        {type === "LIST" && (
          <>
            {paginate(listAdvanced || list, total, 0)
              .filter((item) => active === "ALL" || item.type === active)
              .map((item, index) => (
                <ListItemBox
                  onClick={() =>
                    router.push(
                      `/search/${item.type
                        .replaceAll("_", "")
                        .toLocaleLowerCase()}/${
                        item.referenceTo.referenceToIdentifier
                      }`
                    )
                  }
                  key={`search-list-item-${index}`}
                >
                  <ListItemContent>
                    <ListItemIconContent>
                      {iconByType[item.type]}
                    </ListItemIconContent>
                    <Tooltip title={item.name} placement="bottom">
                      <ListItemText>{item.name}</ListItemText>
                    </Tooltip>
                  </ListItemContent>
                  <ListItemIconContent className="Selectable">
                    <ShoppingCartIcon width={21} />
                  </ListItemIconContent>
                </ListItemBox>
              ))}
          </>
        )}
        {paginate(listAdvanced || list, 10, page + 1).length > 0 && (
          <LoadMoreContent>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setPage(page + 1);
                setTotal(total + 10);
              }}
            >
              Load more
            </Button>
          </LoadMoreContent>
        )}
      </div>
    </div>
  );
};

export default withStyles(useStyles)(injectIntl(Search));
