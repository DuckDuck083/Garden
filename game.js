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
  status: document.getElementById("statusText"),
  eventTimer: document.getElementById("eventTimer"),
  eventName: document.getElementById("eventName"),
  eventDescription: document.getElementById("eventDescription"),
  eventTradeButton: document.getElementById("eventTradeButton"),
  taskList: document.getElementById("taskList"),
  exclusiveShopList: document.getElementById("exclusiveShopList"),
  shopList: document.getElementById("shopList"),
  inventoryList: document.getElementById("inventoryList"),
  petList: document.getElementById("petList"),
  hotbar: document.getElementById("hotbar"),
  quickSellButton: document.getElementById("quickSellButton"),
  sellButton: document.getElementById("sellButton"),
  restockButton: document.getElementById("restockButton"),
  resetButton: document.getElementById("resetButton")
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
  golden: { id: "golden", name: "Golden", multiplier: 2.1, color: "#ffd45c" },
  giant: { id: "giant", name: "Giant", multiplier: 1.75, color: "#9dd05c" },
  honeyed: { id: "honeyed", name: "Honeyed", multiplier: 2.4, color: "#f0bd45" },
  frozen: { id: "frozen", name: "Frozen", multiplier: 2.2, color: "#b9e7ff" },
  zen: { id: "zen", name: "Zen", multiplier: 2.6, color: "#e6a7ca" },
  disco: { id: "disco", name: "Disco", multiplier: 3.2, color: "#ff6bd6" },
  lunar: { id: "lunar", name: "Lunar", multiplier: 3.6, color: "#aeb8ff" },
  galactic: { id: "galactic", name: "Galactic", multiplier: 4.5, color: "#81d8e8" }
};

const pets = {
  bee: {
    id: "bee",
    name: "Honey Bee",
    cost: 80,
    mark: "HB",
    color: "#f0bd45",
    description: "Adds 15% sell value."
  },
  turtle: {
    id: "turtle",
    name: "Garden Turtle",
    cost: 95,
    mark: "GT",
    color: "#5aa85c",
    description: "Offline plants grow 40% longer."
  },
  owl: {
    id: "owl",
    name: "Moon Owl",
    cost: 120,
    mark: "MO",
    color: "#8f9bd8",
    description: "Tasks reward 25% more petals."
  },
  fox: {
    id: "fox",
    name: "Swift Fox",
    cost: 145,
    mark: "SF",
    color: "#e98665",
    description: "All crops grow 20% faster."
  },
  squirrel: {
    id: "squirrel",
    name: "Seed Squirrel",
    cost: 170,
    mark: "SS",
    color: "#c99a5a",
    description: "Planting sometimes refunds a seed."
  },
  frog: {
    id: "frog",
    name: "Rain Frog",
    cost: 190,
    mark: "RF",
    color: "#6fd083",
    description: "Watering lasts twice as long."
  },
  phoenix: {
    id: "phoenix",
    name: "Solar Phoenix",
    cost: 320,
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
  }
};

const exclusiveItems = {
  honeySprout: { id: "honeySprout", type: "seed", itemId: "honeySprout", event: "honey", cost: 65 },
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
  discoSeed: { id: "discoSeed", type: "seed", itemId: "discoSeed", event: "disco", cost: 85 },
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
  starCrate: {
    id: "starCrate",
    type: "egg",
    name: "Star Crate",
    event: "galaxy",
    cost: 180,
    color: "#81d8e8",
    description: "Hatches into a rare cosmic pet.",
    hatchPets: ["owl", "phoenix", "lotusSpirit"]
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
  zenRake: { id: "zenRake", type: "gear", itemId: "zenRake", event: "zen", cost: 130 },
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
    exclusiveShop: ["honeySprout", "honeyGlazer", "honeyEgg"],
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
    exclusiveShop: ["snowLantern", "snowEgg"],
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
    exclusiveShop: ["zenRake", "lotusBell"],
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
    exclusiveShop: ["discoSeed", "discoBall"],
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
    exclusiveShop: ["nightSeed", "moonLamp"],
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
    exclusiveShop: ["cometSeed", "starCrate"],
    tasks: [
      { id: "mutatedHarvest", label: "Harvest 2 galactic fruits", target: 2, reward: 60 },
      { id: "water", label: "Water 8 crops", target: 8, reward: 26 }
    ]
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
  taskProgress: {},
  claimedTasks: {},
  inventory: {},
  seedBag: { carrot: 2, berry: 1, tomato: 1 },
  gearBag: {},
  ownedPets: [],
  equippedPet: null,
  ownedCosmetics: [],
  equippedCosmetic: null,
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
      ownedCosmetics: Array.isArray(saved.ownedCosmetics) ? saved.ownedCosmetics : [],
      equippedCosmetic: saved.equippedCosmetic || null
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
    ownedCosmetics: state.ownedCosmetics,
    equippedCosmetic: state.equippedCosmetic,
    hotbar: state.hotbar,
    cells: state.cells
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveable));
}

function petBonus() {
  return pets[state.equippedPet] || null;
}

function growthBonus() {
  return state.equippedPet === "fox" ? 1.2 : 1;
}

function saleBonus() {
  let bonus = state.equippedPet === "bee" ? 1.15 : 1;
  if (state.equippedPet === "phoenix") {
    bonus *= 1.2;
  }
  return bonus;
}

function taskRewardBonus() {
  return state.equippedPet === "owl" ? 1.25 : 1;
}

function offlineLimitSeconds() {
  return state.equippedPet === "turtle" ? 8 * 60 * 60 : 5 * 60 * 60;
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
  const gained = state.equippedPet === "lotusSpirit" && Math.random() < 0.2 ? amount + 1 : amount;
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
    return fruit.seed ? sum + fruit.seed.value * fruit.mutation.multiplier * count : sum;
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
  return Math.round(fruit.seed.value * fruit.mutation.multiplier * count * multiplier);
}

function fruitKey(seedId, mutationId = "normal") {
  return mutationId && mutationId !== "normal" ? `${seedId}:${mutationId}` : seedId;
}

function parseFruitKey(key) {
  const [seedId, mutationId = "normal"] = key.split(":");
  return {
    seedId,
    mutationId,
    seed: seeds[seedId],
    mutation: mutations[mutationId] || mutations.normal
  };
}

function fruitName(seedId, mutationId = "normal") {
  const seed = seeds[seedId];
  const mutation = mutations[mutationId] || mutations.normal;
  return `${mutation.name ? `${mutation.name} ` : ""}${seed.crop}`;
}

function addFruitFromPlant(plant) {
  const mutationId = plant.mutation || "normal";
  const key = fruitKey(plant.seedId, mutationId);
  state.inventory[key] = (state.inventory[key] || 0) + (plant.glazed ? 2 : 1);
  if (mutationId !== "normal") {
    addTaskProgress("mutatedHarvest");
  }
}

function rollMutation() {
  const event = currentEvent();
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
  if (seedId === "discoSeed") return "disco";
  if (seedId === "nightSeed") return "lunar";
  if (seedId === "cometSeed") return "galactic";
  return rollMutation();
}

function countBagItem(type, id) {
  return type === "seed" ? state.seedBag[id] || 0 : state.gearBag[id] || 0;
}

function activeItem() {
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
  return exclusive;
}

function ownedExclusive(exclusive) {
  if (exclusive.type === "cosmetic") return state.ownedCosmetics.includes(exclusive.id);
  return false;
}

function addToHotbar(type, id) {
  const existing = state.hotbar.findIndex((slot) => slot && slot.type === type && slot.id === id);
  if (existing >= 0) {
    state.selectedSlot = existing;
    return;
  }
  const empty = state.hotbar.findIndex((slot) => !slot);
  if (empty >= 0) {
    state.hotbar[empty] = { type, id };
    state.selectedSlot = empty;
  }
}

function buy(type, id) {
  const data = type === "seed" ? seeds[id] : gear[id];
  const price = buyPrice(data);
  const useEventCurrency = data.currency === "event";
  const wallet = useEventCurrency ? state.eventCoins : state.coins;
  if (wallet < price) {
    setStatus(useEventCurrency ? `Not enough ${currentEvent().currencyLabel || "petals"}.` : "Not enough coins.");
    return;
  }

  if (useEventCurrency) {
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
    state.equippedPet = state.equippedPet === id ? null : id;
    setStatus(state.equippedPet ? `${pet.name} equipped.` : `${pet.name} is resting.`);
    saveState();
    renderUi();
    return;
  }
  if (state.eventCoins < pet.cost) {
    setStatus(`Earn more ${eventCurrencyName()} from event tasks.`);
    return;
  }
  state.eventCoins -= pet.cost;
  state.ownedPets.push(id);
  state.equippedPet = id;
  setStatus(`${pet.name} joined your garden.`);
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
  state.equippedPet = petId;
  setStatus(`${exclusive.name} hatched into ${pet.name}.`);
}

function buyExclusive(id) {
  const exclusive = exclusiveItems[id];
  if (!exclusive || exclusive.event !== currentEvent().id) {
    setStatus("That exclusive is not available right now.");
    return;
  }
  if (state.eventCoins < exclusive.cost) {
    setStatus(`Earn more ${eventCurrencyName()} from this event.`);
    return;
  }

  state.eventCoins -= exclusive.cost;
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
    hatchEgg(exclusive);
  } else if (exclusive.type === "cosmetic") {
    if (!state.ownedCosmetics.includes(exclusive.id)) {
      state.ownedCosmetics.push(exclusive.id);
    }
    state.equippedCosmetic = state.equippedCosmetic === exclusive.id ? null : exclusive.id;
    setStatus(state.equippedCosmetic ? `${exclusive.name} equipped.` : `${exclusive.name} unequipped.`);
  }

  saveState();
  renderUi();
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
  const bonus = state.equippedPet === "queenBee" ? 1.35 : 1;
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
  if (state.coins < 10) {
    setStatus("Restocking costs 10 coins.");
    return;
  }
  state.seedBag.carrot = (state.seedBag.carrot || 0) + 2;
  state.seedBag.berry = (state.seedBag.berry || 0) + 1;
  if (state.equippedPet === "snowSprite") {
    const ids = Object.keys(seeds);
    const id = ids[Math.floor(Math.random() * ids.length)];
    state.seedBag[id] = (state.seedBag[id] || 0) + 1;
  }
  state.coins -= 10;
  addToHotbar("seed", "carrot");
  setStatus("The seed shelf restocked.");
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

  const plant = state.cells[index];
  if (!plant) {
    setStatus("Use gear on a planted crop.");
    return;
  }

  if (id === "wateringCan") {
    plant.watered = state.equippedPet === "frog" ? 28 : 14;
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

  if (id === "sprinkler") {
    waterArea(index);
    setStatus("Sprinkler watered the nearby patch.");
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
      plant.watered = state.equippedPet === "frog" ? 28 : 14;
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
  if (state.equippedPet === "squirrel" && Math.random() < 0.18) {
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
  state.cells[index] = null;
  addTaskProgress("harvest");
  if (currentEvent().premiumSeeds && currentEvent().premiumSeeds.includes(plant.seedId)) {
    addTaskProgress("premiumHarvest");
  }
  setStatus(`${fruitName(plant.seedId, plant.mutation)} harvested.`);
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
        state.cells[i] = null;
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

  for (let row = 0; row < plot.rows; row += 1) {
    for (let col = 0; col < plot.cols; col += 1) {
      const px = plot.marginX + col * (cellW + plot.gap);
      const py = plot.marginY + row * (cellH + plot.gap);
      if (x >= px && x <= px + cellW && y >= py && y <= py + cellH) {
        return row * plot.cols + col;
      }
    }
  }
  return -1;
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
    } else {
      icon.style.background = data.color;
      icon.style.display = "grid";
      icon.style.placeItems = "center";
      icon.style.color = "#10150f";
      icon.style.fontWeight = "900";
      icon.textContent = exclusive.type === "egg" ? "EG" : "FX";
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
    button.disabled = !owned && state.eventCoins < exclusive.cost;
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
    button.disabled = data.currency === "event" ? state.eventCoins < buyPrice(data) : state.coins < buyPrice(data);
    button.addEventListener("click", () => buy(state.shopTab === "seeds" ? "seed" : "gear", data.id));

    row.append(icon, text, button);
    ui.shopList.appendChild(row);
  });
}

function renderPets() {
  ui.petList.innerHTML = "";
  Object.values(pets).filter((pet) => !pet.eventOnly || pet.eventOnly === currentEvent().id || state.ownedPets.includes(pet.id)).forEach((pet) => {
    const owned = state.ownedPets.includes(pet.id);
    const equipped = state.equippedPet === pet.id;
    const row = document.createElement("div");
    row.className = `pet-item${equipped ? " equipped" : ""}`;

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
    button.textContent = owned ? (equipped ? "Rest" : "Equip") : `${pet.cost}${eventCurrencyName()[0]}`;
    button.disabled = !owned && state.eventCoins < pet.cost;
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
    row.insertAdjacentHTML("beforeend", `<div><div class="item-name">${fruitName(fruit.seedId, fruit.mutationId)} x${count}</div><div class="item-meta">Worth ${value} coins now</div></div>`);
    ui.inventoryList.appendChild(row);
  });
}

function renderHotbar() {
  ui.hotbar.innerHTML = "";
  state.hotbar.forEach((slot, index) => {
    const button = document.createElement("button");
    button.className = `slot${index === state.selectedSlot ? " active" : ""}`;
    button.type = "button";
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
      text.innerHTML = `<small>${index + 1} - ${countBagItem(slot.type, slot.id)} left</small><strong>${data.name}</strong>`;
      button.append(icon, text);
    }
    ui.hotbar.appendChild(button);
  });
}

function renderUi() {
  const event = currentEvent();
  renderedEventSlot = state.eventSlot;
  ui.coins.textContent = state.coins;
  ui.eventCoins.textContent = state.eventCoins;
  ui.eventCoinLabel.textContent = eventCurrencyName();
  ui.cropValue.textContent = Math.round(cropValue() * sellMultiplier());
  ui.day.textContent = `Day ${1 + Math.floor((Date.now() - state.startedAt) / 90000)}`;
  ui.eventName.textContent = event.name;
  ui.eventDescription.textContent = event.description;
  ui.eventTradeButton.textContent = event.turnInLabel || "No Fruit Trade";
  ui.eventTradeButton.disabled = !event.turnInRate || cropValue() <= 0;
  ui.eventTimer.textContent = formatTime(state.eventDuration - (Date.now() - state.eventStartedAt));
  ui.sellButton.disabled = cropValue() <= 0;
  ui.quickSellButton.disabled = cropValue() <= 0;
  renderTasks();
  renderExclusiveShop();
  renderShop();
  renderPets();
  renderInventory();
  renderHotbar();
}

function updatePlants(dt) {
  const event = currentEvent();
  state.cells.forEach((plant) => {
    if (!plant) return;
    let multiplier = (event.growthMultiplier || 1) * growthBonus();
    if (plant.watered > 0) {
      multiplier *= event.wateredMultiplier || 1.25;
      plant.watered = Math.max(0, plant.watered - dt);
    }
    if (plant.progress < plant.growTime) {
      plant.progress = Math.min(plant.growTime, plant.progress + dt * multiplier);
    }
  });
}

function drawGarden(time) {
  const event = currentEvent();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = event.sky;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#304428";
  ctx.fillRect(0, canvas.height * 0.08, canvas.width, canvas.height * 0.92);

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

      ctx.fillStyle = "#6a4429";
      drawRoundedRect(x, y, cellW, cellH, 8);
      ctx.fill();
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(x + 8, y + 12, cellW - 16, 5);
      ctx.fillRect(x + 8, y + cellH - 18, cellW - 16, 5);

      if (plant && seeds[plant.seedId]) {
        const data = seeds[plant.seedId];
        const mutation = mutations[plant.mutation] || mutations.normal;
        const progress = plant.progress / plant.growTime;
        const cx = x + cellW / 2;
        const cy = y + cellH / 2;
        const sway = Math.sin(time / 450 + plant.sway) * 2;
        const radius = 6 + progress * 19;

        ctx.fillStyle = plant.watered > 0 ? "rgba(112, 183, 216, 0.28)" : "rgba(0,0,0,0.12)";
        ctx.beginPath();
        ctx.ellipse(cx, cy + 13, radius + 9, 8, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = data.leaf;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(cx, cy + 20);
        ctx.quadraticCurveTo(cx + sway, cy, cx - 11, cy - 13);
        ctx.moveTo(cx, cy + 20);
        ctx.quadraticCurveTo(cx - sway, cy - 3, cx + 12, cy - 12);
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
      }
    }
  }

  const pet = petBonus();
  if (pet) {
    ctx.fillStyle = pet.color;
    ctx.beginPath();
    ctx.arc(55 + Math.sin(time / 600) * 6, canvas.height - 48, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#10150f";
    ctx.font = "800 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(pet.mark, 55 + Math.sin(time / 600) * 6, canvas.height - 44);
    ctx.textAlign = "left";
  }

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

  ctx.fillStyle = "rgba(0,0,0,0.36)";
  drawRoundedRect(20, 20, 282, 38, 8);
  ctx.fill();
  ctx.fillStyle = "#f4f1e8";
  ctx.font = "700 16px Inter, sans-serif";
  ctx.fillText("Click soil to plant, boost, or harvest", 36, 44);
}

function tick(now) {
  const dt = Math.min(0.08, (now - state.lastTime) / 1000);
  state.lastTime = now;
  updatePlants(dt);
  drawGarden(now);
  if (state.eventSlot !== renderedEventSlot) {
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
  requestAnimationFrame(tick);
}

canvas.addEventListener("click", (event) => {
  const index = cellAt(event.clientX, event.clientY);
  if (index >= 0) {
    handlePlotClick(index);
  }
});

window.addEventListener("keydown", (event) => {
  const number = Number(event.key);
  if (number >= 1 && number <= 8) {
    state.selectedSlot = number - 1;
    saveState();
    renderUi();
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

currentEvent();
let renderedEventSlot = state.eventSlot;
if (offlineReport && offlineReport.minutes > 0) {
  setStatus(`Welcome back. ${offlineReport.minutes} offline minutes grew ${offlineReport.matured} crops.`);
}
saveState();
renderUi();
requestAnimationFrame(tick);
