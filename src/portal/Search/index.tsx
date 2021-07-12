import React, { FC, useState } from "react";
import { useRouter } from "next/router"
import { withStyles } from "@material-ui/core/styles";
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
import type { SearchProps } from "./types";
import useStyles from "./styles";

const Search: FC<SearchProps> = ({ classes }) => {
  
  const router = useRouter();
  const [active, setActive] = useState('ALL');

  const list = [
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
      type: 'RESOURCE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
      type: 'RESOURCE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
      type: 'RESOURCE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
      type: 'RESOURCE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
      type: 'ENTITLEMENT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
      type: 'ENTITLEMENT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
      type: 'ENTITLEMENT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
      type: 'ADMIN_ACCOUNT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
      type: 'ADMIN_ACCOUNT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
      type: 'ADMIN_ACCOUNT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
      type: 'ADMIN_ACCOUNT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
      type: 'ADMIN_ACCOUNT',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
      type: 'ROLE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
      type: 'ROLE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
      type: 'ROLE',
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
      type: 'ROLE',
    },    
  ];

  const save = (filtered: {[key: string]: any}) => {
    console.log(filtered);
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
                        {item.icon}
                      </div>
                      <div>
                        <div className={classes.searchCardContentHeaderTitle}>
                          {item.title}
                        </div>
                      </div>
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
