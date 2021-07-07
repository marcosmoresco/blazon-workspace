import React, { FC, useState } from "react";
import { useRouter } from "next/router"
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
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
  const [open, setOpen] = useState(false);

  const list = [
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <PuzzlePieceIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <ArticleIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <UserGearIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <NewspaperClippingIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
    {
      title: "Acessos CSC Algar - Firewall_dropbox_liberado",
      icon: <TableIcon width={24} height={24} color="#3174F6" />,
    },
  ];

  return (
    <div className="Default-content">
      <Tutorial title="search.tutorial.title" text="search.tutorial.text" />
      <div className={classes.root}>
        <div className={classes.searchtext}>VPN SS</div>
        <div className={classes.totalItens}>10 Itens</div>
        <Filters />
        <Divider />
        <div className={classes.tags}>
          <div className={`${classes.tag} Active`}>
            <TableIcon width={25} height={25} color="#0E46D7" /> Todos
          </div>
          <div className={classes.tag}>
            <PuzzlePieceIcon width={25} height={25} color="#7D7A8C" /> Resources
          </div>
          <div className={classes.tag}>
            <ArticleIcon width={25} height={25} color="#7D7A8C" /> Entitlements
          </div>
          <div className={classes.tag}>
            <UserGearIcon width={25} height={25} color="#7D7A8C" /> Admin
            accounts
          </div>
          <div className={classes.tag}>
            <NewspaperClippingIcon width={25} height={25} color="#7D7A8C" />{" "}
            Roles
          </div>
        </div>
        <div className={classes.searchCards}>
          <Grid container spacing={3}>
            {list.map((item, index) => (
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
