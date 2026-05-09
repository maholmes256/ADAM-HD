export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate wrong-but-plausible distractors for multiple choice
export function generateChoices(correct) {
  const choices = new Set([correct]);
  const deltas = [1, 2, 3, 5, 10, -1, -2, -3];
  let tries = 0;
  while (choices.size < 4 && tries < 40) {
    const delta = deltas[randInt(0, deltas.length - 1)];
    const wrong = correct + delta;
    if (wrong > 0 && wrong !== correct) choices.add(wrong);
    tries++;
  }
  while (choices.size < 4) choices.add(correct + choices.size * 3);
  return [...choices].sort(() => Math.random() - 0.5);
}
