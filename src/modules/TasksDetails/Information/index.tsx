// vendors
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

// components
import CaretUp from "@icons/CaretUp";
import CaretDown from "@icons/CaretDown";
import LeafIcon from "@icons/Leaf";
import ListPlusIcon from "@icons/ListPlus";
import IntersectIcon from "@icons/Intersect";
import HardDriveIcon from "@icons/HardDrive";

// styles
import {
  Box,
  RetractBoxCard,
  RetractBoxOptions,
  BoxOptionsIcon,
  RetractBoxTitle,
  ExpandBoxCard,
  ExpandBoxTitle,
  ExpandBoxOptions,
  ExpandBoxOptionsIcon,
  ExpandCard,
  ExpandCardTitle,
  BoxObservation,
  TitleField,
  DataField,
  FieldCard,
  BoxField,
  FieldItem,
} from "./style";

const Information: React.FC = () => {
  const [expand, setExpand] = useState("0");
  return (
    <>
      <Box>
        {expand === "0" ? (
          <RetractBoxCard>
            <RetractBoxOptions>
              <BoxOptionsIcon onClick={() => setExpand("1")}>
                <LeafIcon />
              </BoxOptionsIcon>
              <BoxOptionsIcon onClick={() => setExpand("2")}>
                <ListPlusIcon />
              </BoxOptionsIcon>
              <BoxOptionsIcon onClick={() => setExpand("3")}>
                <IntersectIcon />
              </BoxOptionsIcon>
              <BoxOptionsIcon onClick={() => setExpand("4")}>
                <HardDriveIcon />
              </BoxOptionsIcon>
            </RetractBoxOptions>
            <RetractBoxTitle>
              <FormattedMessage id="tasks.AdditionalInformation" />
              <div onClick={() => setExpand("1")}>
                <CaretDown width={24} height={24} />
              </div>
            </RetractBoxTitle>
          </RetractBoxCard>
        ) : expand === "1" ? (
          <ExpandBoxCard>
            <ExpandBoxTitle>
              <FormattedMessage id="tasks.AdditionalInformation" />
              <a onClick={() => setExpand("0")}>
                <CaretUp width={24} height={24} />
              </a>
            </ExpandBoxTitle>
            <ExpandBoxOptions>
              <ExpandBoxOptionsIcon onClick={() => setExpand("4")}>
                <HardDriveIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("2")}>
                <ListPlusIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("3")}>
                <IntersectIcon /> membership role
              </ExpandBoxOptionsIcon>
            </ExpandBoxOptions>
            <ExpandCard>
              <ExpandCardTitle>
                <LeafIcon />
                <FormattedMessage id="tasks.AccesClassification" />
              </ExpandCardTitle>
              <TitleField>
                <FormattedMessage id="tasks.observations" />
              </TitleField>
              <BoxObservation>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                interdum turpis accumsan nibh condimentum. Vestibulum in sapien
                metus nunc, nunc facilisi odio.
              </BoxObservation>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.DataLevels" />
                  <FieldCard>
                    <FieldItem>Restricted</FieldItem>
                  </FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.LegalBases" />
                  <FieldCard>
                    <FieldItem>Default Legalbase</FieldItem>
                  </FieldCard>
                </DataField>
              </BoxField>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.ConfidentialityLevel" />*
                  <FieldCard>Low</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.IntegrityLevel" />*
                  <FieldCard>Hight</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.AvailabilityLevel" />*
                  <FieldCard>Medium</FieldCard>
                </DataField>
              </BoxField>
            </ExpandCard>
          </ExpandBoxCard>
        ) : expand === "2" ? (
          <ExpandBoxCard>
            <ExpandBoxTitle>
              <FormattedMessage id="tasks.AdditionalInformation" />
              <a onClick={() => setExpand("0")}>
                <CaretUp width={24} height={24} />
              </a>
            </ExpandBoxTitle>
            <ExpandBoxOptions>
              <ExpandBoxOptionsIcon onClick={() => setExpand("1")}>
                <LeafIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("4")}>
                <HardDriveIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("3")}>
                <IntersectIcon /> membership role
              </ExpandBoxOptionsIcon>
            </ExpandBoxOptions>
            <ExpandCard>
              <ExpandCardTitle>
                <ListPlusIcon />
                <FormattedMessage id="tasks.AccesClassification" />
              </ExpandCardTitle>
              <TitleField>
                <FormattedMessage id="tasks.observations" />
              </TitleField>
              <BoxObservation>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                interdum turpis accumsan nibh condimentum. Vestibulum in sapien
                metus nunc, nunc facilisi odio.
              </BoxObservation>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.DataLevels" />
                  <FieldCard>
                    <FieldItem>Restricted</FieldItem>
                  </FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.LegalBases" />
                  <FieldCard>
                    <FieldItem>Default Legalbase</FieldItem>
                  </FieldCard>
                </DataField>
              </BoxField>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.ConfidentialityLevel" />*
                  <FieldCard>Low</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.IntegrityLevel" />*
                  <FieldCard>Hight</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.AvailabilityLevel" />*
                  <FieldCard>Medium</FieldCard>
                </DataField>
              </BoxField>
            </ExpandCard>
          </ExpandBoxCard>
        ) : expand === "3" ? (
          <ExpandBoxCard>
            <ExpandBoxTitle>
              <FormattedMessage id="tasks.AdditionalInformation" />
              <a onClick={() => setExpand("0")}>
                <CaretUp width={24} height={24} />
              </a>
            </ExpandBoxTitle>
            <ExpandBoxOptions>
              <ExpandBoxOptionsIcon onClick={() => setExpand("1")}>
                <LeafIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("2")}>
                <ListPlusIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("4")}>
                <HardDriveIcon /> membership role
              </ExpandBoxOptionsIcon>
            </ExpandBoxOptions>
            <ExpandCard>
              <ExpandCardTitle>
                <IntersectIcon />
                <FormattedMessage id="tasks.AccesClassification" />
              </ExpandCardTitle>
              <TitleField>
                <FormattedMessage id="tasks.observations" />
              </TitleField>
              <BoxObservation>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                interdum turpis accumsan nibh condimentum. Vestibulum in sapien
                metus nunc, nunc facilisi odio.
              </BoxObservation>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.DataLevels" />
                  <FieldCard>
                    <FieldItem>Restricted</FieldItem>
                  </FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.LegalBases" />
                  <FieldCard>
                    <FieldItem>Default Legalbase</FieldItem>
                  </FieldCard>
                </DataField>
              </BoxField>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.ConfidentialityLevel" />*
                  <FieldCard>Low</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.IntegrityLevel" />*
                  <FieldCard>Hight</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.AvailabilityLevel" />*
                  <FieldCard>Medium</FieldCard>
                </DataField>
              </BoxField>
            </ExpandCard>
          </ExpandBoxCard>
        ) : (
          <ExpandBoxCard>
            <ExpandBoxTitle>
              <FormattedMessage id="tasks.AdditionalInformation" />
              <a onClick={() => setExpand("0")}>
                <CaretUp width={24} height={24} />
              </a>
            </ExpandBoxTitle>
            <ExpandBoxOptions>
              <ExpandBoxOptionsIcon onClick={() => setExpand("1")}>
                <LeafIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("2")}>
                <ListPlusIcon /> membership role
              </ExpandBoxOptionsIcon>
              <ExpandBoxOptionsIcon onClick={() => setExpand("3")}>
                <IntersectIcon /> membership role
              </ExpandBoxOptionsIcon>
            </ExpandBoxOptions>
            <ExpandCard>
              <ExpandCardTitle>
                <HardDriveIcon />
                <FormattedMessage id="tasks.AccesClassification" />
              </ExpandCardTitle>
              <TitleField>
                <FormattedMessage id="tasks.observations" />
              </TitleField>
              <BoxObservation>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet
                interdum turpis accumsan nibh condimentum. Vestibulum in sapien
                metus nunc, nunc facilisi odio.
              </BoxObservation>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.DataLevels" />
                  <FieldCard>
                    <FieldItem>Restricted</FieldItem>
                  </FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.LegalBases" />
                  <FieldCard>
                    <FieldItem>Default Legalbase</FieldItem>
                  </FieldCard>
                </DataField>
              </BoxField>
              <BoxField>
                <DataField>
                  <FormattedMessage id="tasks.ConfidentialityLevel" />*
                  <FieldCard>Low</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.IntegrityLevel" />*
                  <FieldCard>Hight</FieldCard>
                </DataField>
                <DataField>
                  <FormattedMessage id="tasks.AvailabilityLevel" />*
                  <FieldCard>Medium</FieldCard>
                </DataField>
              </BoxField>
            </ExpandCard>
          </ExpandBoxCard>
        )}
      </Box>
    </>
  );
};

export default Information;
