/* eslint-disable */
/** disabled es-lint as the theme requires PascalCase props which eslint doesn't allow */
/* based on https://github.com/Bogdan-Lyashenko/js-code-to-svg-flowchart/blob/master/src/render/svg/appearance/themes/DefaultBaseTheme.js */

export const defaultColors = {
  strokeColor: '#444',
  defaultFillColor: '#fff',
  textColor: '#222',
  arrowFillColor: '#333',
  rectangleFillColor: '#90caf9',
  rectangleDotFillColor: '#ede7f6',
  functionFillColor: '#a5d6a7',
  rootCircleFillColor: '#fff59d',
  loopFillColor: '#b39ddb',
  conditionFillColor: '#ce93d8',
  destructedNodeFillColor: '#ffcc80',
  classFillColor: '#80cbc4',
  debuggerFillColor: '#EF5350',
  exportFillColor: '#81d4fa',
  throwFillColor: '#ef9a9a',
  tryFillColor: '#FFE082',
  objectFillColor: '#9fa8da',
  callFillColor: '#C5E1A5',
  debugModeFillColor: '#666'
};

export const getAlignedColors = (theme, defaultColor) => {
  const themeCopy = { ...theme };
  Object.keys(themeCopy).forEach(color => {
      themeCopy[color] = defaultColor;
  });

  return themeCopy;
};

export const buildTheme = color => {
  const baseShape = {
      strokeColor: color.strokeColor,
      strokeWidth: 1,
      fillColor: color.defaultFillColor,
      textColor: color.textColor,
      fontFamily: 'monospace',
      fontSize: 8,
      lineHeight: 5, //depends on fontSize
      symbolHeight: 7, //depends on fontSize
      symbolWidth: 5, //depends on fontSize
      horizontalPadding: 10,
      verticalPadding: 8,
      childOffset: 17,
      margin: 5,
      roundBorder: 2,
      complexTypeExtraSpace: 10,

      debugFontSize: 8,
      debugTextColor: color.debugModeFillColor
  };

  return {
      BaseShape: baseShape,
      ConnectionArrow: {
          arrow: {
              size: {
                  x: 8,
                  y: 6
              },
              fillColor: color.arrowFillColor
          },
          line: {
              strokeColor: color.strokeColor,
              strokeWidth: 1,
              curveTurnRadius: 4
          },
          lineTurnOffset: 20
      },

      Shape: {
          ...baseShape
      },

      Rectangle: {
          ...baseShape,
          fillColor: color.rectangleFillColor,
          dot: {
              ...baseShape,
              offset: 4,
              radius: 2,
              fillColor: color.rectangleDotFillColor
          },
          roundBorder: 3
      },

      VerticalEdgedRectangle: {
          ...baseShape,
          fillColor: color.functionFillColor,
          edgeOffset: 10
      },

      RootCircle: {
          ...baseShape,
          radius: 15,
          padding: 3,
          fillColor: color.rootCircleFillColor
      },

      LoopRhombus: {
          ...baseShape,
          fillColor: color.loopFillColor,
          thinPartOffset: 15,
          rhombusSize: 50,
          roundBorder: 3,
          doubleLayerOffsetA: 4,
          doubleLayerOffsetB: 8,
          childOffset: 20,
          positionTopShift: 20
      },

      ConditionRhombus: {
          ...baseShape,
          fillColor: color.conditionFillColor,
          thinPartOffset: 15,
          roundBorder: 3,
          childOffset: 20,
          alternateBranchOffset: 40,
          markOffset: {
              x: 15,
              y: 5
          },
          margin: 20
      },

      RootStartPoint: {
          center: {
              x: 25,
              y: 25
          },
          childOffset: {
              x: 25,
              y: 65
          }
      },

      ReturnStatement: {
          ...baseShape,
          roundBorder: 3,
          fillColor: color.rectangleFillColor,
          arrow: {
              ...baseShape,
              handlerLength: 5,
              sizeX: 16,
              sizeY: 22,
              fillColor: color.functionFillColor
          }
      },

      DestructedNode: {
          ...baseShape,
          fillColor: color.destructedNodeFillColor,
          roundBorder: 2,
          suffix: {
              ...baseShape,
              roundBorder: 2,
              fillColor: color.destructedNodeFillColor,
              width: 8,
              space: 4
          }
      },

      ClassDeclaration: {
          ...baseShape,
          fillColor: color.classFillColor,
          edgeOffset: 10
      },

      DebuggerStatement: {
          ...baseShape,
          fillColor: color.debuggerFillColor,
          roundBorder: 2
      },

      ExportDeclaration: {
          ...baseShape,
          roundBorder: 3,
          fillColor: color.exportFillColor,
          arrow: {
              ...baseShape,
              handlerLength: 5,
              sizeX: 20,
              sizeY: 28,
              fillColor: color.defaultFillColor
          }
      },

      ImportDeclaration: {
          ...baseShape,
          fillColor: color.defaultFillColor,
          edgeOffset: 5
      },

      ImportSpecifier: {
          ...baseShape,
          fillColor: color.exportFillColor
      },

      ThrowStatement: {
          ...baseShape,
          fillColor: color.throwFillColor
      },

      TryStatement: {
          ...baseShape,
          fillColor: color.tryFillColor
      },

      CatchClause: {
          ...baseShape,
          fillColor: color.throwFillColor,
          arrow: {
              ...baseShape,
              handlerLength: 2,
              sizeX: 16,
              sizeY: 28,
              fillColor: color.throwFillColor
          }
      },

      SwitchStatement: {
          ...baseShape,
          fillColor: color.conditionFillColor,
          thinPartOffset: 15,
          roundBorder: 3,
          childOffset: 20,
          alternateBranchOffset: 40,
          markOffset: {
              x: 15,
              y: 5
          },
          margin: 20
      },

      BreakStatement: {
          ...baseShape,
          fillColor: color.rectangleFillColor,
          arrow: {
              ...baseShape,
              handlerLength: 5,
              sizeX: 16,
              sizeY: 28,
              fillColor: color.conditionFillColor
          }
      },

      SwitchCase: {
          ...baseShape,
          fillColor: color.conditionFillColor
      },

      ContinueStatement: {
          ...baseShape,
          fillColor: color.rectangleFillColor,
          arrow: {
              ...baseShape,
              handlerLength: 5,
              sizeX: 16,
              sizeY: 28,
              fillColor: color.loopFillColor
          }
      },

      ObjectProperty: {
          ...baseShape,
          fillColor: color.rectangleFillColor
      },

      CallExpression: {
          ...baseShape,
          dot: {
              ...baseShape,
              offset: 6,
              radius: 4,
              fillColor: color.rectangleDotFillColor
          },
          fillColor: color.callFillColor
      }
  };
};

export const defaultTheme = buildTheme(defaultColors);
