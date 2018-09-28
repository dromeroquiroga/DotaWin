import React from "react";
import { DropdownItem } from "reactstrap";

export function mapTemplates(template) {
  return (
    <DropdownItem value={template.templateId}>
      {template.templateName}
    </DropdownItem>
  );
}
