import React, { ReactElement, useCallback, useEffect, useState } from "react";
import style from "./PasswordWidget.less";
import { Palette } from "./Palette/Palette";
import { DrawingPad, DrawingPadState } from "./DrawingPad/DrawingPad";

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
const defaultCellColor = "#FFFFFF";

export function PasswordWidget({
  padWidthInCells,
  padHeightInCells,
}: PasswordWidgetProps): ReactElement {
  const [forceClear, setForceClear] = useState<boolean>(false)
  const [drawindPadState, setDrawindPadState] = useState<DrawingPadState>("CLEAR")
  const [paletteId, setPaletteId] = useState(1);
  const [drawingColor, setDrawingColor] = useState(palettes[paletteId][0]);
  const [dataMatrix, setDataMatrix] = useState<Record<string, any>>({});

  // console.log(`First color: ${palettes[paletteId][0]}`)

  useEffect(() => {
    // console.log("Widget is rerendering...")
    const padUniqueColorsSet = new Set(Object.values(dataMatrix))

    if (padUniqueColorsSet.size == 1 && padUniqueColorsSet.has(defaultCellColor)) {
      setDrawindPadState("CLEAR")
    } else {
      setDrawindPadState("EDITED")
    }

    if (drawindPadState == "CLEAR") {
      setForceClear(false)
    }
  }, [drawindPadState, dataMatrix, setDataMatrix, forceClear])

  return (
    <div className={style.widgetBlock}>
      <DrawingPad
        forceClear={forceClear}
        width={padWidthInCells}
        height={padHeightInCells}
        defaultCellColor={defaultCellColor}
        drawingColor={drawingColor}
        setDataMatrixFn={setDataMatrix}
      />
      <div className={style.controlPanel}>
        <Palette
        palette={palettes[paletteId]}
        setDrawingColorFn={setDrawingColor}
        />
        <div className={style.buttonPad}>
          <div onClick={() => setForceClear(true)} className={style.clearButton}>
            CLEAR
          </div>
          <div
            onClick={() =>
              setPaletteId(
                getPrevIdx(
                  Object.keys(palettes).map((paletteIdx) => parseInt(paletteIdx)),
                  paletteId
                )
              )
            }
            className={style.switchPaletteButton}
          ><div className={style.arrowLeft}></div></div>
          <div
            onClick={() =>
              setPaletteId(
                getNextIdx(
                  Object.keys(palettes).map((paletteIdx) => parseInt(paletteIdx)),
                  paletteId
                )
              )
            }
            className={style.switchPaletteButton}
          ><div className={style.arrowRight}></div></div>
        </div>
        <div className={style.complexityReviewDisplay}>
          <div>COLORS USED: {getUniqueValuesNumberFromRecord(dataMatrix)}</div>
          <div>COMPLEXITY: {getVerboseComplexityValueFromRecord(dataMatrix)}</div>
          <div>STATE: {drawindPadState}</div>
        </div>
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

function getUniqueValuesNumberFromRecord(input: Record<string, any>): number {
  const colorSet = new Set(Object.values(input))
  return colorSet.size
}

type VerbosePassComplexity = "WEAK" | "AVERAGE" | "STRONG"

function getVerboseComplexityValueFromRecord(input: Record<string, any>): VerbosePassComplexity {
  const colorSet = new Set(Object.values(input))
  if (colorSet.size > 6){
    return "STRONG"
  } else if (colorSet.size > 3) {
    return "AVERAGE"
  } else {
    return "WEAK"
  }
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
