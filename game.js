"use strict";

const SAVE_KEY = "grow-plot-save-v2";

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");

const ui = {
  coins: document.getElementById("coinText"),
  eventCoins: document.getElementById("eventCoinText"),
  eventCoinLabel: document.getElementById("eventCoinLabel"),
  cropValue: document.getElementById("valueText"),
  day: document.getElementById("dayText"),
  weather: document.getElementById("weatherText"),
  status: document.getElementById("statusText"),
  eventTimer: document.getElementById("eventTimer"),
  eventName: document.getElementById("eventName"),
  eventDescription: document.getElementById("eventDescription"),
  eventTradeButton: document.getElementById("eventTradeButton"),
  taskList: document.getElementById("taskList"),
  exclusiveShopList: document.getElementById("exclusiveShopList"),
  seedPackRoller: document.getElementById("seedPackRoller"),
  shopList: document.getElementById("shopList"),
  inventoryList: document.getElementById("inventoryList"),
  itemInventoryList: document.getElementById("itemInventoryList"),
  inventoryOverlay: document.getElementById("inventoryOverlay"),
  closeInventoryButton: document.getElementById("closeInventoryButton"),
  petList: document.getElementById("petList"),
  petHint: document.getElementById("petHint"),
  hotbar: document.getElementById("hotbar"),
  plantTooltip: document.getElementById("plantTooltip"),
  quickSellButton: document.getElementById("quickSellButton"),
  sellButton: document.getElementById("sellButton"),
  restockButton: document.getElementById("restockButton"),
  resetButton: document.getElementById("resetButton"),
  shopToggleButton: document.getElementById("shopToggleButton"),
  shopDrawer: document.getElementById("shopDrawer"),
  expandPlotButton: document.getElementById("expandPlotButton"),
  plotSize: document.getElementById("plotSizeText")
};

const seeds = {
  carrot: {
    id: "carrot",
    kind: "seed",
    name: "Carrot",
    crop: "Carrots",
    cost: 18,
    value: 34,
    growTime: 26,
    color: "#f08732",
    leaf: "#5aa85c"
  },
  berry: {
    id: "berry",
    kind: "seed",
    name: "Berry",
    crop: "Berries",
    cost: 45,
    value: 96,
    growTime: 54,
    color: "#b84fa0",
    leaf: "#448f5c"
  },
  tomato: {
    id: "tomato",
    kind: "seed",
    name: "Tomato",
    crop: "Tomatoes",
    cost: 58,
    value: 126,
    growTime: 66,
    color: "#df4f45",
    leaf: "#4c9b5f"
  },
  melon: {
    id: "melon",
    kind: "seed",
    name: "Melon",
    crop: "Melons",
    cost: 75,
    value: 172,
    growTime: 88,
    color: "#70b85f",
    leaf: "#2f7d4a"
  },
  pumpkin: {
    id: "pumpkin",
    kind: "seed",
    name: "Pumpkin",
    crop: "Pumpkins",
    cost: 105,
    value: 255,
    growTime: 112,
    color: "#d98232",
    leaf: "#377d42"
  },
  starfruit: {
    id: "starfruit",
    kind: "seed",
    name: "Starfruit",
    crop: "Starfruit",
    cost: 140,
    value: 360,
    growTime: 130,
    color: "#f2d05d",
    leaf: "#56a06f"
  },
  grape: {
    id: "grape",
    kind: "seed",
    name: "Grape",
    crop: "Grapes",
    cost: 185,
    value: 490,
    growTime: 155,
    color: "#7251c7",
    leaf: "#4c9966"
  },
  dragonfruit: {
    id: "dragonfruit",
    kind: "seed",
    name: "Dragonfruit",
    crop: "Dragonfruit",
    cost: 280,
    value: 820,
    growTime: 210,
    color: "#e74788",
    leaf: "#79c86f"
  },
  crystalBloom: {
    id: "crystalBloom",
    kind: "seed",
    name: "Crystal Bloom",
    crop: "Crystal Blooms",
    cost: 420,
    value: 1325,
    growTime: 280,
    color: "#81d8e8",
    leaf: "#b8f2f0"
  },
  honeySprout: {
    id: "honeySprout",
    kind: "seed",
    name: "Honey Sprout",
    crop: "Honey Sprouts",
    cost: 65,
    value: 210,
    growTime: 72,
    eventOnly: "honey",
    currency: "event",
    color: "#f0bd45",
    leaf: "#8fc65c"
  },
  discoSeed: {
    id: "discoSeed",
    kind: "seed",
    name: "Disco Seed",
    crop: "Disco Fruit",
    cost: 85,
    value: 310,
    growTime: 82,
    eventOnly: "disco",
    currency: "event",
    color: "#ff6bd6",
    leaf: "#75e7ff"
  },
  nightSeed: {
    id: "nightSeed",
    kind: "seed",
    name: "Night Seed",
    crop: "Night Fruit",
    cost: 95,
    value: 390,
    growTime: 96,
    eventOnly: "bloodMoon",
    currency: "event",
    color: "#7c6dff",
    leaf: "#aeb8ff"
  },
  cometSeed: {
    id: "cometSeed",
    kind: "seed",
    name: "Comet Seed",
    crop: "Comet Fruit",
    cost: 115,
    value: 540,
    growTime: 118,
    eventOnly: "galaxy",
    currency: "event",
    color: "#81d8e8",
    leaf: "#f4f1e8"
  },
  everberry: {
    id: "everberry",
    kind: "seed",
    name: "Everberry",
    crop: "Everberries",
    cost: 155,
    value: 360,
    growTime: 120,
    eventOnly: "zen",
    currency: "event",
    regrow: true,
    color: "#5bd17b",
    leaf: "#d4c9a1"
  },
  sugarCane: {
    id: "sugarCane",
    kind: "seed",
    name: "Sugar Cane",
    crop: "Sugar Cane",
    cost: 135,
    value: 285,
    growTime: 105,
    eventOnly: "honey",
    currency: "event",
    regrow: true,
    color: "#d8e885",
    leaf: "#6dae5c"
  },
  nectarBloom: {
    id: "nectarBloom",
    kind: "seed",
    name: "Nectar Bloom",
    crop: "Nectar Blooms",
    cost: 150,
    value: 345,
    growTime: 130,
    eventOnly: "honey",
    currency: "event",
    color: "#ffcf6b",
    leaf: "#78b85e"
  },
  mirrorMelon: {
    id: "mirrorMelon",
    kind: "seed",
    name: "Mirror Melon",
    crop: "Mirror Melons",
    cost: 170,
    value: 430,
    growTime: 145,
    eventOnly: "disco",
    currency: "event",
    color: "#65d7ff",
    leaf: "#ff6bd6"
  },
  eclipsePepper: {
    id: "eclipsePepper",
    kind: "seed",
    name: "Eclipse Pepper",
    crop: "Eclipse Peppers",
    cost: 185,
    value: 520,
    growTime: 160,
    eventOnly: "bloodMoon",
    currency: "event",
    color: "#4d315d",
    leaf: "#d85b61"
  },
  stardustBean: {
    id: "stardustBean",
    kind: "seed",
    name: "Stardust Bean",
    crop: "Stardust Beans",
    cost: 210,
    value: 650,
    growTime: 180,
    eventOnly: "galaxy",
    currency: "event",
    color: "#d7f6ff",
    leaf: "#81d8e8"
  },
  bambooHeart: {
    id: "bambooHeart",
    kind: "seed",
    name: "Bamboo Heart",
    crop: "Bamboo Hearts",
    cost: 180,
    value: 470,
    growTime: 150,
    eventOnly: "zen",
    currency: "event",
    regrow: true,
    color: "#8fd071",
    leaf: "#d4c9a1"
  }
};

const gear = {
  wateringCan: {
    id: "wateringCan",
    kind: "gear",
    name: "Water Can",
    cost: 85,
    uses: 18,
    color: "#6eb7d8",
    description: "Adds water and speeds one crop."
  },
  fertilizer: {
    id: "fertilizer",
    kind: "gear",
    name: "Fertilizer",
    cost: 125,
    uses: 8,
    color: "#c99a5a",
    description: "Adds a strong growth burst."
  },
  harvestGlove: {
    id: "harvestGlove",
    kind: "gear",
    name: "Harvest Glove",
    cost: 210,
    uses: 12,
    color: "#e9d06c",
    description: "Harvests a 3 by 3 patch."
  },
  sprinkler: {
    id: "sprinkler",
    kind: "gear",
    name: "Sprinkler",
    cost: 260,
    uses: 6,
    color: "#79c6c9",
    description: "Waters every crop in a 3 by 3 patch."
  },
  growthTonic: {
    id: "growthTonic",
    kind: "gear",
    name: "Growth Tonic",
    cost: 360,
    uses: 5,
    color: "#9dd05c",
    description: "Boosts all planted crops a little."
  },
  seedScanner: {
    id: "seedScanner",
    kind: "gear",
    name: "Seed Scanner",
    cost: 500,
    uses: 4,
    color: "#91a7ff",
    description: "Turns one harvested fruit into matching seeds."
  },
  honeyGlazer: {
    id: "honeyGlazer",
    kind: "gear",
    name: "Honey Glazer",
    cost: 90,
    uses: 6,
    eventOnly: "honey",
    currency: "event",
    color: "#f0bd45",
    description: "Coats one crop for extra sell value."
  },
  snowLantern: {
    id: "snowLantern",
    kind: "gear",
    name: "Snow Lantern",
    cost: 110,
    uses: 5,
    eventOnly: "christmas",
    currency: "event",
    color: "#cce8f2",
    description: "Instantly chills a patch with growth magic."
  },
  zenRake: {
    id: "zenRake",
    kind: "gear",
    name: "Zen Rake",
    cost: 130,
    uses: 5,
    eventOnly: "zen",
    currency: "event",
    color: "#d4c9a1",
    description: "Balances every crop to at least half grown."
  }
};

const mutations = {
  normal: { id: "normal", name: "", multiplier: 1, color: null },
  golden: { id: "golden", name: "Golden", multiplier: 1.7, color: "#ffd45c" },
  giant: { id: "giant", name: "Giant", multiplier: 1.5, color: "#9dd05c" },
  wet: { id: "wet", name: "Wet", multiplier: 1.25, color: "#6eb7d8" },
  honeyed: { id: "honeyed", name: "Honeyed", multiplier: 1.85, color: "#f0bd45" },
  frozen: { id: "frozen", name: "Frozen", multiplier: 1.8, color: "#b9e7ff" },
  zen: { id: "zen", name: "Zen", multiplier: 2.1, color: "#e6a7ca" },
  disco: { id: "disco", name: "Disco", multiplier: 2.4, color: "#ff6bd6" },
  lunar: { id: "lunar", name: "Lunar", multiplier: 2.6, color: "#aeb8ff" },
  galactic: { id: "galactic", name: "Galactic", multiplier: 3.2, color: "#81d8e8" }
};

const pets = {
  bee: {
    id: "bee",
    name: "Honey Bee",
    cost: 850,
    mark: "HB",
    color: "#f0bd45",
    description: "Adds 15% sell value."
  },
  turtle: {
    id: "turtle",
    name: "Garden Turtle",
    cost: 1100,
    mark: "GT",
    color: "#5aa85c",
    description: "Offline plants grow 40% longer."
  },
  owl: {
    id: "owl",
    name: "Moon Owl",
    cost: 1450,
    mark: "MO",
    color: "#8f9bd8",
    description: "Tasks reward 25% more petals."
  },
  fox: {
    id: "fox",
    name: "Swift Fox",
    cost: 1750,
    mark: "SF",
    color: "#e98665",
    description: "All crops grow 20% faster."
  },
  squirrel: {
    id: "squirrel",
    name: "Seed Squirrel",
    cost: 2100,
    mark: "SS",
    color: "#c99a5a",
    description: "Planting sometimes refunds a seed."
  },
  frog: {
    id: "frog",
    name: "Rain Frog",
    cost: 2400,
    mark: "RF",
    color: "#6fd083",
    description: "Watering lasts twice as long."
  },
  phoenix: {
    id: "phoenix",
    name: "Solar Phoenix",
    cost: 3800,
    mark: "SP",
    color: "#f08732",
    description: "Ready crops gain 20% extra sell value."
  },
  queenBee: {
    id: "queenBee",
    name: "Queen Bee",
    cost: 240,
    eventOnly: "honey",
    mark: "QB",
    color: "#ffd45c",
    description: "Fruit turn-ins earn 35% more event currency."
  },
  snowSprite: {
    id: "snowSprite",
    name: "Snow Sprite",
    cost: 260,
    eventOnly: "christmas",
    mark: "SS",
    color: "#b9e7ff",
    description: "Restocks add one random seed."
  },
  lotusSpirit: {
    id: "lotusSpirit",
    name: "Lotus Spirit",
    cost: 300,
    eventOnly: "zen",
    mark: "LS",
    color: "#e6a7ca",
    description: "All task progress has a chance to count twice."
  },
  mutationMoth: {
    id: "mutationMoth",
    name: "Mutation Moth",
    cost: 360,
    eventOnly: "galaxy",
    mark: "MM",
    color: "#81d8e8",
    description: "Mutates one planted crop every minute."
  }
};

const exclusiveItems = {
  drizzleSeedPack: {
    id: "drizzleSeedPack",
    type: "pack",
    name: "Drizzle Seed Pack",
    event: "drizzle",
    cost: 55,
    color: "#6eb7d8",
    description: "Rainy pack with extra berry and melon chances.",
    seeds: ["carrot", "berry", "berry", "tomato", "melon"]
  },
  rainEgg: {
    id: "rainEgg",
    type: "egg",
    name: "Rain Egg",
    event: "drizzle",
    cost: 125,
    color: "#6eb7d8",
    description: "Hatches into a pet that likes wet gardens.",
    hatchPets: ["frog", "turtle", "bee"]
  },
  marketSeedPack: {
    id: "marketSeedPack",
    type: "pack",
    name: "Market Seed Pack",
    event: "market",
    cost: 65,
    color: "#f0bd45",
    description: "A merchant pack with profitable crop chances.",
    seeds: ["tomato", "melon", "pumpkin", "starfruit", "grape"]
  },
  merchantEgg: {
    id: "merchantEgg",
    type: "egg",
    name: "Merchant Egg",
    event: "market",
    cost: 150,
    color: "#f0bd45",
    description: "Hatches into a pet useful for making money.",
    hatchPets: ["bee", "phoenix", "squirrel"]
  },
  sunSeedPack: {
    id: "sunSeedPack",
    type: "pack",
    name: "Sun Seed Pack",
    event: "sun",
    cost: 60,
    color: "#f08732",
    description: "Warm-weather seeds with pumpkin and starfruit chances.",
    seeds: ["carrot", "tomato", "pumpkin", "starfruit", "dragonfruit"]
  },
  solarEgg: {
    id: "solarEgg",
    type: "egg",
    name: "Solar Egg",
    event: "sun",
    cost: 155,
    color: "#f08732",
    description: "Hatches into a sun-loving pet.",
    hatchPets: ["fox", "phoenix", "bee"]
  },
  moonSeedPack: {
    id: "moonSeedPack",
    type: "pack",
    name: "Moon Seed Pack",
    event: "moon",
    cost: 70,
    color: "#8f9bd8",
    description: "A night pack with rare seed chances.",
    seeds: ["berry", "grape", "starfruit", "dragonfruit", "crystalBloom"]
  },
  moonEgg: {
    id: "moonEgg",
    type: "egg",
    name: "Moon Egg",
    event: "moon",
    cost: 160,
    color: "#8f9bd8",
    description: "Hatches into a pet with night-garden energy.",
    hatchPets: ["owl", "turtle", "fox"]
  },
  festivalSeedPack: {
    id: "festivalSeedPack",
    type: "pack",
    name: "Festival Seed Pack",
    event: "festival",
    cost: 75,
    color: "#dd6bb2",
    description: "A colorful pack with mixed rare seed chances.",
    seeds: ["tomato", "melon", "pumpkin", "starfruit", "grape", "dragonfruit"]
  },
  petalEgg: {
    id: "petalEgg",
    type: "egg",
    name: "Petal Egg",
    event: "festival",
    cost: 175,
    color: "#dd6bb2",
    description: "Hatches into a festival pet.",
    hatchPets: ["squirrel", "owl", "lotusSpirit"]
  },
  meteorSeedPack: {
    id: "meteorSeedPack",
    type: "pack",
    name: "Meteor Seed Pack",
    event: "meteor",
    cost: 85,
    color: "#c99a5a",
    description: "Meteor-touched seeds with high-tier chances.",
    seeds: ["pumpkin", "starfruit", "grape", "dragonfruit", "crystalBloom"]
  },
  meteorSprinkler: { id: "meteorSprinkler", type: "gear", itemId: "sprinkler", event: "meteor", cost: 115 },
  frostSeedPack: {
    id: "frostSeedPack",
    type: "pack",
    name: "Frost Seed Pack",
    event: "frost",
    cost: 80,
    color: "#b9e7ff",
    description: "Cold-weather pack with premium crop chances.",
    seeds: ["melon", "pumpkin", "starfruit", "dragonfruit", "crystalBloom"]
  },
  frostEgg: {
    id: "frostEgg",
    type: "egg",
    name: "Frost Egg",
    event: "frost",
    cost: 165,
    color: "#b9e7ff",
    description: "Hatches into a chilly garden pet.",
    hatchPets: ["snowSprite", "frog", "turtle"]
  },
  bugSeedPack: {
    id: "bugSeedPack",
    type: "pack",
    name: "Bug Hunt Seed Pack",
    event: "bug",
    cost: 60,
    color: "#79d46d",
    description: "A lucky pack with extra starter and mid-tier seeds.",
    seeds: ["carrot", "berry", "tomato", "melon", "pumpkin", "starfruit"]
  },
  bugEgg: {
    id: "bugEgg",
    type: "egg",
    name: "Bug Egg",
    event: "bug",
    cost: 140,
    color: "#79d46d",
    description: "Hatches into a helpful garden pet.",
    hatchPets: ["squirrel", "frog", "bee"]
  },
  honeySprout: { id: "honeySprout", type: "seed", itemId: "honeySprout", event: "honey", cost: 65 },
  sugarCane: { id: "sugarCane", type: "seed", itemId: "sugarCane", event: "honey", cost: 135 },
  honeyGlazer: { id: "honeyGlazer", type: "gear", itemId: "honeyGlazer", event: "honey", cost: 90 },
  honeyEgg: {
    id: "honeyEgg",
    type: "egg",
    name: "Honey Egg",
    event: "honey",
    cost: 140,
    color: "#f0bd45",
    description: "Hatches into a bee-themed garden pet.",
    hatchPets: ["bee", "queenBee", "squirrel"]
  },
  queenBee: { id: "queenBee", type: "pet", petId: "queenBee", event: "honey", cost: 520 },
  honeySeedPack: {
    id: "honeySeedPack",
    type: "pack",
    name: "Honey Seed Pack",
    event: "honey",
    cost: 80,
    color: "#f0bd45",
    description: "Open for a random normal or honey event seed.",
    seeds: ["carrot", "berry", "tomato", "melon", "honeySprout", "sugarCane", "nectarBloom"]
  },
  discoSeed: { id: "discoSeed", type: "seed", itemId: "discoSeed", event: "disco", cost: 85 },
  discoSeedPack: {
    id: "discoSeedPack",
    type: "pack",
    name: "Disco Seed Pack",
    event: "disco",
    cost: 95,
    color: "#ff6bd6",
    description: "Open for a random seed with a chance at Disco Seed.",
    seeds: ["berry", "tomato", "grape", "starfruit", "discoSeed", "mirrorMelon"]
  },
  discoBall: {
    id: "discoBall",
    type: "cosmetic",
    name: "Disco Ball",
    event: "disco",
    cost: 110,
    color: "#ff6bd6",
    description: "Adds a spinning disco ball to your plot."
  },
  nightSeed: { id: "nightSeed", type: "seed", itemId: "nightSeed", event: "bloodMoon", cost: 95 },
  nightSeedPack: {
    id: "nightSeedPack",
    type: "pack",
    name: "Night Seed Pack",
    event: "bloodMoon",
    cost: 105,
    color: "#7c6dff",
    description: "Open for moonlit seeds and a chance at Night Seed.",
    seeds: ["melon", "pumpkin", "grape", "starfruit", "nightSeed", "eclipsePepper"]
  },
  moonLamp: {
    id: "moonLamp",
    type: "cosmetic",
    name: "Moon Lamp",
    event: "bloodMoon",
    cost: 130,
    color: "#aeb8ff",
    description: "Places a glowing moon lamp by the plot."
  },
  cometSeed: { id: "cometSeed", type: "seed", itemId: "cometSeed", event: "galaxy", cost: 115 },
  mutationMoth: { id: "mutationMoth", type: "pet", petId: "mutationMoth", event: "galaxy", cost: 360 },
  galaxySeedPack: {
    id: "galaxySeedPack",
    type: "pack",
    name: "Galaxy Seed Pack",
    event: "galaxy",
    cost: 125,
    color: "#81d8e8",
    description: "Open for high-tier seeds and a chance at Comet Seed.",
    seeds: ["starfruit", "grape", "dragonfruit", "crystalBloom", "cometSeed", "stardustBean"]
  },
  starCrate: {
    id: "starCrate",
    type: "egg",
    name: "Star Crate",
    event: "galaxy",
    cost: 180,
    color: "#81d8e8",
    description: "Hatches into a rare cosmic pet.",
    hatchPets: ["owl", "phoenix", "lotusSpirit", "mutationMoth"]
  },
  snowLantern: { id: "snowLantern", type: "gear", itemId: "snowLantern", event: "christmas", cost: 110 },
  snowEgg: {
    id: "snowEgg",
    type: "egg",
    name: "Snow Egg",
    event: "christmas",
    cost: 150,
    color: "#b9e7ff",
    description: "Hatches into a winter pet.",
    hatchPets: ["snowSprite", "turtle", "frog"]
  },
  snowSprite: { id: "snowSprite", type: "pet", petId: "snowSprite", event: "christmas", cost: 560 },
  zenRake: { id: "zenRake", type: "gear", itemId: "zenRake", event: "zen", cost: 130 },
  everberry: { id: "everberry", type: "seed", itemId: "everberry", event: "zen", cost: 155 },
  lotusSpirit: { id: "lotusSpirit", type: "pet", petId: "lotusSpirit", event: "zen", cost: 620 },
  zenSeedPack: {
    id: "zenSeedPack",
    type: "pack",
    name: "Zen Seed Pack",
    event: "zen",
    cost: 100,
    color: "#e6a7ca",
    description: "Open for calm seeds and a chance at Everberry.",
    seeds: ["carrot", "berry", "melon", "starfruit", "everberry", "bambooHeart"]
  },
  lotusBell: {
    id: "lotusBell",
    type: "cosmetic",
    name: "Lotus Bell",
    event: "zen",
    cost: 135,
    color: "#e6a7ca",
    description: "Adds a calm lotus bell cosmetic to your garden."
  }
};

const events = [
  {
    id: "drizzle",
    name: "Spring Drizzle",
    description: "Crops grow 35% faster while the rain lasts.",
    sky: "#445c55",
    growthMultiplier: 1.35,
    saleMultiplier: 1,
    exclusiveShop: ["drizzleSeedPack", "rainEgg"],
    tasks: [
      { id: "plant", label: "Plant 5 seeds", target: 5, reward: 18 },
      { id: "water", label: "Water 4 crops", target: 4, reward: 14 }
    ]
  },
  {
    id: "market",
    name: "Market Rush",
    description: "Fruit sells for 30% more until the shop rotates.",
    sky: "#5f5142",
    growthMultiplier: 1,
    saleMultiplier: 1.3,
    exclusiveShop: ["marketSeedPack", "merchantEgg"],
    tasks: [
      { id: "harvest", label: "Harvest 6 fruits", target: 6, reward: 24 },
      { id: "sell", label: "Sell fruit twice", target: 2, reward: 18 }
    ]
  },
  {
    id: "sun",
    name: "Sun Bloom",
    description: "Watered plants grow twice as fast.",
    sky: "#69603c",
    growthMultiplier: 1,
    wateredMultiplier: 2,
    saleMultiplier: 1,
    exclusiveShop: ["sunSeedPack", "solarEgg"],
    tasks: [
      { id: "water", label: "Water 6 crops", target: 6, reward: 22 },
      { id: "plant", label: "Plant 4 seeds", target: 4, reward: 14 }
    ]
  },
  {
    id: "moon",
    name: "Moon Sprout",
    description: "Rare seeds are discounted by 20%.",
    sky: "#3f4664",
    growthMultiplier: 1,
    saleMultiplier: 1,
    rareDiscount: 0.8,
    exclusiveShop: ["moonSeedPack", "moonEgg"],
    tasks: [
      { id: "buy", label: "Buy 3 shop items", target: 3, reward: 20 },
      { id: "harvest", label: "Harvest 3 fruits", target: 3, reward: 16 }
    ]
  },
  {
    id: "festival",
    name: "Petal Festival",
    description: "Tasks pay double petals, and petals buy pets.",
    sky: "#61485e",
    growthMultiplier: 1.1,
    saleMultiplier: 1,
    taskMultiplier: 2,
    exclusiveShop: ["festivalSeedPack", "petalEgg"],
    tasks: [
      { id: "plant", label: "Plant 8 seeds", target: 8, reward: 24 },
      { id: "sell", label: "Sell fruit once", target: 1, reward: 20 }
    ]
  },
  {
    id: "meteor",
    name: "Meteor Mulch",
    description: "Fertilizer is stronger and all crops sell for 15% more.",
    sky: "#5c413f",
    growthMultiplier: 1,
    saleMultiplier: 1.15,
    fertilizerBonus: 1.35,
    exclusiveShop: ["meteorSeedPack", "meteorSprinkler"],
    tasks: [
      { id: "fertilize", label: "Fertilize 3 crops", target: 3, reward: 18 },
      { id: "harvest", label: "Harvest 5 fruits", target: 5, reward: 20 }
    ]
  },
  {
    id: "frost",
    name: "Frost Bloom",
    description: "Crystal Bloom and Dragonfruit sell for 45% more.",
    sky: "#536a70",
    growthMultiplier: 0.9,
    saleMultiplier: 1,
    premiumSeeds: ["crystalBloom", "dragonfruit"],
    premiumMultiplier: 1.45,
    exclusiveShop: ["frostSeedPack", "frostEgg"],
    tasks: [
      { id: "buy", label: "Buy 4 shop items", target: 4, reward: 26 },
      { id: "premiumHarvest", label: "Harvest 4 premium fruits", target: 4, reward: 32 }
    ]
  },
  {
    id: "bug",
    name: "Lucky Bug Hunt",
    description: "Planting seeds has a small chance to earn bonus petals.",
    sky: "#4f5f3d",
    growthMultiplier: 1.15,
    saleMultiplier: 1,
    plantingPetalChance: 0.18,
    exclusiveShop: ["bugSeedPack", "bugEgg"],
    tasks: [
      { id: "plant", label: "Plant 10 seeds", target: 10, reward: 28 },
      { id: "water", label: "Water 5 crops", target: 5, reward: 18 }
    ]
  },
  {
    id: "honey",
    name: "Honey Harvest",
    description: "Turn in fruits for honey. Honey buys exclusive bee gear and pets.",
    sky: "#66552d",
    growthMultiplier: 1.05,
    saleMultiplier: 1,
    mutation: "honeyed",
    mutationChance: 0.3,
    currencyLabel: "honey",
    turnInLabel: "Turn In Fruit for Honey",
    turnInRate: 16,
    exclusiveShop: ["honeySprout", "sugarCane", "honeySeedPack", "honeyGlazer", "honeyEgg", "queenBee"],
    tasks: [
      { id: "turnIn", label: "Turn in fruit twice", target: 2, reward: 32 },
      { id: "harvest", label: "Harvest 8 fruits", target: 8, reward: 24 }
    ]
  },
  {
    id: "christmas",
    name: "Christmas Garden",
    description: "Turn in fruits for snowflakes and buy winter rewards.",
    sky: "#4d6470",
    growthMultiplier: 0.95,
    saleMultiplier: 1.2,
    mutation: "frozen",
    mutationChance: 0.28,
    currencyLabel: "snowflakes",
    turnInLabel: "Wrap Fruit Gifts",
    turnInRate: 18,
    exclusiveShop: ["snowLantern", "snowEgg", "snowSprite"],
    tasks: [
      { id: "turnIn", label: "Wrap 3 fruit gifts", target: 3, reward: 36 },
      { id: "buy", label: "Buy 3 shop items", target: 3, reward: 22 }
    ]
  },
  {
    id: "zen",
    name: "Zen Garden",
    description: "Turn in fruit offerings for chi and unlock calm garden boosts.",
    sky: "#56664f",
    growthMultiplier: 1.25,
    saleMultiplier: 1,
    mutation: "zen",
    mutationChance: 0.24,
    currencyLabel: "chi",
    turnInLabel: "Offer Fruit for Chi",
    turnInRate: 20,
    exclusiveShop: ["everberry", "zenSeedPack", "zenRake", "lotusSpirit", "lotusBell"],
    tasks: [
      { id: "turnIn", label: "Make 2 fruit offerings", target: 2, reward: 34 },
      { id: "plant", label: "Plant 7 seeds", target: 7, reward: 21 }
    ]
  },
  {
    id: "disco",
    name: "Disco Fever",
    description: "Crops can become Disco mutations worth huge money. Everything pulses.",
    sky: "#412f5f",
    growthMultiplier: 1.4,
    saleMultiplier: 1,
    mutation: "disco",
    mutationChance: 0.2,
    exclusiveShop: ["discoSeed", "discoSeedPack", "discoBall"],
    tasks: [
      { id: "mutatedHarvest", label: "Harvest 3 mutated fruits", target: 3, reward: 42 },
      { id: "plant", label: "Plant 9 seeds", target: 9, reward: 24 }
    ]
  },
  {
    id: "bloodMoon",
    name: "Blood Moon",
    description: "Slow, rare, and valuable. Lunar crops can appear under the red sky.",
    sky: "#54272b",
    growthMultiplier: 0.8,
    saleMultiplier: 1.35,
    mutation: "lunar",
    mutationChance: 0.18,
    exclusiveShop: ["nightSeed", "nightSeedPack", "moonLamp"],
    tasks: [
      { id: "mutatedHarvest", label: "Harvest 2 lunar or mutated fruits", target: 2, reward: 46 },
      { id: "sell", label: "Sell during Blood Moon", target: 1, reward: 30 }
    ]
  },
  {
    id: "galaxy",
    name: "Galaxy Shower",
    description: "Starfalls can create Galactic crops, the most valuable mutation.",
    sky: "#29385d",
    growthMultiplier: 1.15,
    saleMultiplier: 1.1,
    mutation: "galactic",
    mutationChance: 0.14,
    exclusiveShop: ["cometSeed", "galaxySeedPack", "mutationMoth", "starCrate"],
    tasks: [
      { id: "mutatedHarvest", label: "Harvest 2 galactic fruits", target: 2, reward: 60 },
      { id: "water", label: "Water 8 crops", target: 8, reward: 26 }
    ]
  }
];

const weatherTypes = [
  {
    id: "sunny",
    name: "Sunny",
    description: "Steady garden weather.",
    skyTint: "rgba(255, 221, 119, 0.08)",
    growthMultiplier: 1,
    mutation: null,
    mutationChance: 0
  },
  {
    id: "rain",
    name: "Rain",
    description: "Rain can make crops Wet and grow faster.",
    skyTint: "rgba(104, 165, 210, 0.2)",
    growthMultiplier: 1.2,
    mutation: "wet",
    mutationChance: 0.28
  },
  {
    id: "hail",
    name: "Hail",
    description: "Hail can freeze crops into valuable Frozen fruit.",
    skyTint: "rgba(210, 235, 245, 0.24)",
    growthMultiplier: 0.82,
    mutation: "frozen",
    mutationChance: 0.2
  },
  {
    id: "fog",
    name: "Fog",
    description: "Fog slightly slows growth but improves rare mutation odds.",
    skyTint: "rgba(190, 200, 188, 0.18)",
    growthMultiplier: 0.92,
    mutation: "golden",
    mutationChance: 0.08
  },
  {
    id: "heatwave",
    name: "Heatwave",
    description: "Heat speeds growth but crops stay smaller without sprinklers.",
    skyTint: "rgba(240, 135, 50, 0.16)",
    growthMultiplier: 1.35,
    mutation: "giant",
    mutationChance: 0.06,
    sizePenalty: 0.9
  }
];

const plot = {
  cols: 9,
  rows: 6,
  marginX: 90,
  marginY: 76,
  gap: 10
};

const defaultState = {
  coins: 150,
  eventCoins: 0,
  devMode: false,
  startedAt: Date.now(),
  selectedSlot: 0,
  shopTab: "seeds",
  messageTime: 0,
  lastTime: performance.now(),
  lastSavedAt: Date.now(),
  eventDuration: 10 * 60 * 1000,
  eventIndex: Math.floor(Date.now() / (10 * 60 * 1000)) % events.length,
  eventSlot: Math.floor(Date.now() / (10 * 60 * 1000)),
  eventStartedAt: Date.now(),
  weatherDuration: 3 * 60 * 1000,
  weatherIndex: Math.floor(Date.now() / (3 * 60 * 1000)) % weatherTypes.length,
  weatherSlot: Math.floor(Date.now() / (3 * 60 * 1000)),
  plotCols: 5,
  plotRows: 4,
  shopOpen: true,
  inventoryTab: "seeds",
  taskProgress: {},
  claimedTasks: {},
  inventory: {},
  seedBag: { carrot: 2, berry: 1, tomato: 1 },
  gearBag: {},
  ownedPets: [],
  equippedPet: null,
  placedPets: [],
  petEggs: [],
  petCapacity: 3,
  petTab: "pets",
  ownedCosmetics: [],
  equippedCosmetic: null,
  sprinklers: [],
  lastPetMutationAt: Date.now(),
  packOpening: false,
  hoverCell: -1,
  hotbar: [
    { type: "seed", id: "carrot" },
    { type: "seed", id: "berry" },
    { type: "seed", id: "tomato" },
    { type: "gear", id: "fertilizer" },
    { type: "gear", id: "harvestGlove" },
    null,
    null,
    null
  ],
  cells: Array.from({ length: plot.cols * plot.rows }, () => null)
};

const state = loadState();
const offlineReport = applyOfflineGrowth();

function currentSlot() {
  return Math.floor(Date.now() / state.eventDuration);
}

function currentEvent() {
  const slot = currentSlot();
  state.eventIndex = slot % events.length;
  state.eventSlot = slot;
  state.eventStartedAt = slot * state.eventDuration;
  return events[state.eventIndex];
}

function currentWeather() {
  const slot = Math.floor(Date.now() / state.weatherDuration);
  state.weatherIndex = slot % weatherTypes.length;
  state.weatherSlot = slot;
  return weatherTypes[state.weatherIndex];
}

function cloneDefaultState() {
  return JSON.parse(JSON.stringify(defaultState));
}

function loadState() {
  const base = cloneDefaultState();
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw);
    const merged = {
      ...base,
      ...saved,
      seedBag: { ...base.seedBag, ...(saved.seedBag || {}) },
      gearBag: { ...base.gearBag, ...(saved.gearBag || {}) },
      inventory: { ...(saved.inventory || {}) },
      taskProgress: { ...(saved.taskProgress || {}) },
      claimedTasks: { ...(saved.claimedTasks || {}) },
      hotbar: Array.isArray(saved.hotbar) ? saved.hotbar.slice(0, 8) : base.hotbar,
      cells: Array.isArray(saved.cells) ? saved.cells.slice(0, plot.cols * plot.rows) : base.cells,
      ownedPets: Array.isArray(saved.ownedPets) ? saved.ownedPets : [],
      placedPets: Array.isArray(saved.placedPets) ? saved.placedPets : [],
      petEggs: Array.isArray(saved.petEggs) ? saved.petEggs : [],
      petCapacity: saved.petCapacity || base.petCapacity,
      petTab: saved.petTab || "pets",
      ownedCosmetics: Array.isArray(saved.ownedCosmetics) ? saved.ownedCosmetics : [],
      equippedCosmetic: saved.equippedCosmetic || null,
      sprinklers: Array.isArray(saved.sprinklers) ? saved.sprinklers : [],
      lastPetMutationAt: saved.lastPetMutationAt || Date.now(),
      packOpening: false,
      plotCols: saved.plotCols || base.plotCols,
      plotRows: saved.plotRows || base.plotRows,
      shopOpen: saved.shopOpen !== false,
      inventoryTab: saved.inventoryTab || "seeds"
    };
    while (merged.hotbar.length < 8) merged.hotbar.push(null);
    while (merged.cells.length < plot.cols * plot.rows) merged.cells.push(null);
    return merged;
  } catch (error) {
    console.warn("Save data could not be loaded.", error);
    return base;
  }
}

function saveState() {
  state.lastSavedAt = Date.now();
  const saveable = {
    coins: state.coins,
    eventCoins: state.eventCoins,
    devMode: state.devMode,
    startedAt: state.startedAt,
    selectedSlot: state.selectedSlot,
    shopTab: state.shopTab,
    lastSavedAt: state.lastSavedAt,
    eventDuration: state.eventDuration,
    taskProgress: state.taskProgress,
    claimedTasks: state.claimedTasks,
    inventory: state.inventory,
    seedBag: state.seedBag,
    gearBag: state.gearBag,
    ownedPets: state.ownedPets,
    equippedPet: state.equippedPet,
    placedPets: state.placedPets,
    petEggs: state.petEggs,
    petCapacity: state.petCapacity,
    petTab: state.petTab,
    ownedCosmetics: state.ownedCosmetics,
    equippedCosmetic: state.equippedCosmetic,
    sprinklers: state.sprinklers,
    lastPetMutationAt: state.lastPetMutationAt,
    plotCols: state.plotCols,
    plotRows: state.plotRows,
    shopOpen: state.shopOpen,
    inventoryTab: state.inventoryTab,
    hotbar: state.hotbar,
    cells: state.cells
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveable));
}

function petBonus() {
  return state.placedPets[0] ? pets[state.placedPets[0].petId] : null;
}

function growthBonus() {
  return hasActivePet("fox") ? 1.2 : 1;
}

function saleBonus() {
  let bonus = hasActivePet("bee") ? 1.15 : 1;
  if (hasActivePet("phoenix")) {
    bonus *= 1.2;
  }
  return bonus;
}

function taskRewardBonus() {
  return hasActivePet("owl") ? 1.25 : 1;
}

function offlineLimitSeconds() {
  return hasActivePet("turtle") ? 8 * 60 * 60 : 5 * 60 * 60;
}

function applyOfflineGrowth() {
  const now = Date.now();
  const lastSavedAt = Number(state.lastSavedAt) || now;
  const elapsed = Math.max(0, Math.min((now - lastSavedAt) / 1000, offlineLimitSeconds()));
  if (elapsed < 5) return null;

  let readyBefore = 0;
  let readyAfter = 0;
  state.cells.forEach((plant) => {
    if (!plant) return;
    if (plant.progress >= plant.growTime) readyBefore += 1;
    plant.progress = Math.min(plant.growTime, plant.progress + elapsed * 0.65 * growthBonus());
    plant.watered = Math.max(0, (plant.watered || 0) - elapsed);
    if (plant.progress >= plant.growTime) readyAfter += 1;
  });

  return {
    minutes: Math.floor(elapsed / 60),
    matured: Math.max(0, readyAfter - readyBefore)
  };
}

function formatTime(ms) {
  const total = Math.max(0, Math.ceil(ms / 1000));
  const minutes = String(Math.floor(total / 60)).padStart(2, "0");
  const seconds = String(total % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function setStatus(text) {
  ui.status.textContent = text;
  state.messageTime = 4;
}

function taskKey(eventId, taskId) {
  return `${state.eventSlot}:${eventId}:${taskId}`;
}

function taskProgress(key) {
  return state.taskProgress[key] || 0;
}

function addTaskProgress(action, amount = 1) {
  const event = currentEvent();
  let changed = false;
  const gained = hasActivePet("lotusSpirit") && Math.random() < 0.2 ? amount + 1 : amount;
  event.tasks.forEach((task) => {
    if (task.id !== action) return;
    const key = taskKey(event.id, task.id);
    state.taskProgress[key] = Math.min(task.target, taskProgress(key) + gained);
    changed = true;
  });
  if (changed) {
    saveState();
  }
}

function claimTask(eventId, task) {
  const key = taskKey(eventId, task.id);
  if (state.claimedTasks[key] || taskProgress(key) < task.target) return;
  const event = events.find((candidate) => candidate.id === eventId) || currentEvent();
  const reward = Math.round(task.reward * (event.taskMultiplier || 1) * taskRewardBonus());
  state.eventCoins += reward;
  state.claimedTasks[key] = true;
  setStatus(`Task complete. Earned ${reward} petals.`);
  saveState();
  renderUi();
}

function cropValue() {
  return Object.entries(state.inventory).reduce((sum, [id, count]) => {
    const fruit = parseFruitKey(id);
    return fruit.seed ? sum + baseFruitValue(fruit) * count : sum;
  }, 0);
}

function sellMultiplier() {
  return currentEvent().saleMultiplier * saleBonus();
}

function eventCurrencyName() {
  return currentEvent().currencyLabel || "petals";
}

function cropSellValue(id, count) {
  const event = currentEvent();
  const fruit = parseFruitKey(id);
  if (!fruit.seed) return 0;
  let multiplier = sellMultiplier();
  if (event.premiumSeeds && event.premiumSeeds.includes(fruit.seedId)) {
    multiplier *= event.premiumMultiplier || 1;
  }
  return Math.round(baseFruitValue(fruit) * count * multiplier);
}

function baseFruitValue(fruit) {
  return fruit.seed.value * 0.22 * fruit.mutation.multiplier * fruit.size * fruit.sellRoll;
}

function plantSellEstimate(plant) {
  const seed = seeds[plant.seedId];
  if (!seed) return 0;
  const fruit = {
    seed,
    seedId: plant.seedId,
    mutationId: plant.mutation || "normal",
    mutation: mutations[plant.mutation] || mutations.normal,
    size: plant.size || 1,
    sellRoll: plant.sellRoll || 1
  };
  return Math.round(baseFruitValue(fruit) * sellMultiplier());
}

function fruitKey(seedId, mutationId = "normal", size = 1, sellRoll = 1) {
  const compactSize = Math.max(0.5, Math.min(3, size)).toFixed(2);
  const compactRoll = Math.max(0.65, Math.min(1.35, sellRoll)).toFixed(2);
  return `${seedId}:${mutationId || "normal"}:${compactSize}:${compactRoll}`;
}

function parseFruitKey(key) {
  const [seedId, mutationId = "normal", size = "1", sellRoll = "1"] = key.split(":");
  return {
    seedId,
    mutationId,
    seed: seeds[seedId],
    mutation: mutations[mutationId] || mutations.normal,
    size: Number(size) || 1,
    sellRoll: Number(sellRoll) || 1
  };
}

function fruitName(seedId, mutationId = "normal") {
  const seed = seeds[seedId];
  const mutation = mutations[mutationId] || mutations.normal;
  return `${mutation.name ? `${mutation.name} ` : ""}${seed.crop}`;
}

function addFruitFromPlant(plant) {
  const mutationId = plant.mutation || "normal";
  const key = fruitKey(plant.seedId, mutationId, plant.size || 1, plant.sellRoll || 1);
  state.inventory[key] = (state.inventory[key] || 0) + (plant.glazed ? 2 : 1);
  if (mutationId !== "normal") {
    addTaskProgress("mutatedHarvest");
  }
}

function rollMutation() {
  const event = currentEvent();
  const weather = currentWeather();
  if (weather.mutation && Math.random() < weather.mutationChance) {
    return weather.mutation;
  }
  if (event.mutation && Math.random() < event.mutationChance) {
    return event.mutation;
  }
  const roll = Math.random();
  if (roll < 0.025) return "golden";
  if (roll < 0.055) return "giant";
  return "normal";
}

function seedDefaultMutation(seedId) {
  if (seedId === "honeySprout") return "honeyed";
  if (seedId === "sugarCane") return "honeyed";
  if (seedId === "nectarBloom") return "honeyed";
  if (seedId === "discoSeed") return "disco";
  if (seedId === "mirrorMelon") return "disco";
  if (seedId === "nightSeed") return "lunar";
  if (seedId === "eclipsePepper") return "lunar";
  if (seedId === "cometSeed") return "galactic";
  if (seedId === "stardustBean") return "galactic";
  if (seedId === "everberry" || seedId === "bambooHeart") return "zen";
  return rollMutation();
}

function randomPlantSize(seedId) {
  const weather = currentWeather();
  const base = 0.78 + Math.random() * 0.58;
  const premium = ["pumpkin", "melon", "dragonfruit", "crystalBloom"].includes(seedId) ? 0.18 : 0;
  return Math.max(0.55, Math.min(2.6, (base + premium) * (weather.sizePenalty || 1)));
}

function randomSellRoll() {
  return 0.72 + Math.random() * 0.58;
}

function sprinklerInfluence(index) {
  if (!Array.isArray(state.sprinklers)) return 0;
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  return state.sprinklers.some((sprinkler) => {
    const sx = sprinkler.index % plot.cols;
    const sy = Math.floor(sprinkler.index / plot.cols);
    return Math.abs(sx - col) <= 1 && Math.abs(sy - row) <= 1;
  }) ? 1 : 0;
}

function activeCols() {
  return Math.min(plot.cols, state.plotCols || 5);
}

function activeRows() {
  return Math.min(plot.rows, state.plotRows || 4);
}

function isUnlockedCell(index) {
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  return col < activeCols() && row < activeRows();
}

function hasActivePet(id) {
  return state.placedPets.some((pet) => pet.petId === id);
}

function activePetCount() {
  return state.placedPets.length;
}

function petIsPlaced(id) {
  return state.placedPets.some((pet) => pet.petId === id);
}

function petPosition(pet, time) {
  const phase = pet.phase || 0;
  const t = time / 1000 + phase;
  const col = Math.max(0, Math.min(activeCols() - 1, (pet.homeIndex ?? 0) % plot.cols));
  const row = Math.max(0, Math.min(activeRows() - 1, Math.floor((pet.homeIndex ?? 0) / plot.cols)));
  const b = cellBounds(row * plot.cols + col);
  return {
    x: b.x + b.w / 2 + Math.sin(t * 0.8) * b.w * 0.45,
    y: b.y + b.h / 2 + Math.cos(t * 0.65) * b.h * 0.35
  };
}

function petAgeText(pet) {
  const elapsed = Math.max(0, Date.now() - (pet.placedAt || Date.now()));
  const minutes = Math.floor(elapsed / 60000);
  if (minutes < 1) return "Baby";
  if (minutes < 10) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  return hours ? `${hours}h ${minutes % 60}m` : `${minutes}m`;
}

function countBagItem(type, id) {
  return type === "seed" ? state.seedBag[id] || 0 : state.gearBag[id] || 0;
}

function activeItem() {
  cleanHotbar();
  return state.hotbar[state.selectedSlot];
}

function itemData(item) {
  if (!item) return null;
  return item.type === "seed" ? seeds[item.id] : gear[item.id];
}

function buyPrice(item) {
  const event = currentEvent();
  if (item.id === "starfruit" && event.rareDiscount) {
    return Math.ceil(item.cost * event.rareDiscount);
  }
  return item.cost;
}

function canShowEventItem(item) {
  return !item.eventOnly;
}

function exclusiveData(exclusive) {
  if (exclusive.type === "seed") return seeds[exclusive.itemId];
  if (exclusive.type === "gear") return gear[exclusive.itemId];
  if (exclusive.type === "pet") return pets[exclusive.petId];
  return exclusive;
}

function ownedExclusive(exclusive) {
  if (exclusive.type === "cosmetic") return state.ownedCosmetics.includes(exclusive.id);
  return false;
}

function addToHotbar(type, id) {
  cleanHotbar();
  const existing = state.hotbar.findIndex((slot) => slot && slot.type === type && slot.id === id);
  if (existing >= 0) {
    state.selectedSlot = existing;
    return;
  }
  const empty = state.hotbar.findIndex((slot) => !slot);
  if (empty >= 0) {
    state.hotbar[empty] = { type, id };
    state.selectedSlot = empty;
    return true;
  }
  return false;
}

function cleanHotbar() {
  state.hotbar = state.hotbar.map((slot) => {
    if (!slot || !itemData(slot) || countBagItem(slot.type, slot.id) <= 0) return null;
    return slot;
  });
  while (state.hotbar.length < 8) state.hotbar.push(null);
}

function buy(type, id) {
  const data = type === "seed" ? seeds[id] : gear[id];
  const price = buyPrice(data);
  const useEventCurrency = data.currency === "event";
  const wallet = useEventCurrency ? state.eventCoins : state.coins;
  if (!state.devMode && wallet < price) {
    setStatus(useEventCurrency ? `Not enough ${currentEvent().currencyLabel || "petals"}.` : "Not enough coins.");
    return;
  }

  if (state.devMode) {
    state.coins = Math.max(state.coins, 999999);
    state.eventCoins = Math.max(state.eventCoins, 999999);
  } else if (useEventCurrency) {
    state.eventCoins -= price;
  } else {
    state.coins -= price;
  }
  if (type === "seed") {
    state.seedBag[id] = (state.seedBag[id] || 0) + 1;
  } else {
    state.gearBag[id] = (state.gearBag[id] || 0) + data.uses;
  }
  addToHotbar(type, id);
  addTaskProgress("buy");
  setStatus(`${data.name} added to your hotbar.`);
  saveState();
  renderUi();
}

function buyPet(id) {
  const pet = pets[id];
  if (state.ownedPets.includes(id)) {
    togglePlacedPet(id);
    saveState();
    renderUi();
    return;
  }
  if (pet.eventOnly) {
    setStatus("Exclusive pets are bought from their event shop.");
    return;
  }
  if (state.devMode) {
    state.coins = Math.max(state.coins, 999999);
  } else if (state.coins >= pet.cost) {
    state.coins -= pet.cost;
  } else {
    setStatus("Not enough coins for that pet.");
    return;
  }
  state.ownedPets.push(id);
  placePet(id);
  setStatus(`${pet.name} joined your garden.`);
  saveState();
  renderUi();
}

function placePet(id) {
  if (petIsPlaced(id)) return true;
  if (activePetCount() >= state.petCapacity) {
    setStatus(`Pet limit reached (${activePetCount()}/${state.petCapacity}). Pick up a pet first.`);
    return false;
  }
  state.placedPets.push({
    petId: id,
    placedAt: Date.now(),
    homeIndex: Math.floor(Math.random() * Math.max(1, activeCols() * activeRows())),
    phase: Math.random() * 10
  });
  state.equippedPet = state.placedPets[0]?.petId || null;
  return true;
}

function pickupPet(id) {
  state.placedPets = state.placedPets.filter((pet) => pet.petId !== id);
  state.equippedPet = state.placedPets[0]?.petId || null;
}

function togglePlacedPet(id) {
  if (petIsPlaced(id)) {
    pickupPet(id);
    setStatus(`${pets[id].name} picked up.`);
  } else if (placePet(id)) {
    setStatus(`${pets[id].name} placed on your plot.`);
  }
}

function placeEgg(eggId) {
  const egg = state.petEggs.find((candidate) => candidate.id === eggId);
  if (!egg) return;
  const occupied = new Set([
    ...state.petEggs.filter((candidate) => candidate.plotIndex !== null).map((candidate) => candidate.plotIndex),
    ...state.placedPets.map((pet) => pet.homeIndex)
  ]);
  let target = -1;
  for (let row = 0; row < activeRows(); row += 1) {
    for (let col = 0; col < activeCols(); col += 1) {
      const index = row * plot.cols + col;
      if (!state.cells[index] && !occupied.has(index)) {
        target = index;
        break;
      }
    }
    if (target >= 0) break;
  }
  if (target < 0) {
    setStatus("No empty unlocked plot space for that egg.");
    return;
  }
  egg.plotIndex = target;
  egg.placedAt = Date.now();
  setStatus(`${egg.name} placed. It will hatch soon.`);
  saveState();
  renderUi();
}

function pickupEgg(eggId) {
  const egg = state.petEggs.find((candidate) => candidate.id === eggId);
  if (!egg) return;
  egg.plotIndex = null;
  egg.placedAt = null;
  setStatus(`${egg.name} picked up.`);
  saveState();
  renderUi();
}

function hatchPlacedEgg(eggId) {
  const egg = state.petEggs.find((candidate) => candidate.id === eggId);
  if (!egg) return;
  const petId = egg.hatchPets[Math.floor(Math.random() * egg.hatchPets.length)];
  if (!state.ownedPets.includes(petId)) {
    state.ownedPets.push(petId);
  }
  state.petEggs = state.petEggs.filter((candidate) => candidate.id !== eggId);
  placePet(petId);
  setStatus(`${egg.name} hatched into ${pets[petId].name}.`);
  saveState();
  renderUi();
}

function hatchEgg(exclusive) {
  const options = exclusive.hatchPets;
  const petId = options[Math.floor(Math.random() * options.length)];
  const pet = pets[petId];
  if (!state.ownedPets.includes(petId)) {
    state.ownedPets.push(petId);
  }
  placePet(petId);
  setStatus(`${exclusive.name} hatched into ${pet.name}.`);
}

function addEggToInventory(exclusive) {
  state.petEggs.push({
    id: `${exclusive.id}-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    eggId: exclusive.id,
    name: exclusive.name,
    color: exclusive.color,
    hatchPets: exclusive.hatchPets,
    hatchSeconds: exclusive.hatchSeconds || 90,
    placedAt: null,
    plotIndex: null
  });
  setStatus(`${exclusive.name} added to your pet eggs.`);
}

function openSeedPack(exclusive) {
  if (state.packOpening) return;
  state.packOpening = true;
  const pool = exclusive.seeds.filter((id) => seeds[id]);
  const winner = pool[Math.floor(Math.random() * pool.length)];
  const track = [];
  for (let i = 0; i < 18; i += 1) {
    track.push(pool[i % pool.length]);
  }
  track.push(winner);
  ui.seedPackRoller.classList.add("active");
  ui.seedPackRoller.innerHTML = `<div class="seed-pack-track">${track.map((id, index) => `<div class="seed-pack-tile${index === track.length - 1 ? " winner" : ""}">${seeds[id].name}</div>`).join("")}</div>`;
  const trackEl = ui.seedPackRoller.querySelector(".seed-pack-track");
  requestAnimationFrame(() => {
    trackEl.style.transform = `translateX(-${Math.max(0, (track.length - 3) * 98)}px)`;
  });
  window.setTimeout(() => {
    state.seedBag[winner] = (state.seedBag[winner] || 0) + 1;
    const equipped = addToHotbar("seed", winner);
    state.packOpening = false;
    setStatus(`${exclusive.name} opened: ${seeds[winner].name}${equipped ? "." : " in inventory."}`);
    saveState();
    renderUi();
    ui.seedPackRoller.classList.add("active");
  }, 1250);
}

function buyExclusive(id) {
  const exclusive = exclusiveItems[id];
  if (state.packOpening && exclusive && exclusive.type === "pack") {
    setStatus("Wait for this seed pack to finish opening.");
    return;
  }
  if (!exclusive || exclusive.event !== currentEvent().id) {
    setStatus("That exclusive is not available right now.");
    return;
  }
  if (!state.devMode && state.eventCoins < exclusive.cost) {
    setStatus(`Earn more ${eventCurrencyName()} from this event.`);
    return;
  }

  if (state.devMode) {
    state.eventCoins = Math.max(state.eventCoins, 999999);
  } else {
    state.eventCoins -= exclusive.cost;
  }
  if (exclusive.type === "seed") {
    state.seedBag[exclusive.itemId] = (state.seedBag[exclusive.itemId] || 0) + 1;
    addToHotbar("seed", exclusive.itemId);
    setStatus(`${seeds[exclusive.itemId].name} added to your hotbar.`);
  } else if (exclusive.type === "gear") {
    const item = gear[exclusive.itemId];
    state.gearBag[exclusive.itemId] = (state.gearBag[exclusive.itemId] || 0) + item.uses;
    addToHotbar("gear", exclusive.itemId);
    setStatus(`${item.name} added to your hotbar.`);
  } else if (exclusive.type === "egg") {
    addEggToInventory(exclusive);
  } else if (exclusive.type === "pack") {
    openSeedPack(exclusive);
  } else if (exclusive.type === "cosmetic") {
    if (!state.ownedCosmetics.includes(exclusive.id)) {
      state.ownedCosmetics.push(exclusive.id);
    }
    state.equippedCosmetic = state.equippedCosmetic === exclusive.id ? null : exclusive.id;
    setStatus(state.equippedCosmetic ? `${exclusive.name} equipped.` : `${exclusive.name} unequipped.`);
  } else if (exclusive.type === "pet") {
    if (!state.ownedPets.includes(exclusive.petId)) {
      state.ownedPets.push(exclusive.petId);
    }
    placePet(exclusive.petId);
    setStatus(`${pets[exclusive.petId].name} joined your garden.`);
  }

  if (exclusive.type !== "pack") {
    saveState();
    renderUi();
  }
}

function turnInFruitForEventCurrency() {
  const event = currentEvent();
  if (!event.turnInRate) {
    setStatus("This event has tasks instead of fruit turn-ins.");
    return;
  }
  const base = cropValue();
  if (base <= 0) {
    setStatus("Harvest fruit before turning it in.");
    return;
  }
  const bonus = hasActivePet("queenBee") ? 1.35 : 1;
  const earned = Math.max(1, Math.round((base / event.turnInRate) * bonus));
  state.inventory = {};
  state.eventCoins += earned;
  addTaskProgress("turnIn");
  setStatus(`Turned in fruit for ${earned} ${eventCurrencyName()}.`);
  saveState();
  renderUi();
}

function sellAll() {
  const base = cropValue();
  if (base <= 0) {
    setStatus("Harvest crops before selling.");
    return;
  }
  const total = Object.entries(state.inventory).reduce((sum, [id, count]) => sum + cropSellValue(id, count), 0);
  state.coins += total;
  state.inventory = {};
  addTaskProgress("sell");
  setStatus(`Sold your fruit for ${total} coins.`);
  saveState();
  renderUi();
}

function restock() {
  if (!state.devMode && state.coins < 10) {
    setStatus("Restocking costs 10 coins.");
    return;
  }
  state.seedBag.carrot = (state.seedBag.carrot || 0) + 2;
  state.seedBag.berry = (state.seedBag.berry || 0) + 1;
  if (hasActivePet("snowSprite")) {
    const ids = Object.keys(seeds);
    const id = ids[Math.floor(Math.random() * ids.length)];
    state.seedBag[id] = (state.seedBag[id] || 0) + 1;
  }
  if (state.devMode) {
    state.coins = Math.max(state.coins, 999999);
  } else {
    state.coins -= 10;
  }
  addToHotbar("seed", "carrot");
  setStatus("The seed shelf restocked.");
  saveState();
  renderUi();
}

function expandPlot() {
  const cols = activeCols();
  const rows = activeRows();
  if (cols >= plot.cols && rows >= plot.rows) {
    setStatus("Your plot is fully expanded.");
    return;
  }
  const nextCells = cols < plot.cols ? rows : cols;
  const cost = 450 + nextCells * 180;
  if (!state.devMode && state.coins < cost) {
    setStatus(`Plot expansion costs ${cost} coins.`);
    return;
  }
  if (!state.devMode) {
    state.coins -= cost;
  }
  if (cols < plot.cols) {
    state.plotCols = cols + 1;
  } else {
    state.plotRows = rows + 1;
  }
  setStatus(`Plot expanded to ${activeCols()} x ${activeRows()}.`);
  saveState();
  renderUi();
}

function useGear(id, index) {
  if ((state.gearBag[id] || 0) <= 0) {
    setStatus("Buy this gear before using it.");
    return;
  }

  if (id === "harvestGlove") {
    harvestArea(index);
    state.gearBag[id] -= 1;
    saveState();
    renderUi();
    return;
  }

  if (id === "sprinkler") {
    if (state.sprinklers.some((sprinkler) => sprinkler.index === index)) {
      setStatus("There is already a sprinkler there.");
      return;
    }
    state.sprinklers.push({ index, placedAt: Date.now() });
    state.gearBag[id] -= 1;
    setStatus("Sprinkler placed. Crops in its range grow bigger.");
    saveState();
    renderUi();
    return;
  }

  const plant = state.cells[index];
  if (!plant) {
    setStatus("Use gear on a planted crop.");
    return;
  }

  if (id === "wateringCan") {
    plant.watered = hasActivePet("frog") ? 28 : 14;
    plant.progress = Math.min(plant.growTime, plant.progress + 8);
    addTaskProgress("water");
    setStatus("Watered crop growth boosted.");
  }

  if (id === "fertilizer") {
    const event = currentEvent();
    plant.progress = Math.min(plant.growTime, plant.progress + plant.growTime * 0.38 * (event.fertilizerBonus || 1));
    plant.fertilized = true;
    addTaskProgress("fertilize");
    setStatus("Fertilizer kicked the crop forward.");
  }

  if (id === "growthTonic") {
    boostAllCrops();
    setStatus("Growth tonic boosted every planted crop.");
  }

  if (id === "seedScanner") {
    if (!scanFruitForSeeds(plant.seedId)) {
      renderUi();
      return;
    }
  }

  if (id === "honeyGlazer") {
    plant.glazed = true;
    plant.progress = Math.min(plant.growTime, plant.progress + plant.growTime * 0.22);
    setStatus("Honey glaze added extra value to that crop.");
  }

  if (id === "snowLantern") {
    chillArea(index);
    setStatus("Snow lantern chilled the patch forward.");
  }

  if (id === "zenRake") {
    state.cells.forEach((crop) => {
      if (crop) crop.progress = Math.max(crop.progress, crop.growTime * 0.5);
    });
    setStatus("Zen rake balanced the garden.");
  }

  state.gearBag[id] -= 1;
  saveState();
  cleanHotbar();
  renderUi();
}

function waterArea(index) {
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  let watered = 0;
  for (let y = row - 1; y <= row + 1; y += 1) {
    for (let x = col - 1; x <= col + 1; x += 1) {
      if (x < 0 || y < 0 || x >= plot.cols || y >= plot.rows) continue;
      const plant = state.cells[y * plot.cols + x];
      if (!plant) continue;
      plant.watered = hasActivePet("frog") ? 28 : 14;
      plant.progress = Math.min(plant.growTime, plant.progress + 5);
      watered += 1;
    }
  }
  if (watered) {
    addTaskProgress("water", watered);
  }
}

function boostAllCrops() {
  let boosted = 0;
  state.cells.forEach((plant) => {
    if (!plant) return;
    plant.progress = Math.min(plant.growTime, plant.progress + plant.growTime * 0.18);
    boosted += 1;
  });
  if (boosted) {
    addTaskProgress("fertilize", Math.min(3, boosted));
  }
}

function chillArea(index) {
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  for (let y = row - 1; y <= row + 1; y += 1) {
    for (let x = col - 1; x <= col + 1; x += 1) {
      if (x < 0 || y < 0 || x >= plot.cols || y >= plot.rows) continue;
      const plant = state.cells[y * plot.cols + x];
      if (plant) {
        plant.progress = Math.min(plant.growTime, plant.progress + plant.growTime * 0.3);
        plant.watered = 18;
      }
    }
  }
}

function scanFruitForSeeds(seedId) {
  const key = Object.keys(state.inventory).find((itemKey) => parseFruitKey(itemKey).seedId === seedId && state.inventory[itemKey] > 0);
  if (!key) {
    setStatus("Harvest that fruit before scanning it.");
    return false;
  }
  state.inventory[key] -= 1;
  state.seedBag[seedId] = (state.seedBag[seedId] || 0) + 3;
  addToHotbar("seed", seedId);
  setStatus(`Scanner converted one ${seeds[seedId].crop} into 3 seeds.`);
  return true;
}

function plantSeed(id, index) {
  if ((state.seedBag[id] || 0) <= 0) {
    setStatus("You are out of that seed.");
    return;
  }
  if (state.cells[index]) {
    harvestCell(index);
    return;
  }

  const seed = seeds[id];
  state.seedBag[id] -= 1;
  if (hasActivePet("squirrel") && Math.random() < 0.18) {
    state.seedBag[id] += 1;
    setStatus("Seed Squirrel saved a seed.");
  }
  state.cells[index] = {
    seedId: id,
    mutation: seedDefaultMutation(id),
    progress: 0,
    growTime: seed.growTime,
    watered: 0,
    fertilized: false,
    size: randomPlantSize(id),
    sellRoll: randomSellRoll(),
    regrow: Boolean(seed.regrow),
    sway: Math.random() * Math.PI * 2
  };
  addTaskProgress("plant");
  const planted = state.cells[index];
  if (currentEvent().plantingPetalChance && Math.random() < currentEvent().plantingPetalChance) {
    state.eventCoins += 3;
    setStatus(`${seed.name} planted. Lucky bug found 3 petals.`);
  } else if (planted.mutation && planted.mutation !== "normal") {
    setStatus(`${mutations[planted.mutation].name} ${seed.name} mutation sprouted.`);
  } else if (state.messageTime <= 0) {
    setStatus(`${seed.name} planted.`);
  }
  saveState();
  cleanHotbar();
  renderUi();
}

function harvestCell(index) {
  const plant = state.cells[index];
  if (!plant) return false;
  if (plant.progress < plant.growTime) {
    setStatus("That crop is still growing.");
    return false;
  }
  addFruitFromPlant(plant);
  if (plant.regrow) {
    plant.progress = 0;
    plant.watered = 0;
    plant.mutation = seedDefaultMutation(plant.seedId);
    plant.size = Math.max(0.7, randomPlantSize(plant.seedId) * 0.92);
    plant.sellRoll = randomSellRoll();
  } else {
    state.cells[index] = null;
  }
  addTaskProgress("harvest");
  if (currentEvent().premiumSeeds && currentEvent().premiumSeeds.includes(plant.seedId)) {
    addTaskProgress("premiumHarvest");
  }
  setStatus(plant.regrow ? `${seeds[plant.seedId].name} harvested and will regrow.` : `${fruitName(plant.seedId, plant.mutation)} harvested.`);
  saveState();
  renderUi();
  return true;
}

function harvestArea(index) {
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  let harvested = 0;
  for (let y = row - 1; y <= row + 1; y += 1) {
    for (let x = col - 1; x <= col + 1; x += 1) {
      if (x < 0 || y < 0 || x >= plot.cols || y >= plot.rows) continue;
      const i = y * plot.cols + x;
      const plant = state.cells[i];
      if (plant && plant.progress >= plant.growTime) {
        addFruitFromPlant(plant);
        if (plant.regrow) {
          plant.progress = 0;
          plant.watered = 0;
          plant.mutation = seedDefaultMutation(plant.seedId);
          plant.size = Math.max(0.7, randomPlantSize(plant.seedId) * 0.92);
          plant.sellRoll = randomSellRoll();
        } else {
          state.cells[i] = null;
        }
        harvested += 1;
        if (currentEvent().premiumSeeds && currentEvent().premiumSeeds.includes(plant.seedId)) {
          addTaskProgress("premiumHarvest");
        }
      }
    }
  }
  if (harvested) {
    addTaskProgress("harvest", harvested);
  }
  setStatus(harvested ? `Harvested ${harvested} ready crops.` : "No ready crops in range.");
}

function handlePlotClick(index) {
  if (!isUnlockedCell(index)) {
    setStatus("Expand your plot in the shop to use that soil.");
    return;
  }
  const egg = state.petEggs.find((candidate) => candidate.plotIndex === index);
  if (egg) {
    const elapsed = (Date.now() - (egg.placedAt || Date.now())) / 1000;
    if (elapsed >= egg.hatchSeconds) {
      hatchPlacedEgg(egg.id);
    } else {
      setStatus(`${egg.name} hatches in ${Math.ceil(egg.hatchSeconds - elapsed)}s.`);
    }
    return;
  }
  const plant = state.cells[index];
  if (plant && plant.progress >= plant.growTime) {
    harvestCell(index);
    return;
  }

  const item = activeItem();
  if (!item) {
    setStatus("Pick something from the hotbar.");
    return;
  }
  if (item.type === "seed") {
    plantSeed(item.id, index);
  } else {
    useGear(item.id, index);
  }
}

function resetProgress() {
  const ok = window.confirm("Reset all progress, fruits, pets, coins, and planted crops?");
  if (!ok) return;
  localStorage.removeItem(SAVE_KEY);
  const fresh = cloneDefaultState();
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, fresh);
  setStatus("Progress reset.");
  saveState();
  renderUi();
}

function cellAt(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const sx = canvas.width / rect.width;
  const sy = canvas.height / rect.height;
  const x = (clientX - rect.left) * sx;
  const y = (clientY - rect.top) * sy;
  const cellW = (canvas.width - plot.marginX * 2 - plot.gap * (plot.cols - 1)) / plot.cols;
  const cellH = (canvas.height - plot.marginY * 2 - plot.gap * (plot.rows - 1)) / plot.rows;

  state.sprinklers.forEach((sprinkler) => {
    if (!isUnlockedCell(sprinkler.index)) return;
    const b = cellBounds(sprinkler.index);
    const rangeX = b.x - cellW - plot.gap;
    const rangeY = b.y - cellH - plot.gap;
    ctx.fillStyle = "rgba(110, 183, 216, 0.12)";
    drawRoundedRect(rangeX, rangeY, cellW * 3 + plot.gap * 2, cellH * 3 + plot.gap * 2, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(110, 183, 216, 0.42)";
    ctx.lineWidth = 2;
    ctx.stroke();
  });

  const selected = activeItem();
  if (selected && selected.type === "gear" && selected.id === "sprinkler" && state.hoverCell >= 0 && isUnlockedCell(state.hoverCell)) {
    const b = cellBounds(state.hoverCell);
    const rangeX = b.x - cellW - plot.gap;
    const rangeY = b.y - cellH - plot.gap;
    ctx.fillStyle = "rgba(200, 234, 116, 0.14)";
    drawRoundedRect(rangeX, rangeY, cellW * 3 + plot.gap * 2, cellH * 3 + plot.gap * 2, 14);
    ctx.fill();
    ctx.strokeStyle = "rgba(200, 234, 116, 0.85)";
    ctx.lineWidth = 3;
    ctx.stroke();
    drawSprinklerModel(b.x + b.w / 2, b.y + b.h / 2, time, true);
  }

  for (let row = 0; row < plot.rows; row += 1) {
    for (let col = 0; col < plot.cols; col += 1) {
      if (col >= activeCols() || row >= activeRows()) continue;
      const px = plot.marginX + col * (cellW + plot.gap);
      const py = plot.marginY + row * (cellH + plot.gap);
      if (x >= px && x <= px + cellW && y >= py && y <= py + cellH) {
        return row * plot.cols + col;
      }
    }
  }
  return -1;
}

function cellBounds(index) {
  const cellW = (canvas.width - plot.marginX * 2 - plot.gap * (plot.cols - 1)) / plot.cols;
  const cellH = (canvas.height - plot.marginY * 2 - plot.gap * (plot.rows - 1)) / plot.rows;
  const col = index % plot.cols;
  const row = Math.floor(index / plot.cols);
  return {
    x: plot.marginX + col * (cellW + plot.gap),
    y: plot.marginY + row * (cellH + plot.gap),
    w: cellW,
    h: cellH,
    col,
    row
  };
}

function updatePlantTooltip(event) {
  const rect = canvas.getBoundingClientRect();
  const sx = canvas.width / rect.width;
  const sy = canvas.height / rect.height;
  const canvasX = (event.clientX - rect.left) * sx;
  const canvasY = (event.clientY - rect.top) * sy;
  const hoveredPet = state.placedPets.find((placed) => {
    const pos = petPosition(placed, performance.now());
    return Math.hypot(canvasX - pos.x, canvasY - pos.y) < 28;
  });
  if (hoveredPet && pets[hoveredPet.petId]) {
    const pet = pets[hoveredPet.petId];
    ui.plantTooltip.innerHTML = `<strong>${pet.name}</strong><span>Age:</span> ${petAgeText(hoveredPet)}<br><span>Ability:</span> ${pet.description}`;
    ui.plantTooltip.style.left = `${event.clientX + 14}px`;
    ui.plantTooltip.style.top = `${event.clientY + 14}px`;
    ui.plantTooltip.style.display = "block";
    return;
  }

  const index = cellAt(event.clientX, event.clientY);
  state.hoverCell = index;
  const active = activeItem();
  if (active && active.type === "gear" && active.id === "sprinkler" && index >= 0) {
    ui.plantTooltip.innerHTML = `<strong>Place Sprinkler</strong><span>Range:</span> 3 x 3 plot tiles<br><span>Effect:</span> grows crops bigger and faster`;
    ui.plantTooltip.style.left = `${event.clientX + 14}px`;
    ui.plantTooltip.style.top = `${event.clientY + 14}px`;
    ui.plantTooltip.style.display = "block";
    return;
  }
  const plant = index >= 0 ? state.cells[index] : null;
  if (!plant || !seeds[plant.seedId]) {
    ui.plantTooltip.style.display = "none";
    return;
  }
  const progress = Math.floor((plant.progress / plant.growTime) * 100);
  const mutation = mutations[plant.mutation] || mutations.normal;
  ui.plantTooltip.innerHTML = `<strong>${fruitName(plant.seedId, plant.mutation)}</strong><span>Growth:</span> ${Math.min(100, progress)}%<br><span>Mutation:</span> ${mutation.name || "None"}<br><span>Size:</span> ${(plant.size || 1).toFixed(2)}x<br><span>Value:</span> ~${plantSellEstimate(plant)} coins${plant.regrow ? "<br><span>Regrows after harvest</span>" : ""}`;
  ui.plantTooltip.style.left = `${event.clientX + 14}px`;
  ui.plantTooltip.style.top = `${event.clientY + 14}px`;
  ui.plantTooltip.style.display = "block";
}

function drawRoundedRect(x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawPetModel(pet, x, y, time) {
  const bob = Math.sin(time / 280 + (pet.phase || 0)) * 3;
  const data = pets[pet.petId];
  if (!data) return;
  ctx.fillStyle = data.color;
  ctx.beginPath();
  ctx.ellipse(x, y + bob, 18, 14, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(x, y + 17 + bob, 20, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#10150f";
  ctx.beginPath();
  ctx.arc(x - 6, y - 3 + bob, 2.5, 0, Math.PI * 2);
  ctx.arc(x + 6, y - 3 + bob, 2.5, 0, Math.PI * 2);
  ctx.fill();
  if (pet.petId.includes("bee") || pet.petId === "mutationMoth") {
    ctx.fillStyle = "rgba(255,255,255,0.55)";
    ctx.beginPath();
    ctx.ellipse(x - 14, y - 10 + bob, 9, 5, -0.6, 0, Math.PI * 2);
    ctx.ellipse(x + 14, y - 10 + bob, 9, 5, 0.6, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#10150f";
  ctx.font = "800 10px Inter, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(data.mark, x, y + 8 + bob);
  ctx.textAlign = "left";
}

function drawSprinklerModel(cx, cy, time, preview = false) {
  ctx.save();
  ctx.globalAlpha = preview ? 0.72 : 1;
  ctx.fillStyle = "#6eb7d8";
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#f4f1e8";
  ctx.fillRect(cx - 3, cy - 20, 6, 20);
  ctx.strokeStyle = preview ? "rgba(200, 234, 116, 0.85)" : "rgba(180, 225, 245, 0.75)";
  ctx.lineWidth = preview ? 3 : 2;
  for (let i = 0; i < 6; i += 1) {
    const angle = time / 500 + i * Math.PI / 3;
    ctx.beginPath();
    ctx.moveTo(cx, cy - 18);
    ctx.lineTo(cx + Math.cos(angle) * 26, cy - 18 + Math.sin(angle) * 26);
    ctx.stroke();
  }
  ctx.restore();
}

function drawStar(cx, cy, outer, inner) {
  ctx.beginPath();
  for (let i = 0; i < 10; i += 1) {
    const angle = -Math.PI / 2 + (i * Math.PI) / 5;
    const radius = i % 2 === 0 ? outer : inner;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
}

function drawIcon(target, data, type) {
  target.style.background = data.color;
  target.innerHTML = "";
  const canvasIcon = document.createElement("canvas");
  canvasIcon.width = 38;
  canvasIcon.height = 38;
  const c = canvasIcon.getContext("2d");
  c.fillStyle = data.color;
  c.fillRect(0, 0, 38, 38);
  c.fillStyle = type === "seed" ? data.leaf : "#f5f0d3";
  c.beginPath();
  c.arc(19, 14, 8, 0, Math.PI * 2);
  c.fill();
  c.fillStyle = type === "seed" ? data.color : "#2d342a";
  c.beginPath();
  c.arc(19, 23, type === "seed" ? 9 : 6, 0, Math.PI * 2);
  c.fill();
  target.appendChild(canvasIcon);
}

function renderTasks() {
  const event = currentEvent();
  ui.taskList.innerHTML = "";
  event.tasks.forEach((task) => {
    const key = taskKey(event.id, task.id);
    const progress = taskProgress(key);
    const ready = progress >= task.target;
    const claimed = Boolean(state.claimedTasks[key]);
    const reward = Math.round(task.reward * (event.taskMultiplier || 1) * taskRewardBonus());
    const row = document.createElement("div");
    row.className = `task-item${claimed ? " done" : ""}`;
    const percent = Math.min(100, (progress / task.target) * 100);
    row.innerHTML = `<div><div class="item-name">${task.label}</div><div class="item-meta">${progress}/${task.target} for ${reward} petals</div><div class="task-progress"><span style="width:${percent}%"></span></div></div>`;
    const button = document.createElement("button");
    button.className = "claim-button";
    button.type = "button";
    button.textContent = claimed ? "Done" : "Claim";
    button.disabled = !ready || claimed;
    button.addEventListener("click", () => claimTask(event.id, task));
    row.appendChild(button);
    ui.taskList.appendChild(row);
  });
}

function renderExclusiveShop() {
  const event = currentEvent();
  ui.exclusiveShopList.innerHTML = "";
  (event.exclusiveShop || []).forEach((id) => {
    const exclusive = exclusiveItems[id];
    if (!exclusive) return;
    const data = exclusiveData(exclusive);
    const row = document.createElement("div");
    row.className = "shop-item";

    const icon = document.createElement("div");
    icon.className = "shop-icon";
    if (exclusive.type === "seed" || exclusive.type === "gear") {
      drawIcon(icon, data, exclusive.type);
    } else if (exclusive.type === "pet") {
      icon.style.background = data.color;
      icon.style.display = "grid";
      icon.style.placeItems = "center";
      icon.style.color = "#10150f";
      icon.style.fontWeight = "900";
      icon.textContent = data.mark;
    } else {
      icon.style.background = data.color;
      icon.style.display = "grid";
      icon.style.placeItems = "center";
      icon.style.color = "#10150f";
      icon.style.fontWeight = "900";
      icon.textContent = exclusive.type === "egg" ? "EG" : exclusive.type === "pack" ? "PK" : "FX";
    }

    const meta = exclusive.type === "seed"
      ? `${data.growTime}s grow, ${data.value} value`
      : exclusive.type === "gear"
        ? data.description
        : data.description;
    const text = document.createElement("div");
    text.innerHTML = `<div class="item-name">${data.name}</div><div class="item-meta">${meta}</div>`;

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    const owned = ownedExclusive(exclusive);
    button.textContent = owned ? (state.equippedCosmetic === exclusive.id ? "On" : "Equip") : `${exclusive.cost}${eventCurrencyName()[0]}`;
    button.disabled = !state.devMode && !owned && state.eventCoins < exclusive.cost;
    button.addEventListener("click", () => buyExclusive(exclusive.id));

    row.append(icon, text, button);
    ui.exclusiveShopList.appendChild(row);
  });
}

function renderShop() {
  const source = state.shopTab === "seeds" ? seeds : gear;
  ui.shopList.innerHTML = "";
  Object.values(source).filter(canShowEventItem).forEach((data) => {
    const row = document.createElement("div");
    row.className = "shop-item";

    const icon = document.createElement("div");
    icon.className = "shop-icon";
    drawIcon(icon, data, state.shopTab === "seeds" ? "seed" : "gear");

    const text = document.createElement("div");
    text.innerHTML = `<div class="item-name">${data.name}</div><div class="item-meta">${state.shopTab === "seeds" ? `${data.growTime}s grow, ${data.value} value` : data.description}</div>`;

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = data.currency === "event" ? `${buyPrice(data)}${eventCurrencyName()[0]}` : `${buyPrice(data)}c`;
    button.disabled = !state.devMode && (data.currency === "event" ? state.eventCoins < buyPrice(data) : state.coins < buyPrice(data));
    button.addEventListener("click", () => buy(state.shopTab === "seeds" ? "seed" : "gear", data.id));

    row.append(icon, text, button);
    ui.shopList.appendChild(row);
  });
}

function renderPets() {
  ui.petList.innerHTML = "";
  const header = document.createElement("div");
  header.className = "inventory-item";
  header.innerHTML = `<div></div><div><div class="item-name">Active pets ${activePetCount()}/${state.petCapacity}</div><div class="item-meta">Place pets for bonuses, or pick them up to free space.</div></div>`;
  ui.petList.appendChild(header);

  if (state.petTab === "eggs") {
    state.petEggs.forEach((egg) => {
      const row = document.createElement("div");
      row.className = "pet-item";
      const icon = document.createElement("div");
      icon.className = "pet-icon";
      icon.style.background = egg.color;
      icon.style.color = "#10150f";
      icon.textContent = "EG";
      const remaining = egg.placedAt ? Math.max(0, Math.ceil(egg.hatchSeconds - (Date.now() - egg.placedAt) / 1000)) : null;
      const text = document.createElement("div");
      text.innerHTML = `<div class="item-name">${egg.name}</div><div class="item-meta">${egg.placedAt ? remaining ? `Hatches in ${remaining}s` : "Ready to hatch on plot" : "Not placed"}</div>`;
      const button = document.createElement("button");
      button.className = "buy-button";
      button.type = "button";
      button.textContent = egg.placedAt ? "Pick Up" : "Place";
      button.addEventListener("click", () => egg.placedAt ? pickupEgg(egg.id) : placeEgg(egg.id));
      row.append(icon, text, button);
      ui.petList.appendChild(row);
    });
    if (state.petEggs.length === 0) {
      const empty = document.createElement("div");
      empty.className = "inventory-item";
      empty.innerHTML = "<div></div><div><div class=\"item-name\">No eggs</div><div class=\"item-meta\">Buy special eggs from event shops.</div></div>";
      ui.petList.appendChild(empty);
    }
    return;
  }

  Object.values(pets).filter((pet) => !pet.eventOnly || state.ownedPets.includes(pet.id)).forEach((pet) => {
    const owned = state.ownedPets.includes(pet.id);
    const placed = petIsPlaced(pet.id);
    const row = document.createElement("div");
    row.className = `pet-item${placed ? " equipped" : ""}`;

    const icon = document.createElement("div");
    icon.className = "pet-icon";
    icon.style.background = pet.color;
    icon.style.color = "#10150f";
    icon.textContent = pet.mark;

    const text = document.createElement("div");
    text.innerHTML = `<div class="item-name">${pet.name}</div><div class="item-meta">${pet.description}</div>`;

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = owned ? (placed ? "Pick Up" : "Place") : `${pet.cost}c`;
    button.disabled = !state.devMode && !owned && state.coins < pet.cost;
    button.addEventListener("click", () => buyPet(pet.id));

    row.append(icon, text, button);
    ui.petList.appendChild(row);
  });
}

function renderInventory() {
  ui.inventoryList.innerHTML = "";
  const entries = Object.entries(state.inventory).filter((entry) => entry[1] > 0 && parseFruitKey(entry[0]).seed);
  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "inventory-item";
    empty.innerHTML = "<div></div><div><div class=\"item-name\">No fruit yet</div><div class=\"item-meta\">Harvest ready crops from your plot.</div></div>";
    ui.inventoryList.appendChild(empty);
    return;
  }

  entries.forEach(([id, count]) => {
    const fruit = parseFruitKey(id);
    const data = fruit.seed;
    const row = document.createElement("div");
    row.className = "inventory-item";
    const icon = document.createElement("div");
    icon.className = "inventory-icon";
    drawIcon(icon, data, "seed");
    const value = cropSellValue(id, count);
    row.append(icon);
    row.insertAdjacentHTML("beforeend", `<div><div class="item-name">${fruitName(fruit.seedId, fruit.mutationId)} x${count}</div><div class="item-meta">${fruit.size.toFixed(2)}x size, worth ${value} coins now</div></div>`);
    ui.inventoryList.appendChild(row);
  });
}

function renderHotbar() {
  cleanHotbar();
  ui.hotbar.innerHTML = "";
  state.hotbar.forEach((slot, index) => {
    const button = document.createElement("button");
    button.className = `slot${index === state.selectedSlot ? " active" : ""}`;
    button.type = "button";
    button.dataset.slotIndex = index;
    button.addEventListener("dragover", (event) => {
      event.preventDefault();
      button.classList.add("drop-target");
    });
    button.addEventListener("dragleave", () => {
      button.classList.remove("drop-target");
    });
    button.addEventListener("drop", (event) => {
      event.preventDefault();
      button.classList.remove("drop-target");
      const raw = event.dataTransfer.getData("application/json");
      if (!raw) return;
      const item = JSON.parse(raw);
      equipToHotbarSlot(item.type, item.id, index);
    });
    button.addEventListener("click", () => {
      state.selectedSlot = index;
      saveState();
      renderUi();
    });

    if (!slot || !itemData(slot)) {
      button.innerHTML = `<div class="slot-icon"></div><div><small>${index + 1}</small><strong>Empty</strong></div>`;
    } else {
      const data = itemData(slot);
      const icon = document.createElement("div");
      icon.className = "slot-icon";
      drawIcon(icon, data, slot.type);
      const text = document.createElement("div");
      const suffix = slot.type === "seed" ? " Seed" : "";
      text.innerHTML = `<small>${index + 1}</small><strong>x${countBagItem(slot.type, slot.id)} ${data.name}${suffix}</strong>`;
      button.append(icon, text);
    }
    ui.hotbar.appendChild(button);
  });
}

function openInventory() {
  ui.inventoryOverlay.classList.add("open");
  ui.inventoryOverlay.setAttribute("aria-hidden", "false");
  renderItemInventory();
}

function closeInventory() {
  ui.inventoryOverlay.classList.remove("open");
  ui.inventoryOverlay.setAttribute("aria-hidden", "true");
}

function equipFromInventory(type, id) {
  if (countBagItem(type, id) <= 0) return;
  equipToHotbarSlot(type, id, state.selectedSlot);
}

function equipToHotbarSlot(type, id, slotIndex) {
  if (countBagItem(type, id) <= 0) return;
  state.hotbar[slotIndex] = { type, id };
  state.selectedSlot = slotIndex;
  setStatus(`${type === "seed" ? seeds[id].name : gear[id].name} equipped in slot ${slotIndex + 1}.`);
  saveState();
  renderHotbar();
}

function renderItemInventory() {
  const type = state.inventoryTab || "seeds";
  const bag = type === "seeds" ? state.seedBag : state.gearBag;
  const source = type === "seeds" ? seeds : gear;
  ui.itemInventoryList.innerHTML = "";
  Object.entries(bag)
    .filter(([id, count]) => count > 0 && source[id])
    .sort(([a], [b]) => source[a].name.localeCompare(source[b].name))
    .forEach(([id, count]) => {
      const data = source[id];
      const button = document.createElement("button");
      button.className = "inventory-pick";
      button.type = "button";
      button.draggable = true;
      button.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("application/json", JSON.stringify({ type: type === "seeds" ? "seed" : "gear", id }));
        event.dataTransfer.effectAllowed = "move";
      });
      const icon = document.createElement("div");
      icon.className = "slot-icon";
      drawIcon(icon, data, type === "seeds" ? "seed" : "gear");
      const text = document.createElement("div");
      text.innerHTML = `<div class="item-name">${data.name} x${count}</div><div class="item-meta">Equip to hotbar slot ${state.selectedSlot + 1}</div>`;
      button.append(icon, text);
      button.addEventListener("click", () => equipFromInventory(type === "seeds" ? "seed" : "gear", id));
      ui.itemInventoryList.appendChild(button);
    });
  if (!ui.itemInventoryList.children.length) {
    ui.itemInventoryList.innerHTML = `<div class="inventory-item"><div></div><div><div class="item-name">No ${type}</div><div class="item-meta">Buy items or open seed packs to fill this.</div></div></div>`;
  }
}

function renderUi() {
  const event = currentEvent();
  const weather = currentWeather();
  renderedEventSlot = state.eventSlot;
  renderedWeatherSlot = state.weatherSlot;
  ui.coins.textContent = state.devMode ? "∞" : state.coins;
  ui.eventCoins.textContent = state.devMode ? "∞" : state.eventCoins;
  ui.eventCoinLabel.textContent = eventCurrencyName();
  ui.cropValue.textContent = Math.round(cropValue() * sellMultiplier());
  ui.day.textContent = `Day ${1 + Math.floor((Date.now() - state.startedAt) / 90000)}`;
  ui.weather.textContent = weather.name;
  ui.eventName.textContent = event.name;
  ui.eventDescription.textContent = event.description;
  ui.eventTradeButton.textContent = event.turnInLabel || "No Fruit Trade";
  ui.eventTradeButton.disabled = !event.turnInRate || cropValue() <= 0;
  ui.eventTimer.textContent = formatTime(state.eventDuration - (Date.now() - state.eventStartedAt));
  ui.sellButton.disabled = cropValue() <= 0;
  ui.quickSellButton.disabled = cropValue() <= 0;
  ui.shopDrawer.classList.toggle("open", state.shopOpen);
  ui.shopToggleButton.textContent = state.shopOpen ? "Close Shop" : "Shop";
  ui.plotSize.textContent = `Current plot: ${activeCols()} x ${activeRows()}`;
  ui.petHint.textContent = `${activePetCount()}/${state.petCapacity} active`;
  const cols = activeCols();
  const rows = activeRows();
  const nextCells = cols < plot.cols ? rows : cols;
  const expandCost = 450 + nextCells * 180;
  ui.expandPlotButton.textContent = cols >= plot.cols && rows >= plot.rows ? "Maxed" : `${expandCost}c`;
  ui.expandPlotButton.disabled = !state.devMode && (cols >= plot.cols && rows >= plot.rows || state.coins < expandCost);
  renderTasks();
  renderExclusiveShop();
  renderShop();
  renderPets();
  renderInventory();
  renderHotbar();
  if (ui.inventoryOverlay.classList.contains("open")) {
    renderItemInventory();
  }
}

function updatePlants(dt) {
  const event = currentEvent();
  const weather = currentWeather();
  state.cells.forEach((plant, index) => {
    if (!plant) return;
    const sprinkler = sprinklerInfluence(index);
    let multiplier = (event.growthMultiplier || 1) * (weather.growthMultiplier || 1) * growthBonus();
    if (sprinkler) {
      multiplier *= 1.28;
      plant.watered = Math.max(plant.watered || 0, 4);
      plant.size = Math.min(3, (plant.size || 1) + dt * 0.012);
    }
    if (plant.watered > 0) {
      multiplier *= event.wateredMultiplier || 1.25;
      plant.watered = Math.max(0, plant.watered - dt);
    }
    if (plant.progress < plant.growTime) {
      plant.progress = Math.min(plant.growTime, plant.progress + dt * multiplier);
    }
  });
  state.petEggs.forEach((egg) => {
    if (egg.placedAt && Date.now() - egg.placedAt >= egg.hatchSeconds * 1000) {
      hatchPlacedEgg(egg.id);
    }
  });
}

function runPetMutation() {
  if (!hasActivePet("mutationMoth")) return;
  if (Date.now() - (state.lastPetMutationAt || 0) < 60000) return;
  const candidates = state.cells
    .map((plant, index) => ({ plant, index }))
    .filter((entry) => entry.plant && (!entry.plant.mutation || entry.plant.mutation === "normal" || entry.plant.mutation === "wet"));
  if (!candidates.length) {
    state.lastPetMutationAt = Date.now();
    return;
  }
  const picked = candidates[Math.floor(Math.random() * candidates.length)];
  const options = ["golden", "giant", currentEvent().mutation, currentWeather().mutation, "galactic"].filter(Boolean);
  picked.plant.mutation = options[Math.floor(Math.random() * options.length)];
  state.lastPetMutationAt = Date.now();
  setStatus(`Mutation Moth changed a crop into ${mutations[picked.plant.mutation].name}.`);
  saveState();
}

function drawGarden(time) {
  const event = currentEvent();
  const weather = currentWeather();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = event.sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = weather.skyTint;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#2f4a30";
  ctx.fillRect(0, canvas.height * 0.08, canvas.width, canvas.height * 0.92);

  const grassGradient = ctx.createLinearGradient(0, canvas.height * 0.08, 0, canvas.height);
  grassGradient.addColorStop(0, "rgba(121, 212, 109, 0.16)");
  grassGradient.addColorStop(1, "rgba(12, 26, 17, 0.34)");
  ctx.fillStyle = grassGradient;
  ctx.fillRect(0, canvas.height * 0.08, canvas.width, canvas.height * 0.92);

  if (weather.id === "rain") {
    ctx.strokeStyle = "rgba(160, 210, 240, 0.45)";
    ctx.lineWidth = 2;
    for (let x = -30; x < canvas.width; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x + (time / 20) % 32, 0);
      ctx.lineTo(x + 35 + (time / 20) % 32, canvas.height);
      ctx.stroke();
    }
  }

  if (weather.id === "hail") {
    ctx.fillStyle = "rgba(235, 250, 255, 0.8)";
    for (let i = 0; i < 36; i += 1) {
      ctx.beginPath();
      ctx.arc((i * 83 + time / 14) % canvas.width, (i * 47 + time / 8) % canvas.height, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (weather.id === "fog") {
    ctx.fillStyle = "rgba(210, 218, 206, 0.16)";
    for (let y = 90; y < canvas.height; y += 70) {
      ctx.fillRect(Math.sin(time / 900 + y) * 60, y, canvas.width, 24);
    }
  }

  if (event.id === "drizzle") {
    ctx.strokeStyle = "rgba(180, 220, 235, 0.34)";
    for (let x = -20; x < canvas.width; x += 34) {
      ctx.beginPath();
      ctx.moveTo(x + (time / 30) % 34, 0);
      ctx.lineTo(x + 70 + (time / 30) % 34, canvas.height);
      ctx.stroke();
    }
  }

  if (event.id === "meteor") {
    ctx.fillStyle = "rgba(240, 189, 69, 0.45)";
    ctx.beginPath();
    ctx.arc(780 + Math.sin(time / 500) * 40, 76, 22, 0, Math.PI * 2);
    ctx.fill();
  }

  if (event.id === "honey") {
    ctx.fillStyle = "rgba(240, 189, 69, 0.18)";
    for (let i = 0; i < 8; i += 1) {
      ctx.beginPath();
      ctx.arc(90 + i * 108, 64 + Math.sin(time / 500 + i) * 12, 10, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (event.id === "christmas") {
    ctx.fillStyle = "rgba(245, 250, 255, 0.65)";
    for (let i = 0; i < 36; i += 1) {
      ctx.beginPath();
      ctx.arc((i * 73 + time / 20) % canvas.width, (i * 41 + time / 12) % canvas.height, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (event.id === "zen") {
    ctx.strokeStyle = "rgba(212, 201, 161, 0.22)";
    ctx.lineWidth = 3;
    for (let y = 95; y < canvas.height; y += 42) {
      ctx.beginPath();
      ctx.moveTo(0, y + Math.sin(time / 900 + y) * 4);
      ctx.bezierCurveTo(240, y + 20, 520, y - 20, canvas.width, y);
      ctx.stroke();
    }
  }

  if (event.id === "disco") {
    const hue = (time / 18) % 360;
    ctx.fillStyle = `hsla(${hue}, 90%, 62%, 0.16)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 10; i += 1) {
      ctx.fillStyle = `hsla(${(hue + i * 36) % 360}, 90%, 64%, 0.38)`;
      ctx.beginPath();
      ctx.arc(60 + i * 94, 70 + Math.sin(time / 350 + i) * 18, 12, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (event.id === "bloodMoon") {
    ctx.fillStyle = "rgba(180, 45, 55, 0.24)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#d85b61";
    ctx.beginPath();
    ctx.arc(canvas.width - 92, 78, 34, 0, Math.PI * 2);
    ctx.fill();
  }

  if (event.id === "galaxy") {
    ctx.fillStyle = "rgba(129, 216, 232, 0.16)";
    for (let i = 0; i < 42; i += 1) {
      const x = (i * 61 + time / 25) % canvas.width;
      const y = (i * 97) % canvas.height;
      drawStar(x, y, 4, 2);
    }
  }

  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1;
  for (let x = 0; x < canvas.width; x += 48) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + 90, canvas.height);
    ctx.stroke();
  }

  const cellW = (canvas.width - plot.marginX * 2 - plot.gap * (plot.cols - 1)) / plot.cols;
  const cellH = (canvas.height - plot.marginY * 2 - plot.gap * (plot.rows - 1)) / plot.rows;

  for (let row = 0; row < plot.rows; row += 1) {
    for (let col = 0; col < plot.cols; col += 1) {
      const index = row * plot.cols + col;
      const x = plot.marginX + col * (cellW + plot.gap);
      const y = plot.marginY + row * (cellH + plot.gap);
      const plant = state.cells[index];
      const unlocked = col < activeCols() && row < activeRows();

      const soil = ctx.createLinearGradient(x, y, x, y + cellH);
      soil.addColorStop(0, "#855a36");
      soil.addColorStop(1, "#51331f");
      ctx.fillStyle = unlocked ? soil : "#1f2a22";
      drawRoundedRect(x, y, cellW, cellH, 8);
      ctx.fill();
      ctx.strokeStyle = index === state.hoverCell ? "rgba(200, 234, 116, 0.9)" : unlocked ? "rgba(255,255,255,0.11)" : "rgba(255,255,255,0.04)";
      ctx.lineWidth = index === state.hoverCell ? 3 : 1;
      ctx.stroke();
      if (!unlocked) {
        ctx.fillStyle = "rgba(0,0,0,0.28)";
        ctx.fillRect(x + 7, y + 7, cellW - 14, cellH - 14);
        ctx.fillStyle = "#b9c1ae";
        ctx.font = "800 10px Inter, sans-serif";
        ctx.fillText("LOCKED", x + 12, y + cellH / 2);
        continue;
      }
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      for (let ridge = 0; ridge < 3; ridge += 1) {
        ctx.fillRect(x + 8, y + 13 + ridge * 18, cellW - 16, 4);
      }

      if (plant && seeds[plant.seedId]) {
        const data = seeds[plant.seedId];
        const mutation = mutations[plant.mutation] || mutations.normal;
        const progress = plant.progress / plant.growTime;
        const cx = x + cellW / 2;
        const cy = y + cellH / 2;
        const sway = Math.sin(time / 450 + plant.sway) * 2;
        const sizeFactor = Math.sqrt(plant.size || 1);
        const radius = (6 + progress * 17) * sizeFactor;

        ctx.fillStyle = plant.watered > 0 ? "rgba(112, 183, 216, 0.28)" : "rgba(0,0,0,0.12)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 13, radius + 9, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = data.leaf;
        ctx.lineWidth = 4 + progress * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 20);
        ctx.quadraticCurveTo(cx + sway, cy, cx - 13 * sizeFactor, cy - 14 * sizeFactor);
        ctx.moveTo(cx, cy + 20);
        ctx.quadraticCurveTo(cx - sway, cy - 3, cx + 13 * sizeFactor, cy - 13 * sizeFactor);
        ctx.moveTo(cx, cy + 18);
        ctx.quadraticCurveTo(cx + sway * 0.5, cy + 2, cx, cy - 18 * sizeFactor);
        ctx.stroke();

        ctx.fillStyle = mutation.color || data.color;
        ctx.beginPath();
        ctx.arc(cx, cy + 10, plant.mutation === "giant" ? radius * 1.3 : radius, 0, Math.PI * 2);
        ctx.fill();
        if (plant.mutation === "disco") {
          ctx.strokeStyle = `hsl(${(time / 8) % 360}, 90%, 70%)`;
          ctx.lineWidth = 4;
          ctx.stroke();
        }
        if (plant.mutation === "galactic") {
          ctx.fillStyle = "rgba(255,255,255,0.75)";
          drawStar(cx + radius * 0.6, cy - radius * 0.3, 5, 2);
        }
        if (plant.mutation === "wet") {
          ctx.fillStyle = "rgba(180, 225, 245, 0.7)";
          ctx.beginPath();
          ctx.arc(cx + radius * 0.45, cy + radius * 0.1, 4, 0, Math.PI * 2);
          ctx.fill();
        }
        if (plant.mutation === "frozen") {
          ctx.strokeStyle = "rgba(235, 250, 255, 0.8)";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(cx - radius, cy + 10);
          ctx.lineTo(cx + radius, cy - 8);
          ctx.moveTo(cx - radius * 0.6, cy - 9);
          ctx.lineTo(cx + radius * 0.7, cy + 15);
          ctx.stroke();
        }
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath();
        ctx.arc(cx - radius * 0.3, cy + 3, Math.max(2, radius * 0.18), 0, Math.PI * 2);
        ctx.fill();

        if (progress >= 1) {
          ctx.strokeStyle = "#f4f1e8";
          ctx.lineWidth = 3;
          ctx.strokeRect(x + 6, y + 6, cellW - 12, cellH - 12);
          ctx.fillStyle = "#ffe45c";
          drawStar(x + cellW - 18, y + 18, 13, 6);
          ctx.strokeStyle = "rgba(0,0,0,0.42)";
          ctx.lineWidth = 2;
          ctx.stroke();
        }
        if (plant.regrow) {
          ctx.fillStyle = "#c8ea74";
          ctx.font = "800 11px Inter, sans-serif";
          ctx.fillText("REGROW", x + 8, y + cellH - 8);
        }
      }
    }
  }

  state.sprinklers.forEach((sprinkler) => {
    const b = cellBounds(sprinkler.index);
    const cx = b.x + b.w / 2;
    const cy = b.y + b.h / 2;
    drawSprinklerModel(cx, cy, time);
  });

  state.petEggs.forEach((egg) => {
    if (egg.plotIndex === null) return;
    const b = cellBounds(egg.plotIndex);
    const remaining = Math.max(0, Math.ceil(egg.hatchSeconds - (Date.now() - egg.placedAt) / 1000));
    ctx.fillStyle = egg.color;
    ctx.beginPath();
    ctx.ellipse(b.x + b.w / 2, b.y + b.h / 2, 17, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#10150f";
    ctx.font = "800 10px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(remaining ? `${remaining}s` : "HATCH", b.x + b.w / 2, b.y + b.h / 2 + 4);
    ctx.textAlign = "left";
  });

  state.placedPets.forEach((pet) => {
    const pos = petPosition(pet, time);
    drawPetModel(pet, pos.x, pos.y, time);
  });

  if (state.equippedCosmetic === "discoBall") {
    const cx = canvas.width - 72;
    const cy = canvas.height - 78;
    const hue = (time / 10) % 360;
    ctx.fillStyle = `hsl(${hue}, 88%, 64%)`;
    ctx.beginPath();
    ctx.arc(cx, cy, 24, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 2;
    for (let i = -2; i <= 2; i += 1) {
      ctx.beginPath();
      ctx.moveTo(cx - 24, cy + i * 8);
      ctx.lineTo(cx + 24, cy + i * 8);
      ctx.stroke();
    }
    ctx.strokeStyle = `hsla(${(hue + 120) % 360}, 90%, 70%, 0.45)`;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 95, cy - 38);
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx - 74, cy + 48);
    ctx.stroke();
  }

  if (state.equippedCosmetic === "moonLamp") {
    ctx.fillStyle = "#aeb8ff";
    ctx.beginPath();
    ctx.arc(canvas.width - 70, canvas.height - 82, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = event.sky;
    ctx.beginPath();
    ctx.arc(canvas.width - 58, canvas.height - 91, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "rgba(174, 184, 255, 0.5)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 70, canvas.height - 58);
    ctx.lineTo(canvas.width - 70, canvas.height - 22);
    ctx.stroke();
  }

  if (state.equippedCosmetic === "lotusBell") {
    ctx.fillStyle = "#e6a7ca";
    ctx.beginPath();
    ctx.ellipse(canvas.width - 78, canvas.height - 44, 26, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#f4f1e8";
    drawStar(canvas.width - 78, canvas.height - 62, 13, 6);
  }

  ctx.fillStyle = "rgba(0,0,0,0.42)";
  drawRoundedRect(20, 20, 360, 48, 8);
  ctx.fill();
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "700 16px Inter, sans-serif";
  ctx.fillText(`Weather: ${weather.name}`, 36, 42);
  ctx.fillStyle = "#b9c1ae";
  ctx.font = "600 12px Inter, sans-serif";
  ctx.fillText(weather.description, 36, 58);
}

function tick(now) {
  const dt = Math.min(0.08, (now - state.lastTime) / 1000);
  state.lastTime = now;
  updatePlants(dt);
  runPetMutation();
  drawGarden(now);
  if (state.eventSlot !== renderedEventSlot || state.weatherSlot !== renderedWeatherSlot) {
    renderUi();
  }

  if (state.messageTime > 0) {
    state.messageTime -= dt;
  } else {
    const item = itemData(activeItem());
    ui.status.textContent = item ? `Equipped ${item.name}. Click your plot to use it.` : "Choose a hotbar item.";
  }
  ui.eventTimer.textContent = formatTime(state.eventDuration - (Date.now() - state.eventStartedAt));
  ui.day.textContent = `Day ${1 + Math.floor((Date.now() - state.startedAt) / 90000)}`;
  ui.weather.textContent = currentWeather().name;
  requestAnimationFrame(tick);
}

canvas.addEventListener("click", (event) => {
  const index = cellAt(event.clientX, event.clientY);
  if (index >= 0) {
    handlePlotClick(index);
  }
});

canvas.addEventListener("mousemove", updatePlantTooltip);
canvas.addEventListener("mouseleave", () => {
  state.hoverCell = -1;
  ui.plantTooltip.style.display = "none";
});

window.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "e" && !event.ctrlKey && !event.metaKey && !event.altKey) {
    event.preventDefault();
    if (ui.inventoryOverlay.classList.contains("open")) {
      closeInventory();
    } else {
      openInventory();
    }
    return;
  }

  if (event.key === "Escape" && ui.inventoryOverlay.classList.contains("open")) {
    closeInventory();
    return;
  }

  const number = Number(event.key);
  if (number >= 1 && number <= 8) {
    state.selectedSlot = number - 1;
    saveState();
    renderUi();
    return;
  }

  if (event.key.length === 1) {
    cheatBuffer = `${cheatBuffer}${event.key.toLowerCase()}`.slice(-12);
    if (cheatBuffer === "mustardmango") {
      state.devMode = !state.devMode;
      if (state.devMode) {
        state.coins = Math.max(state.coins, 999999);
        state.eventCoins = Math.max(state.eventCoins, 999999);
      }
      cheatBuffer = "";
      setStatus(state.devMode ? "Dev mode enabled. Infinite coins and event currency." : "Dev mode disabled.");
      saveState();
      renderUi();
    }
  }
});

window.addEventListener("beforeunload", saveState);
setInterval(saveState, 15000);

document.querySelectorAll("[data-shop-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.shopTab = button.dataset.shopTab;
    document.querySelectorAll("[data-shop-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    saveState();
    renderShop();
  });
});

ui.sellButton.addEventListener("click", sellAll);
ui.quickSellButton.addEventListener("click", sellAll);
ui.restockButton.addEventListener("click", restock);
ui.resetButton.addEventListener("click", resetProgress);
ui.eventTradeButton.addEventListener("click", turnInFruitForEventCurrency);
ui.shopToggleButton.addEventListener("click", () => {
  state.shopOpen = !state.shopOpen;
  saveState();
  renderUi();
});
ui.expandPlotButton.addEventListener("click", expandPlot);
ui.closeInventoryButton.addEventListener("click", closeInventory);
ui.inventoryOverlay.addEventListener("click", (event) => {
  if (event.target === ui.inventoryOverlay) {
    closeInventory();
  }
});
document.querySelectorAll("[data-inventory-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.inventoryTab = button.dataset.inventoryTab;
    document.querySelectorAll("[data-inventory-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    saveState();
    renderItemInventory();
  });
});
document.querySelectorAll("[data-pet-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    state.petTab = button.dataset.petTab;
    document.querySelectorAll("[data-pet-tab]").forEach((tab) => {
      tab.classList.toggle("active", tab === button);
    });
    saveState();
    renderPets();
  });
});

currentEvent();
currentWeather();
let renderedEventSlot = state.eventSlot;
let renderedWeatherSlot = state.weatherSlot;
let cheatBuffer = "";
if (offlineReport && offlineReport.minutes > 0) {
  setStatus(`Welcome back. ${offlineReport.minutes} offline minutes grew ${offlineReport.matured} crops.`);
}
saveState();
renderUi();
requestAnimationFrame(tick);
