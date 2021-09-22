import React, { FC, useState, useEffect, useMemo } from "react";
import { withStyles, Theme } from "@material-ui/core/styles";
import { injectIntl } from "react-intl";
import type { SectionProps, SectionType } from "./types";
import { useStyles, Box } from "./styles";
import { useTheme, themes } from "@theme/index";

const Section: FC<SectionProps> = ({ classes, list, defaultValue, onSelect, intl }) => {
  const [active, setActive] = useState(defaultValue || "");
  const [sections, setSections] = useState<SectionType[]>([]);
  const { theme } = useTheme();
  const currentTheme = useMemo(() => {
    return { ...themes[theme] }
  }, [theme]);

  useEffect(() => {
    if (!sections.length) {
      const newSections: SectionType[] = [];
      list.map((section) => {
        if(section.icon) {
          newSections.push({
            ...section,
            icon: {
              ...section.icon,
              props: { ...section.icon.props, with: 21, height: 21, color: section?.value === active ? "#FFFFFF" : "#000000", stroke: 1.5},
            },
          })
        } else {
          newSections.push({
            ...section,
          })
        }      
      });
      setSections(newSections);
    }
  }, [list, sections, active, currentTheme]);

  const onClick = (section: SectionType): void => {
    setActive(section.value);
    setSections([]);
    if (onSelect) {
      onSelect(section);
    }
  };

  return (
    <Box>
      {sections.map((section: SectionType, index: number) => (
        <div
          key={`section-${index}`}
          onClick={() => onClick(section)}
          className={`${classes.tag} ${
            (active === section.value && "Active") || ""
          }`}
        >
          {section.icon && section.icon}{" "}
          {intl.formatMessage({ id: section.name })}
        </div>
      ))}
    </Box>
  );
};

export default withStyles(useStyles)(injectIntl(Section));
