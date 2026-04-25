function parseBreak(node, parser = false) {
  // 固定でbreakするだけ
  parser.outputs.push(`Break`);
}

export default parseBreak;
