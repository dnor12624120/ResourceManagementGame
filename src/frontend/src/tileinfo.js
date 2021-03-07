const tileinfo = {
  50: {
    name: "Water",
    color: "#19692e",
    info: "You can fish in these tiles.",
    action: async function(i, j, plot, account) {
      try {
        await plot.methods.fish(i, j, "").send({from:account})
      }
      catch(e) {
        console.log(e)
      }
    },
    hasButton: true,
    buttonText: "Fish"
  },
  180: {
    name: "Grass",
    color: "#19692e",
    info: "You can plant seeds on these tiles.",
    action: async function(i, j, plot, account) {
      try {
        await plot.methods.plant(i, j, "").send({from:account})
      }
      catch(e) {
        console.log(e)
      }
    },
    hasButton: true,
    buttonText: "Plant seeds"
  },
  200: {
    name: "Grass",
    color: "#19692e",
    info: "You can plant seeds on these tiles.",
    action: async function(i, j, plot, account) {
      try {
        await plot.methods.plant(i, j, "").send({from:account})
      }
      catch(e) {
        console.log(e)
      }
    },
    hasButton: true,
    buttonText: "Plant seeds"
  },
  255: {
    name: "Rock",
    color: "#19692e",
    info: "Unusable tile.",
    action: null,
    hasButton: false,
    buttonText: null
  }
}

export { tileinfo };
