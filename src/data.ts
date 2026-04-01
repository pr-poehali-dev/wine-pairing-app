export type AlcoholType = 'red' | 'white' | 'sparkling' | 'strong' | 'any';
export type Sweetness = 'dry' | 'semidry' | 'semisweet' | 'sweet' | 'any';
export type Body = 'light' | 'medium' | 'full' | 'any';
export type Budget = 'under1k' | '1k-3k' | '3k-5k' | 'unlimited';

export interface UserPrefs {
  alcoholType: AlcoholType;
  sweetness: Sweetness;
  body: Body;
  budget: Budget;
  favorites: string;
}

export interface ShopLinks {
  krasnoeBeloe?: string;
  bristol?: string;
}

export interface Drink {
  id: string;
  name: string;
  nameRu: string;
  type: AlcoholType | 'strong';
  category: string;
  sweetness: Sweetness;
  body: Body;
  priceMin: number;
  priceMax: number;
  priceLabel: string;
  description: string;
  grape?: string;
  emoji: string;
  keywords: string[];
  shopLinks?: ShopLinks;
  region?: string;
  foodPairings?: string[];
}

export interface DrinkMatch {
  drink: Drink;
  reason: string;
  score: number;
}

export interface HistoryItem {
  id: string;
  dish: string;
  matches: DrinkMatch[];
  date: string;
}

export const DRINKS: Drink[] = [
  {
    id: 'cab-sauv',
    name: 'Каберне Совиньон',
    nameRu: 'Каберне Совиньон',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'full',
    priceMin: 1500,
    priceMax: 3000,
    priceLabel: '1 500 – 3 000 ₽',
    description: 'Мощное красное с нотами черной смородины и кедра. Идеально балансирует жирность мяса.',
    grape: 'Каберне Совиньон',
    emoji: '🍷',
    region: 'Франция / Чили',
    foodPairings: ['Стейк', 'Баранина', 'Выдержанные сыры'],
    keywords: ['стейк', 'говядина', 'мясо', 'рибай', 'ростбиф', 'баранина', 'жаркое', 'шашлык из говядины', 'антрекот', 'карпаччо'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=каберне+совиньон',
      bristol: 'https://bristol.ru/catalog/?search=каберне+совиньон',
    },
  },
  {
    id: 'chardonnay',
    name: 'Шардоне',
    nameRu: 'Шардоне',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Элегантное белое с нотами персика и ванили. Подчеркивает нежность рыбы и сливочные соусы.',
    grape: 'Шардоне',
    emoji: '🥂',
    region: 'Бургундия / Новый свет',
    foodPairings: ['Лосось', 'Паста со сливками', 'Курица'],
    keywords: ['лосось', 'семга', 'рыба', 'форель', 'морепродукты', 'крем-суп', 'сливочный', 'паста со сливками', 'судак', 'треска'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=шардоне',
      bristol: 'https://bristol.ru/catalog/?search=шардоне',
    },
  },
  {
    id: 'pinot-grigio',
    name: 'Пино Гриджио',
    nameRu: 'Пино Гриджио',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 800,
    priceMax: 2000,
    priceLabel: '800 – 2 000 ₽',
    description: 'Свежее и легкое с цитрусовыми нотами. Отлично сочетается с пастой и блюдами с яйцом.',
    grape: 'Пино Гриджио',
    emoji: '🥂',
    region: 'Северная Италия',
    foodPairings: ['Паста карбонара', 'Омлет', 'Морепродукты'],
    keywords: ['карбонара', 'паста', 'спагетти', 'яйцо', 'бекон', 'ветчина', 'яичница', 'омлет', 'равиоли', 'паста болоньезе'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=пино+гриджио',
      bristol: 'https://bristol.ru/catalog/?search=пино+гриджио',
    },
  },
  {
    id: 'sauv-blanc',
    name: 'Совиньон Блан',
    nameRu: 'Совиньон Блан',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 800,
    priceMax: 1800,
    priceLabel: '800 – 1 800 ₽',
    description: 'Травянистое и минеральное с нотами крыжовника. Освежает вкус птицы и салатов.',
    grape: 'Совиньон Блан',
    emoji: '🥂',
    region: 'Луара / Новая Зеландия',
    foodPairings: ['Курица гриль', 'Цезарь', 'Козий сыр'],
    keywords: ['курица', 'цыпленок', 'индейка', 'птица', 'гриль', 'салат', 'козий сыр', 'зелень', 'спаржа', 'цезарь'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=совиньон+блан',
      bristol: 'https://bristol.ru/catalog/?search=совиньон+блан',
    },
  },
  {
    id: 'pinot-noir',
    name: 'Пино Нуар',
    nameRu: 'Пино Нуар',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 1200,
    priceMax: 3000,
    priceLabel: '1 200 – 3 000 ₽',
    description: 'Изящное красное с нотами вишни и земли. Идеальный партнер для утки и дичи.',
    grape: 'Пино Нуар',
    emoji: '🍷',
    region: 'Бургундия / Орегон',
    foodPairings: ['Утка', 'Лосось', 'Трюфель'],
    keywords: ['утка', 'дичь', 'перепел', 'фазан', 'кролик', 'оленина', 'лосось', 'тунец', 'гриб', 'трюфель'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=пино+нуар',
      bristol: 'https://bristol.ru/catalog/?search=пино+нуар',
    },
  },
  {
    id: 'merlot',
    name: 'Мерло',
    nameRu: 'Мерло',
    type: 'red',
    category: 'Красное полусухое',
    sweetness: 'semidry',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Бархатистое и округлое с нотами сливы и шоколада. Оттеняет вкус сыров и мясных блюд.',
    grape: 'Мерло',
    emoji: '🍷',
    region: 'Бордо / Тоскана',
    foodPairings: ['Сырная тарелка', 'Телятина', 'Лазанья'],
    keywords: ['сыр', 'сырная тарелка', 'камамбер', 'бри', 'гауда', 'пармезан', 'мясо', 'телятина', 'лазанья'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=мерло',
      bristol: 'https://bristol.ru/catalog/?search=мерло',
    },
  },
  {
    id: 'riesling',
    name: 'Рислинг',
    nameRu: 'Рислинг',
    type: 'white',
    category: 'Белое полусладкое',
    sweetness: 'semisweet',
    body: 'light',
    priceMin: 800,
    priceMax: 2000,
    priceLabel: '800 – 2 000 ₽',
    description: 'Ароматное с нотами яблока и петроля. Укрощает остроту азиатских блюд.',
    grape: 'Рислинг',
    emoji: '🥂',
    region: 'Германия / Эльзас',
    foodPairings: ['Том ям', 'Карри', 'Суши'],
    keywords: ['том ям', 'тайский суп', 'азиатская', 'острое', 'карри', 'суши', 'роллы', 'китайская', 'вьетнамская', 'пад тай', 'вок'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=рислинг',
      bristol: 'https://bristol.ru/catalog/?search=рислинг',
    },
  },
  {
    id: 'muscat',
    name: 'Мускат',
    nameRu: 'Мускат',
    type: 'white',
    category: 'Белое сладкое',
    sweetness: 'sweet',
    body: 'light',
    priceMin: 600,
    priceMax: 1500,
    priceLabel: '600 – 1 500 ₽',
    description: 'Ароматный и медовый. Идеален как аперитив или с легкими десертами.',
    grape: 'Мускат',
    emoji: '🍾',
    region: 'Эльзас / Крым',
    foodPairings: ['Десерты', 'Фрукты', 'Пирожные'],
    keywords: ['десерт', 'торт', 'чизкейк', 'пирожное', 'фрукты', 'тирамису', 'мороженое', 'панакота', 'крем-брюле', 'медовик', 'сладкое'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=мускат',
      bristol: 'https://bristol.ru/catalog/?search=мускат',
    },
  },
  {
    id: 'chianti',
    name: 'Кьянти',
    nameRu: 'Кьянти',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 800,
    priceMax: 2000,
    priceLabel: '800 – 2 000 ₽',
    description: 'Итальянское классическое с кислинкой вишни. Создано для пиццы и томатных соусов.',
    grape: 'Санджовезе',
    emoji: '🍷',
    region: 'Тоскана, Италия',
    foodPairings: ['Пицца', 'Паста болоньезе', 'Капрезе'],
    keywords: ['пицца', 'маргарита', 'томатный соус', 'итальянская', 'брускетта', 'капрезе', 'арабьята', 'нисуаз'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=кьянти',
      bristol: 'https://bristol.ru/catalog/?search=кьянти',
    },
  },
  {
    id: 'saperavi',
    name: 'Саперави',
    nameRu: 'Саперави',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'full',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Грузинское мощное с нотами ежевики и специй. Создано для шашлыка и грузинской кухни.',
    grape: 'Саперави',
    emoji: '🍷',
    region: 'Кахетия, Грузия',
    foodPairings: ['Шашлык', 'Хинкали', 'Харчо'],
    keywords: ['шашлык', 'барбекю', 'гриль', 'люля', 'свинина на мангале', 'хинкали', 'чахохбили', 'сациви', 'грузинская', 'харчо'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=саперави',
      bristol: 'https://bristol.ru/catalog/?search=саперави',
    },
  },
  {
    id: 'chablis',
    name: 'Шабли',
    nameRu: 'Шабли',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 1500,
    priceMax: 3500,
    priceLabel: '1 500 – 3 500 ₽',
    description: 'Минеральное с легкой солоноватостью. Легендарная пара для устриц и моллюсков.',
    grape: 'Шардоне',
    emoji: '🥂',
    region: 'Бургундия, Франция',
    foodPairings: ['Устрицы', 'Мидии', 'Сибас'],
    keywords: ['устрицы', 'мидии', 'моллюски', 'гребешки', 'морепродукты', 'севиче', 'тартар из рыбы', 'дорада', 'сибас'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=шабли',
      bristol: 'https://bristol.ru/catalog/?search=шабли',
    },
  },
  {
    id: 'verdicchio',
    name: 'Вердиккьо',
    nameRu: 'Вердиккьо',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 800,
    priceMax: 2000,
    priceLabel: '800 – 2 000 ₽',
    description: 'Свежее итальянское с миндальными нотами. Оттеняет деликатный вкус морепродуктов в пасте.',
    grape: 'Вердиккьо',
    emoji: '🥂',
    region: 'Марке, Италия',
    foodPairings: ['Паста с морепродуктами', 'Паэлья', 'Ризотто'],
    keywords: ['паста с морепродуктами', 'лингвини', 'спагетти с креветками', 'морепродукты', 'паэлья', 'ризотто с морепродуктами'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=вердиккьо',
      bristol: 'https://bristol.ru/catalog/?search=вердиккьо',
    },
  },
  {
    id: 'barbera',
    name: 'Барбера',
    nameRu: 'Барбера',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Живое с яркой кислотностью и нотами вишни. Подчеркивает глубину грибного ризотто.',
    grape: 'Барбера',
    emoji: '🍷',
    region: 'Пьемонт, Италия',
    foodPairings: ['Ризотто с грибами', 'Пицца', 'Паста'],
    keywords: ['ризотто', 'ризотто с грибами', 'грибы', 'белые грибы', 'трюфель', 'лисички', 'опята'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=барбера',
      bristol: 'https://bristol.ru/catalog/?search=барбера',
    },
  },
  {
    id: 'prosecco',
    name: 'Просекко',
    nameRu: 'Просекко',
    type: 'sparkling',
    category: 'Игристое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 800,
    priceMax: 2000,
    priceLabel: '800 – 2 000 ₽',
    description: 'Игривое и фруктовое. Отлично открывает аппетит и сочетается с легкими закусками.',
    grape: 'Глера',
    emoji: '🍾',
    region: 'Венето, Италия',
    foodPairings: ['Закуски', 'Карпаччо', 'Суши'],
    keywords: ['закуска', 'брускетта', 'канапе', 'легкая закуска', 'прошутто', 'карпаччо', 'суши', 'аперитив', 'дни рождения'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=просекко',
      bristol: 'https://bristol.ru/catalog/?search=просекко',
    },
  },
  {
    id: 'champagne',
    name: 'Шампанское',
    nameRu: 'Шампанское',
    type: 'sparkling',
    category: 'Игристое брют',
    sweetness: 'dry',
    body: 'light',
    priceMin: 2000,
    priceMax: 8000,
    priceLabel: '2 000 – 8 000 ₽',
    description: 'Королева праздничного стола. Универсально подходит к икре, устрицам и рыбным блюдам.',
    grape: 'Шардоне / Пино Нуар',
    emoji: '🍾',
    region: 'Шампань, Франция',
    foodPairings: ['Икра', 'Устрицы', 'Лосось'],
    keywords: ['икра', 'лобстер', 'краб', 'морепродукты', 'устрицы', 'праздник', 'лосось', 'дорогой ресторан'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=шампанское',
      bristol: 'https://bristol.ru/catalog/?search=шампанское',
    },
  },
  {
    id: 'tempranillo',
    name: 'Темпранильо',
    nameRu: 'Темпранильо',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Испанское с нотами кожи и табака. Идеально к иберийской кухне — хамону и тапасам.',
    grape: 'Темпранильо',
    emoji: '🍷',
    region: 'Риоха, Испания',
    foodPairings: ['Хамон', 'Паэлья', 'Чоризо'],
    keywords: ['хамон', 'тапас', 'испанская кухня', 'чоризо', 'паэлья', 'тапас', 'мортаделла', 'мясная нарезка'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=темпранильо',
      bristol: 'https://bristol.ru/catalog/?search=темпранильо',
    },
  },
  {
    id: 'gewurztraminer',
    name: 'Гевюрцтраминер',
    nameRu: 'Гевюрцтраминер',
    type: 'white',
    category: 'Белое полусладкое',
    sweetness: 'semisweet',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Экзотический аромат личи и роз. Смягчает острые и пряные нотки восточных блюд.',
    grape: 'Гевюрцтраминер',
    emoji: '🥂',
    region: 'Эльзас / Германия',
    foodPairings: ['Карри', 'Тагин', 'Индийская кухня'],
    keywords: ['индийская', 'марокканская', 'тагин', 'карри', 'острое', 'пряное', 'тайская', 'фо бо', 'лапша'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=гевюрцтраминер',
      bristol: 'https://bristol.ru/catalog/?search=гевюрцтраминер',
    },
  },
  {
    id: 'rose',
    name: 'Розе Прованс',
    nameRu: 'Розе Прованс',
    type: 'sparkling',
    category: 'Розовое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 1200,
    priceMax: 3000,
    priceLabel: '1 200 – 3 000 ₽',
    description: 'Изящное розовое с нотами клубники и пиона. Универсальный выбор для летней кухни.',
    grape: 'Гренаш / Сенсо',
    emoji: '🌹',
    region: 'Прованс, Франция',
    foodPairings: ['Салаты', 'Овощи гриль', 'Рататуй'],
    keywords: ['греческий салат', 'овощи гриль', 'рататуй', 'нисуаз', 'средиземноморская', 'летний', 'легкий обед', 'овощной'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=розе',
      bristol: 'https://bristol.ru/catalog/?search=розе',
    },
  },
  {
    id: 'port',
    name: 'Портвейн',
    nameRu: 'Портвейн',
    type: 'strong',
    category: 'Крепленое',
    sweetness: 'sweet',
    body: 'full',
    priceMin: 1500,
    priceMax: 4000,
    priceLabel: '1 500 – 4 000 ₽',
    description: 'Португальский десертный шедевр. Великолепен с голубым сыром и шоколадными десертами.',
    emoji: '🍷',
    region: 'Дору, Португалия',
    foodPairings: ['Горький шоколад', 'Рокфор', 'Фондан'],
    keywords: ['горький шоколад', 'шоколадный торт', 'голубой сыр', 'рокфор', 'горгонзола', 'десерт', 'шоколадный фондан'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=портвейн',
      bristol: 'https://bristol.ru/catalog/?search=портвейн',
    },
  },
  {
    id: 'whisky',
    name: 'Виски Single Malt',
    nameRu: 'Виски',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'dry',
    body: 'full',
    priceMin: 2000,
    priceMax: 8000,
    priceLabel: '2 000 – 8 000 ₽',
    description: 'Шотландское с дымными и торфяными нотами. Усиливает богатство красного мяса.',
    emoji: '🥃',
    region: 'Шотландия',
    foodPairings: ['Стейк', 'Копчёное мясо', 'Зрелые сыры'],
    keywords: ['стейк', 'говядина', 'мясо', 'ребра', 'бургер', 'барбекю', 'копченое', 'рибай', 'антрекот'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=виски',
      bristol: 'https://bristol.ru/catalog/?search=виски',
    },
  },
  {
    id: 'gin',
    name: 'Джин Тоник',
    nameRu: 'Джин',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'dry',
    body: 'light',
    priceMin: 1000,
    priceMax: 3000,
    priceLabel: '1 000 – 3 000 ₽',
    description: 'Освежающий с ботаническими нотами. Контрастирует с морским вкусом рыбы и морепродуктов.',
    emoji: '🍸',
    region: 'Великобритания',
    foodPairings: ['Морепродукты', 'Устрицы', 'Севиче'],
    keywords: ['рыба', 'морепродукты', 'цитрус', 'легкая закуска', 'тар тар', 'севиче', 'устрицы', 'мидии'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=джин',
      bristol: 'https://bristol.ru/catalog/?search=джин',
    },
  },
  {
    id: 'cognac',
    name: 'Коньяк',
    nameRu: 'Коньяк',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'dry',
    body: 'full',
    priceMin: 2000,
    priceMax: 10000,
    priceLabel: '2 000 – 10 000 ₽',
    description: 'Французский с нотами дуба и ванили. Завершает трапезу или дополняет нежные мясные блюда.',
    emoji: '🥃',
    region: 'Коньяк, Франция',
    foodPairings: ['Фуа-гра', 'Паштет', 'Шоколад'],
    keywords: ['мясо', 'говядина', 'десерт', 'шоколад', 'форс мажор', 'жульен', 'паштет', 'фуа-гра'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=коньяк',
      bristol: 'https://bristol.ru/catalog/?search=коньяк',
    },
  },
  {
    id: 'sake',
    name: 'Саке',
    nameRu: 'Саке',
    type: 'strong',
    category: 'Японское рисовое',
    sweetness: 'semidry',
    body: 'light',
    priceMin: 1000,
    priceMax: 3000,
    priceLabel: '1 000 – 3 000 ₽',
    description: 'Японское рисовое с тонким умами. Создано для японской кухни — суши, сашими, рамен.',
    emoji: '🍶',
    region: 'Япония',
    foodPairings: ['Суши', 'Сашими', 'Темпура'],
    keywords: ['суши', 'сашими', 'роллы', 'японская', 'рамен', 'темпура', 'мисо суп', 'угорь', 'тунец'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=саке',
      bristol: 'https://bristol.ru/catalog/?search=саке',
    },
  },
  {
    id: 'albarino',
    name: 'Альбариньо',
    nameRu: 'Альбариньо',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 1200,
    priceMax: 2800,
    priceLabel: '1 200 – 2 800 ₽',
    description: 'Испанское с нотами персика и соли. Идеальная пара для морских блюд Атлантики.',
    grape: 'Альбариньо',
    emoji: '🥂',
    region: 'Галисия, Испания',
    foodPairings: ['Осьминог', 'Кальмар', 'Паэлья'],
    keywords: ['осьминог', 'кальмар', 'мидии', 'рыба', 'морепродукты', 'паэлья', 'гаспачо', 'испанская'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=альбариньо',
      bristol: 'https://bristol.ru/catalog/?search=альбариньо',
    },
  },
  {
    id: 'malbec',
    name: 'Мальбек',
    nameRu: 'Мальбек',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'full',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Аргентинское с нотами сливы и фиалки. Мощный партнер для жареного мяса.',
    grape: 'Мальбек',
    emoji: '🍷',
    region: 'Мендоса, Аргентина',
    foodPairings: ['Асадо', 'Стейк', 'Свинина гриль'],
    keywords: ['асадо', 'чоризо', 'аргентинский стейк', 'говядина', 'свинина', 'мясо на гриле', 'шашлык'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=мальбек',
      bristol: 'https://bristol.ru/catalog/?search=мальбек',
    },
  },
  {
    id: 'verdejo',
    name: 'Вердехо',
    nameRu: 'Вердехо',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'light',
    priceMin: 800,
    priceMax: 1800,
    priceLabel: '800 – 1 800 ₽',
    description: 'Испанское с нежными травяными нотами. Освежает вкус овощных блюд и рыбы.',
    grape: 'Вердехо',
    emoji: '🥂',
    region: 'Руэда, Испания',
    foodPairings: ['Рыба', 'Овощи', 'Брускетта'],
    keywords: ['овощи', 'рататуй', 'брускетта', 'паэлья', 'рыба', 'морепродукты', 'вегетарианское'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=вердехо',
      bristol: 'https://bristol.ru/catalog/?search=вердехо',
    },
  },
  {
    id: 'grenache',
    name: 'Гренаш',
    nameRu: 'Гренаш',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 900,
    priceMax: 2200,
    priceLabel: '900 – 2 200 ₽',
    description: 'Южнофранцузское с нотами малины и пряностей. Великолепно с блюдами на гриле и бараниной.',
    grape: 'Гренаш',
    emoji: '🍷',
    region: 'Рона / Испания',
    foodPairings: ['Баранина', 'Тапас', 'Буйабес'],
    keywords: ['баранина', 'ягненок', 'тапас', 'буйабес', 'рыбный суп', 'прованская кухня', 'средиземноморская'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=гренаш',
      bristol: 'https://bristol.ru/catalog/?search=гренаш',
    },
  },
  {
    id: 'syrah',
    name: 'Сира / Шираз',
    nameRu: 'Сира',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'full',
    priceMin: 1200,
    priceMax: 3000,
    priceLabel: '1 200 – 3 000 ₽',
    description: 'Мощное с нотами чёрного перца и фиалки. Создан для копчёных блюд и тёмного мяса.',
    grape: 'Сира',
    emoji: '🍷',
    region: 'Рона / Австралия',
    foodPairings: ['Копчёная утка', 'Оленина', 'BBQ рёбра'],
    keywords: ['копченое', 'утка', 'оленина', 'дичь', 'барбекю', 'ребра', 'тёмное мясо', 'гриль мясо'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=шираз',
      bristol: 'https://bristol.ru/catalog/?search=шираз',
    },
  },
  {
    id: 'nebbiolo',
    name: 'Неббиоло / Бароло',
    nameRu: 'Бароло',
    type: 'red',
    category: 'Красное сухое',
    sweetness: 'dry',
    body: 'full',
    priceMin: 2500,
    priceMax: 7000,
    priceLabel: '2 500 – 7 000 ₽',
    description: 'Король итальянских вин. Мощные танины и ноты роз, дёгтя и вишни — для особых случаев.',
    grape: 'Неббиоло',
    emoji: '🍷',
    region: 'Пьемонт, Италия',
    foodPairings: ['Трюфель', 'Брезаола', 'Зрелый пармезан'],
    keywords: ['трюфель', 'тартуфо', 'брезаола', 'пармезан', 'особый случай', 'праздник', 'дорогой ужин'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=бароло',
      bristol: 'https://bristol.ru/catalog/?search=бароло',
    },
  },
  {
    id: 'viognier',
    name: 'Вионье',
    nameRu: 'Вионье',
    type: 'white',
    category: 'Белое сухое',
    sweetness: 'dry',
    body: 'medium',
    priceMin: 1000,
    priceMax: 2500,
    priceLabel: '1 000 – 2 500 ₽',
    description: 'Ароматное с нотами персика и жасмина. Экзотический выбор для пряной птицы и морепродуктов.',
    grape: 'Вионье',
    emoji: '🥂',
    region: 'Конд-Роти, Франция',
    foodPairings: ['Курица с пряностями', 'Лангустин', 'Тайская кухня'],
    keywords: ['курица с пряностями', 'тайская', 'лангустин', 'креветки', 'пряная птица', 'морепродукты пряные'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=вионье',
      bristol: 'https://bristol.ru/catalog/?search=вионье',
    },
  },
  {
    id: 'grappa',
    name: 'Граппа',
    nameRu: 'Граппа',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'dry',
    body: 'full',
    priceMin: 1500,
    priceMax: 5000,
    priceLabel: '1 500 – 5 000 ₽',
    description: 'Итальянская виноградная водка. Традиционно завершает трапезу — дижестив после пасты или мяса.',
    emoji: '🥃',
    region: 'Италия',
    foodPairings: ['Тирамису', 'Панна котта', 'Кофе'],
    keywords: ['тирамису', 'панна котта', 'десерт итальянский', 'кофе', 'дижестив', 'после ужина', 'итальянская кухня'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=граппа',
      bristol: 'https://bristol.ru/catalog/?search=граппа',
    },
  },
  {
    id: 'calvados',
    name: 'Кальвадос',
    nameRu: 'Кальвадос',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'semidry',
    body: 'medium',
    priceMin: 2000,
    priceMax: 6000,
    priceLabel: '2 000 – 6 000 ₽',
    description: 'Нормандский яблочный бренди. Прекрасен с нормандской кухней — камамбером и свининой.',
    emoji: '🍎',
    region: 'Нормандия, Франция',
    foodPairings: ['Камамбер', 'Свинина', 'Яблочный пирог'],
    keywords: ['камамбер', 'свинина', 'яблочный пирог', 'нормандская кухня', 'сыр мягкий', 'фрукты'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=кальвадос',
      bristol: 'https://bristol.ru/catalog/?search=кальвадос',
    },
  },
  {
    id: 'rum',
    name: 'Ром',
    nameRu: 'Ром',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'semisweet',
    body: 'medium',
    priceMin: 1000,
    priceMax: 4000,
    priceLabel: '1 000 – 4 000 ₽',
    description: 'Карибский с нотами тростника и ванили. Неожиданно хорош к острым мясным блюдам и сладким десертам.',
    emoji: '🏴‍☠️',
    region: 'Карибы / Куба',
    foodPairings: ['Карибская кухня', 'Шоколадный торт', 'Острые рёбра'],
    keywords: ['ром коктейль', 'карибская', 'кубинская', 'острые ребра', 'шоколадный торт', 'пряный', 'тёмный десерт'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=ром',
      bristol: 'https://bristol.ru/catalog/?search=ром',
    },
  },
  {
    id: 'beer-craft',
    name: 'Крафтовый эль',
    nameRu: 'Крафтовый эль',
    type: 'strong',
    category: 'Пиво',
    sweetness: 'semidry',
    body: 'medium',
    priceMin: 300,
    priceMax: 800,
    priceLabel: '300 – 800 ₽',
    description: 'Ароматный эль с фруктовыми и цветочными нотами. Отлично сочетается с бургером, пиццей и острой едой.',
    emoji: '🍺',
    region: 'США / Европа',
    foodPairings: ['Бургер', 'Пицца', 'Крылышки BBQ'],
    keywords: ['бургер', 'пицца', 'крылышки', 'нагетсы', 'хот-дог', 'острое', 'фастфуд', 'жареное'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=эль',
      bristol: 'https://bristol.ru/catalog/?search=эль',
    },
  },
  {
    id: 'mezcal',
    name: 'Мескаль',
    nameRu: 'Мескаль',
    type: 'strong',
    category: 'Крепкий',
    sweetness: 'dry',
    body: 'full',
    priceMin: 2500,
    priceMax: 7000,
    priceLabel: '2 500 – 7 000 ₽',
    description: 'Мексиканский с дымным характером агавы. Дерзкий выбор к тако и мексиканской кухне.',
    emoji: '🌵',
    region: 'Оахака, Мексика',
    foodPairings: ['Тако', 'Гуакамоле', 'Чили'],
    keywords: ['тако', 'мексиканская', 'гуакамоле', 'начос', 'чили', 'буррито', 'фахитас', 'острая мексиканская'],
    shopLinks: {
      krasnoeBeloe: 'https://www.krasnoeibeloe.ru/search/?query=мескаль',
      bristol: 'https://bristol.ru/catalog/?search=мескаль',
    },
  },
];

function matchesKeyword(dish: string, keywords: string[]): number {
  const dishLower = dish.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (dishLower.includes(kw.toLowerCase())) {
      score += kw.length > 6 ? 3 : 2;
    }
  }
  return score;
}

function budgetMatches(drink: Drink, budget: Budget): boolean {
  if (budget === 'unlimited') return true;
  if (budget === 'under1k') return drink.priceMin < 1000;
  if (budget === '1k-3k') return drink.priceMin <= 3000 && drink.priceMax >= 1000;
  if (budget === '3k-5k') return drink.priceMin <= 5000 && drink.priceMax >= 3000;
  return true;
}

function typeMatches(drink: Drink, alcoholType: AlcoholType): boolean {
  if (alcoholType === 'any') return true;
  if (alcoholType === 'strong') return drink.type === 'strong';
  if (alcoholType === 'sparkling') return drink.type === 'sparkling';
  if (alcoholType === 'red') return drink.type === 'red';
  if (alcoholType === 'white') return drink.type === 'white';
  return false;
}

function sweetnessMatches(drink: Drink, sweetness: Sweetness): boolean {
  if (sweetness === 'any') return true;
  return drink.sweetness === sweetness;
}

function bodyMatches(drink: Drink, body: Body): boolean {
  if (body === 'any') return true;
  return drink.body === body;
}

const MATCH_REASONS: Record<string, string[]> = {
  'cab-sauv': [
    'Танины Каберне прекрасно очищают небо от жирности мяса',
    'Мощная структура вина выдержит насыщенность блюда',
    'Классическое сочетание, проверенное веками',
  ],
  'chardonnay': [
    'Кремовые ноты вина отражают нежность рыбы',
    'Умеренная кислотность подчеркивает морской вкус',
    'Бочковая выдержка добавляет глубину сочетанию',
  ],
  'pinot-grigio': [
    'Легкое тело вина не перебивает деликатный вкус блюда',
    'Цитрусовая свежесть освежает насыщенный соус',
    'Итальянская классика для итальянской пасты',
  ],
  'sauv-blanc': [
    'Травяные ноты вина резонируют со свежими травами блюда',
    'Высокая кислотность балансирует нежность птицы',
    'Минеральность вина подчеркивает простоту блюда',
  ],
  'pinot-noir': [
    'Деликатные танины не перебивают нежное мясо',
    'Вишневые ноты создают изысканный вкусовой дуэт',
    'Бургундская традиция диктует именно это сочетание',
  ],
  'merlot': [
    'Бархатистая текстура вина идеально гармонирует с блюдом',
    'Ноты сливы и шоколада обогащают вкус',
    'Округлые танины не конкурируют с деликатностью блюда',
  ],
  'riesling': [
    'Небольшая сладость вина смягчает остроту специй',
    'Высокая кислотность освежает насыщенные соусы',
    'Классика немецкой и азиатской гастрономии',
  ],
  'muscat': [
    'Сладость вина гармонирует со сладостью десерта',
    'Цветочные ноты добавляют ароматический слой',
    'Легкое тело не утяжеляет послеобеденный опыт',
  ],
  'chianti': [
    'Кислотность вина прорезает жирность томатного соуса',
    'Итальянское вино к итальянскому блюду — беспроигрышно',
    'Терракотовые ноты перекликаются с запеченными томатами',
  ],
  'saperavi': [
    'Грузинский характер вина создает аутентичный дуэт',
    'Мощные танины справляются с дымными нотами гриля',
    'Темные ягоды Саперави оттеняют жареное мясо',
  ],
  'chablis': [
    'Легкий морской привкус вина усиливает свежесть морепродуктов',
    'Минеральность Шабли — природная пара к моллюскам',
    'Парижские рестораны подают именно это сочетание',
  ],
  'verdicchio': [
    'Миндальные ноты вина подчеркивают морской аромат',
    'Итальянская традиция для пасты с дарами моря',
    'Легкая горчинка добавляет сложность сочетанию',
  ],
  'barbera': [
    'Живая кислотность вина оттеняет землистость грибов',
    'Пьемонтское вино к пьемонтскому ризотто — классика',
    'Фруктовые ноты балансируют умами блюда',
  ],
  'prosecco': [
    'Пузырьки очищают небо между укусами',
    'Легкость вина не перегружает аперитивный момент',
    'Итальянская традиция начинать вечер с Просекко',
  ],
  'champagne': [
    'Высокая кислотность и пузырьки освежают морской вкус',
    'Шампанское — единственное вино, с которым не ошибешься',
    'Автолиз дрожжей добавляет кремовую глубину',
  ],
  'tempranillo': [
    'Испанское вино к испанским ароматам — традиция',
    'Кожаные ноты Темпранильо перекликаются с выдержанным хамоном',
    'Умеренные танины поддерживают, не доминируя',
  ],
  'gewurztraminer': [
    'Цветочный аромат смягчает остроту восточных специй',
    'Легкая сладость вина балансирует пряность блюда',
    'Экзотика к экзотике — редкое гармоничное совпадение',
  ],
  'rose': [
    'Розовое — самый универсальный партнер для летней кухни',
    'Свежесть вина подчеркивает яркость средиземноморских трав',
    'Ягодные ноты добавляют праздничное настроение',
  ],
  'port': [
    'Сладость портвейна встречает сладость десерта',
    'Интенсивность вина не теряется рядом с горьким шоколадом',
    'Португальская традиция — портвейн к финальному аккорду',
  ],
  'whisky': [
    'Дымные ноты виски создают брутальный дуэт с мясом',
    'Торфяная глубина усиливает карамелизацию стейка',
    'Шотландцы знали о говядине кое-что особенное',
  ],
  'gin': [
    'Ботанические ноты джина контрастируют с морским умами',
    'Хинная горечь тоника балансирует жирность рыбы',
    'Освежающий выбор для легких морских блюд',
  ],
  'cognac': [
    'Дубовые ноты коньяка добавляют благородство блюду',
    'Французское вино к французской кухне — элегантно',
    'Гастрономическая традиция Бордо',
  ],
  'sake': [
    'Японское умами резонирует с умами японских блюд',
    'Рисовая основа саке перекликается с рисом суши',
    'Аутентичное сочетание — как в Токио',
  ],
  'albarino': [
    'Атлантическая соленость вина усиливает морской вкус',
    'Испанский берег встречается с испанским морем',
    'Персиковые ноты добавляют фруктовую свежесть',
  ],
  'malbec': [
    'Аргентинское вино к аргентинскому стилю приготовления',
    'Мощные танины выдерживают интенсивное мясо',
    'Ноты фиалки и слив создают ароматический контрапункт',
  ],
  'verdejo': [
    'Травяные ноты вина перекликаются с зеленью блюда',
    'Легкость вина не подавляет деликатный вкус',
    'Испанская свежесть для летней кухни',
  ],
};

function getReason(drinkId: string): string {
  const reasons = MATCH_REASONS[drinkId] || ['Гармоничное сочетание вкусов и ароматов'];
  return reasons[Math.floor(Math.random() * reasons.length)];
}

export function matchDrinks(dish: string, prefs: UserPrefs, excludeIds: string[] = []): DrinkMatch[] {
  const scored = DRINKS
    .filter(d => !excludeIds.includes(d.id))
    .map(drink => {
      let score = matchesKeyword(dish, drink.keywords);
      
      const typeOk = typeMatches(drink, prefs.alcoholType);
      const sweetnessOk = sweetnessMatches(drink, prefs.sweetness);
      const bodyOk = bodyMatches(drink, prefs.body);
      const budgetOk = budgetMatches(drink, prefs.budget);

      if (!budgetOk) return { drink, reason: '', score: -1 };

      if (typeOk) score += 2;
      if (sweetnessOk) score += 1;
      if (bodyOk) score += 1;

      if (prefs.favorites) {
        const favLower = prefs.favorites.toLowerCase();
        if (favLower.includes(drink.name.toLowerCase()) || 
            favLower.includes(drink.grape?.toLowerCase() || '')) {
          score += 4;
        }
      }

      return { drink, reason: getReason(drink.id), score };
    })
    .filter(m => m.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];
  
  const results: DrinkMatch[] = [];
  const seen = new Set<string>();
  
  for (const match of scored) {
    if (results.length >= 3) break;
    const typeKey = match.drink.type + match.drink.sweetness;
    if (!seen.has(typeKey)) {
      seen.add(typeKey);
      results.push(match);
    }
  }

  if (results.length < 2 && scored.length >= 2) {
    for (const match of scored) {
      if (results.length >= 2) break;
      if (!results.find(r => r.drink.id === match.drink.id)) {
        results.push(match);
      }
    }
  }

  return results;
}

export function isDishRecognized(dish: string): boolean {
  const dishLower = dish.toLowerCase().trim();
  if (dishLower.length < 3) return false;
  
  for (const drink of DRINKS) {
    if (matchesKeyword(dish, drink.keywords) > 0) return true;
  }
  return false;
}