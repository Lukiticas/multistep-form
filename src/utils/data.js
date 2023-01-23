const plans = [
  {
    title: "Arcade",
    icon: "icon-arcade.svg",
    pricing: {
      monthly: { value: 9, promo: "" },
      yearly: { value: 90, promo: "2 months free" },
    },
  },
  {
    title: "Advanced",
    icon: "icon-advanced.svg",
    pricing: {
      monthly: { value: 12, promo: "" },
      yearly: { value: 120, promo: "2 months free" },
    },
  },
  {
    title: "Pro",
    icon: "icon-pro.svg",
    pricing: {
      monthly: { value: 15, promo: "" },
      yearly: { value: 150, promo: "2 months free" },
    },
  },
];

const addons = [
  {
    title: "Online Service",
    subtitle: "Acess to multiplayer games",
    pricing: {
      monthly: 1,
      yearly: 10,
    },
  },
  {
    title: "Larger Storage",
    subtitle: "Extra 1TB of cloud save",
    pricing: {
      monthly: 2,
      yearly: 20,
    },
  },
  {
    title: "Customizable Profile",
    subtitle: "Custom themes on your profile",
    pricing: {
      monthly: 2,
      yearly: 20,
    },
  },
];

export { addons, plans };
