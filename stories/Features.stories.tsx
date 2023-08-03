import React, { useState, useRef, useCallback } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Sheet, Op, Cell, Selection } from "@fortune-sheet/core";
import { Workbook, WorkbookInstance } from "@fortune-sheet/react";
import cell from "./data/cell";
import formula from "./data/formula";
import empty from "./data/empty";
import freeze from "./data/freeze";
import dataVerification from "./data/dataVerification";
import lockcellData from "./data/protected";

export default {
  component: Workbook,
} as ComponentMeta<typeof Workbook>;

const Template: ComponentStory<typeof Workbook> = ({
  // eslint-disable-next-line react/prop-types
  data: data0,
  ...args
}) => {
  let selectedCells:Selection;
  const workbookRef = useRef<WorkbookInstance>(null);
  const [data, setData] = useState<Sheet[]>(data0);
  const onChange = useCallback((d: Sheet[]) => {
    setData(d);
  }, []);
  const onOp = useCallback((d: Op[]) => {
    //console.log(d)
  }, []);
  const beforeSheetIndexChange = useCallback((sheet: Sheet) => {
    console.log(sheet)
    return;
  }, []);
  const afterCellMouseDown = useCallback((cell: Cell | null, cellInfo:Object) => {
    console.log("afterCellMouseDown", cell, cellInfo)
    return;
  }, []);
  const afterSelectionChange = useCallback((sheetId: string, selection: Selection) => {
    //console.log("afterSelectionChange", sheetId, selection);
    selectedCells = selection; 
    //workbookRef.current?.setCellValue(selection.row[0], selection.column[0], `${selection.row[0]}-${selection.column[0]}-`);
    return;
    },[]);
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Workbook 
        ref={workbookRef}
        {...args} 
        data={data} onChange={onChange} onOp={onOp} 
        hooks={{
          beforeSheetIndexChange, 
          //afterCellMouseDown, 
          afterSelectionChange,
        }}
      />
    </div>
  );
};

export const Basic = Template.bind({});
// @ts-ignore
Basic.args = { data: [cell] };

export const Formula = Template.bind({});
// @ts-ignore
Formula.args = { data: [formula] };

export const Empty = Template.bind({});
Empty.args = { data: [empty] };

export const Tabs = Template.bind({});
// @ts-ignore
Tabs.args = { data: [cell, formula] };

export const Freeze = Template.bind({});
// @ts-ignore
Freeze.args = { data: [freeze] };

export const DataVerification = Template.bind({});
// @ts-ignore
DataVerification.args = { data: [dataVerification] };

export const ProtectedSheet = Template.bind({});
// @ts-ignore
ProtectedSheet.args = {
  data: lockcellData,
};

export const MultiInstance: ComponentStory<typeof Workbook> = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          border: "1px solid ",
          width: "50%",
          height: "100%",
          paddingRight: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[empty]} />
      </div>
      <div
        style={{
          display: "inline-block",
          width: "50%",
          height: "100%",
          paddingLeft: "12px",
          boxSizing: "border-box",
        }}
      >
        <Workbook data={[empty]} />
      </div>
    </div>
  );
};
