import React from "react";
import { injectIntl, FormattedMessage, IntlShape } from "react-intl";
import { TitleProps, TitleHierarchy } from "./types";
import ArrowLeft from "@icons/ArrowLeft";
import CaretRightIcon from "@icons/CaretRight";
import HouseSimpleIcon from "@icons/HouseSimple";
import Link from "@components/BreadcrumbLink";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { TitleBox, TitleText, SubTitleBox, SubTitleText, Line, Header, HeaderTitle, Box, BackBox } from "./styles";

const getHierarchyRecursive = (intl: IntlShape, hierarchy: TitleHierarchy, components: React.ReactNode[]) => {

  if(!components) {
    components = [];
  }

  if(!hierarchy) {
    return [];
  }

  if(hierarchy?.href) {
    components.push(
      <Link color="primary" href={hierarchy?.href}>
        {intl.formatMessage({ id: hierarchy?.name })}
      </Link>
    )
  } else {
    components.push(
      <Typography>
        {(hierarchy?.formatedName && hierarchy?.formatedName) || intl.formatMessage({ id: hierarchy?.name })}
      </Typography>
    )
  }

  if(hierarchy?.children?.length) {
    hierarchy?.children.forEach((child) => getHierarchyRecursive(intl, child, components));
  }
}

const getHierarchy = (intl: IntlShape, hierarchy: TitleHierarchy | undefined): React.ReactNode[]  => {  
  
  const components: React.ReactNode[] = [];
  if(hierarchy) {
    getHierarchyRecursive(intl, hierarchy, components);
  }  
  return components;
}

const TitlePage: React.FC<TitleProps> = ({
  title,
  subTitle,
  intl,
  onBack,
  hierarchy,
}) => {
 
  return (
    <>
      <Box>
        <Header>
          <Breadcrumbs separator={<CaretRightIcon width={18} height={18} stroke={2}/>} aria-label="breadcrumb">
            <Link color="primary" href="/">
              <HouseSimpleIcon width={23} height={23} color="#3174F6"/>
              <FormattedMessage id="home" />
            </Link> 
            {getHierarchy(intl, hierarchy).map((h: React.ReactNode, index: number) => <div key={`title-page-${index}`}>{h}</div>)}                               
          </Breadcrumbs>
          <HeaderTitle>
            {onBack && (
              <BackBox onClick={onBack}>
                <ArrowLeft />
              </BackBox>
            )}
            <TitleBox>           
              <TitleText>{intl.formatMessage({ id: title })}</TitleText>
            </TitleBox>
          </HeaderTitle>                    
        </Header>
        {subTitle && (
          <SubTitleBox>
            <SubTitleText>{intl.formatMessage({ id: subTitle })}</SubTitleText>
          </SubTitleBox>
        )}
      </Box>
      <Line />
    </>
  );
};

export default injectIntl(TitlePage);
