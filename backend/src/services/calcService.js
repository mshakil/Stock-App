function suggestBuy({ shares, avg, price, target }) {
    if (price === target) {
      if (avg === target) {
        return { n: 0, message: "Already at target average" };
      }
      throw new Error("Can't reach target by buying at current price (P == T).");
    }
  
    const numerator = shares * (target - avg);
    const denominator = price - target;
    const nFractional = numerator / denominator;
  
    if (nFractional <= 0) {
      return { n: 0, message: "No additional purchase needed" };
    }
  
    const nRounded = Math.ceil(nFractional);
    const newAverage = ((shares * avg) + (nRounded * price)) / (shares + nRounded);
    const investmentNeeded = nRounded * price;
  
    return {
      suggestedSharesFractional: nFractional,
      suggestedSharesRounded: nRounded,
      newAverage,
      investmentNeeded,
      explanation: `n = S*(T-A)/(P-T) => ${shares}*(${target}-${avg})/(${price}-${target}) = ${nFractional}`
    };
  }
  
  module.exports = { suggestBuy };
  