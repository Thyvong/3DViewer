export function string_cut(str, sep) {
    return str.substr(str.lastIndexOf(sep) + 1);
}

export function strip_extension(str) {
    return str.substr(0,str.lastIndexOf('.'));
}

export function basename(str){
	return string_cut(str,'/');
}

export function file_ext(str){
	return string_cut(str,'.');
}

function dumpObject(obj, lines = [], isLast = true, prefix = '') {
  const localPrefix = isLast ? '└─' : '├─';
  lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
  const newPrefix = prefix + (isLast ? '  ' : '│ ');
  const lastNdx = obj.children.length - 1;
  obj.children.forEach((child, ndx) => {
    const isLast = ndx === lastNdx;
    dumpObject(child, lines, isLast, newPrefix);
  });
  return lines;
}

