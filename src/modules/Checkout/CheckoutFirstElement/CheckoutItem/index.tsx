// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useRouter } from "next/router";

// components
import ArticleIcon from "@icons/Article";
import Button from "@components/Button";
import Select from "@components/Select";
import UserCard from "./UserCard";

// types
import { ItemProps } from "./type";

// styles
import {
  Grid,
  CheckoutStyle,
  Item,
  ItemStyle,
  CheckBox,
  Line,
  TitleItem,
  Ticket,
  AcessRequest,
  AddAUser,
  Input,
  BottomArea,
  PageInfoStyle,
} from "./styles";

const CheckoutItem: React.FC<ItemProps> = ({ nextStep }) => {
  const router = useRouter();
  const types = ["Only me", "Me and someone else", "Another person"];
  const [sel, setSel] = useState("Only me");
  const [user, setUser] = useState("");

  return (
    <>
      <PageInfoStyle>
        <div>
          <CheckBox type="checkbox" id="PageUp" />
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.SelectedItems" />
          </span>
        </div>
        <Button variant="contained" color="primary" onClick={nextStep}>
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
      <Grid>
        <CheckoutStyle>
          <Item>
            <ItemStyle>
              <div>
                <CheckBox />
                <span>VPN SS</span>
              </div>
              <TitleItem>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est
                etiam dignissim gravida semper non enim, lectus massa.
              </TitleItem>
            </ItemStyle>
            <Ticket>
              <ArticleIcon />
              <span>
                <FormattedMessage id="checkout.entitlement" />
              </span>
            </Ticket>
          </Item>

          <Line />

          <AcessRequest>
            <span>
              <FormattedMessage id="checkout.AccessRequest" />
            </span>
            <Select
              onChange={(e: any) => setSel(e.target.value)}
              options={types}
              value={sel}
            />
            {sel === "Only me" ? (
              <></>
            ) : sel === "Somente eu" ? (
              <></>
            ) : (
              <>
                <AddAUser>
                  <span>
                    <FormattedMessage id="checkout.AddAUser" />
                  </span>
                  <Input onChange={(e) => setUser(e.target.value)}></Input>
                </AddAUser>
              </>
            )}
          </AcessRequest>

          <UserCard />
          {user === "" ? (
            <></>
          ) : (
            <>
              <UserCard />
            </>
          )}

          <Line />

          <BottomArea>
            <Button
              variant="contained"
              color="default-primary"
              onClick={() => router.push("/checkout-empty")}
            >
              <FormattedMessage id="checkout.DeleteItem" />
            </Button>
          </BottomArea>
        </CheckoutStyle>
      </Grid>
      <Line />
      <PageInfoStyle>
        <div>
          <CheckBox type="checkbox" id="PageUp" />
          <span>
            {`${""}`}
            <FormattedMessage id="checkout.SelectedItems" />
          </span>
        </div>
        <Button variant="contained" color="primary" onClick={nextStep}>
          <FormattedMessage id="checkout.continue" />
        </Button>
      </PageInfoStyle>
    </>
  );
};

export default CheckoutItem;
