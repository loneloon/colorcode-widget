import React, { ReactElement, useEffect, useState } from "react";
import style from "./Palette.less";

interface PaletteProps {
  palettes: Record<number, string[]>;
  defaultDrawingColor: string;
  setDrawingColorFn: any;
}

export function Palette({
  palettes,
  defaultDrawingColor,
  setDrawingColorFn,
}: PaletteProps): ReactElement {
  const [paletteId, setPaletteId] = useState(1);
  const [focusedColor, focusColor] = useState(defaultDrawingColor);

  useEffect(() => {
    setDrawingColorFn(focusedColor);
  }, [focusedColor, setDrawingColorFn]);

  const selectedPalette = palettes[paletteId];
  const firstRow = selectedPalette.slice(0, 4);
  const secondRow = selectedPalette.slice(4);

  return (
    <div className={style.paletteBlock}>
      <table>
        <tbody>
          <tr>
            {firstRow.map((color, idx) => (
              <td
                onClick={() => {
                  focusColor(color);
                }}
                key={`paletteCell-1-${idx}`}
                style={{ backgroundColor: color }}
                className={
                  color == focusedColor
                    ? style.selectedColorCell
                    : style.colorCell
                }
              ></td>
            ))}
          </tr>
          <tr>
            {secondRow.map((color, idx) => (
              <td
                onClick={() => focusColor(color)}
                key={`paletteCell-2-${idx}`}
                style={{ backgroundColor: color }}
                className={
                  color == focusedColor
                    ? style.selectedColorCell
                    : style.colorCell
                }
              ></td>
            ))}
          </tr>
        </tbody>
      </table>
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
    </div>
  );
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
