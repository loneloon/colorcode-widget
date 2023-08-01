import React, { ReactElement, useEffect, useState } from "react";
import style from "./Palette.less";

interface PaletteProps {
  palette: string[];
  defaultDrawingColor: string;
  setDrawingColorFn: any;
}

export function Palette({
  palette,
  defaultDrawingColor,
  setDrawingColorFn,
}: PaletteProps): ReactElement {
  const [focusedColor, focusColor] = useState(defaultDrawingColor);

  useEffect(() => {
    setDrawingColorFn(focusedColor);
  }, [focusedColor, setDrawingColorFn, defaultDrawingColor]);

  const firstRow = palette.slice(0, 4);
  const secondRow = palette.slice(4);

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
    </div>
  );
}
