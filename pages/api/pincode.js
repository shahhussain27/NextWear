// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  let pincodes = {
    "110092": ["Delhi", "Delhi"],
    "110093": ["Assam", "Lol"],
    "110094": ["UP", "Lol"],
  }
    res.status(200).json(pincodes);
  }