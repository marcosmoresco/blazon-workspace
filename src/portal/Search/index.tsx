import React, { FC, useState } from "react";
import { useRouter } from "next/router"
import { withStyles } from "@material-ui/core/styles";
import { useQuery } from "@apollo/client";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Section from "@components/Section";
import Tutorial from "@components/Tutorial";
import TableIcon from "@icons/Table";
import PuzzlePieceIcon from "@icons/PuzzlePiece";
import ArticleIcon from "@icons/Article";
import UserGearIcon from "@icons/UserGear";
import NewspaperClippingIcon from "@icons/NewspaperClipping";
import ShoppingCartSimpleIcon from "@icons/ShoppingCartSimple";
import Filters from "./components/Filters";
import type { SearchProps, SelfService } from "./types";
import useStyles from "./styles";
import { GET_SELF_SERVICE } from "./queries";

const Search: FC<SearchProps> = ({ classes }) => {
  
  const router = useRouter();
  const [active, setActive] = useState('ALL');

  /*let q = "";
  if(document) {
    const inputSearch = document.querySelector("#header-search");
    q = inputSearch?.nodeValue || "";   
  }*/

  const { loading, error, data } = useQuery<{
    getSelfService: SelfService[];
  }>(GET_SELF_SERVICE, {
    variables: {      
    },
  });

  const list = data?.getSelfService || [];

  const save = (filtered: {[key: string]: any}) => {
    console.log(filtered);
  };

  const iconByType: {[key: string]: any} = {
    "RESOURCE": <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
    "ENTITLEMENT": <ArticleIcon width={24} height={24} color="#3174F6" />,
    "ROLE": <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    "ADMIN_ACCOUNT": <UserGearIcon width={24} height={24} color="#3174F6" />,
  };

  const sections = [{
    icon: <TableIcon />,
    name: "all",
    value: "ALL"
  }, {
    icon: <PuzzlePieceIcon />,
    name: "resources",
    value: "RESOURCE"
  }, {
    icon: <ArticleIcon />,
    name: "entitlements",
    value: "ENTITLEMENT"
  }, {
    icon: <UserGearIcon />,
    name: "adminAccounts",
    value: "ADMIN_ACCOUNT"
  }, {
    icon: <NewspaperClippingIcon />,
    name: "roles",
    value: "ROLE"
  }];

  return (
    <div className="Default-content">
      <Tutorial title="search.tutorial.title" text="search.tutorial.text" />
      <div className={classes.root}>
        <div className={classes.searchtext}>VPN SS</div>
        <div className={classes.totalItens}>10 Itens</div>
        <Filters onSave={save}/>
        <Divider />
        <Section list={sections} defaultValue="ALL" onSelect={(section) => setActive(section.value)}/>        
        <div className={classes.searchCards}>
          <Grid container spacing={3}>
            {list
            .filter((item) => active === 'ALL' || item.type === active )
            .map((item, index) => (
              <Grid item xs={3} key={`search-card-item-${index}`}>
                <div className={classes.searchCard} onClick={() => router.push("/search/detail")}>
                  <div className={classes.searchCardContent}>
                    <div className={classes.searchCardContentHeader}>
                      <div className={classes.searchCardContentHeaderImage}>
                        {iconByType[item.type]}
                      </div>                      
                    </div>
                    <div className={classes.searchCardContentHeaderTitle}>
                      {item.name}
                    </div>
                    <Divider />
                    <div className={classes.searchCartContent}>
                      <ShoppingCartSimpleIcon width={25} height={25} />
                      Add cart
                    </div>
                  </div>
                </div>
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default withStyles(useStyles)(Search);
