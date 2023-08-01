import React, { ReactElement, useEffect, useState } from "react";
import style from "./DrawingPad.less";
import _ from "lodash";

export type DrawingPadState = "CLEAR" | "EDITED"

interface DrawingPadProps {
  forceClear: boolean;
  width: number;
  height: number;
  defaultCellColor: string;
  drawingColor: string;
  setDataMatrixFn: any;
}

export function DrawingPad({
  forceClear,
  width,
  height,
  defaultCellColor,
  drawingColor,
  setDataMatrixFn,
}: DrawingPadProps): ReactElement {
  const emptyMatrixRecord: Record<string, any> = {};
  Array(height)
    .fill(0)
    .map((_x, matrixRowIdx) =>
      Array(width)
        .fill(0)
        .map(
          (_y, cellIdx) =>
            (emptyMatrixRecord[`${matrixRowIdx}${cellIdx}`] = defaultCellColor)
        )
    );

  const [drawingPadMatrix, setDrawingPadMatrix] = useState(emptyMatrixRecord);

  useEffect(() => {
    if (forceClear) {
      setDrawingPadMatrix(emptyMatrixRecord)
    }

    setDataMatrixFn(drawingPadMatrix);
  }, [forceClear, drawingPadMatrix, setDataMatrixFn]);

  return (
    <div className={style.drawingPadBlock}>
      <table>
        <tbody>
          {Array(height)
            .fill(0)
            .map((_y, matrixRowIdx) => (
              <tr>
                {Array(width)
                  .fill(0)
                  .map((_x, cellIdx) => (
                    <td
                      onClick={() => {
                        const matrixCopy = _.cloneDeep(drawingPadMatrix);
                        matrixCopy[`${matrixRowIdx}${cellIdx}`] = drawingColor;
                        setDrawingPadMatrix(matrixCopy);
                      }}
                      key={`drawingPadCell-${matrixRowIdx}${cellIdx}`}
                      style={{
                        backgroundColor:
                          drawingPadMatrix[`${matrixRowIdx}${cellIdx}`],
                      }}
                      className={style.drawingPadCell}
                    ></td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
