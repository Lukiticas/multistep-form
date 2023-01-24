const createCard = (source, period) => {
  if (!source) return [];
  return source.map((item) => ({
    title: item?.title,
    period: period[1],
    pricing: item?.pricing[period[0]]?.value,
    description: item?.subtitle,
    promo: item?.pricing[period[0]]?.promo,
    iconName: item?.icon,
  }));
};

export default createCard;
