import React, { FunctionComponent } from "react";
import { Header } from "../Layout/Header";
import { TemplateTabs } from "./TemplateTabs";
import { color } from "../../common/styles";

export interface DocumentRendererHeader extends TemplateTabs {
  goBack?: () => void;
}

export const DocumentRendererHeader: FunctionComponent<DocumentRendererHeader> = ({
  goBack,
  tabs,
  tabSelect,
  activeTabId
}) => {
  return (
    <Header goBack={goBack} style={{ backgroundColor: color("grey", 5) }}>
      <TemplateTabs
        tabs={tabs}
        tabSelect={tabSelect}
        activeTabId={activeTabId}
      />
    </Header>
  );
};
