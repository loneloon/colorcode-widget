import React, { ReactElement, useCallback, useEffect, useState } from "react";
import style from "./PasswordWidget.less";
import { Palette } from "./Palette/Palette";
import { DrawingPad } from "./DrawingPad/DrawingPad";

interface PasswordWidgetProps {
  padWidthInCells: number;
  padHeightInCells: number;
}

const palettes: Record<number, any> = {
  1: [
    "#D8DBE2",
    "#A9BCD0",
    "#58A4B0",
    "#373F51",
    "#DAA49A",
    "#29BF12",
    "#ABFF4F",
    "#F21B3F",
  ],
  2: [
    "#FFFFFF",
    "#EFCFBD",
    "#E09F7D",
    "#EF5D60",
    "#EC4067",
    "#A01A7D",
    "#311847",
    "#150A1E",
  ],
};
const defaultDrawingColor = "#FFFFFF";

export function PasswordWidget({
  padWidthInCells,
  padHeightInCells,
}: PasswordWidgetProps): ReactElement {
  const [paletteId, setPaletteId] = useState(1);
  const [drawingColor, setDrawingColor] = useState(defaultDrawingColor);
  const [dataMatrix, setDataMatrix] = useState<Record<string, any>>({});

  useEffect(()=> {
    setDrawingColor(palettes[paletteId][0])
  }, [
    paletteId, setPaletteId
  ])

  return (
    <div className={style.widgetBlock}>
      <DrawingPad
        width={padWidthInCells}
        height={padHeightInCells}
        defaultCellColor={defaultDrawingColor}
        drawingColor={drawingColor}
        setDataMatrixFn={setDataMatrix}
      />
      <Palette
        palette={palettes[paletteId]}
        defaultDrawingColor={palettes[paletteId][0]}
        setDrawingColorFn={setDrawingColor}
      />
      <div className={style.switchPaletteButtonBlock}>
        <div
          onClick={() =>
            setPaletteId(
              getNextIdx(
                Object.keys(palettes).map((paletteIdx) => parseInt(paletteIdx)),
                paletteId
              )
            )
          }
          className={style.switchPaletteButtonNext}
        ></div>
        <div
          onClick={() =>
            setPaletteId(
              getPrevIdx(
                Object.keys(palettes).map((paletteIdx) => parseInt(paletteIdx)),
                paletteId
              )
            )
          }
          className={style.switchPaletteButtonPrev}
        ></div>
      </div>
      <input
        id="password"
        value={converRecordToString(
          { height: padHeightInCells, width: padWidthInCells },
          dataMatrix
        )}
        hidden
      ></input>
    </div>
  );
}

function converRecordToString(
  size: { height: number; width: number },
  input: Record<string, any>
): string {
  const elementsSortedByIdx = [];
  for (let i = 0; i < size.height; i++) {
    for (let j = 0; j < size.width; j++) {
      const matrixElement = input[`${i}${j}`];
      elementsSortedByIdx.push(
        matrixElement ? matrixElement.replace("#", "") : matrixElement
      );
    }
  }

  return elementsSortedByIdx.join("");
}

function getNextIdx(indexes: number[], currentIdx: number): number {
  if (indexes.includes(currentIdx + 1)) {
    return currentIdx + 1;
  } else {
    return indexes[0];
  }
}

function getPrevIdx(indexes: number[], currentIdx: number): number {
  if (indexes.includes(currentIdx - 1)) {
    return currentIdx - 1;
  } else {
    return indexes[indexes.length - 1];
  }
}
