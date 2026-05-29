"use strict";

const SAVE_KEY = "grow-plot-save-v2";

const canvas = document.getElementById("garden");
const ctx = canvas.getContext("2d");

const ui = {
  coins: document.getElementById("coinText"),
  eventCoins: document.getElementById("eventCoinText"),
  cropValue: document.getElementById("valueText"),
  day: document.getElementById("dayText"),
  status: document.getElementById("statusText"),
  eventTimer: document.getElementById("eventTimer"),
  eventName: document.getElementById("eventName"),
  eventDescription: document.getElementById("eventDescription"),
  taskList: document.getElementById("taskList"),
  shopList: document.getElementById("shopList"),
  inventoryList: document.getElementById("inventoryList"),
  petList: document.getElementById("petList"),
  hotbar: document.getElementById("hotbar"),
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
  }
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
  coins: 125,
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
  seedBag: { carrot: 4, berry: 1 },
  gearBag: {},
  ownedPets: [],
  equippedPet: null,
  hotbar: [
    { type: "seed", id: "carrot" },
    { type: "seed", id: "berry" },
    { type: "gear", id: "wateringCan" },
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
      ownedPets: Array.isArray(saved.ownedPets) ? saved.ownedPets : []
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
  event.tasks.forEach((task) => {
    if (task.id !== action) return;
    const key = taskKey(event.id, task.id);
    state.taskProgress[key] = Math.min(task.target, taskProgress(key) + amount);
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
    return seeds[id] ? sum + seeds[id].value * count : sum;
  }, 0);
}

function sellMultiplier() {
  return currentEvent().saleMultiplier * saleBonus();
}

function cropSellValue(id, count) {
  const event = currentEvent();
  let multiplier = sellMultiplier();
  if (event.premiumSeeds && event.premiumSeeds.includes(id)) {
    multiplier *= event.premiumMultiplier || 1;
  }
  return Math.round(seeds[id].value * count * multiplier);
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
  if (state.coins < price) {
    setStatus("Not enough coins.");
    return;
  }

  state.coins -= price;
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
    setStatus("Earn more petals from event tasks.");
    return;
  }
  state.eventCoins -= pet.cost;
  state.ownedPets.push(id);
  state.equippedPet = id;
  setStatus(`${pet.name} joined your garden.`);
  saveState();
  renderUi();
}

function sellAll() {
  const base = cropValue();
  if (base <= 0) {
    setStatus("Harvest crops before selling.");
    return;
  }
  const total = Object.entries(state.inventory).reduce((sum, [id, count]) => {
    return seeds[id] ? sum + cropSellValue(id, count) : sum;
  }, 0);
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

function scanFruitForSeeds(seedId) {
  if ((state.inventory[seedId] || 0) <= 0) {
    setStatus("Harvest that fruit before scanning it.");
    return false;
  }
  state.inventory[seedId] -= 1;
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
    progress: 0,
    growTime: seed.growTime,
    watered: 0,
    fertilized: false,
    sway: Math.random() * Math.PI * 2
  };
  addTaskProgress("plant");
  if (currentEvent().plantingPetalChance && Math.random() < currentEvent().plantingPetalChance) {
    state.eventCoins += 3;
    setStatus(`${seed.name} planted. Lucky bug found 3 petals.`);
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
  state.inventory[plant.seedId] = (state.inventory[plant.seedId] || 0) + 1;
  state.cells[index] = null;
  addTaskProgress("harvest");
  if (currentEvent().premiumSeeds && currentEvent().premiumSeeds.includes(plant.seedId)) {
    addTaskProgress("premiumHarvest");
  }
  setStatus(`${seeds[plant.seedId].crop} harvested.`);
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
        state.inventory[plant.seedId] = (state.inventory[plant.seedId] || 0) + 1;
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

function renderShop() {
  const source = state.shopTab === "seeds" ? seeds : gear;
  ui.shopList.innerHTML = "";
  Object.values(source).forEach((data) => {
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
    button.textContent = `${buyPrice(data)}c`;
    button.disabled = state.coins < buyPrice(data);
    button.addEventListener("click", () => buy(state.shopTab === "seeds" ? "seed" : "gear", data.id));

    row.append(icon, text, button);
    ui.shopList.appendChild(row);
  });
}

function renderPets() {
  ui.petList.innerHTML = "";
  Object.values(pets).forEach((pet) => {
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
    button.textContent = owned ? (equipped ? "Rest" : "Equip") : `${pet.cost}p`;
    button.disabled = !owned && state.eventCoins < pet.cost;
    button.addEventListener("click", () => buyPet(pet.id));

    row.append(icon, text, button);
    ui.petList.appendChild(row);
  });
}

function renderInventory() {
  ui.inventoryList.innerHTML = "";
  const entries = Object.entries(state.inventory).filter((entry) => entry[1] > 0 && seeds[entry[0]]);
  if (!entries.length) {
    const empty = document.createElement("div");
    empty.className = "inventory-item";
    empty.innerHTML = "<div></div><div><div class=\"item-name\">No fruit yet</div><div class=\"item-meta\">Harvest ready crops from your plot.</div></div>";
    ui.inventoryList.appendChild(empty);
    return;
  }

  entries.forEach(([id, count]) => {
    const data = seeds[id];
    const row = document.createElement("div");
    row.className = "inventory-item";
    const icon = document.createElement("div");
    icon.className = "inventory-icon";
    drawIcon(icon, data, "seed");
    const value = cropSellValue(id, count);
    row.append(icon);
    row.insertAdjacentHTML("beforeend", `<div><div class="item-name">${data.crop} x${count}</div><div class="item-meta">Worth ${value} coins now</div></div>`);
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
  ui.coins.textContent = state.coins;
  ui.eventCoins.textContent = state.eventCoins;
  ui.cropValue.textContent = Math.round(cropValue() * sellMultiplier());
  ui.day.textContent = `Day ${1 + Math.floor((Date.now() - state.startedAt) / 90000)}`;
  ui.eventName.textContent = event.name;
  ui.eventDescription.textContent = event.description;
  ui.eventTimer.textContent = formatTime(state.eventDuration - (Date.now() - state.eventStartedAt));
  ui.sellButton.disabled = cropValue() <= 0;
  renderTasks();
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

        ctx.fillStyle = data.color;
        ctx.beginPath();
        ctx.arc(cx, cy + 10, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.beginPath();
        ctx.arc(cx - radius * 0.3, cy + 3, Math.max(2, radius * 0.18), 0, Math.PI * 2);
        ctx.fill();

        if (progress >= 1) {
          ctx.strokeStyle = "#f4f1e8";
          ctx.lineWidth = 3;
          ctx.strokeRect(x + 6, y + 6, cellW - 12, cellH - 12);
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
ui.restockButton.addEventListener("click", restock);
ui.resetButton.addEventListener("click", resetProgress);

currentEvent();
if (offlineReport && offlineReport.minutes > 0) {
  setStatus(`Welcome back. ${offlineReport.minutes} offline minutes grew ${offlineReport.matured} crops.`);
}
saveState();
renderUi();
requestAnimationFrame(tick);
