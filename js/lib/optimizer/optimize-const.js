function optimizeConst(node, Const) {
  if (
    node.object &&
    node.object.type === 'MemberExpression' &&
    node.object.object.name === 'tkMock' &&
    node.object.property.name === 'Const' &&
    Object.prototype.hasOwnProperty.call(Const, node.property.name)
  ) {
    const value =  Const[node.property.name];
    if (value < 0) {
      return {
        "type": "UnaryExpression",
        "operator": "-",
        "argument": {
            "type": "Literal",
            "value": value * -1,
        },
        "prefix": true
      };
    } else {
      return {"type": "Literal", "value": value};
    }
  }
  return node;
}

export default optimizeConst;

/*

*/
