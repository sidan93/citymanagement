function interRect(x1, y1, w1, h1, x2, y2, w2, h2) {
  x_overlap = Math.max(0, Math.min(x1 + w1, x2 + w2) - Math.max(x1, x2));
  y_overlap = Math.max(0, Math.min(y1 + h1, y2 + h2) - Math.max(y1, y2));
  overlapArea = x_overlap * y_overlap;
  
  return overlapArea !== 0;
}

export {interRect, inRect};